function paipaishare(){
	return this;
}
var controlFns = {
	index : function(tid){
		if (tid === 'paipaishare') this.share();
		var mSelf = this;
		this.req.__get.tid = tid;
		var php = {
			'goods_info' : '/goods/paipai_sharemain',
			'goods_group' : '/goods/paipai_share_group',
			'goods_like' : '/goods/paipai_like_maybe',
			'poster0' : '/goods/Paipai_like_also'
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);

		this.listenOver(function(data){
			if(data.goods_info.show404) return mSelf.errorPage(); 
			var url = require('url');
			var referer = mSelf.req.headers.referer || '';
			var hostname = url.parse(referer).hostname || '';
			// 来源是否是Baidu
			hostnameB = hostname.substr(hostname.indexOf(".")+1,"5");
			if(hostnameB == 'baidu'){
				data.isBaidu = true;	
			}
			data._CSSLinks = ['paipai/twitter'];
			data.pageTitle = data.goods_info.pageTitle;
			data.meta_description = data.goods_info.metaDescription;
			data.keywords = data.goods_info.keyword;
			// true 宽屏 
	//		data.fluid = true;
			data.share_info = {};
			data.group_name = data.goods_info.group_name;
			data.share_info.comment = '美丽说杂志是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说杂志，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~';
		//	var qqHuiliu = 'http://www.meilishuo.com/share/' + tid + '?frm=huiliu_shareqzone';
			var qqHuiliu = '';
			// 7 => goods | 2 => picture | 9 => hart | default => text
			switch(data.goods_info.mode){
				case 7 : 
					data.showPrice = true;
					if(data.group_name){
						if(data.goods_info.ginfo.title == ''){
							data.share_info.desc = encodeURIComponent('推荐 一个宝贝 - 来自杂志 #' + data.group_name + '# (分享自 @美丽说) >>'); 
							data.share_info.descQQ = '推荐 一个宝贝 - 来自杂志#' + data.group_name + '# >>' + qqHuiliu; 
						}else{
							data.share_info.desc = encodeURIComponent('推荐【'+ data.goods_info.ginfo.title +'】- 来自杂志 #' + data.group_name + '# (分享自 @美丽说) >>'); 
							data.share_info.descQQ = '推荐【'+ data.goods_info.ginfo.title +'】- 来自杂志#' + data.group_name + '# >>' + qqHuiliu; 
						}
						data.share_info.text = '>>分享自美丽说杂志《'+ data.group_name +'》';
					}else{
						if(data.goods_info.ginfo.title == ''){
							data.share_info.desc = encodeURIComponent('推荐 一个宝贝 (分享自 @美丽说) >>'); 
							data.share_info.descQQ = '推荐 一个宝贝 - 来自 >>' + qqHuiliu; 
						}else{
							data.share_info.desc = encodeURIComponent('推荐【'+ data.goods_info.ginfo.title +'】 (分享自 @美丽说) >>'); 
							data.share_info.descQQ = '推荐【'+ data.goods_info.ginfo.title +'】- 来自 >>' + qqHuiliu; 
						}
						data.share_info.text = '>>分享自美丽说';
					}
					break;
				case 2 : 
					if(data.group_name){
						data.share_info.desc = encodeURIComponent('分享一张美图 - 来自@美丽说 杂志#'+ data.group_name +'#'); 
						data.share_info.descQQ = '【美图】分享一张美图 - 来自 杂志#'+ data.group_name +'# >>' + qqHuiliu; 
						data.share_info.text = '>>分享自美丽说杂志《'+ data.group_name +'》';
					}else{
						data.share_info.desc = '分享一张美图 - 来自@美丽说';	
					//	data.share_info.descQQ = '分享一张美图' + qqHuiliu;	
						if(data.goods_info.twitter_content == ''){
							data.share_info.descQQ = '【美图】分享一张美图' + qqHuiliu ; 
						}else{
							data.share_info.descQQ = '【美图】' + data.goods_info.twitter_content + qqHuiliu ; 
						}
						data.share_info.text = '>>分享自美丽说';
					}
					break;
				case 9 :
					mSelf.redirectTo('/paipaishare/'+ data.goods_info.twitter_source_tid , true);
					return
				default : 
					data.showText = true;
					break;
			}
			mSelf.render('paipai/twitter.html' , data);
		});
	},
	'share' : function(){
		var url = this.readData('url',this.req.__get, '');
		var image = this.readData('image', this.req.__get, '');
		var content = this.readData('content', this.req.__get, '');
		this.redirectTo('/meilishuo_share?picurl='+encodeURIComponent(image)+'&siteurl='+encodeURIComponent(url)+'&content='+encodeURIComponent(content))
	}
}
exports.__create = controller.__create(paipaishare , controlFns);
