fml.use(['jquery' , 'app/checkLogin'] , function(){
	var $ = this.jquery;
	var member_des = $('.toggle_btn');
	var content = $('.intro_main');
	$('.over').attr('disabled', true);
	member_des.toggle(function() {
		content.hide();
		$('.intro_icon').css('background', 'url("http://i.meilishuo.net/css/images/member/hide.png")').removeClass('show').addClass('hide')
	},
		function() {
		content.show();
		$('.intro_icon').css('background', 'url("http://i.meilishuo.net/css/images/member/show.png")').removeClass('hide').addClass('show')
	});
});

fml.use(['app/doota/tab', 'jquery'], function() {
	var $ = this.jquery;
	this.tab.bind({
		'tagPnl': '.tab_tle',
		'tabTag': '.tabArea',
		'activeTagClass': 'cur',
		'contents': '.contentArea'
	});
});

fml.define('page/member' , ['jquery','component/shareTmp','ui/dialog','app/checkLogin'] , function(require, exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp')
	,dialog = require('ui/dialog')
	,check = require('app/checkLogin');

	//get_btn 判断是否登录
	$('.get_btn').on('click',function(){
		if(!check()) return;
		else {
			var callback = function (r) {
				 window.location.reload();
			}
			$.get('/aj/get_exchange/get',{type:'pc'},callback,'json');
		}
	});

	//弹窗关闭
	function closeDialog () {
		$('.close_dailog').on('click',function(){
			$('#closeDialog').trigger('click');
		});
	}
	//弹窗
	var go = $('.go');
	go.on('click',function(){
		if(!check()) return;
		//判断是否登录
		// if(fml.vars.userInfo == 'undefined') {
		// 	var html = shareTmp("UserMember_exchange_login");
		// 		var close = new dialog({title : "积分兑换" , width : 405 , content : html });
		// 		closeDialog();
		// } else {
			var type = $(this).parents('ul.goods').attr('type');
			var tid = $(this).parents('li').attr('tid');
			var point = $(this).attr('point');
			var exchangeNum = $(this).attr('exchangeNum');
			var my_point = $('.user_point').text();
			
			$.get('/aj/point_exchange/point',{type: 'pc'},function(data){
				// 接口注释 free_point 1 已经领取积分，0 未领取积分
				var free_point = data.data.free_point;
				if (free_point == 1) {
					if (+point <= +my_point) {
						var html = shareTmp("UserMember_exchange_affirm",{'data':point});
						var close = new dialog({title : "积分兑换" , width : 405 , content : html });
						closeDialog();
						$('.affirm_btn').on('click',function(){
							$.get('/aj/member_exchange/add?id=member_exchange&cid=303&twitter_id='+tid+'&goods_type='+type, function(data) {
								//接口注释status 1换购成功，0换购失败 2 库存不足 3 商品兑换次数
								if (data.data.status == '1') {
									var html = shareTmp("UserMember_exchange_success", {'data':point});
									var close = new dialog({title : "积分兑换" , width : 405 , content : html });
									$('.user_point').text(data.data.point);
									closeDialog();
								} else if (data.data.status == '2') {
									var html = shareTmp("UserMember_exchange_outOfStock", {'data':point});
									var close = new dialog({title : "积分兑换" , width : 405 , content : html });
									closeDialog();
								} else if (data.data.status == '3') {
									var html = shareTmp("UserMember_exchange_num", {'data':exchangeNum});
									var close = new dialog({title : "积分兑换" , width : 405 , content : html });
									closeDialog();
								} else {
									var html = shareTmp("UserMember_exchange_defeated", {'data':exchangeNum});
									var close = new dialog({title : "积分兑换" , width : 405 , content : html });
									closeDialog();
								}
							},'json');
						});
					} else {
						var html = shareTmp("UserMember_exchange_filed", {'data':point});
						var close = new dialog({title : "积分兑换" , width : 405 , content : html });
						closeDialog();
					}
				} else {
					var html = shareTmp("UserMember_exchange_nochange",{'data':point});
					var close = new dialog({title : "积分兑换", width : 405, content : html });
					closeDialog();
				}
			},'json');	
		//}	
	});
	
});
