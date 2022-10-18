class NotesController < ApplicationController

    def index
        student = Student.find(params[:id])
        notes = student.notes
        render json: notes, status: :ok
    end

end
