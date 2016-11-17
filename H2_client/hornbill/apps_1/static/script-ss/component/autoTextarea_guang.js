fml.define('component/autoTextarea_guang' , ['component/waterfall' , 'jquery'] , function(require , exports){
	var $ = require('jquery');
	var pin = require('component/waterfall');	
	return function(parentObj , obj , miniHeight , callback){
		var minHeight = 0;
		var maxHeight = 200;
		var $wall = $('.goods_wall');
		var $wallSize = $wall.size();
		$(parentObj).on('keyup focus' , obj , function(event){
			//if(event.type == 'focusin' && $(this.val() == '')) return;
			var height,style = this.style;
			var closest = $(this).closest('.poster_grid');
			var oldHeight = parseInt(style.height) ;
			if(isNaN(oldHeight)){
				oldHeight = miniHeight;
			}
			var isHeight = style.height;
			style.height =  miniHeight + 'px';
			if (this.scrollHeight > minHeight) {
				if (maxHeight && this.scrollHeight > maxHeight) {
					height = maxHeight;
					style.overflowY = 'scroll';
					style.height = height  + 'px';
					if ($wallSize){
						if(closest.attr('col'))
							pin.colReload(closest);
						else
							pin.colReload(closest.parents('.corner_stamp'));
					}
				} else {
					height = this.scrollHeight;
					style.overflowY = 'hidden';
					style.height = height  + 'px';
					if(isHeight != height+'px'){
						if ($wallSize){
							if(closest.attr('col'))
								pin.colReload(closest);
							else
								pin.colReload(closest.parents('.corner_stamp'));
						}
						$(this)[0].focus()
					}
				}
			}
		});
	}
});
