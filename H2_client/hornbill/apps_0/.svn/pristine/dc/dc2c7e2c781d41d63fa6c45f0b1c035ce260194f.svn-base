fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());	
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0
	}
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/airAsia_rank' );
});
fml.define('page/huodong/airAsia' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var logTrack = require('app/tracking');

	$('.step_1 a').on('click' , function(){
		var index = $('.step_1 a').index($(this))%3;
		$('.step_1').hide();
		$('.step_2').show();
		$('.pre').off('click').on('click' , function(){
			$('.step_2').hide();
			$('.step_1').show();
		});
		//图片上传
		upload.init(function(){
			$('.pre').hide();
			$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
			$('.next').show();
			$('.upload_wraper').removeClass('hidden_f');
			$('.upload_area').append('<p>重新上传</p>');
		});
		//提交
		$('.next').off('click').on('click' , function(){
			$(this).attr('disabled','disabled');
			var url = '/aj/huodong/airAsia_create';
			var data = { 'src' : $('.preview').attr('src') , 'img_idx' : index+1 };
			data = $.extend(data, upload.getImgData());
			$.post(url , data , function(r){
				if (!r) return;
				$('.step_2').hide();
				$('.step_3').show().find('img').attr('src', r.data);
				$('#get_vote').off('click').on('click', function(){
					$.post('/aj/huodong/airAsia_myposter','',function(res){
						Meilishuo.config.my_poster = res;
						vote_share();
						$('.step_3').hide();
						$('.step_1').show();
					}, 'json');
				})
			}, 'json');
		});
	});
	//投票
	$('.goods_wall').on('click' , '.act_vote' , function(){
		if(!check()) return;
		var _self = this
			,vote_box = $(_self).parents('.vote_box')
			,data = {
				user_id: vote_box.find('.userInfo').attr('uid')
				,pid : vote_box.find('.goods_pic').attr('pid')
				,username : vote_box.find('.name').html()
			}
		$.get('/aj/huodong/airAsia_vote' , data, function(res){
			var $vote = $(_self).parents('.poster_grid').find('.vote_num');
			$vote.html(parseInt($vote.html())+1);
			$(_self).removeClass('act_vote').addClass('voted').html('已投票');
		}, 'json');
	});
	//拉投票
	function vote_share(){
		if(!check()) return;
		var html = shareTmp('share' , Meilishuo.config.my_poster);
		var share_pop = new dialogUI({
			'content' : html,
			'width' : '728px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
				$('.dialogContent').css('background', 'none');
			}
		});
		$('#close').off('click').on('click' , function(){
			share_pop.drive.destroyModel();
		});
		var share_index = 0;
		$('.share_pop li').off('click').on('click' , function(){
			share_index = $('.share_pop li').index($(this));
			var style = $(this).attr('class');
			$(this).removeClass().addClass(style + '_s');
			var otherLi = $(this).siblings('li');
			otherLi.each(function(){
				var otherStyle = $(this).attr('class');
				if(otherStyle.indexOf('_s') > -1){
					$(this).removeClass().addClass(otherStyle.slice(0 , -2));
				}
			});
		});
		$('.share_btn').off('click').on('click' , function(){
			var s_url = 'http://www.meilishuo.com/biz/airAsia/vote/?user_id=' + Meilishuo.config.user_id+'&frm=yahang101';
			var s_desp = '#亚航女生月特辑－宠爱自己我买单# 女人节我要好好Treas一下！我已经在美丽说提交了我的宠爱海报，亲们快来为我投一票，支持我实现梦想吧！';
			var s_title = '亚航女生月特辑－宠爱自己我买单';
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
	}
	$('#vote_share').on('click' , function(){
		vote_share();
	});
});