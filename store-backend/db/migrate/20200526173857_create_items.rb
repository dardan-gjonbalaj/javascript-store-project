class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :image_url
      t.string :material
      t.belongs_to :store, null: false, foreign_key: true

      t.timestamps
    end
  end
end
