class NoteSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :parent_contact, :note, :behavior_level
end
