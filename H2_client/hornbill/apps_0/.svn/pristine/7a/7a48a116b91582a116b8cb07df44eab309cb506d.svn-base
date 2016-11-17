/*common*/
require('wap/zepto/touch')

var urlHandle = require('wap/component/urlHandle')
var params = urlHandle.getParams(location.href)
var tracking = require('wap/app/tracking')

var signWX = require('wx/sign')
var shareWX = require('wx/share')

if(Meilishuo.config.os.weixinBrowser){
	signWX()

	shareWX.bind({
		'desc':fml.vars.CONFIG_SHARE.desc,
		'title':fml.vars.CONFIG_SHARE.title,
		'imgUrl':fml.vars.CONFIG_SHARE.imgUrl,
		'link':fml.vars.CONFIG_SHARE.link
	})
}


var $col = $('.selectBox .col')
var $testLayout = $('.testLayout')
var selectSize = $col.size()

function testSize(){
	var $curs = $col.find('.cur')

	if($curs.size() != selectSize)
		return false;

	return true
}


$col.on('tap', 'div', function(){
	$(this)
		.addClass('cur')
		.siblings().removeClass('cur')

	if(!testSize()) return;

	$testLayout.show()
})

$('.resultBtn').on('tap', function(){

	tracking.cr('wx/statistics_action', {
		'action':'dapeiCoupon'
		, 'value':0
	});

	if(!testSize()) return;

	var url = '/shake/'+fml.vars.shake.name+'/result?'	
	var answer = []

	var $curs = $col.find('.cur')
	$.each($curs, function(k,v){
		answer.push($(v).attr('itemid'))
	})

	location.href = url + 'name=' + params.name + '&answer='+answer.join(',')
})

