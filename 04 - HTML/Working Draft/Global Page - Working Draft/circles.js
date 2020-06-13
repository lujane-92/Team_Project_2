
    var map1 = L.map("map1", {
        center: [36.7397,3.05097],
        zoom: 2
      });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: API_KEY
    }).addTo(map1);
  
  
  function createMarkers(response) {
  
    var countries = response;
    var countryMarkers = [];
  
    for (var index = 0; index < countries.length; index++) {
      var country = countries[index];

      var countryMarker = L.marker(country.Location)
     
      .bindPopup("<h2>" + country.name + "<h2><h2>Number of internet users: " + country.Internet_Users + "</h2>" + "<h2><h2>Percentage of population using the inuternet: " + country.Penetration_percentage_among_population + "</h2>");
      countryMarkers.push(countryMarker);
    }
    createMap(L.layerGroup(countryMarkers));
}

  d3.json("country_detals.json", createMarkers);