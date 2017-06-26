var stopVenue = document.getElementById('stop_venue')
var stopVenueSubmit = document.getElementById('stop_venue_submit')
var venueResults = document.getElementsByClassName('venue-results')[0]
var lodging = document.getElementsByClassName("lodging")[0]
var lodgingResults = document.getElementsByClassName("lodging-results")[0]
var finalizeVenue = document.getElementsByClassName("finalize-venue")[0]
var finalizeLodging = document.getElementsByClassName("finalize-lodging")[0]
var finalizeStopDiv = document.getElementsByClassName("finalize-stop-div")[0]
var finalizeStopButton = document.getElementById("finalize-stop-button")
var venuePay = document.getElementById("venue-pay")
var lodgingCost = document.getElementById("lodging-cost")

var moreLodgingInfo;
var moreVenueInfo;
var chosenVenue;
var chosenlodging;





stopVenueSubmit.addEventListener("click", searchVenue)




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
        return {name: venue.name, lat: venue.lat, lng: venue.lng, address: venue.formatted_address, id:venue.place_id}

      })
      populateVenues(venueResponse)

    }

  })

}

function populateVenues(venues) {
console.log(venues);

  var finalVenueList = document.createElement("select")
  finalVenueList.id = "final-venue"
  finalizeVenue.appendChild(finalVenueList)

  // var venuePay = document.createElement("input")
  // venuePay.type="text"
  // venuePay.id="venue-pay"
  // venuePay.placeholder="How Much They Paying You?"
  // finalizeVenue.appendChild(venuePay)



  for (var i = 0; i < venues.length; i++) {
      var option = document.createElement("option");

      option.text = venues[i].name;
      option.value=i
      finalVenueList.appendChild(option);
  }

  finalVenueList.addEventListener("change",function(event){
    chosenVenue = venues[event.target.value]
    console.log(chosenVenue);
  })


  venues.forEach(function(venue, index) {

    var venueList = document.createElement("div")
    venueList.innerHTML = "<button type='button' class='venue'>" + venue.name + "</button>"
    venueResults.append(venueList)

  });
  lodging.innerHTML += "<h2>Will You Need A Place To Rest Your Head?</h2><select id='stop_lodging'><option value='hotels'>Hotels</option><option value='campground'>Campground</option></select><button type='button' id='stop_lodging_submit'>Find Accomodations</button></div>"

  var venueButton = document.getElementsByClassName("venue")
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
        console.log(JSON.parse(response));
        lodgingResponse = JSON.parse(response).map(function(lodging, index) {
          return {name: lodging.name, lat: lodging.lat, lng: lodging.lng, id: lodging.place_id,}

        })
        populateLodgings(lodgingResponse)
      }

    })
  }
    for (let i = 0; i < venueButton.length; i++) {
      venueButton[i].addEventListener("click", venueInfo)
      function venueInfo() {
        console.log(venueResponse[i]);
        $.ajax({
          url:"/venue_info",
          method: "GET",
          data: {
            query: venueResponse[i].id
          },
          success: function(response) {

          var moreVenueInfo = JSON.parse(response)
          console.log(moreVenueInfo);
            populateMoreVenueInfo(moreVenueInfo)
              function populateMoreVenueInfo(venue) {
                var venueInfo = document.createElement("div")

                venueInfo.innerHTML = "<div>" + venue.name + "</div><div>" + venue.formatted_phone_number + "</div><div>" + venue.formatted_address + "</div><div><a href="+venue.website +" target='_blank'>"+venue.website +"</a></div>"
                venueButton[i].parentNode.append(venueInfo);
              }
            }

          })


      }
    }

  }

function populateLodgings(lodgings) {

  var finalLodgingList = document.createElement("select")
  finalLodgingList.id = "final-lodging"
  finalizeLodging.appendChild(finalLodgingList)

  // var lodgingCost = document.createElement("input")
  // lodgingCost.type="text"
  // lodgingCost.name="lodging-cost"
  // lodgingCost.placeholder="How Much Per Night?"
  // finalizeLodging.appendChild(lodgingCost)

  for (var i = 0; i < lodgings.length; i++) {
      var option = document.createElement("option");
      option.text = lodgings[i].name;
      option.value=i
      finalLodgingList.appendChild(option);
  }
  finalLodgingList.addEventListener("change",function(event){
    chosenlodging = lodgings[event.target.value]
    console.log(chosenlodging);
  })
  lodgings.forEach(function(lodging, index) {
    var lodgingList = document.createElement("div")
    lodgingList.innerHTML = "<button type='button' class='lodging-button'>" + lodging.name + "</button>"
    lodgingResults.append(lodgingList)
  });
  var lodgingButton = document.getElementsByClassName("lodging-button")
  for (let i = 0; i < lodgingButton.length; i++) {
    lodgingButton[i].addEventListener("click", lodgingInfo)
    function lodgingInfo() {
      console.log(lodgingResponse[i]);
      $.ajax({
        url:"/lodging_info",
        method: "GET",
        data: {
          query: lodgingResponse[i].id
        },
        success: function(response) {;
        var moreLodgingInfo = JSON.parse(response)
        console.log(moreLodgingInfo);
          populateMoreLodgingInfo(moreLodgingInfo)
            function populateMoreLodgingInfo(venue) {
              var lodgingInfo = document.createElement("div")

              lodgingInfo.innerHTML = "<div>" + moreLodgingInfo.name + "</div><div>" + moreLodgingInfo.formatted_phone_number + "</div><div>" + moreLodgingInfo.formatted_address + "</div><div><a href=" +moreLodgingInfo.website +" target='_blank'>"+moreLodgingInfo.website+"</a></div>"
              lodgingButton[i].parentNode.append(lodgingInfo);
            }
          }
        })
    }
  }
  finalizeStopDiv.style.display="block"
}


finalizeStopButton.addEventListener("click", finalizeStop)

function finalizeStop() {
  tourId = document.getElementById("tour_id").innerHTML
  console.log(chosenVenue.name,chosenlodging.name);

  $.ajax({
    url:"/tour/"+ tourId +"/new_stop",
    method:"POST",
    data: {
        venue_name: chosenVenue.name,
        venue_address: chosenVenue.address,
        venue_lat: chosenVenue.lat,
        venue_lng: chosenVenue.lng,
        venue_pay: venuePay.value,
        lodging_name: chosenlodging.name,
        lodging_address: chosenlodging.address,
        lodging_lat: chosenlodging.lat,
        lodging_lng: chosenlodging.lng,
        lodging_cost: lodgingCost.value,
        stop_city: stopVenue.value
    },
    success: function(response){
      window.location="/tour/"+ tourId
    }
  })
}
