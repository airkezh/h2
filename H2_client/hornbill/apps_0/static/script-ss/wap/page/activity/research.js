/*common*/

require('wap/zepto/fastclick');
require('wap/app/dialog');
var shareTmp = require('wap/component/shareTmp');

	$('#btn').on('click', function(){
		var tpl = shareTmp('userInfo');
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});


		$( '#closeIcon').on('click', function(){
			$('.closeDialog').trigger('tap');
   		});


		$('#submit').on('click',function(){
			var Name = $('#name').val();
			var Phone = $('#phone').val();
			var Age = $('#age').val();
			var Address = $('#address').val();
			var testMobile = /^1[3|4|5|8|7][0-9]\d{8}$/.test(Phone);
			
			var data = {
				'name' : Name,
				'mobile' : Phone,
				'address' : Address,
				'age' : Age,
				'activity' : 'music_festival_surv'
			}

			if(!data.name){
				$('#name').addClass('tips').attr('placeholder','请您输入姓名!').focus();
			}else if(!data.mobile){
				$('#phone').addClass('tips').attr('placeholder','请您输入电话!').focus(); 
			}else if(!testMobile){
				$('#phone').addClass('tips').val('').attr('placeholder','请您输入正确电话!').focus();
			}else if(!data.age){
				$('#age').addClass('tips').attr('placeholder','请您输入年龄!').focus();
			}else if(!data.address){
				$('#address').addClass('tips').attr('placeholder','请您输入地址!').focus();
			}

			if(data.name && data.mobile && data.address && data.age && testMobile) {
		    	$.post('/aj/music/userInfo', data, function() {
		    		window.location.href = '/activity/research/success/'
		    	},'json');
	   		} 

		});

	});

	

	
	


