fml.define('order_app/common/client/common', [], function(require, exports){
	exports.isLowVersion = function(){
		if(Meilishuo.config.os){
			if((Meilishuo.config.os.iphone && parseFloat(Meilishuo.config.os.version) < 6) || (Meilishuo.config.os.android && parseFloat(Meilishuo.config.os.version) < 3)){
				return true;
			}
		}
		return false;
	}
});