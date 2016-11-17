fml.define('component/tips' , ['jquery' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');
	var cleartime = null;
	return function(parentObj , obj , tipDiv ,callback){
		$(document).on('mouseenter' , obj , function(e){
			if (!obj) return;
			window.clearTimeout(cleartime);
			$(tipDiv).remove();
			var tplDemo = shareTmp(tipDiv.replace('.' , '').replace('#' , ''));
			$('body').append(tplDemo);
			var left = $(this).offset().left;
			var top = $(this).offset().top;
			left = left < 0 ? 0 : left;

			$(tipDiv).addClass('pa_f');
			var tipWidth = $(tipDiv).width();
			var objWidth = $(this).width();
			var winWidth = $(window).width();
			if((e.clientY + $(this).height()) > $(window).height() - e.clientY){
				top -= ($(tipDiv).height() + 8);
				if(e.clientX + tipWidth > winWidth){
					callback($(this) , '_br')
					left = left - tipWidth + objWidth;
				}else{
					callback($(this) , '_b');
				}
			}else{
				top += $(this).height() + 8;
				if(e.clientX + tipWidth > winWidth){
					callback($(this) , '_tr');
					left = left - tipWidth + objWidth;
				}else{
					callback($(this) , '_t');
				}		
			}
			$(tipDiv).css({'top' : top , 'left' : left}).show();
			
		});	
		$(document).on('mouseenter' , tipDiv , function(event){	
			window.clearTimeout(cleartime);
		}).on('mouseleave' , tipDiv , function(){
			$(this).remove();	
		});
		$(document).on('mouseleave' , obj , function(event){	
			cleartime = window.setTimeout(function(){
				$(tipDiv).remove();	
			},200)
		});
	}
	exports.tips = tips;
});
