class PokemonsController < ApplicationController

    def index
       pokemons = Pokemon.all
       render json: pokemons 
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def create 
        pokemon = Pokemon.create(poke_params)
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.save
        render json: pokemon
    end

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.delete
        render json: pokemon
    end

    private
    def poke_params
        params.require(:pokemon).permit(:trainer_id)
    end
end
