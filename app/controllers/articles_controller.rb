class ArticlesController < ApplicationController

  def index
    @articles = Article.all
  end

  def create
  @article = current_user.articles.new(article_params)

  if @article.save

    else
      flash[:message] = @article.errors.full_messages.to_sentence
    end
    redirect_to articles_path
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
    @article.update(article_params)
    redirect_to articles_path
  end

  def destroy
  @article = Article.find(params[:id])

  @article.destroy

end

private

  def article_params
    return params.require(:article).permit(:location, :latitude, :longitude, :body, :date_traveled)
  end
end
