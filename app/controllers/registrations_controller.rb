class RegistrationsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :authenticate_request, only: [:create] 

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: "Signup successful",user:user  }, status: :created
    else
      render json: { errors: user.errors.to_hash(full_messages: true) }, status: :unprocessable_entity

    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation,:role)
  end
end
