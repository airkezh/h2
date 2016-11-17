/*common*/
var $ = require('wap/zepto')
// require('wap/zepto/fastclick')

$('.mobile_input').on('input', function(){
	var val = $(this).val()
	if(val.length>11){
		event.preventDefault();
		$(this).val(val.substr(0,11))
	}
})
$('.open_btn').on('click', function(event) {
	event.preventDefault();
	var mobile = $('.mobile_input').val()
	var $this = $(this)
	if(mobile.length<11){
		return alert('请输入正确的手机号以领取红包')
	}
	$.ajax({
		url: '/aj/running_man/vote_shake/phone',
		type: 'get',
		dataType: 'json',
		data: {
			phone:mobile
		},
		success: function(res){
			if(res.error_code==0){
				$('.empty_red').addClass('opend')
				$this.hide().siblings('.op_btn').eq(0).show()
			} else {
				alert(res.message)
			}
		},
		error:function(){
			alert('系统错误，手机号输入失败')
		}
	})
});

$('.get_coupon_btn').on('click', function(event) {
	var $btn = $(this)
	var cardExt = {
		timestamp:fml.vars.time_stamp
		,signature:fml.vars.card_sign
		,nonce_str:fml.vars.nonce_str
	}
	wx.addCard({
	    cardList: [{
	        cardId: fml.vars.card_id,
	        cardExt: JSON.stringify(cardExt)
	    }], // 需要添加的卡券列表
	    success: function (res) {
	        // var cardList = res.cardList; // 添加的卡券列表信息
	        $btn.hide()
	        $btn.siblings('.go_to_mls').show()
	    }
	});
});

if(Meilishuo.config.os.weixinBrowser){
	var signWX = require('wx/sign')//认证签名
	var shareWX = require('wx/share')//分享
	signWX()
	var txt = '天啦噜，我参加了美丽说“猜猜谁是跑男最强者“，获得了跑男明星亲笔签名照，限量的哦。'
	shareWX.bind({
	    "desc":txt,
	    "title":'猜猜本期跑男最强者',
	    "link":location.origin + '/running_man/shake_vote/'
	});
}