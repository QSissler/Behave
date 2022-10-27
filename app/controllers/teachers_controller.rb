class TeachersController < ApplicationController
        skip_before_action :authorize, only: :create
        rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
        
    
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
    
        def update
            teacher = Teacher.find_by(id: session[:teacher_id])
            teacher.update!(teacher_params)
            render json: teacher, status: :ok
        end
    
        private
        def teacher_params
            params.permit(:username, :password, :name, :room_number, :avatar)
        end

        def record_invalid (invalid)
            render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
        end
    
end
