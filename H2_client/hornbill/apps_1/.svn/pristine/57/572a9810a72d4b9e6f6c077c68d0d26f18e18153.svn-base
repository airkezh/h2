fml.define('app/shopInfoTips' , ['jquery' , 'app/followShop' , 'component/shareTmp' ,'component/tips'] , function(require , exports){
	var $ = require('jquery');
	var tips = require('component/tips');
	var shareTmp = require('component/shareTmp');
	var followShop = require('app/followShop');
	var objId = {};
	return function(target , obj){
		tips(target , obj , '.shop_pop_loading' , function(obj , t){
			var shop_id = obj.attr('user_id');
			var url = '/aj/getShop/';
			var data = {'shop_id' : shop_id };
			var callback = function(response){
				var tpl = shareTmp('shopFacePop' , response);
				$('.shop_pop_loading').html(tpl);
				// obj.data({'userInfo' : response});
				objId[response.shop_id] = response;
				$('.corner').hide();
				$('.corner'+t).show();
			}
			if(!objId[shop_id]){
				//data.rand = (new Date)-0;
				$.get(url , data , callback , 'json');
			}else{
				var tpl = shareTmp('shopFacePop' , objId[shop_id]);
				$('.shop_pop_loading').html(tpl);
				$('.corner').hide();
				$('.corner'+t).show();
			}
		});	
		followShop({
		    el: 'body',
		    $numEl: $('.js-fans'),

		    followClass: 'shop_pop_followed',
		    unfollowClass: 'shop_pop_btn',

		    follow: '+加关注',

		    events: {
		    	'afterFollow' : function(){
		    		delete objId[$(this).data('shop')];
		    	},
		    	'afterUnfollow' : function(){
		    		delete objId[$(this).data('shop')];
		    	}
		    }
		});
	}
});
