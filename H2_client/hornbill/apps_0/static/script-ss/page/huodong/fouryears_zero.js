fml.define('page/huodong/fouryears_zero' , ['jquery' , 'app/checkLogin', 'ui/alert', 'ui/confirm', 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery'),
		check = require('app/checkLogin'),
		alertUI = require('ui/alert'),
		confirmUI = require('ui/confirm'),
		shareTmp = require('component/shareTmp');
	$('.bot .huangou').click(function(){
		if(!check()) return;
		var chooseGoods = new confirmUI({
			content: '确认换购这一件么？',
			width: 370,
			confirmTxt: '确认',
			cancelTxt: '再看看'
		});
		var self = this;
		chooseGoods.onSure(function(){
			var data = {
				'twitter_id': $(self).attr('data_twitter_id'),
				'type': 'pc',
				'user_id': Meilishuo.config.user_id
			};
			var url = '/aj/fouryears/change_goods';
			var callback = function(res){
				if(res.code == 0 && res.data.status == 1){
					var tmpData = {
						'addr' : res.data.address,
						'phone' : res.data.phone
					};
					var tpl = shareTmp('getGoodsAlert', tmpData);
					var addrAlert = new alertUI({
							content: tpl,
							width: 480
						});
					addrAlert.onSure(function(){
						addrAlert.drive.destroyModel();
						window.location.reload();
					});
					$('.close_z').click(function(){
						addrAlert.drive.destroyModel();
						window.location.reload();
					});
				} else {
					new alertUI({
						content: '系统繁忙请稍后再试',
						width: 370
					});
				}
			};
			// callback({code:1,data:{status:1,address:'中国',phone:25617341}});
			$.post(url, data, callback, 'json');
		});
	});
	$('.no_bot .huangou').click(function(){
		if(!check()) return;
		new alertUI({
			content: '你购买无忧购商品才能参加换购，付款后记得回来哦',
			width: 370
		});
	});
	$('.goods_img').click(function(){
		$(this).closest('.poster').find('.huangou').trigger('click');
	});
});
