class CohortsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        current_teacher = Teacher.find_by(id: session[:teacher_id])
        cohorts = current_teacher.cohorts.order_by_date
        render json: cohorts, status: :ok
    end

    def show
        cohort = Cohort.find(params[:id])
        render json: cohort, status: :ok
    end

    def create
        cohort = Cohort.create!(cohort_params)
        render json: cohort, status: :created
    end

    def update
        cohort = Cohort.find(params[:id])
        cohort.update!(cohort_params)
        render json: cohort, status: :ok
    end

    def destroy
        cohort = Cohort.find(params[:id])
        cohort.destroy
    end

    private
    def cohort_params
        params.permit(:grade, :subject, :year, :teacher_id)
    end

    def record_invalid (invalid)
        render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
      end

end
