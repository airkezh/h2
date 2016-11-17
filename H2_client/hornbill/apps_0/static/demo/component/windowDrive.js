define('component/windowDrive' , ['component/position' , 'component/overlay' , 'component/window' , 'jquery'] , function(require , exports){
	var $ = require('jquery');
	var position = require('component/position');
	var overlay = require('component/overlay');
	var window = require('component/window');
	seajs.vars.saveItem = 0;
	function Drive(options){
		this.opts = options || {};
		this.overlay = new overlay(this.opts);
		this.window = new window(this.opts);
		return this;
	}
	Drive.prototype.createOverlay = function(){
		this.overlay.sync();	
	}
	Drive.prototype.createWindow = function(){
		seajs.vars.saveItem++;
		this.opts.onStart && this.opts.onStart();
		this.window.sync();
		this.opts.onChange && this.opts.onChange();
		this.window.onClose($.proxy(function(){
			this.destroyModel();
		} , this));
		$(document).unbind("keydown").bind("keydown" , $.proxy(function(event){
			if(event.keyCode == 27){
				var focus = document.activeElement;
				if(focus.tagName == 'TEXTAREA' || focus.tagName == 'INPUT'){
					$(focus).blur();
					return;
				}else{
					this.destroyModel();
					return;
				}
			}
		} , this));
	}
	Drive.prototype.destroyModel = function(notFireClose){
		seajs.vars.saveItem--;
		!notFireClose && this.opts.onClose && this.opts.onClose();
		if(seajs.vars.saveItem <= 0) seajs.vars.saveItem = 0;
		this.overlay.destroy(seajs.vars.saveItem == 0);
		this.window.destroy();
	}
	return Drive;
});
