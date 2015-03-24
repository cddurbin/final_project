class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :location, :string
    add_column :users, :ga_course, :string
    add_column :users, :image, :string
    add_column :users, :role, :string
    add_column :users, :graduate, :boolean, :default => false
    add_column :users, :graduated_date, :string
  end
end
