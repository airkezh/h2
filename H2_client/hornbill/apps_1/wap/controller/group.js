function group(){
	return this;	
}
var controlFns = {
	'index' : function(groupid){
		var wapMod = base.loadModel('wap/tools.js')
		var group_id = groupid ? groupid : this.readData('group_id')
		this.req.__get.group_id = group_id;
		var channel = this.readData('channel',this.req.__get, ''); 
		var php = {
			'bread' : '/navigate/navigation_path_m?__get_r=1'
			, 'poster0' : '/poster/group_poster_m?__get_r=1'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		};

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
			data.XR = true;
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

			data.pid = group_id;
			data.ptype = 'group';
			data.headTag = 'group';
//			data.cache = true;

			var keywords = '';
			if(data.bread.data && data.bread.data.length > 0){
				keywords = data.bread.data[0].word_name;
			}
			if(keywords){
				data.pageTitle = keywords + ':' + keywords + '图片及搭配,' + keywords +'价格-美丽说';
			}

			data._CSSLinks = ['guang'];
			mSelf.render('guang.html' , data);
		});	
	}
};

exports.__create = controller.__create(group , controlFns);
