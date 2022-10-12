class CreateStudents < ActiveRecord::Migration[7.0]
  def change
    create_table :students do |t|
      t.string :name
      t.string :avatar
      t.string :parent_name
      t.string :parent_number
      t.integer :teacher_id
      t.integer :cohort_id

      t.timestamps
    end
  end
end
