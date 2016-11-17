/*common*/
var $ = require('wap/zepto')
	, cart = require('wap/app/doota/cart_new')

cart()

$('.fold_btn').on('click', function(){
	var parents = $(this).parents('.cart_list')
	if(parents.hasClass('folded')){
		parents.removeClass('folded')
	} else {
		parents.addClass('folded')
	}
})

