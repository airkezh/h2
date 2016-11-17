/*common*/
var $ = require('wap/zepto');
$(function(){
	$('.item-title').on('click',function(){
		$(this).toggleClass('jian');
		$(this).next('ul').toggle();
	})
})
