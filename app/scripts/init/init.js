module.exports = function() {

(function() {
  // Listen for keypress on input field
  $.fn.enterKey = function(fnc) {
    return this.each(function() {
      $(this).keypress(function(ev) {
        var keycode = ev.keyCode ? ev.keyCode : ev.which;
        if (keycode === 13) {
          fnc.call(this, ev);
        }
      });
    });
  };
}());

// serialize form to json object
$.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

// load twitter for desktops
if($('.aside__twitter').length > 0){
  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs")
}

// improved typeof function
global.toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
}


};
