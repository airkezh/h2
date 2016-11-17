fml.define('page/huodong/biduke' , ['jquery','component/shareTmp','ui/dialog', 'app/doota/timedown','app/shareTo','app/checkLogin','app/tracking'] , function(require, exports){
	var timedown = require('app/doota/timedown'),
		share = require('app/shareTo'),
		check = require('app/checkLogin'),
		tracking = require('app/tracking'),
		shareTmp = require('component/shareTmp'),
		dialog = require('ui/dialog');

	var $_this = this;
	//分享到新浪
	$('#share_sina').on('click' , function(){
			var s_url = location.href + '?frm=biduke';
			var s_desp = '战痘一下，美丽一夏！美丽说联手比度克明星祛痘产品，推出超值夏日“战痘礼盒”，为每天“吃饭睡觉打痘痘”的妹纸们排忧解难！！迎接美艳的夏日， Are you ready?赶紧戳这里：' + s_url;
			var s_img = 'http://i.meilishuo.net/css/images/activity/zhandou/sharebiduke.jpg';
			share.shareToWeibo(s_url, s_desp, s_img);
			logTrack.cr('biduke', {'frm': 'shareSina'});
	});

    $('.time').each(
    	function($_this){
    		var _this = $(this);
    		_this.removeClass('time');
    		timedown.down(this, _this.attr('remain') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
			.onTimeOver(function(){
				window.location.reload(); 
    		});

    	})

	$('.poster_likes').on('click',function(){
			if (!check()) return false;
	    	var this_poster_liskes = $(this);
			var data = {
				'tid': this_poster_liskes.attr('tid'),
				'like': 1
			};
			$.post('/aj/huodong/bcoupon', data, function(res){
				this_poster_liskes.find('.likes_status').html('<i>&nbsp;</i>已喜欢');
				var thifnd=this_poster_liskes.find('.poster_like_num');
				var postnum=parseInt(thifnd.text());
				thifnd.text(postnum+1);
				this_poster_liskes.unbind('click').removeClass('.poster_likes')

			},"json");
	    });
	
	//弹窗关闭
	function closeDialog () {
		$('.close_dailog').on('click',function(){
			$('#closeDialog').trigger('click');
		});
	}
    $('.coupon').on('click' , function(){
    	if (!check()) return false;
		var data = {
			'tid': $(this).attr('tid'),
		}
		$.post('/aj/huodong/bcoupon', data, function(res){
			var html = shareTmp("Huodong_biduke_lj", {'data':res.message});
			var close = new dialog({title : "优惠劵" , width : 405 , content : html });
			closeDialog();
		},"json")

	});
});
