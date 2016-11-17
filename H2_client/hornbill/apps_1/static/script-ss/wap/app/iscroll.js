fml.define('wap/app/iscroll' , [/*'wap/jquery',*/ 'wap/iscroll'] ,function(require , exports){
	var simple = function(wrap){
		var scroll = new iScroll(wrap, { checkDOMChanges: true });
		return scroll;
	};
	var pull2refresh = function(wrap, pullDownAction, pullUpAction, moveFn){
		var wrapper = $('#' + wrap)
			, pullDownEl = wrapper.find('.pullDown')
			, pullDownOffset = pullDownEl[0].offsetHeight
			, pullUpEl = wrapper.find('.pullUp')
			, pullUpOffset = pullUpEl[0].offsetHeight
		
		var scroll = new iScroll(wrap, {
			useTransition: true,
			topOffset: pullDownOffset,
			onRefresh: function () {
				if (pullDownEl.attr('status') === 'loading') {
					pullDownEl.attr('status', 'normal');
				} else if (pullUpEl.attr('status') === 'loading') {
					pullUpEl.attr('status', 'normal');
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && (pullDownEl.attr('status') === 'normal')) {
					pullDownEl.attr('status', 'flip');
					this.minScrollY = 0;
				} else if (this.y < 5 && (pullDownEl.attr('status') === 'flip')) {
					pullDownEl.attr('status', 'normal');
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && (pullUpEl.attr('status') === 'normal')) {
					pullUpEl.attr('status', 'flip');
				} else if (this.y > (this.maxScrollY + 5) && (pullUpEl.attr('status') === 'flip')) {
					pullUpEl.attr('status', 'normal');
				}
				typeof moveFn == 'function' && moveFn(scroll);
			},
			onScrollEnd: function () {
				if (pullDownEl.attr('status') === 'flip') {
					pullDownEl.attr('status', 'loading');
					pullDownAction(scroll);	// Execute custom function (ajax call?)
				} else if (pullUpEl.attr('status') === 'flip') {
					pullUpEl.attr('status', 'loading');
					pullUpAction(scroll);	// Execute custom function (ajax call?)
				}
			}
		});
		
		setTimeout(function () { wrapper.css({'left': '0'}); }, 800);
		return scroll;
	}

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	exports.simple = simple;
	exports.pull2refresh = pull2refresh;
});
