fml.define('page/huodong/March_apparel_sale_detail' , ['jquery' , 'component/windowScroll', 'app/checkLogin' , 'ui/alert' , 'component/shareTmp', 'app/doota/timedown'] , function(require , exports){
	$ = require('jquery');
	var scroll = require('component/windowScroll');
	var check = require('app/checkLogin');
	var alertUI = require('ui/alert');
	var shareTmp = require('component/shareTmp');
	window.timedown = require('app/doota/timedown');

	$('.coupon_time .btn_status').click(function(){
		if($(this).hasClass('can_get')){
			return ;
		}
		if($(this).hasClass('has_get')){
			new alertUI({
				content : '已经领过咯，明天再来吧',
				width : '370px'
			});
			return ;
		}
		if($('.no_timeStamp').length){
			new alertUI({
				content : '还未开始，暂时不能抢券',
				width : '370px'
			});
			return ;
		}
	});
	$('.can_get').live('click' , function(){
		if(!check()) return;
		var data = {
			type_coupon : $(this).attr('type_coupon'),
			type : 'pc',
			code : $(this).attr('code'),
			coupon : $(this).attr('coupon')
		};
		var url = '/aj/huodong/spring_carnival_add';
		$.post(url, data, function(res){
			if(res.code == 0){
				new alertUI({
					content : res.msg,
					title : '领取结果',
					width : '370px',
					onClose : function(){
						window.location.href = '/biz/March_sale/apparel_detail/';
					}
				});
			}
			$('.sure').on('click' , function(){
				window.location.href = '/biz/March_sale/apparel_detail/';
			});
		}, 'json');
	});

	timedown.down($('.timeStamp'), $('.timeStamp').attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
		if(t.h != undefined) $('#hour').html(t.h<10 ? '0'+t.h : t.h);
		if(t.i != undefined) $('#sec').html(t.i<10 ? '0'+t.i : t.i);
		$('#min').html(t.s<10 ? '0'+t.s : t.s);
	}).onTimeOver(function(){
		$('.coupon_time .btn_status').addClass('can_get');
	});
});

