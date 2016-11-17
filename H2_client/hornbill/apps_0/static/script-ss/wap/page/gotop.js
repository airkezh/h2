/*common*/
var $ = require('wap/zepto')
	, carts = require('wap/app/doota/shopping_carts')
	, gotopObj = $('#go_top');

gotopObj.on("click", function(e) {
	document.body.scrollTop = 0
});

$(window).scroll(function(){
	var scrollTop = $(window).scrollTop()
	if(scrollTop < 50) {
		gotopObj.hide()
	} else {
		gotopObj.show()
	}
})

if(fml.vars.show_carticon) carts.readShopsCount()