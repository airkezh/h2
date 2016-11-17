function person(){
	return this;
}
var controlFns = {
	'myLove' : function(user_id){
		this.req.__get.user_id = user_id;
		var mSelf = this;
		var php  = {
			'poster0' : '/person/poster_twitter?user_id='+user_id+'&twitter=like&__get_r=1'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			data.use_rem_screen = '640_meta';
			data._CSSLinks = ['myLove'];
			mSelf.render('myLove.html', data);
		});
	},
	'myShop' : function(user_id){
		this.req.__get.user_id = user_id;
		var mSelf = this;
		var php  = {
			'follow_list' : '/shop/Wap_shop_following_list?user_id='+user_id+'&__get_r=1'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			data.use_rem_screen = '640_meta';
			data._CSSLinks = ['myShop'];
			mSelf.render('myShop.html', data);
		});
	},

	aj : function (params){
		var php = {
			'myLove' : '/person/poster_twitter?__get_r=1'
			, 'myShop' : '/shop/Wap_shop_following_list?__get_r=1'
		}

		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(person , controlFns);
