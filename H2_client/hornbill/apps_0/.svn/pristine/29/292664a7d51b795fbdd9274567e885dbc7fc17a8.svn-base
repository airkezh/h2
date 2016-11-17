/*common*/	
require('wap/zepto/fastclick')
var openApp = require('wap/app/openApp')


var params = location.search.substr(1).split('&')
	, nickname = ''
	, avatar = ''
	, countPrice = ''
for (var i=0; i < params.length; i++) {
	var pair = params[i]
		, index = pair.indexOf('=')
		, key = pair.substr(0,index)
		, val = decodeURIComponent(pair.substr(index+1));
	if (key == 'nickname'){
		nickname = val	
	} 
	if (key == 'avatar'){
		avatar = val
	}
	if (key == 'countPrice') {
		countPrice = val
	}
	if (key == 'nurtureid') {
		nurtureid = val
	}
};
$('.userPic').append('<img src="'+avatar+'"/>')
$('.nickname').text(nickname)
$('.countPrice').text('￥'+countPrice)

$('.openApp').on('click',function(){
	openApp('meilishuo://coupons.meilishuo')
})
