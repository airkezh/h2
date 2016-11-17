fml.use('app/clubAction' , function(){
	this.clubLike('.cl_like', '.cnt_item');
});
fml.use('app/userFollow' , function(){
	this('.addUserFollow' , '.removeUserFollow' , '.removeUserFollow', 'red_follow' , 'pink_follow');
});
fml.define('page/huodong/mz_beautyBoxShow' , ['jquery', 'ui/alert','app/checkLogin', 'app/clubApi'] , function(require , exports){
	var clubApi = require('app/clubApi').clubApi;
	var check = require('app/checkLogin');

	$('.removeUserFollow').live('click', function(){
		var likeDom = $(this).parents('.tr_con').find('.like i');
		var likeNum = likeDom.attr('data');
		likeNum --;
		likeDom.attr('data', likeNum);
		likeDom.html('粉丝数  '+likeNum);
	});
	$('.addUserFollow').live('click', function(){
		var likeDom = $(this).parents('.tr_con').find('.like i');
		var likeNum = likeDom.attr('data');
		likeNum ++;
		likeDom.attr('data', likeNum);
		likeDom.html('粉丝数  '+likeNum);
	});

	$('.c_like').live('click', function(){
		if ($(this).attr('uid') == Meilishuo.config.user_id) return;
		if (!check()) return false;
		var data = {
			'aid' : $(this).attr('aid')
		}
		clubApi('like', data);
		var $likeNum = $(this).parents('.tr_con').find('.like span');
		var num = parseInt($likeNum.text()) || 0;
		if($(this).hasClass('liked')){
			num--;
			$(this).html('<b class="mz_icon">&nbsp;</b>支持她');
			$(this).removeClass('liked');
		} else{
			num ++;
			$(this).html('已支持');
			$(this).addClass('liked');
		}
		$likeNum.html(num||'');

	});
	$('.likes_status').live('click', function(){
		if ($(this).attr('uid') == Meilishuo.config.user_id) return;
		if (!check()) return false;
		var data = {
			'aid' : $(this).attr('aid')
		}
		clubApi('like', data);
		var $likeNum = $(this).parents('.poster_likes').find('.poster_like_num');
		var num = parseInt($likeNum.text()) || 0;

		if($(this).hasClass('liked')){
			num--;
			$(this).html('<i class="lm_love2">&nbsp;</i>喜欢');
			$(this).removeClass('liked');
		} else{
			num ++;
			$(this).html('已喜欢');
			$(this).addClass('liked');
		}

		$likeNum.html(num||'');
	});
});
