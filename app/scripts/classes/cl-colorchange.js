var colorChanger = function () {

  this.checkColor = function(){
    var theme = localStorage.getItem('siteTheme');
    if (theme){
      $('link[rel="stylesheet"]').attr('href','../css/main-'+theme+'.css')
    }
  }

  this.colorSubmit = function(passed) {
    if(localStorage.getItem('siteTheme') !== passed){
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
          $('link[rel="stylesheet"]').attr('href','../css/main-'+data.color+'.css');
          localStorage.setItem('siteTheme', data.color);
        } else {
          alertify.error('Color unknown, logging color name for future reference');
        }


      }

    })
   } else {
    alertify.error('This is the active color');
  }
}


}

module.exports = new colorChanger();
