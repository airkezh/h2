fml.define('wap/ui/alert' , ['wap/component/windowDrive'] , function(require , exports){
	var Drive = require('wap/component/windowDrive');
	function Alert(options){
        var defaults = {
            dialogType : 'alert'
			, onSure : function(){}
        }
        this.opts = $.extend({}, defaults, options);
        this.drive = new Drive(this.opts);
        this.sync();
        return this;
	}
	Alert.prototype.sync = function(){
		this.drive.createWindow();
		var mSelf = this
		mSelf.drive.window
				.on('click', '.sureBtn', $.proxy(function(){
					mSelf.drive.opts.onSure()
					mSelf.drive.destroyModel();
				} , mSelf))
		}
	return Alert;
});
