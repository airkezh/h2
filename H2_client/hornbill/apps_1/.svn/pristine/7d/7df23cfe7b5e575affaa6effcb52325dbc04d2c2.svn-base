fml.define('wap/component/windowDrive' , ['component/shareTmp', 'wap/zepto/fastclick'] , function(require , exports){
	var shareTmp = require('component/shareTmp');
	function Drive(options){
        var defaults = {
			dialogType : 'dialog'
            , content : ''
            , transparent : false
            , hasTitle : true
            , hasClose : true
        }
        this.opts = $.extend({}, defaults, options);
    }

	Drive.prototype.sync = function(){
		$('*:focus').blur()

        this.drive = $(shareTmp('dialog', this.opts))
        this.drive.appendTo(document.body);
		this.window = this.drive.children('.dialog')
		this.overlay = this.drive.children('.overlay')

        this.window.css({
            top : (this.drive.height() - this.window.height()) / this.drive.height() / 4 * 100 + '%'
        })
    }
    Drive.prototype.destroy = function(){
        if(this.drive){
            this.drive.remove();
            delete this.drive;
        }
    }

	fml.vars.saveItem = 0;
	Drive.prototype.createWindow = function(){
		fml.vars.saveItem++;
		this.opts.onStart && this.opts.onStart();
		this.sync();
	}
	Drive.prototype.destroyModel = function(notFireClose){
		fml.vars.saveItem--;
		!notFireClose && this.opts.onClose && this.opts.onClose();
		if(fml.vars.saveItem <= 0) fml.vars.saveItem = 0;
		this.destroy();
	}
	return Drive;
});
