Rails.application.routes.draw do
  resources :pokemons
  resources :trainers, only: [:index, :show, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

end
