class SearchController < ApplicationController
  def index
    if params[:q]
      @search = Question.search(name_cont: params[:q])
      @results = @search.result
    else
      redirect_to root_path
    end 
  end
end
