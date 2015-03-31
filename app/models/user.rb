class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :image, ImageUploader

  has_many :questions
  has_many :answers
  has_many :answers, through: :questions
  has_many :comments
  has_many :votes
  has_many :watches
  has_many :watched_questions, through: :watches
end
