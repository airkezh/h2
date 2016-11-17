fml.use('app/smile', function(){
	this.showSmile('.reply_block' , '.share_smileys' , 'recom_publish');
});

fml.define('page/club/recommend', ['jquery', 'app/clubAction', 'app/checkLogin' ,'app/label' , 'app/beautyDecl' ], function(require, exports){
	var $ = require('jquery');
	var clubAction = require('app/clubAction');
	var check = require('app/checkLogin');
	var $reply_list = $('.reply_list');

	$reply_list.on('click', '.item_reply', function(){
		if (!check()) return false;
		var $reply_block = $('.reply_block');
		var isInThis = $(this).parents('.reply_item').find('.reply_block');
		if (!isInThis.length) {
			$(this).parents('.reply_item').append($reply_block);
			$reply_block.show().find('textarea').focus().val('@'+$reply_block.parents('.reply_item').find('.reply_name').html()+' ');
			$('.reply_btn').attr({'said':$(this).attr('said'), 'paid':$(this).attr('paid')});
		} else if($reply_block.is(':hidden')) {
			$reply_block.show().find('textarea').focus().val('@'+$reply_block.parents('.reply_item').find('.reply_name').html()+' ');
		} else {
			$reply_block.hide();
		}
	});
	clubAction.replyComment('.comment_btn', '.reply_list');


	require('app/label')();
	require('app/beautyDecl')();
});

fml.use(['app/clubAction', 'jquery', 'app/sharePost', 'app/checkLogin', 'app/checkcode', 'ui/dialog', 'ui/alert', 'component/shareTmp', 'app/clubApi'], function(){
	var $ = this.jquery;
	var clubAction = this.clubAction;
	var dialogShow = this.sharePost.dialogShow;
	var check = this.checkLogin;
	var checkcode = this.checkcode;
	var shareTmp = this.shareTmp;
	var dialogUI = this.dialog;
	var clubApi = this.clubApi.clubApi;
	var alert = this.alert;

	var options = {};

	var alertTip = function(content, cbk) {
		cbk = cbk || function(){};
		new alert({
			content: content, 
			width: 370,
			onClose: cbk
		});
	}

	//验证码
	var initCode = function(){
		if($('.checkImage').find('img').attr('isblank') === 'true'){
			$('.checkImage').find('img').attr('isblank', 'false');
		}
		$('.checkImage').bind('click',changeCode);
		showCode();
	};
	var changeCode = function(){
		showCode();
		$('#checkcode').val('').focus();
	};
	var showCode = function(){
		checkcode(function(){
			$('.checkImage').unbind('click');
			var t = setTimeout(function(){
				$('.checkImage').bind('click',changeCode);
			}, 600);
		});
	};

	//验证码初始化
	initCode();

	//submit
	var isAjax = false;
	$('.reply_btn').click(function(){
		if(!check()) return false;
		if(isAjax) return;
		isAjax = true;
		options.tContent = $.trim($('.reply_sg').val());
		if(options.tContent == '' && !options.type){isAjax = false;return alertTip('还没有输入回复哦');}

		var checkcodeDom = $('#checkcode');
		if(!checkcodeDom.hasClass('noCheck')){
			var checkcodes = checkcodeDom.val();
			if(checkcodes.length < 4){
				alertTip('请填写完整的验证码~');
				isAjax = false;
				return;
			}
		}

		$('.reply_btn').html('回复中...');
		if (!options.type) options.type = 5;
		var said = $(this).attr('said');
		var paid = $(this).attr('paid');
		var data = {
			'said' : said,
			'paid' : paid,
			'tids' : [options]
		}
		if(checkcodes){
			data.checkcode = checkcodes;
		}
		clubApi('reply', data, function(res){
			if (!res || res.code) {
				isAjax = false;
				alertTip(res.msg);
				return;
			}
			$('.reply_btn').html('回复成功');
			setTimeout(function(){
				location.href = location.href.split('#reply')[0];
			}, 500);
		});
	})
});