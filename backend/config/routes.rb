# config/routes.rb
Rails.application.routes.draw do
  resources :todos do
    resources :items
  end

  resources :posts do
    resources :comments
  end

  get 'feed', to: 'posts#all'
  post 'auth/login', to: 'authentication#authenticate'
  get  'auth/login', to: 'users#get'
  post 'signup', to: 'users#create'

end
