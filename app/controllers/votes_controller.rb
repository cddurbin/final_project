class VotesController < ApplicationController
 
  def create
    binding.pry
    @vote = Vote.create(params.require(:vote).permit(:user_id, :score))
    render json: @vote, status: :created
  end

end
