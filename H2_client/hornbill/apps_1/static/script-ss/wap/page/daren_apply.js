/*common*/
require('wap/zepto/touch');
require('component/serializeObject');
var flag = false,
	$ = require('jquery'),
    Alert = require('wap/ui/alert'),
    clientUse = require('wap/client/component/clientUse'),
	inputValidor = require('component/inputValidor'),
	checkLogin = require('wap/app/checkLogin');
var alert = function(msg){
	return new Alert({
		content:msg,
		onSure : function (){
			//window.location.reload();
		}
	});
}
function byteLength(str) {
	var byteLen = 0, len = str.length;
	if( !str ) return 0;
	for( var i=0; i<len; i++ )
		byteLen += str.charCodeAt(i) > 255 ? 2 : 1;
	return byteLen;
}
function bindUploadParam(data,btn){
	//data.o_pic_url 原图链接
	//data.H_pic_url 缩略图链接
	//alert(JSON.stringify(data))
	$('.photo').html('<img src="'+data.H_pic_url+'" alt="photo of applyer" />');
	$('#upload_img').val(data.o_pic_url);
}
$('#upload_btn').on('tap',function (){
	//判断是否登录
	clientUse.callClient.toLogin();
});
if(!(Meilishuo.config.user_id == 0)){
	clientUse.callClient.bindUpload($('#upload_btn'),bindUploadParam);
}
//验证
$('#user_name').on('blur',function (){
	var value = $(this).val(),
	    verify_result = /^\s*$/.test(value),
	    byteLen = byteLength($(this).val());
	if(byteLen > 20){  
		$('.error_txt').html('用户名不能超过10个字!'); 
	}else if(verify_result){ 
		$('.error_txt').html('用户名不能为空!'); 
	}else{
		$('.error_txt').html('');
		flag = true;
	}
});
$('#user_name').on('focus',function (){
	clientUse.callClient.toLogin();
	$(this).unbind('focus');
});
$('#user_qq').on('blur',function (){
	var value = $(this).val(),
	    verify_result = /^\d{5,15}$/.test(value);
	if(value == ''){ 
		$('.error_txt').html('QQ号信息不能为空!'); 
	}else if(!verify_result){
		$('.error_txt').html('QQ号不存在!');
	}else{
		$('.error_txt').html('');
		flag = true;
	}
});
$('#user_qq').on('focus',function (){
	clientUse.callClient.toLogin();
	$(this).unbind('focus');
});
$('#user_phone').on('blur',function (){
	var value = $(this).val(),
	    verify_result = /^\d{11}$/.test(value);
	if(value == ''){ 
		$('.error_txt').html('手机号信息不能为空!'); 
	}else if(!verify_result){
		$('.error_txt').html('手机号不存在!');
	}else{
		$('.error_txt').html('');
		flag = true;
	}
});
$('#user_phone').on('focus',function (){
	clientUse.callClient.toLogin();
	$(this).unbind('focus');
});
$('#submit_btn').on('tap',function (){
		clientUse.callClient.toLogin();
		var name_test = /^\s*$/.test($('#user_name').val()),
		    user_qq_test = /^\s*$/.test($('#user_qq').val()),
		    user_phone_test = /^\s*$/.test($('#user_phone').val()),
		    upload_img_test = /^\s*$/.test($('#upload_img').val());
		if(!name_test && !user_qq_test && !user_phone_test){
			if(upload_img_test){ alert("还没上传图片哦"); return; }
			var user_qq_verify = /^\d{5,15}$/.test($('#user_qq').val()),
				user_phone_verify = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57])[0-9]{8}$/.test($('#user_phone').val());
			if(user_qq_verify && user_phone_verify){ 
				$.ajax({
					url: '/aj/daren/apply',
					data: $('#daren_apply_form').serializeObject(),
					dataType:'json',
					type:'get',
					success:function(res){
						alert("申请成功");
					},
					error: function(err){
						alert("申请失败");
					}
				});
			}else{
			 	alert("请正确填写QQ号和手机号!");
			}
		}

});