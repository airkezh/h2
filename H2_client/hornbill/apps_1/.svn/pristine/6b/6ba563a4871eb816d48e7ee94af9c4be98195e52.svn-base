fml.use('page/poster_guang');
fml.use(['jquery', 'component/urlHandle'], function() {


});



fml.define('page/huodong/QQxuanwu', ['jquery', 'ui/dialog', 'app/checkLogin', 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'], function(require, exports) {
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var desc = ['qqxw-desc3.jpg', 'qqxw-desc2.jpg', 'qqxw-desc0.jpg', 'qqxw-desc1.jpg', 'qqxw-desc4.jpg', 'qqxw-desc5.jpg', 'qqxw-desc6.jpg', 'qqxw-desc7.jpg'];
	var videos = ['video_0.mp4', 'yuanlin.mp4', 'yuanshuai_1.mp4', 'video_3.mp4', 'video_4.mp4', 'video_7.mp4', 'video_6.mp4', 'video_5.mp4'];
	/*切换视频*/
	$("#step1 li").hover(function() {
		$(this).addClass("on-check").siblings().removeClass("on-check");
	}, function() {
		$("#step1 li").removeClass("on-check");
	});
	$("#step1 li").on("click", function() {
		var index = $("#step1 li").index(this);
		if (!$(this).hasClass("on-checked")) {
			$("#step1 li").removeClass("on-checked");
			$(this).addClass("on-checked");
			$("#singer_desc").attr("src", "http://i.meilishuo.net/css/images/huodong/qqxuanwu/" + desc[index]);
			$("#videoBox").attr("src", "http://i.meilishuo.net/css/images/huodong/qqxuanwu/" + videos[index]);
		}
	});
	/*提交*/
	$('#btnSub').on("click", function(e) {
		if(!check()) return;
		var topic = $("#topic").val();
		if(topic.length<=0){
			alert("请填写讨论内容!");
			return;
		}
		var url = '/aj/huodong/qqxuanwu_addtopic';
		var data = {
			'activity_id': '1',
			'tContent': "#秀出表白奇招# " + topic
		};
		$.get(url, data, function(r) {
			console.log(r);
			if (!r) return;
			if (typeof r == "string")
				r = JSON.parse(r);
			if (r.code == 200 || r.code == "200") {
				window.location.href='/biz/huodong/QQxuanwu/?page=0#list';
			}
		});
	});
	/*投票*/
	$('#step1').on('click', '.vote_btn', function() {
		if (!check()) return;
		var _self = this;
		var s_id = $(_self).parent("li").attr("s_id");
		console.log(s_id);
		$.get('/aj/huodong/qqxuanwu_vote', {
			'act': 'addVote',
			'item_id': s_id
		}, function(res) {
			console.log(res);
			if (res.error_code == 0) {
				var $vote = $(_self).find('b');
				$vote.html("(" + res.data + ")");
			} else {
				alert("投票次数已经用光了哦～～");
			}
		}, 'json');
	});
	//分享到新浪
	$('#share_sina').on('click', function() {
		var s_url = location.href;
		var s_desp = '我参加了@QQ炫舞品牌官微#表白季为爱支招＃投票活动,更有美图手机大波好礼免费赢! 观看爱的支招小视频一起来成为萌妹子和小鲜肉投票吧!';
		var s_img = 'http://i.meilishuo.net/css/images/huodong/qqxuanwu/qqxw-nbg1.jpg';
		share.shareToWeibo(s_url, s_desp, s_img);
	});

	//分享到Qzone
	$('#share_qzone').on('click', function() {
		var s_url = location.href;
		var s_desp = '我参加了@QQ炫舞品牌官微#表白季为爱支招＃投票活动,更有美图手机大波好礼免费赢! 观看爱的支招小视频一起来成为萌妹子和小鲜肉投票吧!' + s_url;
		var s_img = 'http://i.meilishuo.net/css/images/huodong/qqxuanwu/qqxw-nbg1.jpg';
		var s_title = 'QQ炫舞品牌官微 表白季为爱支招';
		share.shareToQzone(s_url, s_desp, '', s_title, s_img);
	});

	//分享到腾讯微博
	$('#share_qqwb').on('click', function() {
		var s_url = location.href;
		var s_desp = '我参加了@QQ炫舞品牌官微#表白季为爱支招＃投票活动,更有美图手机大波好礼免费赢! 观看爱的支招小视频一起来成为萌妹子和小鲜肉投票吧!';
		var s_img = 'http://i.meilishuo.net/css/images/huodong/qqxuanwu/qqxw-nbg1.jpg';
		share.shareToQQ(s_url, s_desp, s_img);
	});
});