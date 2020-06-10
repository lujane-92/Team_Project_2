// Creating function for Data plotting
function getPlot(id) {
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
        
        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        
        console.log(samples);
  
        // sort top 10 
        var samplevalues = samples.score.slice(0, 10).reverse();
        var COUNTRY_top = (samples.country.slice(0, 10)).reverse();
        var COUNTRY_id = COUNTRY_top.map(d => d)
  
        // get the top 10 labels for the plot
        var labels = samples.rank.slice(0, 10);
  
        // create trace variable for the plot
        var trace = {
            x: samplevalues,
            y: COUNTRY_id,
            text: labels,
            marker: {
              color: 'rgb(25,120,181)'},
            type:"bar",
            orientation: "h",
        };
  
        // create data variable
        var data = [trace];
  
        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 Countries",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 180,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        // create the bar plot
        Plotly.newPlot("bar", data, layout);
  
        
        // The bubble chart
        var trace1 = {
            x: samples.country,
            y: samples.score,
            mode: "markers",
            marker: {
                color: samples.country
            },
            text: samples.rank,
            type:"scatter"
  
        };
  
        // set the layout for the bubble plot
        var layout_b = {
            title: "All Countries Ranking"
        };
  
        // creating data variable 
        var data1 = [trace1];
  
        // create the bubble plot
        Plotly.newPlot("bubble", data1, layout_b)

           });
  }  
// create the function to get the necessary data
function getInfo(id) {
    // read the json file to get data
    d3.json("Data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// create the function for the initial data
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("Data/samples.json").then((data)=> {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();