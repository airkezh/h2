function address(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		var php = {}
			, mSelf = this

		if(args == 'new')
			php.address_select = 'doota::/address/addr_select'
		else
			php.addr = 'doota::/address/addr_list'

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
//			base.var_dump(data.address_select, false , 5);
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/welcome');		
				return;	
			}

			if(args == 'new'){
				data._CSSLinks = ['doota/address'];
				mSelf.render('doota/address.html' , data);
			}else{
				data._CSSLinks = ['doota/address_default'];
				mSelf.render('doota/address_default.html' , data);
			}
		});
	}
};
exports.__create = controller.__create(address , controlFns);
