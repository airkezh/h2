/*common*/
var $ = require('wap/zepto')
// require('wap/zepto/fastclick')
$('.vote_btn').on('click', voteBtnEvent);

function voteBtnEvent(event) {
	event.preventDefault();
	var runnerId = $(this).data('id')
	$('.vote_btn').off(voteBtnEvent)
	popWin()
	$.ajax({
		url: '/aj/running_man/vote_shake/vote',
		type: 'get',
		dataType: 'json',
		data: {voteId: runnerId},
		success:function(res){
			// alert(res.message)
			// if(res.error_code==0){
				// popWin(res)
			// }
		},
		error:function(){
			// alert('系统异常，投票失败')
		},
		complete:function(){
			$('.vote_btn').on('click', voteBtnEvent)
		}
	})	
}

function popWin(res){
	//投票成功弹窗
	$('.pop_win').trigger('pop_open')
}

$('.pop_win').on('pop_close', function(event) {
	activeScroll()
	$(this).hide()
}).on('pop_open', function(){
	disableScroll()
	$(this).show()
}).on('click', '.close_btn', function(event) {
	$('.pop_win').trigger('pop_close')
});

function disableScroll(){
	$(document).on('touchmove.popWin', function(event) {
		event.preventDefault();
	});
}

function activeScroll(){
	$(document).off('touchmove.popWin');
}

if(Meilishuo.config.os.weixinBrowser){
	var signWX = require('wx/sign')//认证签名
	var shareWX = require('wx/share')//分享
	signWX()
	shareWX.bind({
	    "desc":'天啦噜，我参加了美丽说“猜猜谁是跑男最强者“，获得了跑男明星亲笔签名照，限量的哦。',
	    "title":'猜猜本期跑男最强者',
	    "link":location.origin + '/running_man/shake_vote/'
	});
}

//已经投票自动弹窗
if(fml.vars.isvote){
	popWin()
}

window.onorientationchange = function(){
	$('.btn_wrap').hide()
	setTimeout(function(){
		$('.btn_wrap').show()
	},100)
}