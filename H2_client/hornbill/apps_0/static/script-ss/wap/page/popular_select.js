/*common*/
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var dialog = require('wap/app/dialog');

var total_width = $('.jindutiao').width();
var curr_width = total_width * ( fml.vars.curr_val / fml.vars.curr_total_val );
if(curr_width <= total_width){
	$('.curr_jindu').css({'width' : curr_width + 'px'} );	
}else{
	$('.curr_jindu').css({'width' : total_width + 'px'} );	
}

// console.log($('.jindutiao').width() , fml.vars.curr_val , fml.vars.curr_total_val)
var leftYes = $('.cloth_box').find('div').eq(0).hasClass('yes_box');
var come , zhang;
if(leftYes){
	come = 'comeRight';
	zhang = 'zhangLeft';
}else{
	come = 'comeLeft';
	zhang = 'zhangRight';
}

var yesBox = $('.yes_box');
yesBox.append('<img class="'+zhang+'" src="http://d05.res.meilishuo.net/pic/_o/d7/19/40079af6d0bc585b77df0b65db17_129_113.cj.png">');
var yesWidth = $('.yes').width();
var noWidth = $('.no').width();
yesBox.width(yesWidth);
$('.no_box').width(noWidth);

if(fml.vars.isCorrect == 'yes'){
	$('.yes_pop').addClass(come).show();
	if(fml.vars.is_freshman == 1){
		yesBox.on('webkitAnimationEnd' , function(){
			var t = setTimeout(function(){
				var tpl = shareTmp('shengji' , {'my_info' : fml.vars.my_info});
				$.fn.dialog({ dialogContent : tpl , dialogWidth : '4.6rem' });
			} , 500)
		})	
	}
}else{
	$('.no_pop').addClass(come).show();
}

$('.talk').on('webkitAnimationEnd' , function(){
	$('.'+zhang).show().addClass('gai');
})
$('.'+zhang).on('webkitAnimationEnd' , function(event){
	event.stopPropagation();
	yesBox.addClass('shake');	
})






