class CohortSerializer < ActiveModel::Serializer
  attributes :id, :grade, :year, :subject, :teacher_id, :cohort_name, :average_behavior, :students

  def cohort_name
    object.cohort_name
  end

  def students
    object.students.order_by_name
  end

  def average_behavior
    object.average_behavior_cohort
  end

end
