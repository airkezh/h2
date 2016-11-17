fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());	
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'actName' : 'oubolai'
	}
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/vote_haibao_wall' );
});
fml.define('page/huodong/obolai' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
    var dialogUI = require('ui/dialog');
    var check = require('app/checkLogin');
    var shareTmp = require('component/shareTmp');
    var upload = require('app/uploadPhoto');
    var share = require('app/shareTo');
    var pin = require('component/waterfall');
    var logTrack = require('app/tracking');
	
	$('.step1 li').on('click' , function(){
		var index = $('.step1 li').index($(this));
		$('.step1').hide();
		$('.step2').show();
		$('.pre').off('click').on('click' , function(){
			$('.step2').hide();
			$('.step1').show();
		});
		//图片上传
		upload.init(function(){
			$('.pre').hide();
			$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
			$('.lip_pic').show();
			$('.next').show();
		});
		//提交
		$('.next').off('click').on('click' , function(){
			$(this).attr('disabled','disabled');
			var url = '/aj/huodong/oubolai_tui';
			var data = { 'actName' : 'oubolai' , 'src' : $('.preview').attr('src') , 'img_idx' : index+1 };
			data = $.extend(data, upload.getImgData());
			$.post(url , data , function(r){
				if (!r) return;
				var html = shareTmp('succeed');
				var suc_pop = new dialogUI({
					'content' : html,
					'width' : '410px',
					'onChange' : function(){
						$('#dialogTitle').hide();
						$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
					}
				});
			} , 'json');
		});
	});
	//投票
	$('.goods_wall').on('click' , '.act_vote' , function(){
		if(!check()) return;
		var _self = this;
		var uid = $(_self).parents('.vote_box').find('.userInfo').attr('uid');
		var pid = $(_self).parents('.vote_box').find('.goods_pic').attr('pid');
		var username = $(_self).parents('.vote_box').find('.name').html();
		$.get('/aj/huodong/obolai_vote' , {'user_id' : uid , 'pid' : pid , 'username' : username} , function(res){
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
		var share_index = -1;
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
			var s_url = 'http://www.meilishuo.com/biz/vote_poster_act/obolai_share/?user_id=' + Meilishuo.config.user_id;
			var s_desp = '#珠光宝气过圣诞#兄弟姐妹们，我在参加欧珀莱圣诞专题活动，秀出了我最渴望的Party Style，现在急需大家投票支持，快来为我献上你宝贵的一票吧！等你哦~ >>';
			var s_title = '欧珀莱  珠光宝气过圣诞';
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
