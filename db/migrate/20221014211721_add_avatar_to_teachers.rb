class AddAvatarToTeachers < ActiveRecord::Migration[7.0]
  def change
    add_column :teachers, :avatar, :string
  end
end
