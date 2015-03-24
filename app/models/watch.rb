class Watch < ActiveRecord::Base

  belongs_to :watcher, :class_name => 'User', :foreign_key => "user_id"
  belongs_to :watched_question, :class_name => 'Question', :foreign_key => "question_id"
end
