// @qianyun,新增管理员管理
fml.define('page/club/clubSuperUser', ['jquery', 'app/checkLogin', 'component/shareTmp', 'ui/confirm'], function(require, exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var confirmDia = require('ui/confirm');
	var shareTmp = require('component/shareTmp');

	var confirmFun = function(text, cbk) {
		new confirmDia({
			content : text,
			width : 370,
			isOverflow : true
		}).onSure(cbk);
	};

	$('.to_shopcheck').on('click', function(){
		var data = {
			'aid' : $(this).attr('data_id')
		}

		$.get('/aw/club/article_shopping_check', data, function(res){
			alert('审核通过');
			window.location.reload();
		});
	});

	$('.to_blacklist').on('click', function(){
		var data = {
			'uid' : $(this).attr('data_id')
		}
		var blackUser = $(this).attr('data_name');
		var warning = '你确定将【'+ blackUser +'】加入黑名单？';
		confirmFun(warning, function(){
			$.get('/aw/club/user_block', data, function(res){
				alert('已经将【'+blackUser+'】加入黑名单');
				window.location.reload();
			});
		});
	});
	var sortData = {};
	var sortTitle = '';
	$('.to_sort').on('click', function(){
		sortData.aid = $(this).attr('data_id');
		var bid = $(this).attr('data_bid');
		var data = {'now_sort': $(this).attr('data_name')};
		var tmp = shareTmp('superClubList', data);
		confirmFun(tmp, updateBoard);
		$('.board_list input[data_id='+bid+']').parents(':first').hide();
	});
	function updateBoard(){
		sortData.bid = $('.board_list input:checked').attr('data_id');
		sortTitle = $('.board_list input:checked').attr('data_title');
		$.get('/aw/club/article_update_board', sortData, function(res){
			alert('已经移动到【'+sortTitle+'】分类');
			window.location.reload();
		});
	}
});