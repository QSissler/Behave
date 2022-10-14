class Note < ApplicationRecord
    belongs_to :student

    validates :student_id, presence: true
    validates :behavior_level, presence: true

    def self.order_by_date_created
        self.order(:created_at).reverse
    end

end
