class CreateVenuesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :venues do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.string :website
      t.float :pay
      t.float :lat
      t.float :lng
    end

  end
end
