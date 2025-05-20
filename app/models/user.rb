class User < ApplicationRecord
  # Devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
    enum :role, { blogger: 0, admin: 1  }, default: :blogger
    validates :name, presence: true
end
