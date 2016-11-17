fml.define('page/appealTaobao' , ['jquery', 'ui/dialog', 'component/shareTmp', 'ui/alert'] , function(require, exports){
	var $ = require('jquery'),
	dialog = require('ui/dialog'),
	alert = require('ui/alert'),
	shareTmp = require('component/shareTmp'),
	tb_pic_id = 0,
	is_nickname_ok = false,
	is_email_ok = false;

	var alertTip = function(content, cbk) {
		cbk = cbk || function(){};
		new alert({
			content: content, 
			width: 370,
			onClose: cbk
		});		
	};

	var validateCbk = function(msg, id, linkId){
		var nid = '#' + id;
		if(msg == ''){
			$(nid + '_error').remove();
			return ;
		}
		if($(nid).next().hasClass('errorMsg')){
			if(linkId == 4){
				$( nid + '_error span').html('你的账号已绑定邮箱'+msg+',请使用'+' <a href="/users/forgetPassword/">找回密码</a> 功能找回你的账号');
			} else {
				$( nid + '_error span').html(msg);
			}
		} else {
			var data = {
				'errorMsg' : msg,
				'id' : id
			},
			tpl = shareTmp('validateError', data);
			if(linkId == 4){
				tpl = $(tpl);
				tpl.find('span').html('你的账号已绑定邮箱'+msg+',请使用'+' <a href="/users/forgetPassword/">找回密码</a> 功能找回你的账号');
			}

			$(nid).after(tpl);
		}
	};
	var pace = function(){
		var tb_user_name = $('#tb_user_name').val();
		if(is_nickname_ok && is_email_ok && tb_user_name != '' && tb_pic_id != 0){
			$('.ap_submit').addClass('ap_submit_ok');
			return true;
		} else {
			$('.ap_submit').removeClass('ap_submit_ok');
			return false;
		}
	};

	$('#nickname').blur(function(){
		is_nickname_ok = false;
		var nickname = $('#nickname').val();
		if(nickname == ''){
			pace();
			return validateCbk('不能为空', 'nickname');
		}
		var url = '/aj/connect/is_ta_accout';
		var data = {
			nickname : nickname
		};
		var callback = function(res){
			var code = res.error_code;
			var msg = res.msg;
			if(code == 0){
				validateCbk('', 'nickname');
				is_nickname_ok = true;
			} else if(code == 4){//跳转到找回密码
			validateCbk(msg, 'nickname', 4);
			}else {
				validateCbk(msg, 'nickname');
			}
			pace();
		};
		$.get(url , data , callback ,'json');
	});
	$('#tb_user_name').blur(function(){
		var tb_user_name = $('#tb_user_name').val();
		if(tb_user_name == ''){
			validateCbk('不能为空', 'tb_user_name');
		} else {
			validateCbk('', 'tb_user_name');
		}
		pace();
	});
	$('#email').blur(function(){
		is_email_ok = false;
		var emailVal = $('#email').val();
		if(emailVal == ''){
			pace();
			return validateCbk('邮箱不能为空', 'email');
		}
		var url = '/user/reg/validate';
		var data = {
			rule : 'email',
			data : emailVal
		};
		var callback = function(res){
			if(res == 1){
				validateCbk('邮箱已经存在。', 'email');
			} else if(res == 3) {
				validateCbk('邮箱格式错误。', 'email');
			} else {
				validateCbk('', 'email');
				is_email_ok = true;
			}
			pace();
		};
		$.post(url , data , callback ,'json');
	});
	$('.ap_submit_ok').live('click', function(){
		if(pace() == false) return;
		var url = '/aj/connect/appeal_taobao';
		var data = {
			'nickname' : $('#nickname').val(),
			'tb_user_name' : $('#tb_user_name').val(),
			'tb_pic_id' : tb_pic_id,
			'more_info' : $('#more_info').val(),
			'email' : $('#email').val()
		}
		var callback = function(res){
			if(res.error_code == 1){
				var tpl = shareTmp('ap_submit_dialog');
				var shareSDia = new dialog({ title: "账号申诉", content: tpl, isOverflow: false ,width: '626px'});
				$('.ap_submit').removeClass('ap_submit_ok');
			} else {
				alertTip(res.msg);
			}
		};
		$.post(url , data , callback ,'json');
	});
	$('#closeDialog').live('click', function(){
		if($(this).parents('.dialogLayer').find('.dialog_wrap').length > 0){
			window.location.href = '/welcome';
		}
	});

	$('.example').on('mouseenter', function(){
		$('.ap_tb_ex').show();
	}).on('mouseleave', function(){
		$('.ap_tb_ex').hide();
	});

	$('.find_user').click(function(){
		var nickname = $('#nickname').val();
		var url = 'http://www.meilishuo.com/search?searchKey=' + nickname + '&searchType=2&filter=user'
		window.open(url, "_blank");
	});

	var getFile, container;
	var _afterUpload = function() {
		if (this.readyState && this.readyState != 'complete') return;
		var iframe = getFile.contentDocument || getFile.contentWindow.document;
		var res = iframe.body.innerHTML.replace(/<.*?>/g,'');
		if(!res) return;
		res = $.parseJSON(res);
		if(res.code) {
			return alert(res.msg);
		}
		tb_pic_id = res.pic_id;
		$('.preview').attr('src', res.pic_url).show();
		$('.upload_btn').html('重新上传');
	};
	function init() {
		container = '.upload_wraper';

		var $container = $(container);
		var $attach_photo = $container.find('.attach_photo');
		var $upload_pho = $container.find('.upload_pho');

		$attach_photo.on('click', function(){

		}).on('change', function(){
			$upload_pho.submit();
		})

		getFile = $container.find('.upload_iframe')[0];
		if (getFile) {
			getFile.attachEvent ? getFile.attachEvent('onload', _afterUpload) : getFile.onload = _afterUpload;
		}
	}
	init();
});
