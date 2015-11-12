class CommentsController < ApplicationController

  def index
  end

  def create
    @article = Article.find(params[:id])

    @comment = @article.comments.new(comment_params)
    @comment.user_id = current_user.id

    if @comment.save
    else
    flash[:message] = @comment.errors.full_messages.to_sentence
    end
    redirect_to articles_path
  end

  private

  def comment_params
    return params.require(:comment).permit(:body)
  end
  
end
