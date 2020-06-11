// map1 - Share of Internet Users per Country - leaflet
 var map1 = L.map("map1", {
     center: [43.6532, 79.3832],
     zoom: 5
   });
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
     id: 'mapbox/streets-v11',
     tileSize: 512,
     zoomOffset: -1,
     accessToken: API_KEY
 }).addTo(map1);



//  for (var i = 0; i < regions.length; i++) {

//   var color = "";
//   if (regions[i].Percent_Population > 0.80) {
//     color = "yellow";
//   }
//   else if (regions[i].Percent_Population > 0.50) {
//     color = "blue";
//   }
//   else if (regions[i].Percent_Population > 0.25) {
//     color = "green";
//   }
//   else {
//     color = "red";
//   }
//   // Add circles to map
//   L.circle([regions[i].Latitude,regions[i].Longitude] {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: regions[i].Percent_Population * 5000
//   }).bindPopup("<h3>" + regions[i].Countries + "</h3> <hr> <h3>Percentage of population using the internet: " + regions[i].Percent_Population + "</h3>").addTo(map1);
// };

// for (var i = 0; i < regions.length; i++) {
//   var country = regions[i];
//   L.marker([country.Latitude,country.Longitude])
//     .bindPopup("<h3>" + country.Countries + "</h3> <hr> <h3>Population " + country.Percent_Population + "</h3>")
//     .addTo(map1);




// map2 - Number of Internet Users per Country - leaflet
 var map2 = L.map("map2", {
     center: [43.6532, 79.3832],
     zoom: 5
   });
 L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
     maxZoom: 18,
     id: 'mapbox/streets-v11',
     tileSize: 512,
     zoomOffset: -1,
     accessToken: API_KEY
 }).addTo(map2);

//  var link = "Country_details.json"
//  function createMarkers(response) {
//    var regions = response.???;
//    var regionMarkers = [];
 
//    for (var index = 0; index < regions.length; index++) {
//      var region = regions[index];
//      var regionMarker = L.marker([region.Latitude, region.Longitude)
//        .bindPopup("<h3>" + region.Region + "<h3><h3>Number of people using the internet: " + region['Internet Users'] + "</h3>");
 
//      regionMarkers.push(regionMarker);
//    }
//    createMap(L.layerGroup(regionMarkers));
//  }
//  d3.json(link, createMarkers);

// internet cost v. speed - scatterplot(bubbles) D3
var svgWidth = 1100;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 110
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//   svg.append("rect")
//     .attr("width", "100%")
//     .attr("height", "100%")
//     .attr("fill", "white");

  

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("internetData.csv").then(function(costSpeedData) {

    //  Parse Data/Cast as numbers
    costSpeedData.forEach(function(data) {
      data.speed = +data.speed;
      data.cost = +data.cost;
    });
    //  Create scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(costSpeedData, d => d.cost)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(costSpeedData, d => d.speed)])
      .range([height, 0]);

    //  Create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //  Append Axes to the chart
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(costSpeedData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.cost))
    .attr("cy", d => yLinearScale(d.speed))
    .attr("r", "15")
    .attr("fill", "yellow")
    .attr("opacity", ".8");

    // Initialize tool tip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.Country}<br>Speed: ${d.speed}<br>Cost: ${d.cost}`);
      });

    //  Create tooltip in the chart
    chartGroup.call(toolTip);

    //  Create event listeners to display and hide the tooltip
    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Internet Cost");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Internet Speed");
  }).catch(function(error) {
    console.log(error);
  });