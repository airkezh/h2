function address(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		this.main();
		return;
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
	},
	'main' : function(){
		var php = {
			'addr' : 'doota::/address/addr_list'
		}
	    var mSelf = this
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = '640_mate';
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/welcome');		
				return;	
			}
			data._CSSLinks = ['doota/address_main'];
			mSelf.render('doota/address_main.html' , data);
		});
	},
	'edit' : function( args ){
		var user_id = this.readData('addr_id',this.req.__get, '');
		var user_pid = this.readData('_pid',this.req.__get, '');
		var user_cid = this.readData('_cid',this.req.__get, '');
		var user_did = this.readData('_did',this.req.__get, '');

		var php = {
			'address_detail' : 'doota::/address/addr_detail?addr_id=' + user_id
			,'address_select' : 'doota::/address/addr_select'
			,'addr_list_city' : 'doota::/address/addr_select?pid=' + user_pid
			,'addr_list_dis' : 'doota::/address/addr_select?cid=' + user_cid + '&pid=' + user_pid
		};
	    var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = '640_mate';
			data.addr_id = user_id;
			data.user_pid = user_pid;
			data.user_cid = user_cid;
			data.user_did = user_did;

			if ( args == 'edit' ){
				data.editFlag = true;
			}else if ( args == 'new' ){
				data.addFlag = true;
			}

			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/welcome');		
				return;	
			}

			data._CSSLinks = ['doota/address_edit'];
			mSelf.render('doota/address_edit.html' , data);
			
		});
	}
};
exports.__create = controller.__create(address , controlFns);
