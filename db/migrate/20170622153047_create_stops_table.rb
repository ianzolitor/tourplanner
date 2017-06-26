class CreateStopsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :stops do |t|
      t.string :city
      t.integer :venue_id
      t.integer :lodging_id
      t.integer :tour_id
    end
  end
end
