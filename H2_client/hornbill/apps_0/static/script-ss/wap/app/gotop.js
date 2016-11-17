fml.define('wap/app/gotop' , ['wap/zepto', 'wap/zepto/touch', 'wap/zepto/scroll','wap/component/windowScroll'] , function(require,exports){
	var onscroll = require('wap/component/windowScroll')
		, $gotop = $('#go_top')

	$gotop.show().css({opacity:0});

	$gotop.on('touchstart touchend', function(event){
	    event.preventDefault();

	}).on("tap" , function(){
		$.scrollTo({
		    endY: 0,
		    duration: 200,
		    container: $('.scroller'),
		    callback: function() {
				if($.os.iphone && $.os.version.slice(0,1) <= 5){
					var $body = $('body');
					$body.css('width', $body.width() + 1);
					setTimeout(function(){$body.css('width','100%');},2);
				}
			}
		});
	});	

	var gotop = function(isscroll){
	 	function gotop(pos,isDown){
			if(pos < 30){
				$gotop.css({opacity:0});
			} else {
				$gotop.css({opacity:1});
			}
			//临时增加
			// if($('.name') && $('.name')[0] && pos > 80){
			// 	$('.name').removeClass('name_fixed')
			// } else {
			// 	$('.name').addClass('name_fixed')
			// }
		}

		// if(Meilishuo.config.os.ios && isscroll)
		// 	onscroll.bind(gotop,'gotop',$('.scroller')[0])
		// else
			onscroll.bind(gotop,'gotop')
	}
	exports.gotop = gotop;
});
