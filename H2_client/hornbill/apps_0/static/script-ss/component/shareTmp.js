fml.define('component/shareTmp' , ['core/sjt'] , function(require , exports){
    var sjt = require('core/sjt');
    return function(obj,data){
		if (!document.getElementById(obj)){
			fml.debug(obj +' is lost')
			return
		}
        data = data || Object;
		try{
			var shareTpl = sjt(obj,data); 
		}catch(e){
			fml.debug(e);	
		}
		return shareTpl;
    };
});
