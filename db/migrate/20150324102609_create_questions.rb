class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :user_id
      t.string :title
      t.text :content
      t.integer :viewed, :default => 0

      t.timestamps null: false
    end
  end
end
