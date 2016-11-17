fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());	
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'sort': query.sort || 'rank',
		'actName' : 'pf79'
	}

	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/pf79_rank' , {'subScroll': '.hb_box'});
});


fml.define('page/huodong/pf79' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var logTrack = require('app/tracking');

	var choiceresult='';
	//选择题
	$('.choice-item span').on('click',function(){
		$(this).addClass('choiced');
		$(this).siblings().removeClass('choiced');
		choiceresult=$(this).attr('data-status');
	});
   
	//图片上传
	upload.init(function(){
		$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
		$('.cloud-bg').hide();
		$('.next').show();

	});

	//提交
	$('.next').on('click' , function(){
		//$(this).attr('disabled','disabled');
		$(this).addClass('wait');
		var url1 = '/aj/huodong/jlmgz';
		var data1 ={'group_id' :118315529}
		$.post(url1, data1, function(res){
		},"json");


		var url = '/aj/huodong/pf79_tj';
		var data = {'src' : $('.preview').attr('src') , 'filter' : choiceresult };
		data = $.extend(data, upload.getImgData());
		$.post(url , data , function(r){
			if (!r) return;
			if(!choiceresult){
				alert('要按照步骤操作哦亲！上传照片后，要选择一款适合你的BB颜色，然后才会美丽change哦~');
				return;
			}
			var html = shareTmp('succeed',{'tpic':r.data.pic_after_filter,'lpic':r.data.pic_tips
});
			var pf79_pop = new dialogUI({
				'content' : html,
				'width' : '638px',
				'onChange' : function(){
					$('#dialogTitle').hide();
					$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
				}
			});
		} , 'json');


	});


	//投票
	$('.goods_wall').on('click' , '.act_vote' , function(){
		if(!check()) return;
		var _self = this;
		var uid = $(_self).parents('.vote_box').find('.userInfo').attr('uid');
		var pid = $(_self).parents('.vote_box').find('.goods_pic').attr('pid');
		var username = $(_self).parents('.vote_box').find('.name').html();
		$.get('/aj/huodong/pf79_vote' , {'user_id' : uid , 'pid' : pid , 'username' : username} , function(res){
			if(res.data==-1){
				alert('不能给自己投票!');
				return false;
			}
			var $vote = $(_self).parents('.poster_grid').find('.vote_num');
			$vote.html(parseInt($vote.html())+1);
            $(_self).removeClass('act_vote').addClass('voted').html('已投票');
		} , 'json');	
	});




	//分享到新浪
	$('#share_sina').on('click' , function(){
			var s_url = location.href;
			var s_desp = '【为我的华丽变身投票吧】PF79魔法BB，千元大奖等你来拿！';
			var s_img = 'http://i.meilishuo.net/css/images/huodong/pf79/share.jpg';
			share.shareToWeibo(s_url, s_desp, s_img);
	});


	//分享到Qzone
	$('#share_qzone').on('click' , function(){
			var s_url = location.href;
			var s_desp = '【为我的华丽变身投票吧】PF79魔法BB，千元大奖等你来拿！'+ s_url;
			var s_title = 'pf79魔法BB一秒大变身';
			var s_img = 'http://i.meilishuo.net/css/images/huodong/pf79/share.jpg';
			share.shareToQzone(s_url , s_desp, '', s_title , s_img);
	});

	//分享到腾讯微博
	$('#share_qqwb').on('click' , function(){
			var s_url = location.href;
			var s_desp = '【为我的华丽变身投票吧】PF79魔法BB，千元大奖等你来拿！';
			var s_img = 'http://i.meilishuo.net/css/images/huodong/pf79/share.jpg';
			share.shareToQQ(s_url, s_desp, s_img);
			//logTrack.cr('lenovo101', {'frm': 'lenovo101'});
	});



	//hack for ie6，页面有锚点和?参数的时候标题有问题
	if($.browser.msie) {
		document.title = 'pf79魔法BB一秒大变身';
	}



});
