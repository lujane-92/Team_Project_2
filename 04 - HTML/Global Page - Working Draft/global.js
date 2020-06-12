// MAP - Share of Internet Users per Country & Number of users per country
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


 var regions = [
  {
    countries: "Algeria",
    internetUsers: 25428159,
    percentPopulation: 0.58,
    population: 43851044,
    region: "Africa",
    location: [36.7397,3.05097]
  },
  {
    countries: "Angola",
    internetUsers: 7078067,
    percentPopulation: 0.22,
    population: 32866272,
    region: "Africa",
    location: [-8.81155, 13.242]
  }];

  for (var i = 0; i < regions.length; i++) {
    var color = "";
    console.log(regions[i].location);
    if (regions[i].percentPopulation > 0.75) {
      color = "green";
    }
    else if (regions[i].percentPopulation > 0.50) {
      color = "blue";
    }
    else {
      color = "red";
    }
  
    L.circle(regions[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      radius: regions[i].percentPopulation * 500000
    }).bindPopup("<h2>" + regions[i].countries + "</h2> <hr> <h2>Percentage of population using the internet: " + regions[i].percentPopulation +  "</h2> <hr> <h2>Number of people using the internet: " + regions[i].internetUsers +  "</h2>" ).addTo(map1);
  };
  


// internet cost v. speed - bubbles - D3
var svgWidth = 1100;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
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



 