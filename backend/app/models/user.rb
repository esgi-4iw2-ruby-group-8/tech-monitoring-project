# app/models/user.rb
class User < ApplicationRecord
  # encrypt password
  has_secure_password

  # Model associations
  has_many :todos, foreign_key: :created_by

  has_many :posts, foreign_key: :user_id

  has_many :comments, foreign_key: :user_id
  # Validations
  validates_presence_of :name, :email, :password_digest
end
