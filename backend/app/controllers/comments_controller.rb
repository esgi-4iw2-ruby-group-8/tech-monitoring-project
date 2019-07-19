class CommentsController < ApplicationController
  before_action :set_comment, only: [:destroy]
  def create
      puts comment_params
      # @post = Post.find(params[:post_id])
      #   @comment = @post.comments.create(params[:text].permit(:name, :text, :user_id))
      @comment = current_user.comments.create!(comment_params)
      json_response(@comment, :created);
  end

  def destroy
      @comment.destroy
      head :no_content
  end

  private

  def comment_params
      params.require(:comment).permit(:name, :text, :user_id, :post_id)
  end

  # def set_post
  #   @post = Post.find(params[:post_id])
  # end

  def set_comment
    @comment = Comment.find(params[:id])
  end
end
