/*common*/
$ = require('jquery');
var check = require('app/checkLogin');
$('.act_vote').on('click' , function(){
	if(!check()) return;
	var _self = this;
	var uid = $(_self).parents('.wrapper_bg').find('img').attr('uid');
	var pid = $(_self).parents('.wrapper_bg').find('img').attr('pid');
	var username = $(_self).parents('.wrapper_bg').find('img').attr('uname');
	$.get('/aj/huodong/nissan_vote' , { 'user_id':uid , 'pid' : pid , 'username' : username } , function(res){
		var $vote = $('.vote_num');
		// $vote.html(parseInt($vote.html())+1);
		$(_self).removeClass('act_vote').addClass('voted');
	} , 'json');
});

