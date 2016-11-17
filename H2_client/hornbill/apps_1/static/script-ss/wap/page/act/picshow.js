fml.use(['wap/app/posterWalls'] , function(){
	if (location.href.indexOf('picshow/vote') > -1) return;
	var posterWall = this.posterWalls;
	var urlData = { 'frame' : 0, 'access_token' : fml.vars.access_token, 'banner_id' : fml.vars.banner_id}

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/act/picshow_rank')
	}

	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster();

	setTimeout(function(){




	//for vote
	$('.goods_wall').on('tap', '.vote_girl', function(){
		var url = '/aj/act/picshow_vote';
		var data = { 'user_id': $(this).attr('uid'), 'banner_id' : fml.vars.banner_id };
		if(fml.vars.mac) data.mac = fml.vars.mac;
		if(fml.vars.access_token) data.access_token = fml.vars.access_token;
		var _self = this;
		$.get(url, data, function(res){
			if (res.code) return;
			var $vote = $(_self).parents('.poster_grid').find('.vote_num');
			$vote.html(parseInt($vote.html())+1);
			$(_self).removeClass('vote_girl').removeClass('btn').addClass('voted').html('已投票');
		}, 'json');
	})
	}, 1500);
});
//回流vote
fml.define('wap/page/act/picshow', ['wap/zepto'], function(require, exports){
	$('.vote_gl').on('tap', function(){
		var url = '/aj/act/picshow_vote';
		var data = { 'user_id': $(this).attr('uid'), 'banner_id' : fml.vars.banner_id };
		if(fml.vars.mac) data.mac = fml.vars.mac;
		var _self = this;
		$.get(url, data, function(res){
			if (res.code) return;
			location.href = '/act/picshow/success?mac=' + fml.vars.mac + '&access_user=' + data.user_id + '&app_version=' + fml.vars.app_version + '&banner_id=' + fml.vars.banner_id;
		}, 'json');
	})
});
