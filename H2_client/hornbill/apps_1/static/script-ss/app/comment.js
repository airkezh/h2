fml.define('app/comment' , ['app/checkStatusCode' , 'app/twitterApi', 'ui/alert', 'component/cursorPostion' , 'component/shareTmp' ,'component/pin' , 'app/smile' , 'app/checkLogin'] , function(require , exports){
	var $ = require('component/pin');
	var smile = require('app/smile');
	var check = require('app/checkLogin');
	var share = require('component/shareTmp');
	var checkStatus = require('app/checkStatusCode');
	var cursor = require('component/cursorPostion'); 
	var twitterApi = require('app/twitterApi').twitterApi;
	var alert = require('ui/alert');
	var isLoaded = true;
	return function(target , obj){
		$(target).on('click' , obj , function(){
			if(!check()) return;
			var closest = $(this).closest('.poster_grid');
			var comment = closest.find('.poster_cmt');
			if(!$(this).data('isCmt')){
				comment.show();
				$(this).data('isCmt' , 'true');
				if($(this).is('.comment_reply')){
					var replyVal = '回复' + '@' + $(this).closest('.commentHover').find('.fb_f').text() + ':';
					comment.find('textarea').val(replyVal)		
				}else{
					comment.find('textarea').val('');
				}
				cursor.setCaretPosition(comment.find('textarea') , comment.find('textarea').val().length)
				if(closest.height() > $(window).height()){
					$('body,html').stop(true , true).animate({ scrollTop: closest.offset().top - $('#navbar').height() + (closest.height()/2) }, 300);	
				}else{
					$('body,html').stop(true , true).animate({ scrollTop: closest.offset().top - $('#navbar').height() }, 300);
				}
				comment.find('textarea')[0].focus();
			}else{
				comment.find('textarea').val('');
				comment.hide();
				$(this).removeData('isCmt');
			}
			$('.goods_wall').masonry('reload');
		});
		smile.showSmile('.goods_wall' , '.share_smileys' , 'comment');
		$('.goods_wall').on('mouseenter' , '.commentHover' , function(){
			$(this).find('.comment_reply').css('visibility'  , 'visible');
		}).on('mouseleave' , '.commentHover' , function(){
			$(this).find('.comment_reply').css('visibility' , 'hidden');
		});
		function alertTip(content) {
			new alert({
				content: content, 
				width: 370
			});		
		}
		$('.goods_wall').on('click' , '.poster_comment_btn' , function(){
			var closest = $(this).closest('.poster_grid');
			var poster_cmt = $(this).closest('.poster_cmt');
			var poster_share = closest.find('.comment_panel');
			var uid = closest.attr('twitter_author_uid');
			var tid = closest.attr('twitter_id');
			var content = poster_cmt.find('textarea').val();
			if(content == "") {
				alertTip('留言不能为空'); return false;
			}
			var data = {
				'stid' : tid,
				'type' : 4,
				'tContent' : content
			}
			var callback = function(response){
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
				var tpl = share('comment_content' , tmpData);
				poster_share.after($(tpl));
				poster_cmt.hide();
				$('.goods_wall').masonry('reload');
				poster_cmt.find('textarea').val('');	
				closest.find(obj).removeData('isCmt');
				isLoaded = true;
				var num = closest.find('.poster_comment_num').text();
				closest.find('.poster_comment_num').html(+num + 1);
			}
			if(isLoaded){
				twitterApi('create', data, callback);
				isLoaded = false;
			}
		});	
	}
});
