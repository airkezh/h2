fml.define('app/secondNav', ['component/windowScroll','jquery' , 'component/position'] , function(require , exports){
    var $ = require('jquery');    
    var scroll = require('component/windowScroll');
	var position = require('component/position');
	return function(options){
		var is6 = $.browser.msie && $.browser.version=='6.0';
		//pretty nav
		var defaults = {
			'nav' : '.ptyNav'
			, 'marginObj' : '.ptyMargin'
			, 'auto' : true
		}
		var opts = $.extend({}, defaults, options);
		var nag = $('#navbar')
			, pty = $(opts.nav)
			, marginObj = $(opts.marginObj)
			, corner = pty.parents('.corner_nav')
			, nagheight = nag.height()
			, ptyheight = pty.height()
			, hacktop = 0
			, fluidwidth

		if(opts.nav == '.catalog_float') //-- hack
			hacktop = corner.offset().top

		var lttest = function(){
			if(opts.classname)
				pty.removeClass(opts.classname)
			if(opts.auto)
				marginObj.css({'padding-bottom': 0});
			if(opts.ltfn)
				opts.ltfn()
		}
		var gttest = function(){
			if(opts.classname)
				pty.addClass(opts.classname)
			if(opts.auto)
				marginObj.css({'padding-bottom': ptyheight});
			if(opts.gtfn)
				opts.gtfn()
		}
		
		var lt100 = is6? function(){
			if(corner[0])
				corner.css('position','absolute')
			scroll.unBind('secondNav');
			pty.css({'position':'relative','top':0, 'width':'100%', 'margin-left':0, 'left':0, 'z-index':0})
			lttest()
		}:function(){
			pty.css({'position':'relative','top':0})
			pty.find('.fitwidth').css({'width':'auto'})
			lttest()
		};
		var gt100 = is6? function(pos){
			if(corner[0])
				corner.css('position','static')
			pty.css({'position':'absolute', 'top':pos + nagheight - hacktop + 'px','z-index':98});
			scroll.bind(function(pos){
				pty.css({'top':pos + nagheight - hacktop + 'px'});
			},'secondNav');

			fluidwidth = $('.goods_wall').width() 
			pty.css({'width': fluidwidth,'margin-left':- fluidwidth / 2, 'left':'50%'})
			gttest()
		}:function(){
			fluidwidth = $('.goods_wall').width() 
			pty.css({'position':'fixed', 'top' : nagheight, 'left':0, 'width':'100%'});
			pty.find('.fitwidth').css({'width':fluidwidth})
			gttest()
		};
		var ptyMt = pty.offset();
		if (ptyMt) scroll.yIn( ptyMt.top - nagheight , gt100, lt100);
	}
});
