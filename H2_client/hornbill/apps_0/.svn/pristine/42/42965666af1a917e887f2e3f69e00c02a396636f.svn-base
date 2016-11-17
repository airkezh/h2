var controlFns = {
	'index' : function(args){
		var toid = this.req.__get.toid || 0

		var php = {}
		var mSelf = this;
        this.bindDefault(php,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.toid = toid
			delete mSelf.req.__get.toid

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];
			//var newdata = data;
			//newdata.userInfo.user_id = 0;
			if(data.userInfo.user_id == 0){ data.text = '未登录...'}
			checkError(mSelf, data)
		})
	},
	'download' : function(args){
		var php = {}
		var mSelf = this;
        this.bindDefault(php,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['im/download'];
			mSelf.render('wap/download.html', data);
		});
	},
	'load' : function(){
		var tid = this.req.__get.tid || 0
			, shop_id = this.req.__get.shop_id || 0
			, type = this.req.__get.type || 0
			, fromid = this.req.__get.fromid || 0
		var php = {
			'init' : 'im::/im/init?source=mob&from=' + fromid + '&tid=' + tid + '&shop_id=' + shop_id + '&type=' + type
		};

		var mSelf = this;
	//	var goUrl = '//m.meilishuo.com/wx/connectCircle?goback=' + encodeURIComponent(window.location.href);
        this.bindDefault(php ,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log('data='+ data.userInfo)

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];
			data.toid = data.init.to
		//	mSelf.req.__get.toid = data.init.to

			delete mSelf.req.__get.fromid
			delete mSelf.req.__get.tid
			delete mSelf.req.__get.shop_id

			if(data.userInfo.user_id == 0) data.text = '未登录...'
			else if(!data.init) data.text = '请求错误...'
			else if(data.init.successful != '1') data.text = '连接中...'

			checkError(mSelf, data)

		});
	},
	'chat': function(){
		var tid = this.req.__get.tid || 0
			, shop_id = this.req.__get.shop_id || 0
			, type = this.req.__get.type || 0
			, fromid = this.req.__get.fromid || 0
		var php = {
			'init' : 'im::/im/init?source=wap&from=' + fromid + '&tid=' + tid + '&shop_id=' + shop_id + '&type=' + type
		};

		var mSelf = this;
		//	var goUrl = '//m.meilishuo.com/wx/connectCircle?goback=' + encodeURIComponent(window.location.href);
		this.bindDefault(php ,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log('data='+ JSON.stringify(data))

			data.pageTitle = data.userInfo.nickname;
			data._CSSLinks = ['im/chat'];
			data.toid = data.init.to;
			//	mSelf.req.__get.toid = data.init.to

			delete mSelf.req.__get.fromid
			delete mSelf.req.__get.tid
			delete mSelf.req.__get.shop_id

			if(data.userInfo.user_id == 0) data.text = '未登录...'
			else if(!data.init) data.text = '请求错误...'
			else if(data.init.successful != '1') data.text = '连接中...'

			if (data.text) {
				mSelf.render('wap/start.html', data);
			} else {
				mSelf.render('wap/chat.html', data);
			}

		});
	},
	'dchat':function(){
		var toid = this.req.__get.toid || 0;
		var php = { };
		var mSelf = this;
		//	var goUrl = '//m.meilishuo.com/wx/connectCircle?goback=' + encodeURIComponent(window.location.href);
		this.bindDefault(php ,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log('data='+ JSON.stringify(data))

			data.pageTitle = data.userInfo.nickname;
			data._CSSLinks = ['im/chat'];
			data.toid = toid;
			data.chat = 1;
			//	mSelf.req.__get.toid = data.init.to

			mSelf.render('wap/chat.html', data);

		});

	},
	'msgList': function(){
		//this.debugSnake({target : 'weiwang.rdlab'});
		var toid = this.req.__get.toid || 0
			, fromid = this.req.__get.fromid || 0
		var php = {
			//'msgReceive' : "/im/open_recently?from=765&source=wap&limit=10"
			'msgReceive' : 'im::/im/open_recently?from='+fromid+'&source=wap&limit=10'
		}
		this.bindDefault(php,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log("data", JSON.stringify(data.msgReceive));

			data.pageTitle = '我的消息'
			data._CSSLinks = ['im/msgList'];

			this.render('wap/msgList.html' , data);
		})
	},
	'shop' : function(){
		var php = {
			'shop_info':'im::/im/daily?shop_id=101277'
			,'post_list':'im::/im/shop_posts?count=3'
		}
        this.bindDefault(php,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.pageTitle = '店铺信息' 
			data._CSSLinks = ['im/shop_info'];

			this.render('wap/shop_info.html' , data);
		})
	},
	'order' : function(){
		var php = {
			'recent_order' : '/im/orders'
		}
		, mSelf = this

		mSelf.req.__get.to = mSelf.req.__get.toid
		mSelf.req.__get.limit = 2
		mSelf.req.__get.fields = 'address'

		var toid = mSelf.req.__get.toid

        this.bindDefault(php,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.toid = toid
			data.pageTitle = '订单信息' 
			data._CSSLinks = ['im/order'];

			console.log(data.recent_order)

			this.render('wap/order.html' , data);
		})
	},
	'post_detail' : function(){
		var php = {
			'post_detail':'im::/im/shop_posts?type=detail'
		}
        this.bindDefault(php,'wap');
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.pageTitle = '公告' 
			data._CSSLinks = ['im/post_detail'];

			this.render('wap/post_detail.html' , data);
		})
	}
};
var checkError = function(mSelf, data) {
	if (data.text) {
		mSelf.render('wap/start.html', data);
	} else {
		mSelf.render('wap/im.html', data);
	}
}
exports.__create = controller.__create(new Function(), controlFns);
