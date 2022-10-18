class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :avatar, :parent_name, :parent_number, :behavior, :parent_contact_amount, :notes

  def behavior
    object.average_behavior_student
  end

  def parent_contact_amount
    object.parent_contact_count
  end

  def notes
    object.notes
  end

end
