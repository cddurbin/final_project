class AnswersController < ApplicationController
  def index
    @question = Question.find(params[:question_id])
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { answers: {include: [:user, comments: {include: [:user]}]}})}
    end
  end

  def create
    @answer = Answer.create(params.require(:answer).permit(:content))
    render json: @answer, status: :created
  end

  def get_comments
    @answer = Answer.find(params[:answer_id])
    respond_to do |format|
      format.html
      format.json { render json: @answer.as_json(include: { comments: {include: [:user]}})}
    end
  end
end
