var trace1 = {
  x: data.map(row => row.World_Regions),
  y: data.map(row => row.Population),
  text: data.map(row => row.World_Regions),
  name: "Population",
  type: "bar"
};

var trace2 = {
  x: data.map(row => row.World_Regions),
  y: data.map(row => row.Internet_users),
  text: data.map(row => row.World_Regions),
  name: "Internet Users",
  type: "bar"
};



// Combining both traces
var data = [trace1, trace2];

// Apply the group barmode to the layout
// var layout = {
//   title: "Greek vs Roman gods search results",
//   barmode: "group"
// };
var layout = {
  paper_bgcolor : 'rgb(78,93,108)',
  plot_bgcolor: 'rgb(78,93,108)',
  title: {
      text: "Population by region",
      font: {color: 'rgb(255,255,255)'}
  },
  yaxis:{
      title: 'Population',
      color:'rgb(255,255,255)'
  },
  xaxis:{
      title: 'Regions',
      color:'rgb(255,255,255)'},
  
  legend: {
        font: {
       color: 'white'
     }},

};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

// var trace3 = {
//   x: data.map(row => row.World_Regions),
//   y: data.map(row => row.Penetration_Rate),
//   name: "Population",
//   type: "scatter"
// };

// var trace4 = {
//   x: data.map(row => row.World_Regions),
//   y: data.map(row => row.Population_Perc_of_World),
//   name: "Internet Users",
//   type: "scatter"
// };



// // Combining both traces
// var data2 = [trace3, trace4];


// var layout2 = {
//   paper_bgcolor : 'rgb(78,93,108)',
//   plot_bgcolor: 'rgb(78,93,108)',
//   title: {
//       text: "Population by region",
//       font: {color: 'rgb(255,255,255)'}
//   },
//   yaxis:{
//       title: 'Population',
//       color:'rgb(255,255,255)'
//   },
//   xaxis:{
//       title: 'Regions',
//       color:'rgb(255,255,255)'},
  
//   legend: {
//         font: {
//        color: 'white'
//      }},

// };

// // Render the plot to the div tag with id "plot"
// Plotly.newPlot("plot3", data2, layout2);

// // Pie chart
// var trace3 = {
//   values: data.map(row => row.Population_Perc_of_World),
//   labels: data.map(row => row.World_Regions),
//   textfont: {
//     color: 'white'},
//   type: "pie"
// };
// var layout1 = {
//   paper_bgcolor : 'rgb(78,93,108)',
//   plot_bgcolor: 'rgb(78,93,108)',
//   title: {
//       text: "% of Population by Region",
//       font: {color: 'rgb(255,255,255)'}
//   },
  
//   legend: {
//     x: 0, y: -2,
//     font: {
//        color: 'white'
//      }},
//      margin: {
//       l: 10,
//       r: 10,
//       t: 100,
//       b: 10
//   },

// };

// var data1 = [trace3];


// Plotly.newPlot("plot2", data1, layout1);