var stopVenue = document.getElementById('stop_venue')
var stopVenueSubmit = document.getElementById('stop_venue_submit')
var venueResults = document.getElementsByClassName('venue-results')[0]
var lodging = document.getElementsByClassName("lodging")[0]

stopVenueSubmit.addEventListener("click", searchVenue)

var map;
function initMap() {
  var usa = {
    lat: 37.0902,
    lng: -95.7129
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: usa

  })

}

function searchVenue() {

  $.ajax({
    url: "/stop_venue",
    method: "GET",
    data: {
      query: "music venue in " + stopVenue.value
    },
    success: function(response) {
      console.log(JSON.parse(response));
      venueResponse = JSON.parse(response).map(function(venue, index) {
        return {name: venue.name, lat: venue.lat, lng: venue.lng, id: venue.id}

      })
      populateVenues(venueResponse)

    }

  })

}

function populateVenues(venues) {
  venues.forEach(function(venue, index) {
    var venueList = document.createElement("div")
    venueList.innerHTML = "<button type='button' class='venue' key=" + index + ">" + venue.name + "</button>"
    venueResults.append(venueList)
  });
  lodging.innerHTML += "<h2>Will You Need A Place To Rest Your Head?</h2><select id='stop_lodging'><option value='hotels'>Hotels</option><option value='campground'>Campground</option></select><button type='button' id='stop_lodging_submit'>Find Accomodations</button></div>"

  var venueButton = document.getElementById("venue")
  var stopLodgingSubmit = document.getElementById("stop_lodging_submit")
  var stopLodging = document.getElementById("stop_lodging")

  stopLodgingSubmit.addEventListener("click", searchLodging)
  function searchLodging() {

    $.ajax({
      url: "/stop_lodging",
      method: "GET",
      data: {
        query: stopLodging.value + " in " + stopVenue.value
      },
      success: function(response) {
        // console.log(response);
        console.log(JSON.parse(response));
      }

    })
  }
    for (var i = 0; i < venueButton.length; i++) {
      venueButton[i].addEventListener("click", venueInfo)
      function venueInfo() {
        console.log("clicked");
      }
      }

    }







  //
