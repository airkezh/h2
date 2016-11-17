fml.define('page/huodong/coupon_sale' , ['jquery' , 'app/doota/timedown', 'app/checkLogin', 'ui/alert', 'component/shareTmp'] , function(require, exports){
	var alertUI = require('ui/alert');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var timedown = require('app/doota/timedown');

	timedown.down($('.timeStamp'), $('.timeStamp').attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
		if(t.h != undefined) $('#hour').html(t.h<10 ? '0'+t.h : t.h);
		if(t.i != undefined) $('#sec').html(t.i<10 ? '0'+t.i : t.i);
		if(t.s != undefined) $('#min').html(t.s<10 ? '0'+t.s : t.s);
	}).onTimeOver(function(){
		$('#min').html('00');
		if(!$('.coupon_time .btn_status').hasClass('has_get')){
			$('.coupon_time .btn_status').removeClass('no_start').addClass('can_get');
		}
	});

	var alertMsg = function(text){
		new alertUI({
			content : text,
			width : '370px'
		});
	}

	$('.coupon_now .has_get').click(function(){
		alertMsg('已经领过咯');
	});

	$('.coupon_now .zero').click(function(){
		alertMsg('已经领光了，明天再来吧');
	});

	$('.coupon_time .btn_status').click(function(){
		if($(this).hasClass('can_get')){
			return ;
		}
		if($(this).hasClass('has_get')){
			return alertMsg('已经领过咯');
		}
		if($('.no_timeStamp').length){
			return alertMsg('还未开始，暂时不能抢券');;
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
						window.location.href = '/biz/sale/mz420/';
					}
				});
			}
			$('.sure').on('click' , function(){
				window.location.href = '/biz/sale/mz420/';
			});
		}, 'json');
	});
});


