fml.define('app/binding' , ['jquery', 'component/validate' , 'component/focus', 'component/passFocus', 'component/urlHandle','component/dialog','component/shareTmp', 'app/checkcode'] , function(require , exports){
	var $ = require('jquery');	
	var input = require('component/focus');
	var password = require('component/passFocus');
	var urlHandle = require('component/urlHandle');
	var validate = require('component/validate');
	var shareTmp = require('component/shareTmp');
	var dialog = require('component/dialog');
	var checkcode = require('app/checkcode');
	var query = urlHandle.getParams(window.location.href.toString());

	var formName = 'bindingForm'
	   ,form = $('#' + formName)
	   ,mobile = form.find('[name=mobile]')
	   ,code = form.find('[name=code]')
	   ,time = 59;

	var setDefault = function(){
		$('.send_code').live('click', sendCode);		
	}

	var timeDown = function(times, cbk){
		window.setTimeout(function(){
			if(!times){
				return;
			}
			else {
				times--;
				cbk(times);
				timedown(times, cbk);
			}
		},1000);
	}

	var sendCode = function(){
		if(!false) {
			//手机号为空不正确
			return;
		}

		$(this).hide();
		$(this).parent().append('<span class="red_f time_down">验证码已发送，<b>'+ time +'</b>秒后可重新发送</span>');
		var $time = $(".time_down b");

		timeDown(time ,function(times){
	   		if(!times){
	   			$('.send_code').show();
				$('.time_down').hide();
			}
			else {
				$time.html(times);
			}
		});

		// $.post('/aj/doota/address_default', {'addr_id' : addr_id}, function(res){
		// 	if(res.code == '0'){
		// 		window.location.reload();
		// 	}else{
		// 		new alert({
		// 			content: res.msg, 
		// 			width: 370
		// 		});		
		// 	}
		// }, 'json')
	}

	var formFn = function(){
		
		//表单提交
		var submitBinding = function(){
			var data = {
				mobile : mobile.val()
			   ,code : code.val()
			}
			alert("submit");
			// $.post('/aj/doota/address_add', data, function(res){
			// 	if(res.code == '0'){
			// 		cb(res.detail);
			// 	}else{
			// 		new alert({
			// 			content: res.msg, 
			// 			width: 370
			// 		});		
			// 	}
			// } ,'json');
		};		
		//表单操作
		var validateRules = {
			'mobile' : { 'req=手机号' : '你还没有填写手机号哦。', 'mobile' : '手机号格式不正确。'}
		   ,'code' : { 'req=验证码' : '你还没有填写验证码哦。', 'postcode' : '验证码格式不正确。'}
		},
		showStyle = {
			'showmsgbyline=registerErrorMessage' : ''
		   ,'showmsgforsubmit=submitBox' : submitBinding
		},
		opts = {
			'success' : 'strong=good'
		   ,'error' : 'strong=bad'
		//   ,'isExist' : {
		   		//手机号验证 
		   		//success:显示发送验证码 
		   		//fail:提示手机号不正确
				//'mobile' : function(cbk){
				//	var data = {
				//		type : 'mobile',
				//		data : mobile.val()
				//	};
					// $.get('/aj/doota/address_validate' , data , function(res){
					// 	if(res.code != '0') cbk(res.msg);
					// 	else cbk('');
					// } ,'json');
				//},
		//		'code' : function(cbk){
					//验证码验证
					//
					//var data = {
					//	type : 'postcode',
					//	data : code.val()
					//};
					// $.get('/aj/doota/address_validate' , data , function(res){
					// 	if(res.code != '0') cbk(res.msg);
					// 	else cbk('');
					// } ,'json');
				//}
			//}
		};
		validate.validate(formName, validateRules, showStyle, opts);
	}
	
	return function() {
		setDefault();
		formFn();
	}
});