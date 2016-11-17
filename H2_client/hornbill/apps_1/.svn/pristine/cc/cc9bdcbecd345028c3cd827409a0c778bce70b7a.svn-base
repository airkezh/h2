fml.define('page/huodong/exo_wap',['wap/client/component/clientUse','wap/app/dialog','wap/ui/alert','wap/ui/confirm','wap/zepto'] ,function(require){
	var shareText = '我在美丽说上给EXO-M加油，得到了粉丝专属25元优惠券，你们也来一起加油吧！';
	var sharePic = 'http://i.meilishuo.net/css/images/huodong/exo/share.jpg';
	var confirm = require('wap/ui/confirm');
	var Alert = require('wap/ui/alert');
	var login = require('wap/client/component/clientUse');
	function formatNum(spans,num){
		num = num.toString().split('');
		for(var i=spans.length-1; i>=0; i--){
			var t = num[num.length-1]||'0';
			if($(spans[i]).text() != t) $(spans[i]).text(t);
			num.pop();
		}
	}
	var num = $('#follow_num').length ? $('#fnum').text() : $('.join label').text();
	$('#fnum').remove();
	$('.join label').remove();
	$('#follow_num').length && formatNum($('#follow_num span'),num);
	$('.join').length && formatNum($('.join span'),num);
	function getLatestFight(){
		$.ajax({
			url:'/aj/huodong/fight?act=get',
			dataType:'json',
			type:'get',
			success: function(data){
				formatNum($('#follow_num span'),data.fight_count);
				setTimeout(getLatestFight,2000);
			},
			error: function(){
				setTimeout(getLatestFight,2000);
			}
		})
	}
	function getLatestJoin(){
		$.ajax({
			url:'/aj/huodong/join?act=get',
			dataType:'json',
			type:'get',
			success: function(data){
				formatNum($('.join span'),data.join_num);
				setTimeout(getLatestJoin,2000);
			},
			error: function(){
				setTimeout(getLatestJoin,2000);
			}
		});
	}
	$('#closePopup').on('tap',function(e){
		e.preventDefault();
		$('.popup,.masker').hide();
	});
	$('#closePopup').on('touchstart touchend tap',function(e){
		e.preventDefault();
	});
	$('#fight').on('tap',function(e){
		e.preventDefault();
		login.callClient.toLogin();
		var self = $(this);
		$.ajax({
			url:'/aj/huodong/fight?act=set',
			type:'post',
			dataType:'json',
			success: function(data){
				$('.popup,.masker').show();
				$('.popup').css({
					top:$('html body').scrollTop() + 20 + 'px'
				});
				self.parent().children('img').toggle();
			},
			error: function(){
				alert('系统错误，请稍后重试');
			}
		});
		return false;
	});
	$('#join').on('tap',function(){
		login.callClient.toLogin();
		$.ajax({
			url:'/aj/huodong/join?act=set',
			type:'post',
			dataType:'json',
			success: function(data){
				location.reload();
			},
			error: function(){
				alert('系统错误，请稍后重试');
			}
		});
	});
	$('.toggle,.shrinked').on('tap',function(){
		$('.shrinked,.extended').toggle();
	});
	var go = $('.go');
	go.on('tap',function (event) {
		login.callClient.toLogin();
		event.preventDefault;
		var $that = $(this);
		if (Meilishuo.config.user_id == 0 ) {
			window.location.href = "meilishuo://login.meilishuo";
		} else {
			var type = $that.parents('ul.goods_list').attr('type');
			var tid = $that.parents('li').attr('twitter_id');
			var point = $that.attr('point');
			var exchangeNum =$that.attr('exchangeNum');
			var my_point = $('.user_point').text();
			$.get('/aj/point_exchange/point',{type: 'wap'},function(data){
				// 接口注释 free_point 1 已经领取积分，0 未领取积分
				var free_point = data.data.free_point;
				if (free_point == 1) {
					if (+point <= +my_point) {  
						//confirm 方法
						var c = new confirm({
							content : '该商品需花费'+point+'积分，确认进行兑换？'
							, onSure : function(){
								$.get('/aj/member_exchange/add?type=wap&id=exo_mob_planet&cid=637&twitter_id='+tid+'&goods_type='+type+'&type=wap', function(data) {
									//接口注释status 1换购成功，0换购失败 2 库存不足 3 兑换次数
									var point_status = data.data.status;
									if(point_status == 1){
										// Alert方法
										var alt = new Alert({
											content : '兑换成功，商品会统一在下周三发货，请 MM 注意查收私信消息！'
											, onSure : function () {
												return;
											}
										});
										$('.user_point').text(data.data.point);
									} else if(point_status == 2){
										var alt = new Alert ({
											content : '该商品已被全部兑完，快去看看其他的商品吧！'
											, onSure : function () {
												return;
											}
										});
									} else if (point_status == 3){
										var alt = new Alert ({
											content : '该商品只能兑换'+exchangeNum+'次，去看看其他的商品吧！'
											, onSure : function () {
												return;
											}
										});
									} else if(point_status == 0) {
										var alt = new Alert ({
											content : '兑换失败,请再试一遍！'
											, onSure : function () {
												return;
											}
										});
									}
								},'json');
							}
							, onCancel : function(){
								return;
							}
						});
					} else {
						var alt = new Alert({
							content : '积分不足，快去购物获取更多积分吧！'
							, onSure : function () {
								return;
							}
						});
					}
				} else if(free_point == 0){
					var alt = new Alert ({
						content : '请先领取积分！'
						, onSure : function () {
							return;
						}
					});
				}
			},'json');
		}
	});

});
