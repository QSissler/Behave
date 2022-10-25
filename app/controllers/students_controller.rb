class StudentsController < ApplicationController

    def show
        student = Student.find(params[:id])
        render json: student, status: :ok
    end

    def create
        student = Student.create!(student_params)
        render json: student, status: :ok
    end

    def update
        student = Student.find(params[:id])
        student.update!(student_params)
        render json: student, status: :ok
    end

    def destroy
        student = Student.find(params[:id])
        student.destroy
    end

    private
    def student_params
        params.permit(:name, :avatar, :parent_name, :parent_number, :teacher_id, :cohort_id)
    end

end
