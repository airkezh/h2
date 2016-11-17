fml.define('app/admClick', ['jquery'], function(require, exports){
	var $ = require('jquery');

	exports.monitor = function(obj) {
		obj = obj ? obj : '.adm_mon';
		$(obj).on('click', function(){
			var monitor_url = $(this).attr('monitor');
			if(!monitor_url) return;
			var img = new Image();
			img.src = monitor_url;
		});
		$(obj).each(function(){
			var show_monitor = $(this).attr('show_mon');
			if (!show_monitor) return;
			var img = new Image();
			img.src = show_monitor;
		})
	}	
});