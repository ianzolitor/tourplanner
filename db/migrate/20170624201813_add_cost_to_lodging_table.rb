class AddCostToLodgingTable < ActiveRecord::Migration[5.1]
  def change
        add_column :lodgings, :cost, :float   
  end
end
