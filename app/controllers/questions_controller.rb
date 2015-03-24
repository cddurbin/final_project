class QuestionsController < ApplicationController

  def index
    @questions = Question.all
  end

  def show
    @question = Question.find(params[:id])
  end

  def new
    @question = Question.new
  end

  def create
    binding.pry
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
