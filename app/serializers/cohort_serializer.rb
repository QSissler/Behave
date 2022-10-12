class CohortSerializer < ActiveModel::Serializer
  attributes :id, :grade, year, :subject, :teacher_id
end
