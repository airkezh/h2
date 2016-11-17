fml.define('app/registerLike' , ['jquery', 'component/shareTmp', 'component/dialog', 'app/eventHover', 'app/followSome'] , function(require , exports){
	var $ = require('jquery');	
	var urlHandle = require('component/urlHandle');
	var dialog = require('component/dialog');
	var shareTmp = require('component/shareTmp');
	var eventHover = require('app/eventHover');
	var followSome = require('app/followSome');
	return {
		success : function(){
			$('#sendemail').bind('click', function(){
				var url = '/user/reg/sendemail';
				var data = {
					email : $('.regEmail').text()
				};
				var callback = function(r){
					alert('发送成功，请稍后注意查收哦！');	
				};
				$.post(url , data , callback ,'json');
			});
		},
		selectStyle : function(o, c){
			var obj = o || '.registerLikeStyle li',
				child = c || 'span';
			eventHover.hoverShow(obj, child);
			$(obj).bind('click' , function(event){
				var txt = encodeURIComponent($(this).find('h4').text());
				var url = Meilishuo.config.server_url + 'user/register/step4' + '?type_name=' + txt + '&frm=' + txt;
				urlHandle.redirect(url);
			});
		},
		selectGroup : function(){
			followSome({
				addBtn : '.addGroupFollow',
				removeBtn : '.removeGroupFollow',
				hoverBtn : '.removeGroupFollow',
				followStyle : 'btn',
				unfollowStyle : 'followed',
				submitBtn : '#registerLikeGroupBtn',
				url : '/user/reg/finish'
			});
			$('.removeGroupFollow').live('click',function(){
				if($('.removeGroupFollow').size() === 0){
					var mSelf = this;
					var html = shareTmp('registerLikeInfoTpl');
					dialog.meiliDialog({dialogTitle : "提示" , dialogWidth : 330 , dialogContent : html , onStart : function(){ $(mSelf).click();$('.registerLikeInfoWin .btn').bind('click', function(){$('.close_z').click();}); }}); 
				}
			});
			$('.groupCon').click(function(){
				$('#registerLikeGroupBtn').click();
			});
		}
	};
});
