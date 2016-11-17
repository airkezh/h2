fml.define('wap/page/sq/global' , ['wap/app/gotop', 'wap/page/sq/share'], function(require , exports){
	var gotop = require('wap/app/gotop')

	window.setTimeout(function(){
		gotop.gotop(true);
	},100);
});
