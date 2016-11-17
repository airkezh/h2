define('ui/alert' , ['component/windowDrive' , 'jquery'] , function(require , exports){
	var $ = require('jquery');
	var Drive = require('component/windowDrive');
	function Alert(options){
		this.opts = options || {};
		this.drive = new Drive(this.opts);
		if(!this.opts.auto) this.sync();
		return this;
	}
	Alert.prototype.sync = function(){
		this.drive.createOverlay();
		this.drive.createWindow();
		var alertPanel = createAlert.call(this);
		this.drive.window.content.html(alertPanel);
		$('.'+this.drive.window.opts.windowId).on('click' , '.sureBtn' , $.proxy(function(){
			if(this.callBackOnSure && this.callBackOnSure() == false){
				return false;	
			}
			this.drive.destroyModel();
		} , this));
	}
	Alert.prototype.onSure  = function(callback){
		this.callBackOnSure = callback;
	} 
	// Helpers
	function createAlert(){
		if(this.opts.discover){
			return $('<div class="alert_tips">' + this.opts.content +'<p class="tab_sure"><a class="btn-s-red sureBtn">确定</a></p></div>');
		}else{
			return $('<div class="maga_suc">' + this.opts.content +'<p class="tab_sure"><a class="btn-s-red sureBtn">确定</a></p></div>');
		}
	}
	return Alert;
});
