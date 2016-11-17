fml.define('order_app/common/component/shareTmp' , ['order_app/core/etic'] , function(require , exports){
    var sjt = require('order_app/core/etic');
    return function(obj,data){
        data = data || Object;
		try{
			var shareTpl = sjt(obj,data); 
		}catch(e){
			fml.debug(e);	
		}
		return shareTpl;
    };
});
