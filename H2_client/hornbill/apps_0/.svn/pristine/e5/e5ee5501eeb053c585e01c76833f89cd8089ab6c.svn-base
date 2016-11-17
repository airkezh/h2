fml.use(['wap/zepto/touch', 'wap/client/component/clientUse', 'wap/ui/alert','wap/ui/confirm'] , function(){
	var confirm = this.confirm
		, Alert = this.alert
	//客户端登陆跳转
	if (Meilishuo.config.user_id == 0) {
		$('.get_btn').on('tap',function(event){
			event.preventDefault();
			window.location.href = 'meilishuo://login.meilishuo';
		});
	} 
	//get_btn 马上领取积分
	setTimeout(function (){
		$('.get_btn').on('tap',function(event){
			var callback = function (r) {
				 window.location.reload();
			}
			$.get('/aj/get_exchange/get',{type:'wap'},callback,'json');
		});
	},1000);
	//积分介绍
	var member_des = $('.intro');
	var content = $('.intro_list');
	member_des.on('tap', function(){ 
		content.toggle()
		$('.show_icon').toggle()
		$('.hide_icon').toggle()
	});
	//去兑换弹窗
	var go = $('.go');
	go.on('tap',function (event) {
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
								$.get('/aj/member_exchange/add?type=wap&id=member_exchange&cid=303&twitter_id='+tid+'&goods_type='+type+'&type=wap', function(data) {
									//接口注释status 1换购成功，0换购失败 2 库存不足 3 兑换次数
									var point_status = data.data.status;
									if(point_status == 1){
										// Alert方法
										var alt = new Alert({
											content : '兑换成功，商品会统一在下周三发货，发货地址为MM在美丽说上填写的默认地址，发货后会有私信通知，请注意查收！'
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

fml.define('wap/page/member/member' , ['wap/zepto/touch','component/shareTmp'] , function(require, exports){
	// 图片大小裁剪
	var img = $('.good_img')
	var img_w = img.width()
	//var img_h = img_w * (430/290)
	//img.height(img_h)

	// 查看更多积分详情
	var shareTmp = require('component/shareTmp');
	var data = {}
	data.type = 'wap'
	data.page = 1
	data.page_size = 10
	var tmpId = 'list_more'
	var url = '/aj/getExchangeList/list'
	var btn = $('.more')
	btn.on('tap', function() {
		//$(this).off('tap')
		var callback = function(response){
			data.page++

			if(response.infos.length == 0){
				btn.hide()
			}
			if(!response) return

			var info = {
				'item' : response.infos
				, 'class_type' : {
					'0' : 'add',
					'1' : 'minus'}
				, 'handle_type': { 
					'0' : '+',
					'1' : '-'}
			}

			var commentItem = shareTmp(tmpId, info)
			commentItem && $('.list_comm').append(commentItem)

		}
		$.get(url, data, callback, 'json')
	});
});
