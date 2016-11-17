fml.define('app/setting' , ['jquery','app/cleanMsg' , 'component/windowResize'] , function(require , exports){
	var resize = require('component/windowResize');
	var $ = require('jquery');
	var msgTipBox = require('app/cleanMsg').msgTipbox;
	var msgTip_delayer;
	
	function bindTip(btn , tipPnl, dynamicOff){
		if (!btn.length || !tipPnl.length) return;
		var tipOff = {
					'left' : (dynamicOff? 0: btn.offset().left) + btn.width() - tipPnl.width() - 4,
					'top' : (dynamicOff? 0: btn.offset().top) + btn.height() 	
						}
		var delay_timer;
		btn.hover(function(){
			var pos = {
				'left' : tipOff.left , 
				'top' : tipOff.top  
			}
			if (dynamicOff) {
				var off = btn.offset();
				pos.left += off.left;
				pos.top += off.top;
				}
			tipPnl.css(pos).show();
			msgTip_delayer &&	clearTimeout(msgTip_delayer);
			msgTipBox(false);

		},function(){
			 delay_timer = setTimeout(function(){
				tipPnl.hide();
			} ,10);
			 msgTip_delayer = setTimeout(function(){
				msgTipBox(true);
			 } ,10);
		}); 
		tipPnl.mouseenter(function(){
			msgTipBox(false);
			delay_timer &&	clearTimeout(delay_timer);
			msgTip_delayer &&	clearTimeout(msgTip_delayer);
		}).mouseleave(function () { 
			tipPnl.hide();
			msgTipBox(true);
		});
			
		return tipOff;
		}
	
	function init(){
		/*
		bindTip($('#setting') , $('#moreConnectBox') , true);
		var off = bindTip( $('#message') ,$('#moreMessageBox'));
		if (off){
			$('#messageTipBox').css({
				'left' : off.left ,
				'top' : 0
				});
			}
		*/
		if ($.browser.msie && $.browser.version == '6.0') {
			var h_update = $('.h_update');
			if (h_update.length > 0 && h_update.css('display') != 'none') {
				h_update.css({'top':$(window).scrollTop() + 260 + 'px'});
			}
		} 
	}
		
	if (Meilishuo.config.user_id != 0) { 
		resize.bind(init);
		window.setTimeout(init , 300);
		}	
	exports.init = function(){
		window.setTimeout(init , 300);
	}
});
