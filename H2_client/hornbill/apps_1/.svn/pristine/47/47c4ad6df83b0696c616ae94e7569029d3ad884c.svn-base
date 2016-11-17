fml.define('app/eventHover' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	exports.hoverShow = function(obj , child){
		$(obj).live('mouseenter' , function(){
			$(this).find(child).css('display' , 'block');	
		}).live('mouseleave' , function(){
			$(this).find(child).hide();
		});		
	}
	exports.hoverHide = function(obj , child){
		$(obj).live('mouseenter' , function(){
			$(this).find(child).hide();	
		}).live('mouseleave' , function(){
			$(this).find(child).show();
		});		
	}
});
