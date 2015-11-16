var _colorchange = require('../classes/cl-colorchange')

module.exports = function () {

	_colorchange.checkColor();

	$('.js-themer-input').enterKey(function (e) {
    e.preventDefault();
    _colorchange.colorSubmit($('.js-themer-input').val());

  });


};


