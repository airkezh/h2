fml.use(['wap/app/posterWalls'] , function(){
	var posterWall = this.posterWalls;
	var urlData = {
		'frame' : 0,
		'access_token' : fml.vars.access_token,
		'id' : fml.vars.id,
		'cid' : fml.vars.cid,
		'row' : 2,
		'order' : fml.vars.order
	}

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/biz/girls_rank')
	}

	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster();

	setTimeout(function(){
		//for vote
		$('.goods_wall').on('click', '.vote_girl', function(){
			var url = '/aj/biz/girls_vote';
			var data = {
				'user_id': $(this).attr('uid'),
				'cid': fml.vars.cid,
				'id': fml.vars.id,
				'access_token': fml.vars.access_token
			};
			var _self = this;
			$.get(url, data, function(res){
				if (res.data == 0) return;
				var $vote = $(_self).parents('.poster_grid').find('.vote_num');
				$vote.html(parseInt($vote.html())+1);
				$(_self).removeClass('vote_girl').removeClass('btn').addClass('voted').html('谢谢支持！');
			}, 'json');
		})
	}, 1500);
});
//回流vote
fml.define('wap/page/biz/girlfriends_2', ['wap/zepto'], function(require, exports){
	$('.js_upload_btn').on('click', function(){
		window.location.href = '/biz/girlfriends_2/page/welcome?cid='+fml.vars.cid+'&app_access_token='+fml.vars.access_token+'&app_version='+fml.vars.app_version+'&r='+fml.vars.r;
	});
});
