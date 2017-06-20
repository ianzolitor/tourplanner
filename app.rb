require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'sinatra/flash'
require 'google_places'


set :database, 'sqlite3:sinatraapi.sqlite3'
set :sessions, true

require './models'


get '/' do

  erb :index
end


get '/profile' do


  erb :profile
end

get '/tour' do

  erb :tour
end

post '/new-tour' do

  redirect :tour
end


get '/new_stop' do

  erb :new_stop
end

get '/stop_venue' do
@client = GooglePlaces::Client.new("AIzaSyA7nROtWpyUv9Oijht-WhWjxDfXcbmj2C4")
venues =  @client.spots_by_query(params[:query])
# venues =  @client.spots_by_query("music venues in Philadelphia")

venues.to_json

end

get '/stop_lodging' do
  p params
  @client = GooglePlaces::Client.new("AIzaSyA7nROtWpyUv9Oijht-WhWjxDfXcbmj2C4")
  lodging =  @client.spots_by_query(params[:query])

  lodging.to_json



end
