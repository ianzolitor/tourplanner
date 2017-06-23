class CreateStopsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :stops do |t|
      t.integer :venue_id
      t.integer :lodging_id
    end
  end
end
