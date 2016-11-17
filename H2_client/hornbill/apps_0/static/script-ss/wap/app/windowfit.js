fml.define('wap/app/windowfit' , ['wap/jquery', 'wap/jquery.mobile'] , function(require , exports){
	var header = $('#header')
		, wrap = $('#wrap')
		, wrap_height

	var windowfit = function(opts){
		var userFreshFn = opts.freshFn
			, userAjaxFn = opts.ajaxFn

		var y = 0
			, startY = 0
			, flag = 'normal'
			, w_top = $('#w_top')
			, w_bottom = $('#w_bottom')
			, w_inner = $('#w_inner')
			, w_outer = w_inner.parent()
			, bottomLine 
		var w_top_height = w_top.height() || 0
			, w_bottom_height = w_bottom.height() || 0
			, topLine = - w_top_height

		var doFresh = function(userFreshFn){
			var done = function(){
				y = topLine;
				goLine();
				w_top.attr('ing', 0);
				resetBottom();
			};
			y = 0;
			goLine();
			w_top.attr({'todo':'0', 'ing':'1'});
			userFreshFn(done);
		};

		var doAjax = function(userAjaxFn){
			var done = function(){
				y = bottomLine;
			//	goLine();
				w_bottom.attr('ing', '0');
				resetBottom();
			};
			w_bottom.attr({'todo':'0', 'ing':'1'});
			userAjaxFn(done);
		};

		var goLine = function(dur){
			var dur = dur || '1'
			if(dur === '1')
				w_outer.addClass('dur')
			else if(dur === '0')
				w_outer.removeClass('dur')
			w_outer.css({'-webkit-transform' : 'translate(0px, ' + y + 'px)'});
		};
		var resetBottom = function(){
			bottomLine = wrap_height + topLine - w_outer.height() + w_bottom_height;
			if(w_top.attr('ing') === '0'){
				bottomLine += w_top_height;
			}
			if(w_bottom.attr('ing') === '1'){
				bottomLine -= w_bottom_height;
			}
		};

		var touchStart = function(event){
			event.preventDefault();
			if (!event.touches.length)
				return;
			var touch = event.touches[0];
			startY = touch.pageY - y;
			resetBottom();
		};

		var touchMove = function(event){
			event.preventDefault();
			if (!event.touches.length)
				return;
			var touch = event.touches[0];
			y = touch.pageY - startY;
			goLine('0');

			if(y <= topLine && y >= bottomLine){
				flag = 'normal';
			}

			if(y < bottomLine){
				flag = 'ajax';
				if(w_top.attr('ing') === '0' && w_bottom.attr('ing') === '0' && !! w_bottom[0]){
					w_bottom.attr('todo', (y < bottomLine - w_bottom_height) | 0);
				}else{
					w_bottom.attr('todo', '0');
				}
			}

			if(y > topLine){
				flag = 'fresh';
				if(w_top.attr('ing') === '0' && !!w_top[0]){
					w_top.attr('todo', (y > topLine + w_top_height) | 0);
				}else{
					w_top.attr('todo', '0');
				}
			}
			console.log(flag)
		};

		var touchEnd = function(event){
			if(flag === 'normal'){
				return;
			}
			if(flag === 'fresh'){
				y = topLine;
				if(w_top.attr('todo') === '1'){
					doFresh(userFreshFn);
				}
				goLine();
			}
			if(flag === 'ajax'){
				y = bottomLine
				if(w_bottom.attr('todo') === '1'){
					doAjax(userAjaxFn);
					y -= w_bottom_height
				}
				goLine();
			}
		};

		var resetWin = function(){
			wrap_height = $(window).height() - header.height();
			wrap.css({'height' : wrap_height});
			resetBottom();
		};
		var initWin = function(){
			resetWin();
			doFresh(userFreshFn);
			w_inner[0].addEventListener("touchstart", touchStart, false);
			w_inner[0].addEventListener("touchmove", touchMove, false);
			w_inner[0].addEventListener("touchend", touchEnd, false);
		};

		initWin();

/*
	//	window.addEventListener('orientationchange', resetWin, false); 	

		// 判断屏幕是否旋转
		function orientationChange(){ 
			alert(window.orientation)
		};
		window.onorientationchange = orientationChange;
		orientationChange()
*/

	};
	exports.windowfit = windowfit;
});
