fml.use(['wap/jquery','wap/iscroll'] , function(){
	var myScroll,
		pullDownEl, pullDownLabel, pullDownOffset,
		pullUpEl, pullUpLabel, pullUpOffset,
		generatedCount = 0;
	var wrapper;

	function pullDownAction () {
		setTimeout(function () {
			var el, li, i;
			el = $('#thelist');
			for (i=0; i<3; i++) {
				li = $('<figure><img src="http://img01.taobaocdn.com/bao/uploaded/i1/T1uv6dXiJrXXan_T.9_075031.jpg"></figure>');
				el.prepend(li);
			}
			myScroll.refresh();
			console.log('pullDownAction')
		}, 1000);
	}

	function pullUpAction () {
		setTimeout(function () {
			var el, li, i;
			el = $('#thelist');
			for (i=0; i<3; i++) {
				li = $('<figure><img src="http://img01.taobaocdn.com/bao/uploaded/i1/T1uv6dXiJrXXan_T.9_075031.jpg"></figure>');
				el.append(li);
			}
			myScroll.refresh();
			console.log('pullUpAction')
		}, 1000);
	}

	function loaded() {
		wrapper = $('#wrapper')
		pullDownEl = $('#pullDown');
		pullDownLabel = pullDownEl.children('.pullDownLabel');
		pullDownOffset = pullDownEl[0].offsetHeight;
		pullUpEl = $('#pullUp');	
		pullUpLabel = pullUpEl.children('.pullUpLabel');
		pullUpOffset = pullUpEl[0].offsetHeight;

		myScroll = new iScroll('wrapper', {
			useTransition: true,
			topOffset: pullDownOffset,
			onRefresh: function () {
				if (pullDownEl.attr('class') === 'loading') {
					pullDownEl.attr('class', '');
					pullDownLabel.html('Pull down to refresh...');
				} else if (pullUpEl.attr('class') === 'loading') {
					pullUpEl.attr('class', '');
					pullUpLabel.html('Pull up to load more...');
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !(pullDownEl.attr('class') === 'flip')) {
					pullDownEl.attr('class', 'flip');
					pullDownLabel.html('Release to refresh...');
					this.minScrollY = 0;
				} else if (this.y < 5 && (pullDownEl.attr('class') === 'flip')) {
					pullDownEl.attr('class', '');
					pullDownLabel.html('Pull down to refresh...');
					this.minScrollY = -pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !(pullUpEl.attr('class') === 'flip')) {
					pullUpEl.attr('class', 'flip');
					pullUpLabel.html('Release to refresh...');
		//			this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && (pullUpEl.attr('class') === 'flip')) {
					pullUpEl.attr('class', '');
					pullUpLabel.html('Pull up to load more...');
		//			this.maxScrollY = pullUpOffset;
				}
			},
			onScrollEnd: function () {
				if (pullDownEl.attr('class') === 'flip') {
					pullDownEl.attr('class', 'loading');
					pullDownLabel.html('Loading...');		
					pullDownAction();	// Execute custom function (ajax call?)
				} else if (pullUpEl.attr('class') === 'flip') {
					pullUpEl.attr('class', 'loading');
					pullUpLabel.html('Loading...');				
					pullUpAction();	// Execute custom function (ajax call?)
				}
			}
		});
		
		setTimeout(function () { wrapper.css({'left': '0'}); }, 800);
	}

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
	loaded();

});

fml.define('wap/page/test/iscroll',[] ,function(){});
