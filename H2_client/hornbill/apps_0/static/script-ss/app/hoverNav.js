fml.define('app/hoverNav' , ['jquery','component/windowScroll'] , function(require , exports){
	var scroll = require('component/windowScroll');
	return function(btn, nav){
		var btn = $(btn),
			list = $(nav),
			t = null;

		if(!$(nav)[0])
			return;

		var showList = function(){
			clearTimer();
			btn.addClass('hover')
			list.stop(true,true).show();
		//	list.css({left : btn.offset().left, top : btn.offset().top + btn.height(), width : btn.width() - 2});
			scroll.bind(setTimer, 'hideList');
		};
		var hideList = function(){
			btn.removeClass('hover')
			list.stop(true,true).hide();
			scroll.unBind('hideList');
		};
		var setTimer = function(){
			t = setTimeout(hideList, 200);
		};
		var clearTimer = function(){
			if(t){
				clearTimeout(t);
				t = null;
			}
		};

		btn.hover(showList, setTimer);
		list.hover(clearTimer, setTimer);
	}
});
