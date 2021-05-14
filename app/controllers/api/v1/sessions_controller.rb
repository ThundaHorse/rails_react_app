class Api::V1::SessionsController < ApplicationController
  def create
    if user && user.authenticate(session_params[:password])
      jwt = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i },
        Rails.application.credentials.fetch(:secret_key_base), "HS256" 
      )
      render json: { jwt: jwt, email: user.email, user_id: user.id }, status: :created
    else 
      render json: {}, status: :unauthorized
    end
  end

  private 

  def session_params
    params.permit(:email, :password)
  end 

  def user 
    @user ||= User.find_by(email: params[:email])
  end 
end
