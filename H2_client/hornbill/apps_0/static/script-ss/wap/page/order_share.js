/*common*/
var $ = require('wap/zepto')
var signWX = require('wx/sign')//认证签名
var shareWX = require('wx/share')//分享
require('wap/zepto/fastclick')
var openApp = require('wap/app/openApp');
$('.mobile_input').on('focus', function(event) {
	this.scrollIntoView = this.scrollIntoViewIfNeeded || this.scrollIntoView
	this.scrollIntoView && this.scrollIntoView()
}).on('input', function(event) {
	var val = $(this).val()
		,l = val.length
	if(l===11){
		$('#sub_mobile_btn').addClass('act').html('确定')
	} else {
		$('#sub_mobile_btn').removeClass('act').html('请输入手机号')
	}
}).trigger('input')

$('#sub_mobile_btn').on('click', function(event) {
	if(!$(this).hasClass('act')) return event.preventDefault();
});

$('#sub_mobile_form').on('submit', function(event) {
	event.preventDefault();
	$('.error_tip').html('')
	var mobile = $(this).find('.mobile_input').val()
	if(!mobile) return;
	$.ajax({
		url: '/aj/coupon/modify_phone',
		type: 'get',
		dataType: 'json',
		data: {mobile:mobile},
		success:function(data){
			if(data.error_code===0){
				$('.error_tip').html('保存手机号码成功')
				location.reload()
			} else {
				$('.error_tip').html(data.message||'系统错误')
			}
		},
		error:function(){
			$('.error_tip').html('系统错误，请稍后再试')
		}
	})
	
});

$('.result_btn').on('click', function(event) {
	openApp('meilishuo://coupons.meilishuo', null, null, true);
});

$('#open_app').on('click', function(event) {
	openApp('meilishuo://open.meilishuo', null, null, true);
});

signWX()
shareWX.bind({
    "desc":Meilishuo.config.shareInfo.share_text||'',
    "imgUrl":Meilishuo.config.shareInfo.share_thumb||'',
    "title":Meilishuo.config.shareInfo.share_title||''
});
