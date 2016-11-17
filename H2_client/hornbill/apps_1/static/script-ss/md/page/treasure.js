/*common*/
var touch = require('wap/zepto/touch')
var stock = require('wap/app/doota/stock')
var urlHandle = require('wap/component/urlHandle')
var notice = require('md/app/notice')

var pre_pink = $('.presale_acti_pink'),
	pre_pingray = $('.presale_acti_pingray'),
	pre_forws = $('.presale_acti_forws')
var pre_arr = [pre_pink,pre_pingray,pre_forws]
for(var i = 0;i < pre_arr.length; i++){
	(function(index){
	var pre_arrs = pre_arr[index]
		pre_arrs.on('tap',function(){
			$('.black').removeClass('black').addClass('on')
			if(pre_arrs.hasClass('on')){
					pre_arrs.removeClass('on');
					pre_arrs.addClass('black');
				}else{
					pre_arrs.addClass('on');
					pre_arrs.removeClass('black');
			}
		})

	}(i))
}


