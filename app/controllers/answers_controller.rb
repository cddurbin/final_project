class AnswersController < ApplicationController
  def index
    @question = Question.find(params[:question_id])
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { answers: {include: [:user]}})}
    end
  end

  def get_comments
    @answer = Answer.find(params[:answer_id])
    respond_to do |format|
      format.html
      format.json { render json: @answer.as_json(include: { comments: {include: [:user]}})}
    end
  end
end
