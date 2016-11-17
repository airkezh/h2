fml.define('page/huodong/spring2013' , ['ui/confirm', 'app/setSync', 'app/checkLogin'] , function(require, exports){
	var check = require('app/checkLogin');
	var confirmDialog = require('ui/confirm');
	var setSync = require('app/setSync');
//	setSync.setShareTips();

	$('.sp_style a').bind('click', function(){
		if(!check()) return false;
		var $this = $(this);
		var status = $('.sp_style').attr('s_type');
		var redirectUrl = $this.attr('href')
			, id = $this.attr('sp');
		var showConfirm = new confirmDialog({
			content : '告诉你的朋友？',
			width : 370,
			isOverflow : true
		});
		showConfirm.onSure(function(){
			if(status == 0){
				window.open('/settings/bind/weibo', 'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(screen.width-620)/2,',top=',(screen.height-450)/2].join(''));
				$('.sp_style').attr('s_type',1);
				return false;
			}else{
				$('.sp_style a').unbind();
				window.open(redirectUrl)
				var url = '/aj/huodong/spring_share',
					data = { 'id' : id },
					callback = function(){
					};
				$.get(url , data ,callback , 'json');
			}
		});
		showConfirm.onCancel(function(){
			$('.sp_style a').unbind();
			window.open(redirectUrl)
		});
		return false;
	});
});

