class NotesController < ApplicationController

    def index
        student = Student.find(params[:id])
        notes = student.notes.order_by_date_created
        render json: notes, status: :ok
    end

    def create
        note = Note.create!(note_params)
        render json: note, status: :created
    end

    def update
        note = Note.find(params[:id])
        note.update!(note_params)
        render json: note, status: :ok
    end

    def destroy
        note = Note.find(params[:id])
        note.destroy
    end

    private
    def note_params
        params.permit(:student_id, :parent_contact, :note, :behavior_level)
    end

end
