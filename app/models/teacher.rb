class Teacher < ApplicationRecord
    has_secure_password
    has_many :students
    has_many :cohorts
    has_many :notes, through: :students

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validates :name, presence: true

end
