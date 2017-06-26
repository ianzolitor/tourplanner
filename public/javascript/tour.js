var venueLocations = document.getElementsByClassName("venue-locations")[0].innerHTML

var stopSelect = document.getElementsByClassName("stop-select")







console.log(venueLocations);

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
    zoom: 5,
    center: usa

  })
          var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
              'sandstone rock formation in the southern part of the '+
              'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
              'south west of the nearest large town, Alice Springs; 450&#160;km '+
              '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
              'features of the Uluru - Kata Tjuta National Park. Uluru is '+
              'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
              'Aboriginal people of the area. It has many springs, waterholes, '+
              'rock caves and ancient paintings. Uluru is listed as a World '+
              'Heritage Site.</p>'+
              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
              '(last visited June 22, 2009).</p>'+
              '</div>'+
              '</div>';

          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });


              var latlng = venueLocations.split(/,/)
              console.log(latlng);
              // return new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1]));


          var marker = new google.maps.Marker({
              position: new google.maps.LatLng(parseFloat(latlng[0]), parseFloat(latlng[1])),
              title: 'Uluru (Ayers Rock)'

            })



          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });

}








  //
