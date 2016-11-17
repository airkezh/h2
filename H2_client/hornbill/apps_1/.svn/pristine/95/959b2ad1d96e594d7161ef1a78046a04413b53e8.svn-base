fml.define('component/alert' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	function AlertDialog(content , title , options , callback){
		options = options || {};
		this.width = options.width || '';
		this.height = options.height || '';
		this.content = content || '';
		this.title = title || '';
	}
	// 显示目标元素
	AlertDialog.prototype.sync = function(){
		alert(this.content);	
	}
	// 销毁目标元素
	AlertDialog.prototype.destroy = function(){
		
	}
	


	return AlertDialog;
});
