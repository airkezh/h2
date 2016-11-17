/*common*/	
require('wap/zepto/fastclick')
require('wap/app/dialog')
var  shareTmp = require('wap/component/shareTmp')
	, Alert = require('wap/ui/alert');

var cid = location.search.substr(1).split('&')[0].split('=')[1]

//Alert
var a = function(msg){
	return new Alert({
		content : msg
	})
}
/*登陆成功后的回掉函数*/
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};
//弹窗
var dialogFn = function(id){
	var tpl = shareTmp(id);
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('.dialog_box').on('click' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
}
//卡片是否已领完 活动是否结束
$.get('/aj/exoCart/list', {'cid' : cid }, function(res){
	if(res.code == '-5'){
		a(res.msg)
	} else if(res.code == '-4'){
		dialogFn('noRemain')
	}
},'json');

//提交
$('.submit').on('click', function(){
	event.preventDefault();
	//是否登录
	if(fml.vars.isLogin == '0') {
	    window.location.href = "meilishuo://login.meilishuo/";
	    return;
	}

	var data = {
		'username' : $('#name').val()
		, 'mobile_phone' : $('#tel').val()
		, 'address' : $('#address').val()
		, 'code' : $('#email').val()
		, 'cid' : cid
		, 'step' : '2'
	}

	var testMobile = /^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/.test(data.mobile_phone)
	var testMail = /^[0-9][0-9]{5}$/.test(data.code);

	if (!data.username)
		a('请填写姓名！')
	else if(!data.address)
		a('请填写货地址！')
	else if(!data.mobile_phone)
		a('请填写手机号！')
	else if(!testMobile)
		a('手机号格式不正确！')
	else if(!data.code)
		a('请填写邮编！')
	else if(!testMail)
		a('邮编格式不正确！')

	if (data.username && data.address && data.mobile_phone && testMobile && data.code && testMail) {
		$.post('/aj/exoCart/list',data,function(res){
			var code = res.code
			if(code == '1') {
				a(res.msg)
			} else if(code == '-2'){
				setTimeout(function(){
					dialogFn('haveGet')
				},500)
			} else if(code == '-3'){
				setTimeout(function(){
					dialogFn('noBuy')
				},500)
			} else if(code == '-4'){
				setTimeout(function(){
					dialogFn('noRemain')
				},500)
			} else if(code == '-5'){
				a(res.msg)
			} else {
				a('申请人太多，请稍等！')
			}
		},'json')
	}
})

