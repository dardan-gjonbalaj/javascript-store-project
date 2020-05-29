# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'securerandom'

store = Store.create(name: "Scamazon")

20.times do
  name = Faker::Commerce.product_name
  material = Faker::Commerce.material
  image = Faker::LoremFlickr.image(size: "300x200", search_terms: [material.gsub(/\s+/, '-')])
  Item.create(name: name, image_url: image, material: material, store_id: store.id)
end