function license(){
	return this;	
}

var controlFns = {
	'index' : function (){
		var shop_id = this.req.__get.shop_id;
		var php = {}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){			
			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/user/login' ,false ,{"r": "/license/index/?shop_id="+shop_id});
				return;										
			}
			data.shop_id = encodeURIComponent(shop_id);
			data._CSSLinks = ['license'];
			data.pageTitle = '工商资质';
			this.render('license/license.html' , data);
		});
	},
	'detail' : function(){
		var php = {
			'shop_intro' : '/shop/shop_intro'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data._CSSLinks = ['license'];
			data.pageTitle = '工商资质';
			this.render('license/detail.html' , data);
		});
	}
}

exports.__create = controller.__create(license , controlFns);