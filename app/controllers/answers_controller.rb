class AnswersController < ApplicationController
  def index

    @question = Question.find(params[:question_id])
    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { answers: {include: [:user]}})}
    end

  end
end
