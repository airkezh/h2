fml.define('app/replyBox', ['jquery', 'app/groupApi', 'app/twitterApi', 'app/twitter_comment', 'app/checkLogin', 'app/page', 'ui/confirm'], function(require, exports){
	var $ = require('jquery');
	var confirmDia = require('ui/confirm');
	var genPage = require('app/page');
	var check = require('app/checkLogin');
	var twitterApi = require('app/twitterApi').twitterApi;
	var groupApi = require('app/groupApi').groupApi;
	var twitterComment;

	var $reply = $('.comments');
	$reply.on('click', '.pic_small', function(){
		$(this).hide();
		$(this).siblings('.pic_big').show();
		$(this).parents('.pic_con').find('.goods_title').show();
		var $pObj = $(this).parents('.g_twitter');
		$pObj.find('.reply').length>0 && $pObj.find('.reply_box').is(':hidden') && $pObj.find('span.reply').click();
		twitterComment || (twitterComment = require('app/twitter_comment'))();
	});
	$reply.on('click', '.pic_big', function(){
		$(this).hide();
		$(this).siblings('.pic_small').show();
		$(this).parents('.pic_con').find('.goods_title').hide();
		var $pObj = $(this).parents('.g_twitter');
		$pObj.find('.reply').length>0 && $pObj.find('.reply_box').hide();
	});

	$reply.on('mouseenter', '.c_love', function(){
		if ($(this).attr('aid') == Meilishuo.config.user_id) $(this).siblings('.love_pro').show();
	}).on('mouseleave', '.c_love', function(){
		if ($(this).attr('aid') == Meilishuo.config.user_id) $(this).siblings('.love_pro').hide();
	});

	$reply.on('click', '.c_love', function(){
		if(!check()) return false;
		if ($(this).attr('aid') == Meilishuo.config.user_id) return false;
		var tid = $(this).attr('tid');
		var data = {'stid' : tid};
		var self = this;
		var callback = function(res){
			var $like = $(self).siblings('.count_like');
			var num = $like.text() || 0;
			if($(self).is('.notloveit')){
				$(self).removeClass('notloveit').addClass('loveit');
				$like.text(parseInt(num)+1);
			} else if($(self).is('.loveit')) {
				$(self).removeClass('loveit').addClass('notloveit');
				num = num-1>0 ? num-1 : '';
				$like.text(num);
			}
		}
		twitterApi('like', data, callback);
	});
	
	$reply.on('click', 'span.reply', function(){
		var $pObj = $(this).parents('.g_twitter');
		var $reply = $pObj.find('.reply_box');
		if($(this).find('em').text() !=0 && $pObj.find('#twitter_comment_list').find('li').length == 0) {
			var tid = $pObj.find('.c_love').attr('tid');
			var data = {
				pageNav : $pObj.find('.showPagingNav'), 
				pObj : $pObj, 
				totalNum : parseInt($(this).find('em').text()),
				tid : tid
			};
			genPage(data);
		}
		twitterComment || (twitterComment = require('app/twitter_comment'))();
		if ($reply.is(':hidden')) $reply.show().find('.comment_textarea').focus();
		else $reply.hide();
	});
	
	var confirmFun = function(text, cbk) {
		new confirmDia({
			content : text,
			width : 370,
			isOverflow : true
		}).onSure(cbk);
	}

	$reply.on('click', '.delete', function(){
		var mSelf = this;
		var cbk = function(){
			var $pObj = $(mSelf).parents('.g_twitter');
			groupApi('remove', {'twitter_id':$pObj.attr('twitter_id')}, function(){})
			$pObj.remove();
		}
		confirmFun('您确定要将该内容删除?', cbk);
	});
	$reply.on('click', '.set_elite', function(){
		var mSelf = this;
		var cbk = function(){
			groupApi('elite', {'type':2, 'twitter_id':$(mSelf).parents('.g_twitter').attr('twitter_id')})
			$('<div class="jing"></div>').insertBefore($(mSelf).parents('.twitter_r').find('h3'));
			$(mSelf).removeClass('set_elite').addClass('rm_elite').html('取消加精');
		}
		confirmFun('您确定要将该内容加精?', cbk);
	});
	$reply.on('click', '.rm_elite', function(){
		var mSelf = this;
		var cbk = function(){
			groupApi('elite', {'type':2, 'twitter_id':$(mSelf).parents('.g_twitter').attr('twitter_id')})
			$(mSelf).parents('.twitter_r').find('.jing').remove();
			$(mSelf).removeClass('rm_elite').addClass('set_elite').html('加精');
		}
		confirmFun('您确定要将该内容取消加精?', cbk);

	});
	$reply.on('click', '.set_top', function(){
		var mSelf = this;
		var cbk = function(){
			var $twitter = $(mSelf).parents('.g_twitter');
			groupApi('elite', {'type':1, 'twitter_id':$twitter.attr('twitter_id')})
			$('<div class="ding"></div>').insertBefore($twitter.find('h3'));
			$('#group_twitter_list').prepend($twitter);	
			$twitter.find('.set_elite').removeClass('set_elite').addClass('rm_elite').html('取消加精');
			$(mSelf).removeClass('set_top').addClass('rm_top').html('取消置顶');
		}
		confirmFun('您确定要将该内容置顶?', cbk);
	});
	$reply.on('click', '.rm_top', function(){
		var mSelf = this;
		var cbk = function(){
			groupApi('elite', {'type':1, 'twitter_id':$(mSelf).parents('.g_twitter').attr('twitter_id')})
			$(mSelf).parents('.twitter_r').find('.ding').remove();
			$(mSelf).removeClass('rm_top').addClass('set_top').html('置顶');
		}
		confirmFun('您确定要将该内容取消置顶?', cbk);
	});
})
