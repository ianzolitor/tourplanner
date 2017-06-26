require 'sinatra'
require 'json'
require 'sinatra/activerecord'
require 'sinatra/flash'
require 'google_places'


set :database, 'sqlite3:sinatraapi.sqlite3'
set :sessions, true

require './models'

before do
  @current_user = User.find(session[:user_id]) if session[:user_id]

end

post '/' do
  User.create(username: params[:username],password: params[:password])
  user = User.where(username: params[:username]).first
  session[:user_id] = user.id
  redirect '/profile'
end

post '/signin' do
  @user = User.where(username: params[:username]).first
    if @user.password == params[:password]
      flash[:notice]= "Successfully Signed In"
      session[:user_id] = @user.id
      redirect '/profile'
    else
      redirect '/signin'
    end
end

get '/' do

  erb :index
end


get '/profile' do


  erb :profile
end

get '/tour/:id' do
  @tour=Tour.find(params[:id])
  erb :tour

end

post '/new-tour' do
  Tour.create(name: params[:tour_name], user_id: @current_user.id)

  @tour=Tour.last
  redirect "/tour/#{@tour.id}"
end


get '/tour/:id/new_stop' do
  @tour=Tour.find(params[:id])
  erb :new_stop
end

post '/tour/:id/new_stop' do

  Venue.create(name: params[:venue_name], address: params[:venue_address], lat: params[:venue_lat], lng: params[:venue_lng], pay: params[:venue_pay])

  Lodging.create(name: params[:lodging_name], address: params[:lodging_address], lat: params[:lodging_lat], lng: params[:lodging_lng], cost: params[:lodging_cost])

  Stop.create(venue_id:Venue.last.id, lodging_id:Lodging.last.id, tour_id:params[:id], city:params[:stop_city])


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

get '/venue_info' do
  @client = GooglePlaces::Client.new("AIzaSyA7nROtWpyUv9Oijht-WhWjxDfXcbmj2C4")
  @spot = @client.spot(params[:query])
  @spot.to_json
end

get '/lodging_info' do
  @client = GooglePlaces::Client.new("AIzaSyA7nROtWpyUv9Oijht-WhWjxDfXcbmj2C4")
  @spot = @client.spot(params[:query])
  @spot.to_json
end






#
