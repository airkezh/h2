function club(){
	return this;
}
var controlFns = {
	'index' : function(){
		return this.single();
	},
	'single' : function(aid){
		var wapMod = base.loadModel('wap/tools.js')
		var channel = this.readData('channel',this.req.__get, '');
		this.req.__get.aid = aid;
		var page = this.readData('page',this.req.__get, 0)|0;
		var article_id = this.readData('aid',this.req.__get, '')
		var php  = {
			'detail' : '/club/article_detail',
			'reply_list' : '/club/article_reply_list',
			'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel',
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		}
		var mSelf = this;
		var param = channel || param 
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.article_id = article_id

			data.use_rem_screen = '640';
			
			/*download*/
			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src
				
				else 
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}

			/*show 置顶banner*/
			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;
			var os = wapMod.uaos(this.req)
			data.mlsApp = os.mlsApp;

			if (!data.detail || data.reply_list.error_code){
				return this.errorPage();
			}
			data._CSSLinks = ['doota/single'];
			data.pageTitle = data.detail.article_title + '-美丽说';
			data.groupPg = {}; 
			data.groupPg.total_num = data.reply_list.total_num;
			data.groupPg.page_size = 20;
			data.groupPg.current_page = page;
			data.aid = aid;
			mSelf.render('share/single.html' , data);
		});
	},
	'daren_apply' : function (){
		var php ={
			'daren_info' : '/dress/daren_request'
		};
		//this.debugSnake({'target':'devlab1'});
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data._CSSLinks = ['daren_apply'];
			data.pageTitle = '搭配达人申请';
			mSelf.render('daren_apply.html',data);
		});
	}
}
exports.__create = controller.__create(club , controlFns);
