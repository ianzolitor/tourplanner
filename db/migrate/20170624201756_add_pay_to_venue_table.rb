class AddPayToVenueTable < ActiveRecord::Migration[5.1]
  def change
    add_column :venues, :pay, :float
  end
end
