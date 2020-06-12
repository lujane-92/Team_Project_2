// Pie chart
var trace3 = {
  values: data.map(row => row.Population_Perc_of_World),
  labels: data.map(row => row.World_Regions),
  textfont: {
    color: 'white'},
  type: "pie"
};
var layout1 = {
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
     margin: {
      l: 0,
      r: 0,
      t: 100,
      b: 0
  },

};

var data1 = [trace3];


Plotly.newPlot("plot2", data1, layout1);