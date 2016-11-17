function address(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var mSelf = this;
		var php  = {
			'address_list':'doota::/address/addr_list'
			, 'address_select' : 'doota::/address/addr_select'
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		//	base.var_dump(data.address_select, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/welcome');		
				return;	
			}
			data.needUpdate = false;
			data.address_list.addrInfo.map(function(item){
				if(item.flag){
					data.needUpdate = true;
				}
			})
			data._CSSLinks = ['order_pc/address/index'];
			data.pageTitle = '收货地址管理 - 美丽说';
			data.topbanner = false;
			mSelf.render('address/index.html' , data);
		});
	}
};
exports.__create = controller.__create(address , controlFns);
