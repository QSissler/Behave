class ApplicationController < ActionController::API
    include ActionController::Cookies

    before_action :authorize

    private
    def authorize
        @current_user = Teacher.find_by(id: session[:teacher_id])
        render json: {errors: ["Not Authorized, please login"]}, status: :unauthorized unless @current_user
    end

end
