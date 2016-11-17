/*common*/
require('wap/zepto')
var storage = require('component/iStorage')

var init = function(){
	if(Meilishuo.config.goAppWelcome && !storage.getCookie("appwel_skip")){
		setTimeout(function(){ window.location.href = '/appWelcome' },100)
	}
}

exports.init = init;