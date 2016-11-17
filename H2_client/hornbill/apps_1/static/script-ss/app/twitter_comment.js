fml.define('app/twitter_comment' , ['app/twitterApi', 'app/checkStatusCode' , 'ui/alert', 'component/cursorPostion' , 'component/shareTmp' ,'jquery' , 'app/smile' , 'app/checkLogin'] , function(require , exports){
	var $ = require('jquery');
	var smile = require('app/smile');
	var check = require('app/checkLogin');
	var share = require('component/shareTmp');
	var checkStatus = require('app/checkStatusCode');
	var cursor = require('component/cursorPostion');
	var twitterApi = require('app/twitterApi').twitterApi;
	var alert = require('ui/alert');
	var isLoaded = true;
	return function(){
		smile.showSmile('.comments' , '.share_smileys' , 'twitter');
		$('.comments').on('click' , '.twitter_comment_reply' , function(){
			var comment_textarea = $(this).parents('#twitter_comment_list').parent().find('.comment_textarea');
			var closest = $(this).closest('li');
			var name = closest.find('.twitter_comment_name').html();
			comment_textarea.val('回复@'+name+':'+' ');
			cursor.setCaretPosition(comment_textarea , comment_textarea.val().length)
		});
		function alertTip(content) {
			new alert({
				content: content, 
				width: 370
			});		
		}
		$('.comments').on('click' , '.comment_btn' , function(){
			if(!check()) return;
			var closest = $(this).closest('.twitter');
			var uid = closest.attr('twitter_author_uid');
			var tid = closest.attr('twitter_id');
			var content = closest.find('textarea').val();
			if(content == "") {
				alertTip('留言不能为空'); return false;
			}
			var data = {
				'stid' : tid,
				'type' : 4,
				'tContent' : content
			}
			var callback = function(response){
				isLoaded = true;
				if (!response) {
					alertTip('系统暂时无法响应，请稍后再试');
					return false;
				} else if (response.code && response.msg) {
					alertTip(response.msg);
					return false;
				}
				var tmpData = {
					tContent : content	
				}
				var tpl = share('twitter_comment_item' , tmpData);
			//	closest.find("#twitter_comment_list").append($(tpl));
				$(tpl).prependTo(closest.find("#twitter_comment_list")).css({'border-top' : '1px dotted #DDDDDD', 'border-bottom' : 'none'});
				closest.find('textarea').val('');	
				var num = closest.find('.twitter_comment_num').text();
				closest.find('.twitter_comment_num').html(+num + 1);
				var reply_num = closest.find('.reply').find('em');		//for replyBox in welfare & topic page
				reply_num.html(+reply_num.text() + 1);
			}
			if(isLoaded){
				twitterApi('create', data, callback);
				isLoaded = false;
			}
		});	
	}
});
