Rails.application.routes.draw do
  # resources :notes, only:
  resources :cohorts, only: [:index, :show, :create, :destroy, :update]
  resources :students, only: [:create, :destroy, :show, :update]
  resources :teachers
  resources :notes, only: [:create, :update, :destroy]

   # resources :teachers
   post "/signup", to: "teachers#create"
   get "/me", to: "teachers#show"
   post "/login", to: "sessions#create"
   delete "/logout", to: "sessions#destroy"

   get "/students/:id/notes", to: "notes#index"
  

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
