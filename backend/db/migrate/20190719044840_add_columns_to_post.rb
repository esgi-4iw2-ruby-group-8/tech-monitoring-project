class AddColumnsToPost < ActiveRecord::Migration[5.2]
  def change
    add_reference :posts, :user, foreign_key: true
    add_column :posts, :text, :string
    add_column :posts, :name, :string
  end
end
