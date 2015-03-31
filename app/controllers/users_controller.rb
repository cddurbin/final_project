class UsersController < ApplicationController
  before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  # authorize_resource
  
  def show
    @user = User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:image, :first_name, :last_name, :email)
  end
end
