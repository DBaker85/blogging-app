angular
.module('BloggingApp')
.controller('adminController',['Visits',function(Visits){
  var vm = this;
  var chart1 = {};
  chart1.type = "GeoMap";

  chart1.options = {
    colors: [0xf486a9,0xd73925],
    displayMode: 'regions',
    dataMode: 'markers'
  };

  vm.chart = chart1;

  Visits().then(function(response){
      // console.log(response.data.countries);
      chart1.data = [
        ['Country', 'Hits']
      ];


   for (var i = 0; i < response.data.countries.length; i++) {

     chart1.data.push(
       [response.data.countries[i].country, response.data.countries[i].count]
     )


    }


   })
}])
