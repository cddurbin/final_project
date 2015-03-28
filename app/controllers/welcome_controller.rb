class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  def index
  end
end
