fml.define('app/userFollow' , ['jquery' , 'app/userApi' , 'app/checkLogin', 'app/folSyncWb'] , function(require , exports){
	var $ = require('jquery');	
	var check = require('app/checkLogin');
	var userApi = require('app/userApi').userApi;
	var ajFollow = function(type , data , callback){
		if(type == 'add'){
			type = 'follow'	
		}else{
			type = 'unfollow'	
		}
		userApi(type, data, callback);	
		return true;
	}

	return function(addBtn , removeBtn , hoverBtn , followStyle , unfollowStyle , callback){
		if(!followStyle) followStyle = '';
		if(!unfollowStyle) unfollowStyle = '';
		$(addBtn).live('click' , function(){
			if(!check()) return false;
			//console.log($(this).attr('fuid'))
			var data = {
				fuid : $(this).attr('fuid')	
			};
			var following = $(this).attr('following');
			var followed = $(this).attr('followed');
			ajFollow('add' , data , $.proxy(function(){
				this.className = removeBtn.replace('.' , '') + ' ' + unfollowStyle;
				var followText = followed == 2 || following == 1 ? '互相关注' : '已关注';	
				$(this).html(followText);
			} , this));	
		//	if(callback) callback.call(this);
			var self = $(this).clone(true);		// hack for #3216
			require('app/folSyncWb')(data.fuid, 'user', $.proxy(function(){if(callback) callback.call(self);}, self));
		});	
		$(removeBtn).live('click' , function(){
			if(!check()) return false;
			var data = {
				fuid : $(this).attr('fuid')	
			};
			ajFollow('remove' , data , $.proxy(function(){
				this.className = addBtn.replace('.' , '') + ' ' + followStyle;
				var followText = '+ 加关注';	
				$(this).html(followText);
			} , this));	
			if(callback) callback.call(this);
		});
		$(hoverBtn).live({
			'mouseenter' : function(){
				$(this).html('取消关注');	
			},
			'mouseleave' : function(){
				var followed = $(this).attr('followed');
				var following = $(this).attr('following');
				var followText = followed == 2 || following == 1 ? '互相关注' : '已关注';	
				$(this).html(followText);
			}
		});
	}
});
