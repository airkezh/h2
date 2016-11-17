/*common*/
require('m/zepto/touch')

var signWX = require('wx/sign')
var shareWX = require('wx/share')

var $nextBtn = $('.nextBtn')
	, $shareBtn = $('.shareBtn')
	, $shareMask = $('.mask')

signWX()
alert(111)

fml.vars.shareData = {
	'desc':fml.vars.CONFIG_SHARE.desc,
	'imgUrl':fml.vars.CONFIG_SHARE.imgUrl,
	'title':fml.vars.CONFIG_SHARE.title,
	'success':hideMask
}

shareWX.bind(fml.vars.shareData)


var opts = {outer:'.wrap', page:'.page', scale:fml.vars.CONFIG_SHARE.scale, scaledev:fml.vars.CONFIG_SHARE.scaledev, auto:fml.vars.CONFIG_SHARE.auto}
var slipPage = require('h5/app/slipPage')
slipPage = slipPage.init(opts);
window.slipPage = slipPage

var action = require('h5/app/action')
action = action.init(slipPage)

var music = $('audio')[0]
music && music.play()

$nextBtn.on('tap', function(){
	slipPage.goNext()	
})

$shareBtn.on('tap', function(){
	$shareMask.show();
//	$shareBtn.hide()
})

$shareMask.on('tap', hideMask)

function hideMask(){
	$shareMask.hide()
//	$shareBtn.show()
}

fml.emit('h5_load')

