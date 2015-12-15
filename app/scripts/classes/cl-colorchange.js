var colorChanger = function () {

  this.checkColor = function(){
    var theme = localStorage.getItem('siteTheme');
    if (theme){
      var externalStyle = $('<style>'+theme+'</style>');
      $('head').append(externalStyle);
      $('link[rel="stylesheet"]').remove();
    }
  }

  this.colorSubmit = function(passed) {
     var params = JSON.stringify({ color:passed.toLowerCase() });
     $.ajax({
      url: '/color-changer',
      type: 'POST',
      data: params,
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        if (data.color !== "unknown"){
          alertify.success('Color changed to '+data.color);
          var externalStyle = $('<style>'+data.style+'</style>');
          $('head').append(externalStyle);
          $('link[rel="stylesheet"]').remove();
          localStorage.setItem('siteTheme', data.style);
        } else {
          alertify.error('Color unknown, logging color name for future reference');
        }
      }
    })
}


}

module.exports = new colorChanger();
