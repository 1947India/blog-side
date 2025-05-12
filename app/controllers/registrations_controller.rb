class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :authenticate_request, only: [:create] 


  def create
    user = User.new(user_params)
    if user.save
      render json: { message: "Signup successful" , user: user.as_json(only: [:id, :email, :name,:role]) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation,:role)
  end
end
