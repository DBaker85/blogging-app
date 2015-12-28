global.$ = require('jquery');
global.jQuery = require('jquery');

require('jquery-unveil');
require('alertify.js');
require('metisMenu');
require('parsleyjs');
require('scrollup');
require('../../bower_components/Slidebars/dist/slidebars.js');

var easyResponsiveTabs = require('../../bower_components/tabs/js/easyResponsiveTabs');
var init = require('./init/init');
var colorChange = require('./controllers/co-colorchange');
var createPost = require('./controllers/co-create-post');
var editDeletePost = require('./controllers/co-edit-delete-post');
var login = require('./controllers/co-login');
var createTag = require('./controllers/co-create-tag');

$(document).ready(function(){

  init();
  colorChange();
  createPost();
  editDeletePost();
  login();
  createTag();

  $.slidebars();

  $.scrollUp({
    scrollText: '<button class="btn btn-primary"><i class="icon-chevron-thin-up"></i></button>',
  });

  $('.admin-tabs').easyResponsiveTabs({
    type: 'vertical'
  });

  $('.js-collapsible-menu').metisMenu();

  $('.lazy').unveil(100, function() {
    $(this).removeClass('is-lazy-loading');
  });

  

})
