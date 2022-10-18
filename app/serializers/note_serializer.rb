class NoteSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :parent_contact, :note, :behavior_level, :nice_created_date

  def nice_created_date
    object.nice_time
  end

end
