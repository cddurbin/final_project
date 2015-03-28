class QuestionsController < ApplicationController

  def index
    @questions = Question.all

    respond_to do |format|
      format.html
      format.json { render json: @questions.as_json(include: { user: {}})}
    end
  end

  def show
    @question = Question.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { user: {}, comments: {include: [:user]}})}
      # format.json { render json: @question.as_json(include: { user: {}, comments: {include: [:user]}, answers: {include: [:comments ]}, votes: {}, watches: {}, watchers: {} })}
    end

  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.create(question_params)
    if @question.save
       redirect_to questions_path, notice: "The question has been successfully created."
     else
       render action: "new"
     end
  end

  private
  def question_params
    params.require(:question).permit(:title, :content)
  end
end
