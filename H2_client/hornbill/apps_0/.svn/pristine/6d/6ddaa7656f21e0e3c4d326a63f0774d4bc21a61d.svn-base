fml.define('page/license' , ['jquery','app/checkcode'] , function (require){

	var $ = require('jquery');
	var checkcode = require('app/checkcode');
	var shop_id = $('#shop_id').val();

	var initCode = function(){
		if($('.checkImage').find('img').attr('isblank') === 'true'){
			$('.checkImage').find('img').attr('isblank', 'false');
		}
		$('.checkImage').bind('click',changeCode);

		showCode();
	};
	var changeCode = function(){
		showCode();
		$('#checkcode').val('').focus();
	};
	var showCode = function(){
		checkcode(function(){
			$('.checkImage').unbind('click');
			var t = setTimeout(function(){
				$('.checkImage').bind('click',changeCode);
			}, 600);
		});
	};

	//验证码初始化
	initCode();


	$('#btn').on('click', function(){
		var data = $('#checkcode').val();
		$.get('/aj/shop/shop_validate',{'captcha':data}, function (r){
			var res = JSON.parse(r);
			if(res.code == 0){
				window.location.href = '/license/detail/?shop_id='+ shop_id ;
			}else{
				alert(res.message);
			}
		});
	})


});