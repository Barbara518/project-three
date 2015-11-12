class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  helper_method :current_user
  helper_method :all_users
  helper_method :redirect_local

  def angular
    render '/articles/new', layout: 'angular'
  end

  def amiloggedin
    @ammiloggedin = !!session[:current_user_id]
    render json: current_user
  end

  def welcome
    @user = User.new
    @disable_page = true
  end

  
  private

  def current_user
    @current_user ||= session[:current_user_id]&&
    User.find(session[:current_user_id])
  end

  def all_users
    @all_users = User.all
  end

  def redirect_local
    redirect_to articles_path
  end

end
