fml.define('lm/page/withdraw',['jquery'],function(require){
	function startCountDown(){
		clearInterval(timer);
		$('#get_code').text('剩余60秒可以再次获取');
		timer = setInterval(function(){
			var left = Number($('#get_code').text().replace(/[^\d]/g,''));
			left--;
			$('#get_code').text('剩余'+left+'秒可以再次获取');
			if(left == 0){
				stopCountDown();
			}
		},1000);
	}
	function stopCountDown(){
		clearInterval(timer);
		$('#get_code').removeClass('gray').text('获取验证码');
	}
	var $ = require('jquery'),timer = null;
	$('#get_code').click(function(){
		var self = $(this);
		if (self.hasClass('gray')) return;
		self.addClass('gray');

		$.ajax({
			url:'/aj/finace/get_checkcode',
			type:'get',
			dataType:'json',
			success:function(data){
				if (data.code != 0) {
					self.removeClass('gray');
					alert(data.msg);
				}else{
					startCountDown();
				};
			},
			error: function(){
				alert('系统错误');
			}
		});
	});
	$('#mobile').click(function(){
		$(this).parent().empty().append('绑定成功后请刷新本页面');
	})
	$('#withdraw').click(function(){
		var cashable = Number($('#cashable').text());
		var amount = Number($('#amount').val());
		if (isNaN(amount)) {
			return alert('金额格式错误');
		};
		if (amount > cashable) {
			return alert('您的可提现余额不足');
		};
		if (amount < 0.01) {
			return alert('提现金额必须大于0.01元');
		};
		if (!$.trim($('#checkcode').val())) {
			return alert('请输入短信校验码');
		};
		$.ajax({
			url:'/aj/finace/withdraw',
			data:{
				amount:amount,
				captcha:$('#checkcode').val()
			},
			dataType:'json',
			type:'post',
			success: function(data){
				if (data.code == 0) {
					alert('提现成功');
					location.href = location.href;
				}else{
					return alert(data.msg);
				}
			},
			error: function(){
				return alert('系统错误');
			}
		});
	});

});
