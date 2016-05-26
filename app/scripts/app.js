
var expandArea = function(context){
  var expandBox = '<div class="area"></div>'
  context.parents('.level').append(expandBox)
}

$(document).ready(function(){

  $('.box').on('click', function(){
    if ($(this).data("expand")==true){
      $(this)
        .toggleClass('expand-box')
        .parents('.level')
        .toggleClass('expand')
        .attr('data-theme',$(this).data('theme'));
    }
  })

})
