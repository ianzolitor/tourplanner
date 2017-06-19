require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'sinatra/flash'


set :database, 'sqlite3:sinatraapi.sqlite3'
set :sessions, true

require './models'



get '/' do

  erb :index
end


get '/profile' do


  erb :profile
end


post '/new-tour' do

  redirect :tour
end
