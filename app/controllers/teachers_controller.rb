class TeachersController < ApplicationController
        skip_before_action :authorize, only: :create
    
        def index
            teachers = Teacher.all
            render json: teachers, status: :ok
        end
    
    
        def show
            render json: @current_user
        end
    
        def create
           teacher = Teacher.create!(teacher_params)
           session[:teacher_id] = teacher.id
           render json: teacher, status: :created
        end
    
    
        private
        def teacher_params
            params.permit(:username, :password, :name, :room_number)
        end
    
end
