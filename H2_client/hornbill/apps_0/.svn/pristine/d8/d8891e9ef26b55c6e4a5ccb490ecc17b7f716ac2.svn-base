/*common*/
var $ = require('wap/zepto')
	, confirmFn = require('wap/app/doota/confirm_new')

confirmFn()

$('.fold_i').on('click', function(){
	var parents = $(this).parents('.order_goods')
	if(parents.hasClass('folded')){
		parents.removeClass('folded')
	} else {
		parents.addClass('folded')
	}
})
