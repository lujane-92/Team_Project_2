function filtercountries(country) {
  return country.Region === "North_America";
}

// 2. Use filter() to pass the function as its argument
var filteredregion = data.filter(filtercountries);

//  Check to make sure your are filtering your movies.
console.log(filteredregion);

// Sort the data by Greek search results
var sortedratings = filteredregion.sort((a, b) => b.Population - a.Population);

// Slice the first 10 objects for plotting
slicedData = sortedratings.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// Trace1 for the Greek Data
var trace1 = {
  x: reversedData.map(object => object.Population),
  y: reversedData.map(object => object.Countries),
  name: "Population",
  type: "bar",
  orientation: "h"
};

var trace2 = {
  x: reversedData.map(object => object.Internet_Users),
  y: reversedData.map(object => object.Countries),
  name: "Internet_Users",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1,trace2];

// Apply the group bar mode to the layout
var layout = {
  title: "Top 10 Countries in the Region by population",
  xaxis: { title: "Population/Internet Users" },
  yaxis: { title: "Country"},
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar-plot", data, layout);
