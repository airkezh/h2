fml.define('component/animate' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	
	exports.twinkle = function(obj,delay,times,endShow){
		if(!delay)delay = 500;
		if(!times)times = 0;
		if(!endShow)endShow = true;
		times = -times;
		obj = $(obj);
		if (!obj.length) return;
		var objdom = obj.get(0);
		var index = 0;
		var clear = null,
			removeDisplay = false;
		clearTimeout(clear);
		
		clear = window.setTimeout(function(){
			if (!removeDisplay){
				removeDisplay = true;
				obj.show();
				}
			var visiblity = objdom.style.visibility;
			objdom.style.visibility = (visiblity  == 'hidden' ) ?'visible' : 'hidden';
			index--;
			if(index <= times){
				window.clearTimeout(clear);
				if (endShow){
					 obj.show() ; 
				}else{
					 obj.hide();
					 removeDisplay = false;
					}
				index = 0;
				return false;
			}
			clear = window.setTimeout(arguments.callee , delay);
		},delay);
	}
});
