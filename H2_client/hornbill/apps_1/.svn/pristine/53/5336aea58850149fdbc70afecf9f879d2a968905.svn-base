fml.use('app/countdown', function(){
	this();
});
fml.use('app/welfare_apply' , function(){});
fml.use('app/replyBox', function(){});

fml.define('page/huodong/aupres_415' , ['jquery', 'app/checkLogin'] , function(require, exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	$('.start a').click(function(){
		$('.start').removeClass('start').addClass('next_1').remove('click');
		$('.next_1 a').click(function(){
			$('.next_1').hide().removeClass('next_1');
			$('.choose').show();
		});
	});
	$('.ans a').click(function(){
		$('.choose').hide();
		if($(this).html() == 'A'){
			$('.end_0').show();
		} else {
			$('.end_1').show();
		}
	});
	$('.end_1 a').click(function(){
		$('.end_1').hide();
		$('.choose').show();
	});
	$('.sign').click(function(){
		if(!check()) return;
		var data = {};
		var url = '/aj/huodong/oubolai_signin';
		$.post(url, data, function(r){
			if(r.data == 1){
				$('.sign').removeClass('sign').addClass('signed').remove('click');
			}
		}, 'json');
	});
	$('.choose_btn').click(function(){
		if(!check()) return;
		var data = {
			pid : 1057869527,
			actUrl : '/huodong/aupres/?frm=oupolai100',
			actTitle : '欧珀莱臻白多效拯救雾霾肌肤'
		};
		var url = '/aj/huodong/cus_create_twitter';
		$.post(url, data, function(){}, 'json');
	});
});
