class CreateCohorts < ActiveRecord::Migration[7.0]
  def change
    create_table :cohorts do |t|
      t.string :grade
      t.string :subject
      t.string :year
      t.integer :teacher_id

      t.timestamps
    end
  end
end
