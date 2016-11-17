fml.use('page/poster_guang');
fml.use(['jquery', 'component/urlHandle'], function() {
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'page': query.page || 0
	}
	var type = query.type || 'time';
	var senceStyle = query.style || 'all';
	$("#type_" + type).addClass("check_cateType").siblings().removeClass("check_cateType");
	$("#style_" + senceStyle).addClass("check_subType").siblings().removeClass("check_subType");
	var opts = this.jquery.extend({}, urlData, query);

});



fml.define('page/huodong/xuwanwuqiji', ['jquery', 'ui/dialog', 'app/checkLogin', 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'], function(require, exports) {
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var style = '';
	var car = '';
	var senceImgs = ['http://d04.res.meilishuo.net/img/_o/34/d1/9fb93b7d8150fc354fbd2eb54e56_265_240.cg.png', 'http://d06.res.meilishuo.net/img/_o/b7/7a/f55aa4c1962c3a5ddec5859b6e3e_265_240.cg.png', 'http://d06.res.meilishuo.net/img/_o/64/ab/bba0a2bfee893a077ee22fb36990_265_240.cf.png', 'http://d06.res.meilishuo.net/img/_o/82/c7/60c0e5270cd0f100449927b3bdf4_265_240.cg.png'];
	var descImgs = ['http://d03.res.meilishuo.net/img/_o/ef/86/7565c2c00217877d1f946e6d1de8_165_240.cf.png', 'http://d06.res.meilishuo.net/img/_o/19/d7/f5ebba46ea8d7676d7d05fdc7413_165_240.cg.png', 'http://d04.res.meilishuo.net/img/_o/cc/7a/fab5d26fde8723d1b46a8ad49014_165_240.ch.png', 'http://imgtest.meiliworks.com/img/_o/73/10/97e4052fd3f5f9e8b1c98a78a5a4_165_240.ch.png'];
	var senceTypes = ['rainbow', 'palace', 'island', 'sky'];
	var senceType = 'rainbow';
	/*step1 选择场景*/
	$('.step1 .show-type li').on("click", function() {
		var index = $(this).index();
		$(".senceCheck").removeClass("senceCheck");
		$(this).addClass("senceCheck");
		$("#sence_img").css("background", "url('" + senceImgs[index] + "') no-repeat");
		$("#sence_desc_img").css("background", "url('" + descImgs[index] + "') no-repeat");
		senceType = senceTypes[index];
	});
	/*图片上传*/
	upload.init(function() {
		$('.imgbox').css({
			'width': '145px',
			'height': '165px',
			'overflow': 'hidden',
			'position': 'relative'
		});
		$('#create_btn').show();
	});
	/*提交*/
	$('#create_btn').on("click", function() {
		var sence_len=$(".senceCheck").length;
		if(!sence_len){
			alert("请先选择场景，在上传图片！");
			return;
		}
		var url = '/aj/huodong/xuanwuqiji_ti';
		var data = {
			'src': $('.preview').attr('src'),
			'style': senceType
		};
		data = $.extend(data, upload.getImgData());
		$.post(url, data, function(r) {
			if (!r) return;
			if (typeof r == "string")
				r = JSON.parse(r);
			if (r.error_code == "40005") {
				alert('您已经参加过了');
			} else {
				window.location.href = "/biz/huodong/xuanwuqiji/?page=0&type=time&style=all#vote";
			}
		});
	});
	/*选择类型*/
	$("#cate_type a").on("click", function() {
		var type = $(this).attr("data_type");
		var senceStyle = $('.check_subType').attr("data_type");
		window.location.href = '/biz/huodong/xuanwuqiji/?page=0&type=' + type + '&style=' + senceStyle + "#vote";
	});
	$("#sub_type a").on("click", function() {
		var senceStyle = $(this).attr("data_type");
		var type = $('.check_cateType').attr("data_type");
		window.location.href = '/biz/huodong/xuanwuqiji/?page=0&type=' + type + '&style=' + senceStyle + "#vote";
	});
	/*投票*/

	$('.voteWrap').on('click', '.act_vote', function() {
		if (!check()) return;
		var _self = this;
		var uid = $(_self).parents('.vote_box').find('.user-nickname').attr('uid');
		var pid = $(_self).parents('.vote_box').find('.showImg').attr('pid');
		var username = $(_self).parents('.vote_box').find('.user-nickname').html();
		$.get('/aj/huodong/xuanwuqiji_vote', {
			'user_id': uid,
			'pid': pid,
			'username': username
		}, function(res) {
			var $vote = $(_self).parents('.vote_box').find('.like-no');
			$vote.html(parseInt($vote.html()) + 1);
			$(_self).removeClass('act_vote');
			$(_self).html("已喜欢");
		}, 'json');
	});
	//分享到新浪
	$('#share_sina').on('click', function() {
		var s_url = location.href;
		var s_desp = '我参加了的炫舞时代#天空纪时尚大赏 舞林盛会等你来战#活动，谁能以最时尚的搭配赢的众人的赞美，便能入主天空之城，成为岛民的时尚icon！爱美丽们速来参与吧，美图手机等你来拿！并且设置缤纷参与奖，炫舞抱枕和鼠标垫等你来抢！猛戳';
		var s_img = 'http://i.meilishuo.net/css/images/huodong/xuanwuqiji/xwqj-bg1.jpg';
		share.shareToWeibo(s_url, s_desp, s_img);
		//		logTrack.cr('lenovo101', {
		//			'frm': 'lenovo101'
		//		});
	});

	//分享到Qzone
	$('#share_qzone').on('click', function() {
		var s_url = location.href;
		var s_desp = '我参加了的炫舞时代#天空纪时尚大赏 舞林盛会等你来战#活动，谁能以最时尚的搭配赢的众人的赞美，便能入主天空之城，成为岛民的时尚icon！爱美丽们速来参与吧，美图手机等你来拿！并且设置缤纷参与奖，炫舞抱枕和鼠标垫等你来抢！猛戳' + s_url;
		var s_img = 'http://i.meilishuo.net/css/images/huodong/xuanwuqiji/xwqj-bg1.jpg';
		var s_title = '天空纪时尚大赏 舞林盛会等你来战';
		share.shareToQzone(s_url, s_desp, '', s_title, s_img);
		//		logTrack.cr('lenovo101', {
		//			'frm': 'lenovo101'
		//		});
	});

	//分享到腾讯微博
	$('#share_qqwb').on('click', function() {
		var s_url = location.href;
		var s_desp = '我参加了的炫舞时代#天空纪时尚大赏 舞林盛会等你来战#活动，谁能以最时尚的搭配赢的众人的赞美，便能入主天空之城，成为岛民的时尚icon！爱美丽们速来参与吧，美图手机等你来拿！并且设置缤纷参与奖，炫舞抱枕和鼠标垫等你来抢！猛戳';
		var s_img = 'http://i.meilishuo.net/css/images/huodong/xuanwuqiji/xwqj-bg1.jpg';
		share.shareToQQ(s_url, s_desp, s_img);
		//		logTrack.cr('lenovo101', {
		//			'frm': 'lenovo101'
		//		});
	});
	/*奖品切换*/
	$("#xw_check_zjl").on("click", function() {
		$("#step_init").css("background", "url(http://i.meilishuo.net/css/images/huodong/xuanwuqiji/xwqj-zhengjiling.jpg) no-repeat");
	});
	$("#xw_check_jp").on("click", function() {
		$("#step_init").css("background", "none");
	});
});