// Part 1
var trace = {
  x: ["Africa","Asia","Europe", "Latin America / Caribbean", "Middle East","North America", "Australia"],
  y: [1340598447, 4294516659, 834995197, 658345826, 260991690, 368869647, 42690838],
  name: 'Population',
  type: "bar"
};
var trace1 = {
  x: ["Africa","Asia","Europe", "Latin America / Caribbean", "Middle East","North America", "Australia"],
  y: [526710313, 2366213308, 727848547, 453702292, 183212099, 348908868, 28917600],
  name: 'Internet Users',
  type: "bar"
};

var data = [trace, trace1];

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

Plotly.newPlot("plot", data, layout);



// // Part 5 - Working Pie Chart
 var trace1 = {
   labels: ["Africa","Asia","Europe", "Latin America / Caribbean", "Middle East", "North America", "Australia"],
   values: [17.20, 55.10, 10.70, 8.50, 3.90, 4.70, 0.50],
   textfont: {
     color: 'white'},
   type: 'pie'
 };

 var data1 = [trace1];

 var layout = {
    paper_bgcolor : 'rgb(78,93,108)',
    plot_bgcolor: 'rgb(78,93,108)',
    title: {
        text: "% of Population by Region",
        font: {color: 'rgb(255,255,255)'}
    },
    
    legend: {
      x: 0, y: -2,
      font: {
         color: 'white'
       }},

};

 Plotly.newPlot("plot2", data1, layout);

