Rails.application.routes.draw do
  root "pages#home"

  devise_for :users, controllers: {
    registrations: 'registrations',
    sessions: 'sessions'
  }
  get "blogs/filter", to: "blogs#filter"
  post '/signup', to: 'registrations#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/sessions/fetch_user', to: 'sessions#fetch_user'

  
  get 'blogs/filter', to: 'blogs#filter'
  namespace :admin do
  resources :users do
    member do
      patch :change_user_status
    end
    end
  end

  resources :blogs do
    collection do
      get :search
    end
  end
  
  namespace :admin do
    resources :users do
      member do
        patch :deactivate
      end
    end
  end
  get '*path', to: 'pages#home', constraints: ->(req) { !req.xhr? && req.format.html? }
end
