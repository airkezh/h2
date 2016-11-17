fml.define('app/magazineHover' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	return function(obj){
		$(obj).hover(function(){
			$(this).find(".groupCorner").hide();	
		},function(){
			$(this).find(".groupCorner").show();
		});		
	}
});
