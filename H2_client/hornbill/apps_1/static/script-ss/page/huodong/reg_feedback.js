/*common*/
var $ = require('jquery'),
	checkLogin = require('app/checkLogin'),
	Alert = require('ui/alert');

var alert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){}
	});
};
$('.get_coupon_btn').click(function (){
	if(!checkLogin()) return;
	$.get('/aj/coupon/coupon_get', {'coupon_apply_code' : fml.vars.applyCode}, function (res){
		if(res.code == 0){
			alert('领取成功');
		}else{
			alert(res.message || '领取失败');
		}
	},'json');
});