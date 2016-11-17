fml.define('m/component/shareTmp' , ['core/etic'] , function(require , exports){
    var sjt = require('core/etic');
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
