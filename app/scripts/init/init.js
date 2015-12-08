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




};
