fml.define('app/follow' , ['jquery', 'app/groupApi', 'app/checkLogin','app/cleanMsg','app/folSyncWb'] , function(require , exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var msg = require('app/cleanMsg');
	var groupApi = require('app/groupApi').groupApi;
	var ajFollow = function(type , data , callback){
		if(!check()) return false;
		if(type == 'add'){
			var url_type = 'follow';  
		}else{
			var url_type = 'quit';  
		}
		groupApi(url_type , data, callback);    
		return true;
	} 
	return function(addBtn , removeBtn , hoverBtn , followStyle , unfollowStyle , callback){
		if(!followStyle) followStyle = '';
		if(!unfollowStyle) unfollowStyle = '';
		$(addBtn).live('click' , function(){
			var data = {
				group_id : $(this).attr('groupid')
			};
			var followed = $(this).attr('followed');
			ajFollow('add' , data , $.proxy(function(){
				this.className = removeBtn.replace('.' , '') + ' ' + unfollowStyle;
				var followText = '已关注'; 
				$(this).html(followText);
			} , this)); 
		//	if(callback) callback.call(this);
			var self = $(this).clone(true);
			require('app/folSyncWb')(data.group_id, 'group', $.proxy(function(){if(callback) callback.call(self);}, self));
		}); 
		$(removeBtn).live('click' , function(){
			var data = {
				group_id : $(this).attr('groupid')
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
				$(this).html('已关注');
			}
		});
	}
});
