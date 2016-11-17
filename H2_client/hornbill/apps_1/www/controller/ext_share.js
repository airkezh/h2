function ext_share(){
	return this;
}
var controlFns = {
	index : function(tid){
		var php = {
			'goods_info' : '/share/share_main?twitter_id=' + tid
			}
		this.bridgeMuch(php)
		this.listenOver(function(data){
			if ( !data.goods_info ||  data.goods_info.error_code)
				return this.redirectTo('/share/'+tid , true)
			else
				return this.redirectTo('/share/item/'+tid , true)

			},true)

	}
}
exports.__create = controller.__create(ext_share , controlFns);
