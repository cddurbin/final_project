class CommentsController < ApplicationController
  def index
    @question = Question.find(params[:question_id])

    respond_to do |format|
      format.html
      format.json { render json: @question.as_json(include: { comments: {include: [:user]}})}
      # format.json { render json: @question.as_json(include: { user: {}, comments: {include: [:user]}, answers: {include: [:comments ]}, votes: {}, watches: {}, watchers: {} })}
    end
  end
end
