class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :name, :room_number, :avatar
end
