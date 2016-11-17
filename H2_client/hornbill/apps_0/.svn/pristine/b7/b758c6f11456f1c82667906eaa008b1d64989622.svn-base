fml.define('ui/floatingWindow' , ['jquery' , 'component/shareTmp' , 'component/position'] , function(require , exports){	
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var Position = require('component/position');
	var clearTime = null;
	return function(options){
		var defaults = {
			target : '',
			current : '',
			floating : '',
			defaultPos : false,
			enterCallback : function(){} 
		}	
		var opts = $.extend({} , options , defaults);
		$(opts.target).on('mouseenter' , opts.current , function(){
			var floatingWindow = shareTmp(opts.floating);	
			if(opts.defaultPos){
				callback(opts);	
			}else{
				Position.depend(current , floatingWindow);	
			}	
		});
		$(opts.target).on('mouseleave' , opts.current , function(){
			clearTime = setTimeout(function(){
				$(opts.floating).remove();	
			} , 200);
		});
		$(opts.floating).live({
			mouseenter : function(){
				clearTimeout(clearTime);	
			},
			mouseleave : function(){
				$(this).remove();	
			}
		});
		// Helpers
		function floating(){
		}
	}
});
