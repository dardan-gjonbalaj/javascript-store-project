class StoresController < ApplicationController 
  def index
    store = Store.all
    render json: store.to_json(:include => {
      :items => {:only => [:id,:name, :material, :image_url]}
    })
  end


end