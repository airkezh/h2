fml.use(['wap/app/posterWalls'] , function(){
	if (location.href.indexOf('girlfriends/vote/vote') > -1) return;
	var posterWall = this.posterWalls;
	var urlData = { 'frame' : 0, 'access_token' : fml.vars.access_token }

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/activity/girls_rank')
	}

	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster();

	setTimeout(function(){




	//for vote
	$('.goods_wall').on('tap', '.vote_girl', function(){
		var url = '/aj/activity/girls_vote';
		var data = { 'user_id': $(this).attr('uid') };
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
fml.define('wap/page/activity/girlfriends', ['wap/zepto'], function(require, exports){
	$('.vote_gl').on('tap', function(){
		var url = '/aj/activity/girls_vote';
		var data = { 'user_id': $(this).attr('uid') };
		if(fml.vars.mac) data.mac = fml.vars.mac;
		var _self = this;
		$.get(url, data, function(res){
			if (res.code) return;
			location.href = '/activity/girlfriends/vote/success?mac=' + fml.vars.mac + '&access_user=' + data.user_id + '&app_version=' + fml.vars.app_version;
		}, 'json');
	})
});
