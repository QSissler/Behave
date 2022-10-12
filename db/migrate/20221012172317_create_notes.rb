class CreateNotes < ActiveRecord::Migration[7.0]
  def change
    create_table :notes do |t|
      t.integer :student_id
      t.boolean :parent_contact
      t.string :note
      t.integer :behavior_level

      t.timestamps
    end
  end
end
