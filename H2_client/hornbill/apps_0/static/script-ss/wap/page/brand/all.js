/*common*/

var $ = require('wap/zepto')
	//, scroll = require('wap/component/windowScroll')
	, $sign = $('.sign')
	, $keys = $('.all-keys')
	, $keyswraper = $keys.find('ul')
	, currentKey, timer;

function bindEvent(){
	$keys.find('li').on('click', function(){
		document.getElementById($(this).data('sign')).scrollIntoView();
		$sign.html($(this).data('key')).show().addClass('puffOut');
		timer = setTimeout(function(){
			$sign.hide().removeClass('puffOut');
		}, 1000)

	})
	$keyswraper.on('touchstart',function(e){
		if(window.scrollY == 0){
			window.scrollTo(0,1);
		}
		//e.preventDefault();
		$(this).on('touchmove', bling).on('touchend', end).on('touchcencel', end);
	});
}

function bling(e){
	e.preventDefault();
	var ex = e.changedTouches[0].clientX,
	ey = e.changedTouches[0].clientY;
	var selected = document.elementFromPoint( ex , ey );
	if(selected != currentKey && $(selected).parents('.all-keys').length){
		if(!$(selected).attr('blinged')){
			$(selected).trigger('click');
			$(selected).siblings().removeAttr('blinged');
			$(selected).attr('blinged', true);
			currentKey = selected;
		}
	}
}
function end(e){
	//e.preventDefault();
	$keyswraper.off('touchmove').off('touchend').off('touchcencel');
	clearTimeout(timer);
}

function signPosition(){
	$sign.css('top',(( $(window).height() - $sign.height())/2) + 'px').hide();
	$keys.css({'top':(($(window).height() - $keys.height())/2) + 'px', 'opacity': '1'});
}

// function toggleKeys(y){
// 	scroll.yIn(y,function(){
// 		$keys.show();
// 	},
// 	function(){
// 		setTimeout(function(){
// 			$keys.hide();
// 		}, 300)
		
// 	})
// }
function init(){
	bindEvent();
	signPosition();
	//toggleKeys(150);
}

init();