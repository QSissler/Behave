class CohortsController < ApplicationController

    def index
        current_teacher = Teacher.find_by(id: session[:teacher_id])
        cohorts = current_teacher.cohorts.order_by_date
        render json: cohorts, status: :ok
    end

    def create
        cohort = Cohort.create!(cohort_params)
        render json: cohort, status: :created
    end

    def destroy
        cohort = Cohort.find(params[:id])
        cohort.destroy
    end

    private
    def cohort_params
        params.permit(:grade, :subject, :year, :teacher_id)
    end

end
