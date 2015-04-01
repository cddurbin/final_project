class Question < ActiveRecord::Base
  acts_as_taggable

  belongs_to :user
  has_many :answers
  has_many :votes, as: :votable
  has_many :comments, as: :commentable
  has_many :watches
  has_many :watchers, through: :watches

 

end
