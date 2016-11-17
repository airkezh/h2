fml.define('wap/page/uninstall',['wap/zepto/touch','component/validate','wap/app/dialog','wap/component/shareTmp'] ,function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var validate = require('component/validate');

	var alertMsgFn = function(msg){
		$('.closeDialog').trigger('tap');
		var data = {msg:msg};
		var tpl = shareTmp('alertMsg', data);
		$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 200);
		});
	};

	var post_msg =  function(data){
		var url = '/aj/app_feedback/fd_create'; 
		var callback = function(r){
			if (!r.error_code) { 	
				window.location = '/uninstall/req_ths/';
			}else{
				alertMsgFn(r.message);
			}
		}
		$.post(url , data , callback ,'json');
	}

	$('.req_normal').on('tap', function(){
		var req = $(this).closest('.req_normal');
		// var access_token = req.closest('.ins_main').attr('data-toid');
		var data = {
			'text' : req.children('p').text(),
			'feedback_type': req.attr('data-type'),
			'feedback_service': 1,
			// 'access_token' : access_token
		};
		post_msg(data);
	});

	var checkReq = function(reason){
		var data = {
			'text' : $(reason).val(),
			'feedback_type': 0,
			'feedback_service': 1,
			'access_token': $(toid).val()
		};
		($('#contact').val()) && (data.contact = $('#contact').val());
		post_msg(data);
	}
	//表单操作
	var formValidate = function(cbk){
		var formName = 'reqForm',
			validateRules = {
				'reason' : { 'req=告诉我具体原因，小美一定全力为你优化:D' : '请描述具体原因' },
			},
			showStyle = {
				'showmsgbyone=reqButton.reqErrorMessage' : cbk
			},
			opts = {};
		validate.validate(formName, validateRules, showStyle, opts);
	};
	
	if (fml.vars.is_req_other) {
		formValidate(function(){
			checkReq('#reason');
		});
	};
});
