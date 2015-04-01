class QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]



  def index
    gon.current_user = current_user

    @q = Question.ransack(params[:q])

    if params[:tag]
      @questions = Question.tagged_with(params[:tag])
    elsif params[:q]
      @q = Question.ransack(params[:q])
      @questions = @q.result(distinct: true)
    else
      @questions = Question.all.order('created_at DESC')
    end
    
    respond_to do |format|
      format.html 
      format.json { render json: @questions.as_json(include: { user: {} })}
    end
  end

  def show
    gon.current_user = current_user
    @question = Question.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { tags: {}, user: {}, votes: {},comments: {include: [:user]}})}
      # format.json { render json: @question.as_json(include: { user: {}, comments: {include: [:user]}, answers: {include: [:comments ]}, votes: {}, watches: {}, watchers: {} })}
    end

  end

  def new
    gon.current_user = current_user
    @question = Question.new
  end

  def create
    gon.current_user = current_user
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
    params.require(:question).permit(:title, :content, :user_id, :viewed, :tag_list)
  end
end
