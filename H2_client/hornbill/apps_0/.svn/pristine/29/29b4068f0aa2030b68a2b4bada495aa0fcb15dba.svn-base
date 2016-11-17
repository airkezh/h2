fml.define('sum/xmas' , ['jquery', 'app/tracking'] , function(require , exports){
	var $ = require('jquery');
	var logTrack = require('app/tracking');
	var pullObj = $('#chrLa'), 
		txtObj = $('#chrLaTxt'),
		box = $('#chrBox'),
		backObj = $('#chrLaBack');
	var winTop = 30;
	var bling = function(obj){
		$(obj).stop().animate({'top' : '30px'}, 100, function(){
			$(obj).animate({'top' : '10px'}, 100, function(){
				$(obj).animate({'top' : '16px'}, 100, function(){
					$(obj).animate({'top' : '10px'}, 100, function(){
						$(obj).animate({'top' : '14px'}, 100);	
					});
				});
			}); 
		});	
	};
	var showFrame = function(obj){
		var isIe = $.browser.msie;
		var width = $(window).width(),
			height = $(window).height() - winTop;
		var framed = $(obj).attr('framed');
		var url = '', frame = '';
		if(framed == 0){
			url = '/huodong/christmas/';
			frame = $('<iframe frameborder="0" style="width:100%;height:100%;border:none;" border="0" src="' + url + '"></iframe>');
			$(obj).append(frame).attr('framed',1);
			logTrack.cr('enterxmas');
		}
		$(obj).show().animate({'height' : height}, 1000, function(){
			backObj.fadeIn(300);
		});
//		$(document.body).css('overflow' , 'hidden');
//		if(isIe){$("html").css("overflow","visible")};
	};
	var hideFrame = function(obj){
		backObj.fadeOut(300);
		$(obj).animate({'height' : 0}, 1000, function(){
			$(this).hide();
		});
	};
	return function(){
		var t = setTimeout(function(){
			$(window).scroll(function(){
				if($(window).scrollTop() > 60){
					txtObj.hide();
				}else{
					txtObj.show();
				}
			});
			pullObj.hover(function(){
				bling(this);
				txtObj.show().children('span').css({'background-position':'-100px -196px'});
			},function(){
				$(this).stop().css({'top' : '14px'});
				txtObj.children('span').css({'background-position':'-100px -160px'});
			}).bind('click', function(){
				showFrame(box);
				return false;
			}).parents('.chrBox').fadeIn(300, function(){
				bling(pullObj);
			});
			backObj.bind('click', function(){
				hideFrame(box);
			});
		},800);
	};
});
