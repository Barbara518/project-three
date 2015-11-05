class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.references :user, index: true, foreign_key: true
      t.string :location
      t.string :latitude
      t.string :longitude
      t.string :body
      t.date :date_traveled

      t.timestamps null: false
    end
    add_index :articles, :location 

  end
end
