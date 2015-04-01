class AnswersController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  
  def index
    @question = Question.find(params[:question_id])
    answers = @question.answers
    @accepted_answer = answers.where(accepted: true)
    @without_accepted = answers.reject {|answer| answer.accepted == true }
    @sorted_answers = @without_accepted.sort_by { |obj| obj[:created_at] }.reverse!
    @data = {accepted_answer: @accepted_answer, :sorted_answers => @sorted_answers}

    respond_to do |format|
      format.html
      format.json { render json: @data.as_json(include: {user: {}, votes: {}, comments:{include: [:user]}})}
    end

    # respond_to do |format|
    #   format.html
    #   format.json { render json: @data.as_json(include: { user: {}, votes: {}, comments: {include: [:user]}})}
    # end
  end

  def create
    @answer = Answer.create(params.require(:answer).permit(:content, :question_id, :user_id))
    render json: @answer, status: :created
  end

  def update
    @answer = Answer.find(params[:id])
    @answer.update params.require(:answer).permit(:accepted)
    head :no_content, status: :ok
  end

  def get_comments
    @answer = Answer.find(params[:answer_id])
    respond_to do |format|
      format.html
      format.json { render json: @answer.as_json(include: { comments: {include: [:user]}})}
    end
  end
end
