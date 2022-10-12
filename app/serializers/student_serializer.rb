class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :avatar, :parent_name, :parent_number, :teacher_id, :class_id
end
