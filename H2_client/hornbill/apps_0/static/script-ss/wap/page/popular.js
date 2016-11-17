/*common*/
require('wap/zepto/fastclick');
var checkLogin = require('circle/app/checkLogin');
var shareTmp = require('wap/component/shareTmp');
var dialog = require('wap/app/dialog');
var tracking = require('wap/app/tracking');

var cloth = $('.cloth_box').find('img');
var r = $('.cloth_box').attr('xr');



cloth.on('click' , function(){
	var select = $(this).attr('select');
	var isCorrect;
	if(select == "yes"){
		tracking.cr('page_element', {'_action': 'click', 'r': r + ':_button_name=selected:_result=true' });
		isCorrect = 1;
	}else{
		tracking.cr('page_element', {'_action': 'click', 'r': r + ':_button_name=selected:_result=false' });
		isCorrect = 0;
	}

	if(fml.vars.p == 'try'){
		window.location.href = window.__get_r( "/popular/answer/"+select , r);
	}else{
		if(Meilishuo.config.user_id == 0){
			var tpl = shareTmp('noLogin_pop');
			$.fn.dialog({ dialogContent : tpl , dialogWidth : '4.6rem' });
			$('.login').on('click' , function(){
				tracking.cr('page_element', {'_action': 'click', 'r': r + ':_button_name=login' });
				checkLogin();
			});
			$('.again').on('click' , function(){
				window.location.href = window.__get_r("/popular/question/try" , r);
			});
		}else{
			$.get('/popular/aj/red_black' , {'operate' : 'set' , 'isCorrect' : isCorrect } , function(res){
				if(res.error_code == 200){
					window.location.href = window.__get_r('/popular/answer/'+select , r);	
				}
			} , 'json');
		}
	}
});


