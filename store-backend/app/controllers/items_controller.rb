class ItemsController < ApplicationController 
  def create
    name = Faker::Commerce.product_name
    material = Faker::Commerce.material
    image = Faker::LoremFlickr.image(size: "300x200", search_terms: [material.gsub(/\s+/, '-')])
    item = Item.create(name: name, image_url: image, material: material, store_id: params[:store_id])
    item.save
    puts item.id
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
    puts params[:item][:id]
    item = Item.find_by(id:params[:item][:id])
    item.update(name: params[:name], material: params[:material])
    render json: item.to_json
  end

  def destroy
    item = Item.find_by(id: params[:id])
    item.delete
    render json: item.to_json
  end
end