class NotesController < ApplicationController

    def index
        student = Student.find(params[:id])
        notes = student.notes
        render json: notes, status: :ok
    end

    def create
        note = Note.create!(note_params)
        render json: note, status: :created
    end

    private
    def note_params
        params.permit(:student_id, :parent_contact, :note, :behavior_level)
    end

end
