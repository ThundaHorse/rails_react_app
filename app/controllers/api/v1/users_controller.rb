class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user

  def index
    user = User.all.order(created_at: :desc)
    render json: user
  end

  def create
    user = User.create!(user_params)
    if user
      render json: user 
    else 
      render json: user.errors
    end
  end

  def show
    if user 
      render json: user 
    else 
      render json: user.errors 
    end 
  end

  def destroy
    user&.destroy 
    render json: { message: 'User deleted!' }
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def user 
    @user ||= User.find(params[:id])
  end
end
