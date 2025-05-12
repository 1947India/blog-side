class Admin::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
  before_action :set_user, only: [:update, :change_user_status]
  skip_before_action :verify_authenticity_token

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: { message: "User created successfully", user: user }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: { message: "User updated successfully", user: @user }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def change_user_status
    user = User.find(params[:id])

    if user.update(active: !user.active) 
      message = user.active ? "User activated successfully" : "User deactivated successfully"
      render json: { message: message }, status: :ok
    else
      render json: { error: "Failed to update user status" }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
  params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :active)
end


  def authorize_admin!
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_user&.role == "admin"
  end
end
