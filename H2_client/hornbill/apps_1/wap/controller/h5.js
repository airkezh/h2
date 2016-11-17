var apis = {
	'qietou':'/weixin/Weixin_mall_photo'
}
var controlFns = {
	'index' : function(args){
		this.h5(args)
	},
	'wxdemo' : function(args){
		var mSelf = this
		var php = {
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.render('h5/wxdemo.html' , data);
		})
	},
	'h5' : function(args){
		var mSelf = this
		var php = {
		}

		if(apis[args]){
			php.config = apis[args]
		}else{
			php.config = 'h5::/h5/aj_get_item/?id=' + args
		}

		var get = mSelf.req.__get
		this.debugSnake({target: 'lab3'});

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// console.log('---------------------', data)

			data.CONFIG_PAGES = data.config.data.page_config 
			data.CONFIG_MUSIC = data.config.data.page_music 
			data.CONFIG_BACKGROUND = data.config.data.page_background
			data.CONFIG_SHARE = data.config.data.page_share
			data.get = get

			data.pageTitle = data.config.data.page_title;
			data.headTag = 'h5';
			data._CSSLinks = ['h5/h5'];
			mSelf.render('h5/h5.html' , data);
		})
	}
};


exports.__create = controller.__create(new Function(), controlFns);
