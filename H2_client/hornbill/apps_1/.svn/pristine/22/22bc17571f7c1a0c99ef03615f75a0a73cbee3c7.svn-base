fml.define('app/twitterReport' , ['jquery' , 'component/shareTmp' , 'ui/alert' , 'ui/confirm'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var Alert = require('ui/alert');
	var Confirm = require('ui/confirm');
	return function(obj){
		$(obj).bind('click' , function(){
			var html = shareTmp('reportDialog');
			var confirmDialog = new Confirm({
				title : '举报不良信息',
				width : 370,
				content : html,
				isOverflow : false
			});		
			confirmDialog.onSure(function(){
				var url = '/aw/reportTwitter/'
				var reportForm = $('#reportForm');
				var data = {
					tid : fml.vars.twitter_id,	
					type : reportForm.find('input:checked').val() 
				};
				var html = shareTmp('alertDialog');
				var alertDialog = new Alert({
					title : '举报不良信息',
					width : 370,
					content : html,
					isOverflow : false
				});	
				window.setTimeout(function(){
					if(alertDialog){
					alertDialog.drive.destroyModel();
					}
				} , 3000);
				$.post(url , data , function(){})
			}); 
		});	
	}
});
