fml.define('component/passFocus',['jquery'],function(require , exports){
    var $ = require('jquery');
	var passwordFocus = function(mls,vm){
		$(vm).focus(function(){
			$(this).hide();	
			$(mls).show().focus();
		});
		$(mls).blur(function(){
			if($(this).val() == ""){
				$(vm).show();
				$(this).hide();
			}
		});
	};
    exports.passwordFocus = passwordFocus; 
});
