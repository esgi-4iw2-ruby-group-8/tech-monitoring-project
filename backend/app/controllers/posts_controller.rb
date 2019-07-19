class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  def index
        @posts = current_user.posts.order("created_at DESC")
        json_response(@posts)
    end

    def all
      @posts = Post.all.order("created_at DESC")
      json_response(@posts)
    end

    def create
        @post = current_user.posts.create!(post_params)
        json_response(@post, :created)
    end

    def show
        json_response(@post)
    end

    def update
        @post.update(post_params)
        head :no_content
    end

    def destroy
        @post.destroy
        head :no_content

    end

    private

    def post_params
        params.require(:post).permit(:name, :text, :user_id)
    end

    def set_post
        @post = Post.find(params[:id])
    end
end
