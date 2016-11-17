fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());	
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'actName' : 'webcode'
	}
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/webcode_haibao_wall' );
});
fml.define('page/huodong/wetcode' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
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
			$('.next').show();
		});
		//提交
		$('.next').off('click').on('click' , function(){
			$(this).attr('disabled','disabled');
			var url = '/aj/huodong/webcode_create';
			var data = { 'actName' : 'webcode' , 'src' : $('.preview').attr('src') };
			data = $.extend(data, upload.getImgData());
			$.post(url , data , function(r){
				if (!r) return;
				var html = shareTmp('succeed', {'spic':r.data});
				var suc_pop = new dialogUI({
					'content' : html,
					'width' : '600px',
					'onChange' : function(){
						$('#dialogTitle').hide();
						$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});

					}
				});

		$('.ltp').on('click',function(){
			$('#closeDialog').trigger('click');
			window.location.href='http://www.meilishuo.com/biz/vote_poster_act/wetcode/#picwall';
			return false;
		});

			} , 'json');


		});

 
	//活动介绍
	$('.activity').on('click' , function(){
		var html = shareTmp('flayer_pro');
		var activity_pop = new dialogUI({
			'content' : html,
			'width' : '870px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});

		$('#close').off('click').on('click' , function(){
			activity_pop.drive.destroyModel();
		});
	});
	//投票
	$('.goods_wall').on('click' , '.act_vote' , function(){
		if(!check()) return;
		var _self = this;
		var uid = $(_self).parents('.vote_box').find('.userInfo').attr('uid');
		var pid = $(_self).parents('.vote_box').find('.goods_pic').attr('pid');
		var username = $(_self).parents('.vote_box').find('.name').html();
		$.get('/aj/huodong/webcode_vote' , {'user_id' : uid , 'pid' : pid , 'username' : username} , function(res){
			var $vote = $(_self).parents('.poster_grid').find('.vote_num');
			$vote.html(parseInt($vote.html())+1);
            $(_self).removeClass('act_vote').addClass('voted').html('已投票');
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
			var s_url = 'http://www.meilishuo.com/biz/vote_poster_act/wetcode_share/?user_id=' + Meilishuo.config.user_id;
			var s_desp = '要想肌肤水润细腻更添年轻光采？秘密尽在补水专家——水密码水漾焕能细肤水！小伙伴们，快来为我的水润美肌投票吧！ >>';
			var s_title = '水密码 舞动你的水润肌';
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
});
