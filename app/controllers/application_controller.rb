class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_devise_params, if: :devise_controller?
  skip_before_filter :verify_authenticity_token

  def configure_devise_params
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :location, :ga_course, :image, :role, :graduate,:email, :password, :password_confirmation)
    end
    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(:first_name, :last_name, :location, :ga_course, :image, :role, :graduate,:email, :password, :password_confirmation)
    end
  end

  # after_filter :set_csrf_cookie

  # def set_csrf_cookie
  #   cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery
  # end
  
  # def verified_request?
  #   super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  # end

end
