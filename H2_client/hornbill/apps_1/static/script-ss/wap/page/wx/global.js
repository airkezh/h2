fml.define('wap/page/wx/global' , ['wap/zepto/touch', 'wap/app/gotop'] , function(require , exports){
	var gotop = require('wap/app/gotop')

	window.setTimeout(function(){
		gotop.gotop(true);
	},100);
});