class CommentsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  
  def index
    @question = Question.find(params[:question_id])
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { comments: {include: [:user]}})}
    end

  end
end
