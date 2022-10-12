class Student < ApplicationRecord
    belongs_to :teacher
    belongs_to :cohort
    has_many :notes

end
