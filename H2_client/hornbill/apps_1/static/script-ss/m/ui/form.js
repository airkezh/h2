fml.define('m/ui/form' , ['m/ui/filterSelecter'] , function(require , exports){
	var filterSelect = require('m/ui/filterSelecter');
    var setSelect = function(){
		var select = $('.c_select')
		var changeRadio = function(This){
			$(This).parents('.c_select').find('input[type="radio"]').click()
		}
		select.find('input[type="radio"]').on('change', function(){
			select.removeClass('checked')
			$(this).parents('.c_select').addClass('checked')
		})
		select.find('select').on('change', function(){
			changeRadio($(this))
			$(this).parent().children('span').html(filterSelect($(this)).text())
		})
		select.find('.icon-check').on('tap', function(){
			changeRadio($(this))
		})
    };
	exports.setSelect = setSelect
});
