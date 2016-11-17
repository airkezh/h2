fml.define('app/qzoneMessage' , ['jquery' , 'component/iStorage' , 'component/shareTmp' , 'app/adPoster'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');
	var adPoster = require('app/adPoster');
	var storage = require('component/iStorage');
	return function(){
		var url = '/aj/getQzoneMsg/';
		var data = {};
		var callback = function(response){
			var DATA = {
				tInfo : response	
			}
			var html = shareTmp('qqPageCard');	
			var htmlNor = $(shareTmp('qqPageCardNor' , DATA));
			var htmlMin = $(shareTmp('qqPageCardMin' , DATA));
			$('#goTop').append(html);
			var content = $('.card_con');
			content.append(htmlNor).append(htmlMin.hide());
			var systole = $('#systole'),
			enlarge = $('#enlarge'),
			qq_card = $('.qq_card'),
			closePageCared = $('#closePageCared'),
			card_con = $('.card_con');
			isRoll = false;
			systole.bind('click' , function(){
				qq_card.stop(true , true).animate({'height' : 40} , 400 , function(){
					htmlNor.hide();
					htmlMin.show();
					if (!isRoll) {
						adPoster.carousel('.floatCatrList',{'speed': 50, 'type':4});
						isRoll = true;
					}
				})	
			});
			enlarge.bind('click' , function(){
				htmlNor.show();
				htmlMin.hide();
				qq_card.stop(true , true).animate({'height' : 201} , 400);	
			});
			closePageCared.bind('click' , function(){
				storage.setSession('showQQPage' , '1');
				qq_card.remove();	
			})
			adPoster.carousel('.card_list',{'gap':5000, 'height':160, 'type':1});
			$('.qzoneFansFrame').html('<iframe scrolling="no" frameborder="0" style="width:65px;height:30px;border:none;overflow:hidden;" border="0" allowtransparency="true" src="http://open.qzone.qq.com/like?url=http%3A%2F%2Fuser.qzone.qq.com%2F1379986183&amp;type=button&amp;width=60&amp;height=30&amp;style=2"></iframe>');
		}
		$.get(url , data , callback , 'json')
	}
});
