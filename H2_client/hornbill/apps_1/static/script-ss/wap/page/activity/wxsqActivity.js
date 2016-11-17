/*common*/
require('wap/zepto/fastclick');
var $ = require('wap/zepto')
var Alert = require('wap/ui/alert')
var Dialog = require('wap/ui/dialog')
var shareTmp = require('component/shareTmp')

var dialogObj;

/* 弹窗 */
var alertCon = function(msg){
	var a = new Alert({
		content : msg
	});
}

/* 抢券 */
var canClick = true;
$('.c-right').on('click', '.get-coupon', function(event) {
	if(canClick){
		canClick = false;
		$.post('/aj/wx_new/wx818', function(data){
			// console.log(data)
			if(data.ret == 0){
				var tpl = shareTmp( 'getCoupon' , { 'msg' :  data.msg } );
				dialogObj = new Dialog({
					content: tpl
				});
			}else{
				 alertCon( data.msg );
			}
			canClick = true;
		}, 'json');
	}
});


var $rule = $('#rule');
/* 活动规则 */
$('.rule').on('click',  function(event) {
	$rule.show();
});
$rule.on('click',  function(event) {
	$rule.hide();
});

$(document).on('click', '.closeBtn', function(event) {
	dialogObj.destory();
});

