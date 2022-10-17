class CohortsController < ApplicationController

    def index
        current_teacher = Teacher.find_by(id: session[:teacher_id])
        cohorts = current_teacher.cohorts.order_by_date
        render json: cohorts, status: :ok
    end

end
