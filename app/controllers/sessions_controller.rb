class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  skip_before_action :authenticate_request, only: [:create]

  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      if !user.active
         render json: { error: "Account is deactivated. Please contact admin." }, status: :forbidden and return
      end
      token = JsonWebToken.encode(user_id: user.id)

      render json: {
        message: "Login successful",
        token: token,
        user: user.as_json(only: [:id, :email, :name, :role])
      }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def fetch_user
    unless current_user&.role == 'admin'
      render json: { error: 'Unauthorized' }, status: :unauthorized and return
    end
    users = User.all
    render json: users
  end

  def destroy
    render json: { message: "Logout successful" }, status: :ok
  end
end
