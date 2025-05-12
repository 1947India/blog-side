# app/controllers/concerns/authenticable.rb
module Authenticable
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request
  end

  def authenticate_request
    
    header = request.headers['Authorization']
    token = header.split(' ').last if header.present?
    if token.nil?
      render json: { error: 'Unauthorized, token missing' }, status: :unauthorized
      return
    end
    begin
      decoded = JsonWebToken.decode(token)
      @current_user = User.find_by(id: decoded[:user_id]) if decoded
    rescue JWT::DecodeError
      render json: { error: 'Unauthorized, invalid token' }, status: :unauthorized
      return
    end
    render json: { error: 'Unauthorized, user not found' }, status: :unauthorized unless @current_user
  end
  def current_user
    @current_user
  end
end
