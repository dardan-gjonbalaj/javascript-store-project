class ItemsController < ApplicationController 
  def create
    name = Faker::Commerce.product_name
    image = Faker::LoremFlickr.image(size: "200x300", search_terms: ['commerce'])
    material = Faker::Commerce.material
    item = item.create(name: name, image_url: image, material: material, store_id: params[:store_id])
    render json: item.to_json
  end
  def index
    items = Item.all
    render json: items.to_json 
  end
  def show
    puts params
    item = Item.find_by(id: params[:id])
    render json: item.to_json
  end

  def update
    puts params
    item = Item.find_by(id:params[:id])
    render json: item.to_json
  end

  def destroy
    item = Item.find_by(id: params[:id])
    item.delete
    render json: item.to_json
  end
end