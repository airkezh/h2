/*common*/
var shareTmp = require('wap/component/shareTmp');
var $ = require('wap/zepto');
var shareWX = require('wx/share');

shareWX.bind({
	'link': 'http://' + location.host + '/zulily/qa/6499',
	'desc': '过春节不容易，你需要一套防身术',
	'imgUrl': "http://d02.res.meilishuo.net/pic/_o/51/f7/50d07a5fbb50f965e0346bf1e566_200_200.ch.jpg",
	'title': '春节防身术，测一测你会几招？'
});

//获取微信客户端的open_id
// var open_id = location.search.match(/(^|\&|\?)wxopenid\=([^&]+)/);
// if(open_id){
// 	open_id = open_id[2];
// }else{
// 	//如果没有open_id，跳回微信的互联跳转页
// 	location.href="http://www.weixingate.com/gate.php?back="+
// 		encodeURIComponent(location.href)+"&force=1"; 
// }
setTimeout(function() {
	document.body.scrollTop = 1;
	document.body.scrollTop = 0;
	var winHeight = $(window).height() + 80

	$(".page,body,html").height(winHeight + 'px').css('overflow', 'hidden');

}, 100);
var content = $('.play')[0].contentWindow;

switchInterface('begain');

$(content).on('load', function() {
	$(".start_btn").on("click", function() {
		content.$(content.document).trigger('start');
		switchInterface('play');
	})
});

$(document).on("qa_end", function(event, data) {
	//sendData(data);
	showCurResult(data);
});

$(".result .buyer_btn").on("click", function() {
	switchInterface('recommand');
});

$(".result .share_btn").on("click", function() {
	$(".share").show();
	$(".share").on("click", function() {
		$(this).hide();
	})
});

$(".again_btn").on("click", function() {
	// content.$(content.document).trigger('start');
	// 	switchInterface('play');
	window.location.href = window.__get_r("http://mapp.meilishuo.com/zulily/?hdtrc=desire_AppPush_0215_03", fml.vars.common_r);
});

//判断推荐买手的两个输入框是否有内容，有内容此输入框就是正常输入框
$(".recommand .rec_msg").delegate("input", "keyup", function() {
	var self = $(this);
	if (self.val().trim != "") {
		normalInput(self.parent());
	}
})

// $(".recommand .rec_btn").on("click",function(){
// 	var referral = $(".referral").find("input").val().trim()
// 		,referee = $(".referee").find("input").val().trim();

// 	if(referee!="" && referral!=""){
// 		$.ajax({
// 				url:'/aj/qa/recommand',
// 				data:{
// 					referee_from: referee
// 					,referee_to: referral  
// 				},
// 				type:'post', 
// 				dataType:'json',
// 				success: function(data){
// 					if(data.code == 0){
// 						maskShow(".recommand .correct_mask");
// 					}else {
// 						maskShow(".recommand .wrong_mask");
// 					}
// 				},
// 				error:function(){
// 					alert("系统繁忙，请稍后再试");
// 				}
// 			})
// 	}else {
// 			if (referral == ""){
// 				wrongInput($('.referral'));
// 			}
// 			if (referee == ""){
// 				wrongInput($('.referee'));
// 			}
// 		}
// })

$(".recommand .know_btn").on("click", function() {
	$(".recommand .mask").hide();
	clearRecmsg();
	switchInterface('download');
})

$(".recommand .back_btn").on("click", function() {
	$(".recommand .mask").hide();
	clearRecmsg();
})

//展示结果页和当前成绩
function showCurResult(data) {
	var cur_time = data.cost_time,
		time = formatTime(cur_time),
		cur_score = data.score,
		title = ""

	switchInterface('result');
	/* 根据本轮答题情况展示各种结果banner
			1：答对10题及以下：
				1）、答对0题：别太低调，都不是Low人，再来一局吧！
				2）、答对1-10题：离时尚买手还有几题之遥，再来一局！不需要计题
			2：答对10题以上：
				1）、答对11-30题：已超越XX%时尚妹子，被推荐为铜牌达人买手
				2）、答对31-40题：已超越XX%时尚妹子，被推荐为银牌达人买手
				3）、答对41-50题：已超越XX%时尚妹子，被推荐为金牌达人买手
	*/
	$(".banner img").hide();
	$(".result .surpass").hide();
	if (cur_score == 0) {
		$(".lev0").show();
		title = "0分，我的春节防身术达到境界“扑街”";
	} else if (cur_score >= 1 && cur_score <= 4) {
		$(".lev1").show();
		title = "50分，我的春节防身术达到境界“相爱相杀”";
		//$(".result .surpass").show();
	} else if (cur_score == 5) {
		$(".lev2").show();
		title = "100分，我的春节防身术达到境界“天下无敌”";
		//$(".result .surpass").show();
	}
	$(".cur_msg .score").html(cur_score);
	// $(".cur_msg .time").html(time);
	// $(".his_msg .score").html("");
	// $(".his_msg .time").html("");
	shareWX.bind({
		'link': 'http://' + location.host + '/zulily/qa/6499',
		'desc': '过春节不容易，你需要一套防身术',
		'imgUrl': "http://d02.res.meilishuo.net/pic/_o/51/f7/50d07a5fbb50f965e0346bf1e566_200_200.ch.jpg",
		'title': title
	});
}

function switchInterface(page) {
	$('.page').hide();
	$('.' + page).show();
}

function showHisResult(data) {
	var best_score = data.best.correct_num,
		best_time = data.best.answer_time,
		surpass = data.surpass,
		time = formatTime(best_time);
	$(".his_msg .score").html(best_score);
	$(".his_msg .time").html(time);
	$(".result .surpass").html(parseInt(surpass) + "%");
}

function normalInput(obj) {
	obj.find('img').show();
	obj.find('.wrong').hide();
	obj.find('input').css("border", "1px solid #cecece");
}

function wrongInput(obj) {
	obj.find('img').hide();
	obj.find('.wrong').show();
	obj.find('input').css("border", "1px solid red");
}

function clearRecmsg() {
	var referral = $(".referral").find("input").val("");
	var referee = $(".referee").find("input").val("");
}

function formatTime(time) {
	var m = parseInt(time / 60);
	var s = parseInt(time) - m * 60;
	m = checkTime(m);
	s = checkTime(s);
	return m + ":" + s;
}

//时间补0
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	return i;
}

function maskShow(mask) {
	$(mask).show();
	var maskHeight = $(mask).find(".mask_content").height() / 2;
	$(mask).find(".mask_content").css("margin-top", -maskHeight);
}