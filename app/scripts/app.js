global.$ = require('jquery');
global.jQuery = require('jquery');


var easyResponsiveTabs = require('../../bower_components/tabs/js/easyResponsiveTabs');
var slidebars = require('../../bower_components/Slidebars/dist/slidebars.js');

require('jquery-unveil');
require('alertify.js');
require('metisMenu');
require('parsleyjs');

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

  $('.admin-tabs').easyResponsiveTabs({
    type: 'vertical'
  });

  $('.js-collapsible-menu').metisMenu();

  $('img').unveil(100, function() {
    $(this).removeClass('is-lazy-loading');
  });

})
