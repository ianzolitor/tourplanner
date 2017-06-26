class CreateLodgingsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :lodgings do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :website
      t.float :cost
      t.float :lat
      t.float :lng
    end
  end
end
