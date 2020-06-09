// Part 1
var trace = {
  x: ["Africa","Asia","Europe", "Latin America / Caribbean", "Middle East","North America", "Australia"],
  y: [1340598447, 4294516659, 834995197, 658345826, 260991690, 368869647, 42690838],
  type: "bar"
};

var data = [trace];

var layout = {
  title: "Population by region",
  xaxis: { title: "Region"},
  yaxis: { title: "Popuation"}
};

Plotly.newPlot("plot", data, layout);


// // Part 2 - Adding attributes
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "bar"
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart",
//   xaxis: { title: "Drinks"},
//   yaxis: { title: "% of Drinks Ordered"}
// };

// Plotly.newPlot("plot", data, layout);


// // Part 3 - Line Chart
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "line"
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart",
// };

// Plotly.newPlot("plot", data, layout);

// // Part 4 - Broken Pie Chart
// var trace1 = {
//   x: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//   y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//   type: "pie"
// };

// var data = [trace1];

// var layout = {
//   title: "'Bar' Chart",
// };

// Plotly.newPlot("plot", data, layout);


// // Part 5 - Working Pie Chart
 var trace1 = {
   labels: ["Africa","Asia","Europe", "Latin America / Caribbean", "Middle East", "North America", "Australia"],
   values: [17.20, 55.10, 10.70, 8.50, 3.90, 4.70, 0.50],
   type: 'pie'
 };

 var data1 = [trace1];

 var layout = {
   title: "% of Population by Region",
   legend: {x: 0, y: -2}
 };

 Plotly.newPlot("plot2", data1, layout);

