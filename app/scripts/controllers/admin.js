angular
.module('BloggingApp')
.controller('adminController',['Stats',function(Stats){
  var vm = this;

  vm.visitorChart = {};
  vm.visitorChart.type = "GeoChart";
  vm.visitorChart.loaded = false;
  vm.visitorChart.options = {
    colorAxis: {colors: ['#f486a9', '#d73925']},
    displayMode: 'markers'
    // dataMode: 'markers'
  };

  vm.deviceChart = {};
  vm.deviceChart.type = "PieChart";
  vm.deviceChart.loaded = false;
  vm.deviceChart.options = {

  };

  vm.osChart = {};
  vm.osChart.type = "PieChart";
  vm.osChart.loaded = false;
  vm.osChart.options = {

  };

  vm.platformChart = {};
  vm.platformChart.type = "PieChart";
  vm.platformChart.loaded = false;
  vm.platformChart.options = {

  };

  vm.chromeChart = {};
  vm.chromeChart.type = "PieChart";
  vm.chromeChart.loaded = false;
  vm.chromeChart.data = [
    ['Version','Hits']
  ];
  vm.chromeChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.firefoxChart = {};
  vm.firefoxChart.type = "PieChart";
  vm.firefoxChart.loaded = false;
  vm.firefoxChart.data = [
    ['Version','Hits']
  ];
  vm.firefoxChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.operaChart = {};
  vm.operaChart.type = "PieChart";
  vm.operaChart.loaded = false;
  vm.operaChart.data = [
    ['Version','Hits']
  ];
  vm.operaChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.IEChart = {};
  vm.IEChart.type = "PieChart";
  vm.IEChart.loaded = false;
  vm.IEChart.data = [
    ['Version','Hits']
  ];
  vm.IEChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };

  vm.safariChart = {};
  vm.safariChart.type = "PieChart";
  vm.safariChart.loaded = false;
  vm.safariChart.data = [
    ['Version','Hits']
  ];
  vm.safariChart.options = {
    pieHole: 0.3
    // , chartArea:{left:0,top:0,width:'100%',height:'100%'}
  };




  Stats.countries().then(function(response){
    // console.log(response.data.countries);
    vm.visitorChart.data = [
      ['Country', 'Hits']
    ];
    for (var i = 0; i < response.data.length; i++) {
      vm.visitorChart.data.push(
        [response.data[i].country, response.data[i].count]
      )
    }
  })

  Stats.os().then(function(response){
    vm.osChart.data = [
      ['OS', 'hits']
    ];
    for (var i = 0; i < response.data.length; i++) {
      vm.osChart.data.push(
        [response.data[i]._id.os, response.data[i].count]
      )
    }
 });

 Stats.platform().then(function(response){
   vm.platformChart.data = [
     ['Platform', 'hits']
   ];
   for (var i = 0; i < response.data.length; i++) {
     vm.platformChart.data.push(
       [response.data[i]._id.platform, response.data[i].count]
     )
   }
});
//
Stats.devices().then(function(response){
  vm.deviceChart.data = [
    ['Device', 'hits']
  ];
  for (var i = 0; i < response.data.length; i++) {
    if (response.data[i]._id.desktop){
      vm.deviceChart.data.push(
        ['Desktop', response.data[i].count]
      )
    } else if (response.data[i]._id.tablet){
        vm.deviceChart.data.push(
          ['Tablet', response.data[i].count]
      )
    }else if (response.data[i]._id.mobile){
        vm.deviceChart.data.push(
          ['Mobile', response.data[i].count]
        )
    }
  }
});


Stats.browser().then(function(response){

  for (var i = 0; i < response.data.length; i++) {
    if (response.data[i]._id.chrome){
      vm.chromeChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.firefox){
      vm.firefoxChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.edge){
      vm.IEChart.data.push(
        ['Edge '+parseInt(response.data[i]._id.version), response.data[i].count]
      )
    }
    else if (response.data[i]._id.ie){
      vm.IEChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.opera){
      vm.operaChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
    else if (response.data[i]._id.safari){
      vm.safariChart.data.push(
        [response.data[i]._id.version, response.data[i].count]
      )
    }
  }

});



}])
