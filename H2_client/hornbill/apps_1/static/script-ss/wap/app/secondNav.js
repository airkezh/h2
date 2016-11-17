fml.define('wap/app/secondNav', ['wap/component/windowScroll','wap/jquery'] , function(require , exports){
    var scroll = require('wap/component/windowScroll');
	return function(options){
		var defaults = {
			'nav' : '.ptyNav'
			, 'marginObj' : '.ptyMargin'
			, 'classname' : 'fixed'
		}
		var opts = $.extend({}, defaults, options);
		var pty = $(opts.nav)
			, marginObj = $(opts.marginObj)

		var lt100 = function(){
			pty.removeClass(opts.classname)
			marginObj.css({'padding-bottom': 0});
		}
		var gt100 = function(pos){
			pty.addClass(opts.classname)
			marginObj.css({'padding-bottom': pty.height()});
		}

		scroll.yIn(function(){ return marginObj.offset().top;} , gt100, lt100);
	}
});
