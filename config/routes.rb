Rails.application.routes.draw do
  resources :notes
  resources :cohorts
  resources :students
  resources :teachers

   # resources :teachers
   post "/signup", to: "teachers#create"
   get "/me", to: "teachers#show"
   post "/login", to: "sessions#create"
   delete "/logout", to: "sessions#destroy"
  

  get '*path',
  to: 'fallback#index',
  constraints: ->(req) { !req.xhr? && req.format.html? }
end
