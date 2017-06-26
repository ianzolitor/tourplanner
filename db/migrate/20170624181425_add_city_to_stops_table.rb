class AddCityToStopsTable < ActiveRecord::Migration[5.1]
  def change
        add_column :stops, :city, :string
  end
end
