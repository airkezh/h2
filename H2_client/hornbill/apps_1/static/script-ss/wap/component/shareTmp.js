fml.define('wap/component/shareTmp' , ['core/etic'] , function(require , exports){
    var sjt = require('core/etic');
    return function(obj,data, isCheck){
        data = data || Object;
		try{
			var shareTpl = sjt(obj,data,isCheck); 
		}catch(e){
			fml.debug(e);	
		}
		return shareTpl;
    };
});
