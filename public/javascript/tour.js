var venueLocations = document.getElementsByClassName("venue-locations")
var stopSelect = document.getElementsByClassName("stop-select")
var budgetPay = document.getElementsByClassName("budget-pay")
var budgetCost = document.getElementsByClassName("budget-cost")
var lineTotal = document.getElementsByClassName("line-total")
var budgetTotal = document.getElementById("budget-total")
var mapVenueName = document.getElementsByClassName("map-venue-name")


budget()
function budget() {

  for (var i = 0; i < budgetCost.length; i++) {
    var total= parseFloat(budgetPay[i].innerHTML) + parseFloat(budgetCost[i].innerHTML)
    if (i>0){
      let j = i-1
    lineTotal[i].innerHTML  =  (total + parseFloat(lineTotal[j].innerHTML)).toFixed(2)
  }
    else{
      lineTotal[i].innerHTML  += total.toFixed(2)
    }

    grandTotal = parseFloat(lineTotal[i].innerHTML)
    budgetTotal.innerHTML = "$" + grandTotal.toFixed(2)
    // budgetTotal.innerHTML
  }
}

for (let i = 0; i < stopSelect.length; i++) {
  stopSelect[i].addEventListener("click",displayStopInfo)

  function displayStopInfo() {
    var stopInfo = document.getElementsByClassName("stop-info");

    stopInfo[i].style.display="block"
  }
}

var map;
function initMap() {
  var usa = {
    lat: 37.0902,
    lng: -95.7129
  }

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: usa

  })
          for (let i = 0; i < venueLocations.length; i++) {

              var latlng = venueLocations[i].innerHTML.split(",")

              var infowindow = new google.maps.InfoWindow({});

              var marker = new google.maps.Marker({
              position: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
              map: map,
              title: mapVenueName[i].innerHTML

              })

            marker.addListener('click', function() {
                   infowindow.setContent(mapVenueName[i].innerHTML);
                   infowindow.open(map, this);
                   map.setCenter(this.getPosition());
             });

        }
}






  //
