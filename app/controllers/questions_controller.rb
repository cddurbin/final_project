class QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]

  def index
    @questions = Question.all.order('created_at DESC')
    
    respond_to do |format|
      format.html 
      format.json { render json: @questions.as_json(include: { user: {} })}
    end
  end

  def show
    @question = Question.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { user: {}, votes: {},comments: {include: [:user]}})}
      # format.json { render json: @question.as_json(include: { user: {}, comments: {include: [:user]}, answers: {include: [:comments ]}, votes: {}, watches: {}, watchers: {} })}
    end

  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.create(question_params)
    @question.update_attributes(user_id: current_user.id)
    if @question.save
       redirect_to @question
     else
       render action: "new"
     end
  end

  private
  def question_params
    params.require(:question).permit(:title, :content, :user_id, :viewed)
  end
end
