fml.define('app/kickPoster_guang' , ['jquery', 'app/groupApi', 'component/waterfall' , 'ui/confirm'] , function(require , exoprts){
	var $ = require('jquery');	
	var pin = require('component/waterfall');;
	var confirm = require('ui/confirm');
	var groupApi = require('app/groupApi').groupApi;
	return function(parent , btn , admins , gid , role){
		$(parent).on('click' , btn , function(){
			var poster = $(this).closest('.poster_grid');
			var twitter_author_uid = poster.attr('twitter_author_uid');
			var tid = poster.attr('twitter_id');
			var isAdmins = false;
			$.each(admins , function(k , v){
				if(v.user_id != twitter_author_uid && v.user_id == Meilishuo.config.user_id){
					isAdmins = true;	
				}	
			});
			var html = '<p>确定删除该内容?</p>';
			if(isAdmins || (role == 1 && twitter_author_uid != Meilishuo.config.user_id)){
				html += '<p><input class="checkAllDelete" type="checkbox" />将该用户踢出杂志并删除其全部分享</p>';	
			}
			var confirmDialog = new confirm({
				width : 370,
				transparent : true,
				content : html,
				isOverflow : true
			});
			confirmDialog.onSure($.proxy(function(){
				var data = {
					twitter_id : tid,
					check : $('.checkAllDelete').attr("checked") ? 1 : 0 
				}
				var callback = function(){}
				groupApi('remove', data, callback);
				poster.remove();
				pin.reload();
			} , this));
		});
	}
});
