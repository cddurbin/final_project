class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_devise_params, if: :devise_controller?
  before_filter :set_cache_buster
  skip_before_filter :verify_authenticity_token

  after_filter :store_location

  

  def set_cache_buster
   response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
   response.headers["Pragma"] = "no-cache"
   response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end

  def store_location
    # store last url - this is needed for post-login redirect to whatever the user last visited.
    return unless request.get? 
    if (request.path != "/users/sign_in" &&
        request.path != "/users/sign_up" &&
        request.path != "/users/password/new" &&
        request.path != "/users/password/edit" &&
        request.path != "/users/confirmation" &&
        request.path != "/users/sign_out" &&
        !request.xhr?) # don't store ajax calls
      session[:previous_url] = request.fullpath 
    end
  end

  def after_sign_in_path_for(resource)
    session[:previous_url] || root_path
  end

  def configure_devise_params
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(:first_name, :last_name, :location, :ga_course, :image, :role, :graduate,:email, :password, :password_confirmation, :image, :image_cache)
    end

    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(:first_name, :last_name, :location, :ga_course, :image, :role, :graduate,:email, :password, :password_confirmation, :image, :image_cache)
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
