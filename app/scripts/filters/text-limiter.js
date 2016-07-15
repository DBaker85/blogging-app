angular
  .module('BloggingApp')
  .filter("limit", [function() {
    return function(data,open) {
      if (open == true){
        return data
      } else {
        return data.slice(0,300)+' ...';
      }

    };
  }])
