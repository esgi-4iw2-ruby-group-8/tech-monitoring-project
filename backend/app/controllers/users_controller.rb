# app/controllers/users_controller.rb
class UsersController < ApplicationController
  before_action :setHeader, only: :get
  skip_before_action :authorize_request, only: :create

  # POST /signup
  # return authenticated token upon signup
  def create
    user = User.create!(user_params)
    auth_token = AuthenticateUser.new(user.email, user.password).call
    response = { message: Message.account_created, auth_token: auth_token }
    json_response(response, :created)
  end


  # GET /auth/login
  def get
    user = User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    json_response(user)
    rescue ActiveRecord::RecordNotFound => e
    # raise custom error
    raise(
      ExceptionHandler::InvalidToken,
      ("#{Message.invalid_token} #{e.message}")
    )



  end

  private

  def user_params
    params.permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def setHeader(headers = {})
    @headers = request.headers
  end

  def http_auth_header
    if @headers['Authorization'].present?
      return @headers['Authorization'].split(' ').last
    end
      raise(ExceptionHandler::MissingToken, Message.missing_token)
  end
end
