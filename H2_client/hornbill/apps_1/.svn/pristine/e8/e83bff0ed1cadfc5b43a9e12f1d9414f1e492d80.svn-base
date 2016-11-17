fml.define('page/huodong/airAsia_vote' , ['jquery', 'app/checkLogin'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');

	//投票
	$('.vote_btn').on('click', function(){
		if(!check()) return;
		var _self = this
			,data = {
				user_id: $(_self).attr('user_id')
				,pid : $(_self).attr('pid')
				,username : $(_self).attr('username')
			}
		$.get('/aj/huodong/airAsia_vote' , data, function(res){
			var vote_con = $(_self).parents('.vote_con')
				,$vote = vote_con.find('.vote_num')
				,$next_vote = vote_con.find('.next_num')
				,next_num = parseInt($next_vote.html())-1;
			$vote.html(parseInt($vote.html())+1);
			next_num = next_num > 0 ? next_num : 0;
			$next_vote.html(next_num);
			$(_self).removeClass('vote_btn').addClass('has_vote').html('已投票');
		}, 'json');
	});
});