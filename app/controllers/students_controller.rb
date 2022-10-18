class StudentsController < ApplicationController

    def show
        student = Student.find(params[:id])
        render json: student, status: :ok
    end

end
