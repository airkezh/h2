function im(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var toid = this.req.__get.toid || 0

		var php = {}
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid
			delete mSelf.req.__get.toid

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];
			mSelf.render('im/im.html' , data);
		})
	},
	'load' : function(){
		var tid = this.req.__get.tid
			, shop_id = this.req.__get.shop_id || 0
			, type = this.req.__get.type || 0
			, fromid = this.req.__get.fromid || 0

		var php = {
			'init' : '/im/init?source=mob&from=' + fromid + '&tid=' + tid + '&shop_id=' + shop_id + '&type=' + type
		};

		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// console.log(data)

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];
			data.toid = data.init.to
		//	mSelf.req.__get.toid = data.init.to

			delete mSelf.req.__get.fromid
			delete mSelf.req.__get.tid
			delete mSelf.req.__get.shop_id

			if(data.init.successful == '1')
				mSelf.render('im/im.html' , data);
			//	mSelf.redirectTo('/im/',true );
			else
				mSelf.render('im/start.html' , data);
		});

	},




	'start' : function(){
		this.debugSnake({target : 'devlab1'});
		var fromid = this.req.__get.fromid || 0
			, toid = this.req.__get.toid || 0
			, tid = this.req.__get.tid || 2541096353
			, shopid = this.req.__get.shopid || 0
			, type = this.req.__get.type || 0

		delete this.req.__get.fromid
		delete this.req.__get.toid
		delete this.req.__get.tid
		delete this.req.__get.shopid
		delete this.req.__get.type

		var php = {
			'init' : '/im/init?source=mob&from=' + fromid + '&to=' + toid + '&tid=' + tid + '&shopid=' + shopid + '&type=' + type
		};

		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid
			data.tid = tid
			data.shopid = shopid
			data.type = type

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];
			if(data.init.successful == '1'){
				mSelf.render('im/im.html' , data);
			}else{
				mSelf.render('im/start.html' , data);
			}
		});
	}
};

exports.__create = controller.__create(im , controlFns);
