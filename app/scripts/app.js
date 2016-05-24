global.$ = require('jquery');
global.jQuery = require('jquery');

// libs
require('alertify.js');
require('metisMenu');
require('parsleyjs');
require('scrollup');
require('../../bower_components/jquery-unveil/jquery.unveil.js');
require('../../bower_components/Slidebars/dist/slidebars.js');
var easyResponsiveTabs = require('../../bower_components/tabs/js/easyResponsiveTabs');

// modules
require('./init/init');
// require('./modules/themer');
require('./modules/search');
require('./modules/login');
require('./modules/create-post');
require('./modules/create-tag');
require('./modules/edit-delete-post');


$(document).ready(function(){
  $.slidebars();

  $.scrollUp({
    scrollText: '<button class="btn btn-primary"><i class="icon-chevron-thin-up"></i></button>',
  });

  $('.admin-tabs').easyResponsiveTabs({
    type: 'vertical'
  });

  $('.js-collapsible-menu').metisMenu();

  $('.lazy').unveil(100, function() {
    $(this).load(function() {
      $(this).removeClass('is-lazy-loading');
    });
  });


})
