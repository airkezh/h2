fml.define('app/beautyDecl' , ['jquery' , 'ui/confirm' , 'ui/alert', 'component/shareTmp' , 'component/regString'] , function(require , exports){
	var $ = require('jquery');
	var Confirm = require('ui/confirm');
	var shareTmp = require('component/shareTmp');
	var regString = require('component/regString');
	var alert = require('ui/alert');
	var content = '';
    var alertTip = function(content) {
		new alert({
			content: content, 
			width: 370
		});		
	}
	var updateDecl = function(){
		var url = '/aw/updateDecl/';
		var data = {
			about_me : $('#contextDecl').val()	
		};
		var callback = function(response){
			if(response.about_me.status){
				$("#about_me").html(content);	
			} else {
				alertTip(response.about_me.msg);
			}
		}
		$.get(url , data , callback , 'json');
	}
	return function(){
		$('#showBeauty').bind('click' , function(){
			var html = shareTmp('beauty');
			var confirmPanel = new Confirm({
				width : 380,
				title : '我的美丽宣言',
				content : html,
				discover : true
			});	
			$("#contextDecl")[0].focus();
			$("#contextDecl").val(regString.trim($("#about_me").text()));
			confirmPanel.onSure($.proxy(function(){
				content = $("#contextDecl").val();
				if(!regString.WidthCheck(content , 40)){
					alertTip("您输入的字数超过40字");	
					return false;
				}else{
					updateDecl();	
				}
			} , this));
		});
	}
});
