// d3.csv("Country_details.csv").then(function(tvData) {

//     // Print the tvData
//     console.log(tvData);
  
//     // Cast the hours value to a number for each piece of tvData
//     tvData.forEach(function(data) {
//       data.hours = +data.hours;
//     });
    d3.csv("/data/cities.csv").then(function(data) {
        console.log(data[0]);
      });