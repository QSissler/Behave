class Cohort < ApplicationRecord
    belongs_to :teacher
    has_many :students, dependent: :destroy

    validates :teacher_id, presence: true
    validates :year, presence: true

    def average_behavior_cohort
        behavior_array = []

        self.students.each do |student|
           behavior_array << student.average_behavior_student
        end

        updated_array = behavior_array.select do |b|
             b > 0 
         end

         if updated_array.empty?
            0
         else
         updated_array.sum / updated_array.length
         end
    end


    def self.order_by_date
        order(:year).reverse
    end

    def cohort_name
        "#{self.year} #{self.subject} Grade: #{self.grade}"
    end

end
