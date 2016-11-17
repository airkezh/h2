fml.define('component/focus',['jquery'],function(require , exports){
    var $ = require('jquery');
	var inp = document.createElement("input");
	var supported =  "placeholder" in inp;
	inp = null;
    var inputFocus = supported ? 
		function(obj, pObj){
			var input = $(obj);
			var place = pObj ? $(pObj).find(obj).attr('placeholder') : input.attr('placeholder');

			if (!pObj) {
				input.bind('focus' , function(){
					input.attr('placeholder', '' )
				}).bind('blur' , function(){
					input.attr('placeholder', place)
				});
			} else {
				$(pObj).on('focus', obj, function(){
					$(this).attr('placeholder', '');
				}).on('blur', obj, function(){
					$(this).attr('placeholder', place);
				})
			}
			
		} 
		: function(obj, pObj){
		//if (supported) return;

		var input = pObj ? $(pObj).find(obj) : $(obj);
		var place = input.attr('placeholder');
		if ('' == input.val()) input.val(place);

		if (!pObj) {
      		input.bind('focus' , function(){
      	   		if(this.value == place){
      	        	this.value = '';
            	} 
        	}).bind('blur' , function(){
            	if(this.value == ''){
            	    this.value = place;    
            	}    
        	});
        } else {
        	$(pObj).on('focus', obj, function(){
				if(this.value == place){
      	        	this.value = '';
            	}	
            }).on('blur', obj, function(){
				if(this.value == ''){
            	    this.value = place;    
            	} 
           	})
        }
    }
    exports.inputFocus = inputFocus; 
});
