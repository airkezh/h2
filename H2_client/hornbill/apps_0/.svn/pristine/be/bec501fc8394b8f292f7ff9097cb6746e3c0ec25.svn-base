fml.use('app/smile', function(){
	this.showSmile('.content_sg' , '.share_smileys' , 'recom_publish');
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
		var paid = $('.reply_btn').attr('paid');
		var data = {
			'said' : Meilishuo.config.aid,
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
				$('.reply_btn').html('立即回复');
				if(res.code == 40009){
					$('checkBox').show();
					checkcodeDom.removeClass('noCheck');
				}
				changeCode();
				return;
			}
			setTimeout(function(){
				$('.reply_btn').html('回复成功');
			}, 600);
			setTimeout(function(){
                //console.log(location.href.indexOf("?"));
                if (location.href.indexOf("?") != -1) {
                    location.href = location.href.split('#discuss')[0];
                } else {
                    location.href = location.href.split('#reply')[0] + "?page";
                }
			}, 1400);
		});
	})
})

fml.define('page/club/single', ['jquery', 'app/clubAction', 'app/checkLogin'], function(require, exports){
	var $ = require('jquery');
	var clubAction = require('app/clubAction');
	var check = require('app/checkLogin');

	$('.reply_login, .topic_comment').click(function(){
		if(!check()) return false;
	});
	$('.nav_create').click(function(){
		if(!check()) return false;
		if($(this).attr('href').indexOf('javascript')>-1){
			$('.write_off').show();
		}
	});
	$('.write_closed').click(function(){
		$('.write_off').hide();
	});


	clubAction.clubLikeHover('.topic_love', '.bar')
	clubAction.replyDelete('.item_del', '.reply_list', '.reply_item');
	clubAction.topicDelete('.topic_del');
	clubAction.clubLike('.topic_love', '.bar');
	$('.topic_comment').click(function(){
		if(!$('.replay_off').length){
			$('.reply_btn').attr('paid',$(this).attr('paid'));
			$('.reply_sg').focus();
		} else {
			$('body,html').stop(true , true).animate({ scrollTop: $('.replay_off').offset().top-300}, 250);
		}
	});

	var $reply_list = $('.reply_list')
	$reply_list.on('click', '.item_reply', function(){
		if (!check()) return false;
		if(!$('.replay_off').length){
			$('.reply_btn').attr('paid',$(this).attr('paid'));
			var $reply_block = $('.reply_block');
			$reply_block.find('textarea').focus().val('@'+$(this).parents('.reply_con').find('.reply_name').html()+' ');
		} else {
			$('body,html').stop(true , true).animate({ scrollTop: $('.replay_off').offset().top-300}, 250);
		}
	});
	clubAction.replyComment('.comment_btn', '.reply_list');
})