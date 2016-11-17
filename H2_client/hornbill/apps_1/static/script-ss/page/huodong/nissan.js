fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'page' : query.page || 0
	}

	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/nissan_rank' , {'subScroll': '.hb_box'});
});

fml.define('page/huodong/nissan' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var logTrack = require('app/tracking');
	var style='';
	var car='';


	function getradiovalue(tagname){
		var radio=document.getElementsByName(tagname);
		for(var i = 0;i < radio.length;i++){
			if(radio[i].checked==true){
				return radio[i].value;
			}
		}
		return '';
	}


	$('.step1 label').on('click',function(){
		var index=$(this).index(),
			showli=$('.show-type li');
		showli.removeClass('pink-b');
		showli.eq(index).addClass('pink-b');
	})

	//图片上传
	upload.init(function(){
		$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
		$('.next').show();

	});

	//提交
	$('.next').on('click' , function(){
		$(this).attr('disabled','disabled');
		var url = '/aj/huodong/nissan_tj';
		var style=getradiovalue("sel1"); 
		var car=getradiovalue("sel2"); 
		var data = {'src' : $('.preview').attr('src') , 'style':style,'car':car};
		if(car.length==0 || style.length==0){
			alert('妹纸别捉急，只有完成全部步骤，才能秀出你刚刚好的美，参与现金券抽奖哦');
			return ;
		}
		data = $.extend(data, upload.getImgData());
		$.post(url , data , function(r){
			if (!r) return;
			var html = shareTmp('share' , {'act_pic':r.data.pic_in_act});
			var share_pop = new dialogUI({
				'content' : html,
				'width' : '800px',
				'onChange' : function(){
					$('#dialogTitle').hide();
					$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
				}
			});
			$('#close').off('click').on('click' , function(){
				share_pop.drive.destroyModel();
				window.location.reload();
			});
			var share_index = 0;
			$('.share_pop li').on('click' , function(){
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
			$('.share_btn').on('click' , function(){
				var s_url = 'http://www.meilishuo.com/biz/huodong/nissan_share/?user_id=' + Meilishuo.config.user_id;
				var s_desp = '我在美丽说参加#玛驰，我的四轮包包，秀出你刚刚好的美#，是盆友就快来为我投上一票！悄悄告诉你，参加活动还有现金券抽哦，还不快来？！';
				var s_title = '玛驰四轮包包 秀出你刚刚好的美';
			    var s_img = $('.share_pop img').attr('src');
				if(share_index == 0){
					share.shareToWeibo(s_url, s_desp, s_img);	
				}else if(share_index == 2){
					share.shareToQzone(s_url , s_desp, '', s_title , s_img);	
				}else if(share_index == 1){
					share.shareToQQ(s_url , s_desp , s_img);	
				}else{
					alert('请选择一个平台分享');
					return false;
				}
	            share_pop.drive.destroyModel();
	            window.location.reload();
			});
			$('.lottery').on('click',function(){
				var url = '/aj/huodong/nissan_lottery';
				//var thelottery=$(this);
				$.post(url ,function(res){
					if (!res) return;
					var sechtml = shareTmp('draw' , {'coupon_code':res.data});
					var draw_pop = new dialogUI({
						'content' : sechtml,
						'width' : '498px',
						'onChange' : function(){
							$('#dialogTitle').hide();
							$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
						}
					});	

					//thelottery.removeClass('lottery').addClass('lotteryed');
					$('#close').off('click').on('click' , function(){
						draw_pop.drive.destroyModel();
						window.location.reload();
					});

				})
			});

		} , 'json');


	});



	//拉投票
	$('#vote_share').on('click' , function(){
		//$(this).attr('disabled','disabled');
		var html = shareTmp('share1');
		var share_pop1 = new dialogUI({
			'content' : html,
			'width' : '800px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});

		$('.lottery').on('click',function(){
			var url = '/aj/huodong/nissan_lottery';
			//var thelottery=$(this);
			$.post(url ,function(res){
				if (!res) return;
				var sechtml = shareTmp('draw' , {'coupon_code':res.data});
				var draw_pop = new dialogUI({
					'content' : sechtml,
					'width' : '498px',
					'onChange' : function(){
						$('#dialogTitle').hide();
						$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
					}
				});	
				//thelottery.removeClass('lottery').addClass('lotteryed');
				$('#close').on('click' , function(){
					draw_pop.drive.destroyModel();
					window.location.reload();
				});

			})
		});	

		$('#close').on('click' , function(){
			share_pop1.drive.destroyModel();
			if(lottery.is_lottery==0){
				window.location.reload();
			}
		});
		var share_index = 0;
		$('.share_pop li').on('click' , function(){
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
		$('.share_btn').on('click' , function(){
			var s_url = 'http://www.meilishuo.com/biz/huodong/nissan_share/?user_id=' + Meilishuo.config.user_id;
			var s_desp = '我在美丽说参加#玛驰，我的四轮包包，秀出你刚刚好的美#，是盆友就快来为我投上一票！悄悄告诉你，参加活动还有现金券抽哦，还不快来？！';
			var s_title = '玛驰四轮包包 秀出你刚刚好的美';
		    var s_img = $('.share_pop img').attr('src');
			if(share_index == 0){
				share.shareToWeibo(s_url, s_desp, s_img);	
			}else if(share_index == 2){
				share.shareToQzone(s_url , s_desp, '', s_title , s_img);	
			}else if(share_index == 1){
				share.shareToQQ(s_url , s_desp , s_img);	
			}else{
				alert('请选择一个平台分享');
				return false;
			}
	        share_pop1.drive.destroyModel();
	        window.location.reload();
		});
	});

	//投票
	$('.goods_wall').on('click' , '.act_vote' , function(){
		if(!check()) return;
		var _self = this;
		var uid = $(_self).parents('.vote_box').find('.userInfo').attr('uid');
		var pid = $(_self).parents('.vote_box').find('.goods_pic').attr('pid');
		var username = $(_self).parents('.vote_box').find('.name').html();
		$.get('/aj/huodong/nissan_vote' , {'user_id' : uid , 'pid' : pid , 'username' : username} , function(res){
			var $vote = $(_self).parents('.poster_grid').find('.vote_num');
			$vote.html(parseInt($vote.html())+1);
            $(_self).removeClass('act_vote').addClass('voted');
		} , 'json');	
	});

});
