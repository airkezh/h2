fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());	
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'actName' : 'lenovos850'
	}

	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/lenovo_rank' , {'subScroll': '.hb_box'});
});

//轮播图
fml.use('app/adPoster', function(){
		this.carousel('.darenshow_wrap',{'width':145,'height':179,'gap':2500,'type':3});
});


fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});


/* 轮播 */
fml.use('app/lunbo' , function(){
	this({
			iWidth:216,
			snum:4,
			dtime:1000,
			ptable:'photos-table',
			toright:'btn-right',
			toleft:'btn-left',
			auto : {direction:'right',time:2000}
	});
});


fml.define('page/huodong/lenovo3' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var logTrack = require('app/tracking');


   
	//图片上传
	upload.init(function(){
		$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
		$('.cloud-bg').hide();
		$('.next').show();

	});

	//提交
	$('.next').off('click').on('click' , function(){
		$(this).attr('disabled','disabled');
		var url = '/aj/huodong/lenovo_create';
		var radiovalue = getSelectValue("q1");
		var data = { 'actName' : 'lenovos850' , 'src' : $('.preview').attr('src') , 'img_idx' : radiovalue };
		data = $.extend(data, upload.getImgData());
		$.post(url , data , function(r){
			if (!r) return;
			alert('恭喜！S850天使爱美丽验证成功！！快去“爱美丽SHOW”为自己拉投票赢大奖吧！');
			window.location.reload();
		} , 'json');


	});

	//拉投票
	$('#vote_share').on('click' , function(){
		if(!check()) return;
		var html = shareTmp('share' , Meilishuo.config.my_poster);
		var share_pop = new dialogUI({
			'content' : html,
			'width' : '598px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});
		$('#close').off('click').on('click' , function(){
			share_pop.drive.destroyModel();
		});
		var share_index = 0;
		$('.share_pop li').off('click').on('click' , function(){
			share_index = $('.share_pop li').index($(this));
			var style = $(this).attr('class');
			if(style.indexOf('_s') == -1){
				$(this).removeClass().addClass(style + '_s');
			}
			var otherLi = $(this).siblings('li');
			otherLi.each(function(){
				var otherStyle = $(this).attr('class');
				if(otherStyle.indexOf('_s') > -1){
					$(this).removeClass().addClass(otherStyle.slice(0 , -2));
				}   
            }); 
		});
		$('.share_btn').off('click').on('click' , function(){
			var s_url = 'http://www.meilishuo.com/biz/huodong/lenovo_share/?user_id=' + Meilishuo.config.user_id;
			var s_desp = '我在美丽说竞选#寻找联想S850天使爱美丽#，快来为我投上一票，所有助我中选的盆友，以后会报答你们滴！';
			var s_title = '寻找联想S850天使爱美丽';
		    var s_img = $('.share_pop img').attr('src');
			if(share_index == 0){
				share.shareToWeibo(s_url, s_desp, s_img);	
			}else if(share_index == 1){
				share.shareToQzone(s_url , s_desp, '', s_title , s_img);	
			}else if(share_index == 2){
				share.shareToQQ(s_url , s_desp , s_img);	
			}else{
				alert('请选择一个平台分享');
				return false;
			}
            share_pop.drive.destroyModel();
		});
	});


	//投票
	$('.goods_wall').on('click' , '.act_vote' , function(){
		if(!check()) return;
		var _self = this;
		var uid = $(_self).parents('.vote_box').find('.userInfo').attr('uid');
		var pid = $(_self).parents('.vote_box').find('.goods_pic').attr('pid');
		var username = $(_self).parents('.vote_box').find('.name').html();
		$.get('/aj/huodong/lenovo_vote' , {'user_id' : uid , 'pid' : pid , 'username' : username} , function(res){
			var $vote = $(_self).parents('.poster_grid').find('.vote_num');
			$vote.html(parseInt($vote.html())+1);
            $(_self).removeClass('act_vote').addClass('voted').html('已投票');
		} , 'json');	
	});




	//分享到新浪
	$('#share_sina').on('click' , function(){
			var s_url = location.href + '?frm=lenovo101';
			var s_desp = '我在帮助#寻找联想S850天使爱美丽#，特征：爱生活，爱自拍！被选中就送联想S850手机！我觉得你就挺合适的，快进来爆照验明正身吧！@美丽说 @联想手机乐粉家';
			var s_img = 'http://i.meilishuo.net/css/images/activity/lenovo/shareto2.jpg';
			share.shareToWeibo(s_url, s_desp, s_img);
			logTrack.cr('lenovo101', {'frm': 'lenovo101'});
	});

	//分享到Qzone
	$('#share_qzone').on('click' , function(){
			var s_url = location.href + '?frm=lenovo101';
			var s_desp = '我在帮助#寻找联想S850天使爱美丽#，特征：爱生活，爱自拍！被选中就送联想S850手机！我觉得你就挺合适的，快进来爆照验明正身吧！@美丽说 @联想手机乐粉家' + s_url;
			var s_img = 'http://i.meilishuo.net/css/images/activity/lenovo/shareto2.jpg';
			var s_title = '寻找联想S850天使爱美丽';
			share.shareToQzone(s_url , s_desp, '', s_title , s_img);
			logTrack.cr('lenovo101', {'frm': 'lenovo101'});
	});

	//分享到腾讯微博
	$('#share_qqwb').on('click' , function(){
			var s_url = location.href + '?frm=lenovo101';
			var s_desp = '我在帮助#寻找联想S850天使爱美丽#，特征：爱生活，爱自拍！被选中就送联想S850手机！我觉得你就挺合适的，快进来爆照验明正身吧！@美丽说 @联想手机乐粉家';
			var s_img = 'http://i.meilishuo.net/css/images/activity/lenovo/shareto2.jpg';
			share.shareToQQ(s_url, s_desp, s_img);
			logTrack.cr('lenovo101', {'frm': 'lenovo101'});
	});


	//
	function getSelectValue(rname){
		var radios=document.getElementsByName(rname);
		for (var i = 0; i < radios.length; i++) {
			if(radios[i].checked ==true) return radios[i].value;
		}
		return "";
	}


	//监控 KPI
	//monitor magazine
	var mon_groups = [
		'http://meilishuo.com/u/EIJyR9?frm=yaochuse01',
		'http://meilishuo.com/u/EIJyyJ?frm=yaochuse02',
		'http://meilishuo.com/u/EIJzCj?frm=yaochuse03'
	]
	$('.len_group').find('.groupBox').each(function(i){
		$(this).find('a').click(function(){
			$(this).attr('href', mon_groups[i]);
		})
	})

	$('#len_rule').click(function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse06'});
	})
	$('.len_btn').click(function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse07'});
	})
	$('.video').on('mousedown', function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse13'});
	})
	$('.share_sina').click(function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse14'});
	})

	//hack for ie6，页面有锚点和?参数的时候标题有问题
	if($.browser.msie) {
		document.title = '寻找联想S850天使爱美丽';
	}


	// //轮播动画
	// if($('.photos-table a').length > 4){
	// 	//无动画效果
	// 	// $('.btn-left').on('click',function(){
	// 	// 	$('.photos-table a').stop().last().prependTo('.photos-table');
	// 	// });

	// 	// $('.btn-right').on('click',function(){
	// 	// 	$('.photos-table a').stop().first().appendTo('.photos-table');
	// 	// });
  
 //  		//为了产生一些动画效果，采用改变margin-left的值的方法实现。
	// 	$('.btn-left').on('click',function(){
	// 		$('.photos-table a').stop().last().css({'margin-left': '-216px'}).prependTo('.photos-table').animate({'margin-left': '0'}, 200);
	// 	});

	// 	$('.btn-right').on('click',function(){
	// 		$('.photos-table a').stop().first().animate({'margin-left': '-216px'}, 200, function(){$(this).appendTo('.photos-table').css({'margin-left': '0'});});
	// 	});


	// }


});
