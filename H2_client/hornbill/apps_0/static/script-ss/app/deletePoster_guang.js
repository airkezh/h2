fml.define('app/deletePoster_guang' , ['app/twitterApi', 'jquery' , 'component/waterfall' , 'ui/alert' ,'ui/confirm' , 'component/urlHandle' , 'component/shareTmp'] , function(require, exports){
	var $ = require('jquery');
	var pin = require('component/waterfall');
	var confirm = require('ui/confirm');
	var Alert = require('ui/alert');
	var urlHandle = require('component/urlHandle');
	var shareTmp = require('component/shareTmp');
	var twitterApi = require('app/twitterApi').twitterApi;
	var deletePoster = function(type,btn) {
		var poster = $(btn).closest('.poster_grid');
		var twitter_author_uid = poster.attr('twitter_author_uid');
		var tid = poster.attr('twitter_id');
		_remove(type, poster, tid);
	}
	var deleteTrigger = function(){
		$('.goods_wall').on('click' , '.poster_del' , function(){
			deletePoster('poster',this);
		}).on('click' , '.dm_del' , function(){
            deletePoster('poster_dm',this);
        })
	}
	var deleteLike = function(){
		$('.goods_wall').on('click' , '.poster_dellike' , function(){
			deletePoster('like',this);
		});
	}
	var deleteComment = function(){
		$('#twitter_comment_list').on('click' , '.twitter_del_comment_btn' , function(){
			var tid = $(this).attr('tid');	
			var uid = $(this).attr('uid');
			if($(this).attr('isshow') == 1){
				_spamTwitter.call(this , tid , uid , 'comment');	
			}else if($(this).attr('isshow') == 2){
				_policeTwitter.call(this , tid , uid , 'comment');
			}
		});	
	}
	var deleteTwitter = function(){
		$('.twitter').on('click' , '.twitter_del' , function(){
			var tid = $(this).closest('.twitter').attr('twitter_id');	
			var uid = $(this).closest('.twitter').attr('twitter_author_uid');	
			if($(this).attr('isshow') == 1){
				_spamTwitter.call(this , tid , uid);	
			}else if($(this).attr('isshow') == 2){
				_policeTwitter.call(this , tid);
			}else{
				_removeTwitter.call(this , tid);
			}
		});	
	}
	function _spamTwitter(tid , uid , type){
		var tmpData = {
			uid : uid	
		}
		var html = shareTmp('spamDialog' , tmpData);

		var confirmdialog = new confirm({
			title : '删除封禁管理',
			width : 500,
			transparent : true,
			content : html,
			isoverflow : true,
			discover : true
		});
		var $spamDel = $('#spam_pop');
		confirmdialog.onSure($.proxy(function(){
			var _this = this;
			var data = {
				twitter_id : tid
			}
			var callback = function(){
				if(type){
					$(_this).closest('li').remove();		
				}else{
					urlHandle.redirect('/ihome');	
				}
			}
			if ($spamDel.find('.delAllTwitter').attr("checked")) data['clean_up'] = 1;
			if ($spamDel.find('.closureUser').attr("checked")) data['ban_week'] = 1;
			if ($spamDel.find('.deleteUser').attr("checked")) data['delete_user'] = 1;
			twitterApi('destroy_spam', data, callback);
		}, this));
	}
	function _policeTwitter(tid) {
		var html = '<p>确定删除该内容?</p>';
		var confirmdialog = new confirm({
			width : 370,
			transparent : true,
			content : html,
			isoverflow : true
		});
		confirmdialog.onSure($.proxy(function(){
			var _this = this;
			var data = {
				twitter_id : tid
			}
			var callback = function(){
				if(type){
					$(_this).closest('li').remove();		
				}else{
					urlHandle.redirect('/ihome');	
				}
			}
			twitterApi('destroy_spam', data, callback);
		}, this));
	}
	function _removeTwitter(tid) {
		var html = '<p>确定删除该内容?</p>';
		var confirmdialog = new confirm({
			width : 370,
			transparent : true,
			content : html,
			isoverflow : true
		});
		confirmdialog.onSure($.proxy(function(){
			var data = {
				twitter_id : tid
			}
			var callback = function(){
				urlHandle.redirect('/ihome');	
			}
			twitterApi('destroy', data, callback);
		}, this));
	}
	function _remove(type, poster, tid) {
		var html = '<p>确定删除该内容?</p>';
		var confirmDialog = new confirm({
			width : 370,
			transparent : true,
			content : html,
			isOverflow : true
		});

		confirmDialog.onSure($.proxy(function(){
			var callback = function(res){
				if (res.code){
				   new Alert({
						width: 380,
						content: res.msg,
						discover: false 
					})
				}else {
					poster.remove();
					pin.reload();
				}
				
			}
            if( 'like' == type) {
                var data = {'stid' : tid};
				twitterApi('like', data, callback);
			} else if('poster' == type) {
				var data = {twitter_id : tid}
				twitterApi('destroy', data, callback);
			} else {
                var data = {tid : tid}
				$.get('/aw/poster_dm_del/', data ,callback , 'json');
			}
			//$('.goods_wall').masonry('reload');
		}, this));
	}

	exports.deletePoster = deletePoster;
	exports.deleteTrigger = deleteTrigger;
	exports.deleteLike = deleteLike;
	exports.deleteTwitter = deleteTwitter;
	exports.deleteComment = deleteComment;
});
