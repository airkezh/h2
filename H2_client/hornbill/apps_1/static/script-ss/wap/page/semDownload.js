/*common*/
require('wap/zepto/fastclick')
var tracking = require('wap/app/tracking')

var step = $('.step')
	, stepOne = step.find('.stepOne')
	, stepTwo = step.find('.stepTwo')
	, fixed = $('.fixed')


$(window).scroll(function() {
	var top = $(window).scrollTop();
	if (top > 20) {
		fixed.show()
	} else 
		fixed.hide()
})

$('.download').on('click',function(){
	//axis统计代码
	_fxcmd.push(['trackEvent','event','download','label','0']);

	tracking.cr('semDownload', {
		'refer': encodeURIComponent(fml.vars.refer)
	})

	window.location.href = fml.vars.appUrl
})

setInterval(function(){
	step.toggleClass('toggleClass')

	if(step.hasClass('toggleClass')){
		stepOne.show()
		stepTwo.hide()
	} else {
		stepTwo.show()
		stepOne.hide()
	}
},1300)


