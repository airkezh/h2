/*common*/
require('wap/zepto/touch')

var signWX = require('wx/sign')
var shareWX = require('wx/share')
var connectWX = require('wx/connect')
var tracking = require('wap/app/tracking')

//connectWX()

if(Meilishuo.config.os.weixinBrowser){
	signWX()

	shareWX.bind({
		'desc':fml.vars.CONFIG_SHARE.desc,
		'title':fml.vars.CONFIG_SHARE.title,
		'imgUrl':fml.vars.CONFIG_SHARE.imgUrl,
		'link':fml.vars.CONFIG_SHARE.link
	})

}

var $result = $('#resultBox')

var t = setTimeout(function(){

	$result.addClass('scaleFromCenter')

}, 2000)

$('.shareBtn').on('tap', function(){

	tracking.cr('wx/statistics_action', {
		'action':'yaoyaoShareScore'
		, 'value':0
	});

})



