class Student < ApplicationRecord
    belongs_to :teacher
    belongs_to :cohort
    has_many :notes, dependent: :destroy

    validates :name, presence: true
    validates :teacher_id, presence: true
    validates :cohort_id, presence: true

    def average_behavior_student
        if self.notes.length > 0
         average = self.notes.pluck(:behavior_level).sum(0.0) / self.notes.length
         average.round
        else 
            0
        end
    end

    def self.order_by_name
        self.order(:name)
    end

    def parent_contact_count
       contact_notes = self.notes.pluck(:parent_contact)
       true_only = contact_notes.select do |contact| 
        contact == true 
       end
       true_only.length
    end

end
