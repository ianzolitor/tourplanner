class AddTourIdToStopsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :stops, :tour_id, :integer
  end
end
