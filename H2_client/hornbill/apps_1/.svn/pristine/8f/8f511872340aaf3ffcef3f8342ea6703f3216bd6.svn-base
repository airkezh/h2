fml.define('app/guangjie/welcomeDialog' , ['jquery' , 'ui/dialog' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');	
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	return function(){
		var html = shareTmp('welcome_shopping');
		var Dialog = new dialogUI({content : html , isEffect : true , width : 441});
		Dialog.drive.window.title.remove();
	}
});
