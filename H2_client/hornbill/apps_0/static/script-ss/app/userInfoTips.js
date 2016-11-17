fml.define('app/userInfoTips' , ['jquery' , 'app/userFollow' , 'component/shareTmp' ,'component/tips'] , function(require , exports){
	var $ = require('jquery');
	var tips = require('component/tips');
	var shareTmp = require('component/shareTmp');
	var userFollow = require('app/userFollow');
	var objId = {};
	return function(target , obj){
		tips(target , obj , '.pop_loading' , function(obj , t){
			var user_id = obj.attr('user_id');
			var url = '/aj/getUser/';
			var data = {'user_id' : user_id , 'ajax' : 1};
			var callback = function(response){
				var tpl = shareTmp('facePop' , response);
				$('.pop_loading').html(tpl);
				obj.data({'userInfo' : response});
				objId[response.user_id] = response;
				$('.corner').hide();
				$('.corner'+t).show();
			}
			if(user_id != Meilishuo.config.user_id){
				if(!objId[user_id]){
					//data.rand = (new Date)-0;
					$.get(url , data , callback , 'json');
				}else{
					var tpl = shareTmp('facePop' , objId[user_id]);
					$('.pop_loading').html(tpl);
					$('.corner').hide();
					$('.corner'+t).show();
				}
			}
		});	
		userFollow('.addFollow' , '.removeFollow' , '.removeFollow' , 'btn' , 'followed' , function(){
			delete objId[$(this).attr('fuid')];
		});
	}
});
