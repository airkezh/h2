fml.use(['wap/app/posterWalls'] , function(){
	var posterWall = this.posterWalls;
	var urlData = { 'frame' : 0, 'type' : fml.vars.type , 'access_token' : fml.vars.access_token }

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/activity/sale_vote_haibao');
	}
	
	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster();

	//for vote
	setTimeout(function(){
	$('.goods_wall').on('tap', '.vote_girl', function(){
		$('.share').show();
		var url = '/aj/activity/sale_vote';
		var data = { 'tid': $(this).parents('.poster_wall').attr('twitter_id') , 'mac' : $(this).attr('mac') , 'type' : fml.vars.type };
		var _self = this;
		$.get(url, data, function(res){
			if (res.code) return;
			var $vote = $(_self).parents('.poster_grid').find('.icon_vote');
			$vote.html(parseInt($vote.html())+1);
			$(_self).removeClass('vote_girl').removeClass('btn').addClass('voted').html('已投票');
		}, 'json');
	})
	}, 1500);
});
fml.define('wap/page/activity/sale_vote/sale_vote' , [] , function(require , exports){ });
