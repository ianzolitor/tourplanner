class CreateToursTable < ActiveRecord::Migration[5.1]
  def change
    create_table :tours do |t|
        t.string :name
        t.integer :stop_id
        t.integer :user_id
      end
  end
end
