function fcoupons(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		this.debugSnake({target : 'devlab1'});
		//?cid = 31
		var code = this.req.__get.code || 'fuider_wap_special'
		var cid = this.readData('cid',this.req.__get, '');
		var php = {
			'all' : '/customactivity/CustomActivity_common_tool_single?id='+code,
			'coup_list':'/customactivity/CustomActivity_fuide_coupon_list'
		}
		delete this.req.__get.header
		, mSelf = this
		//, u = mSelf.req.headers['user-agent']
		
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js')
		mSelf.listenOver(function(data){
			data.islogin = data.coup_list.islogin;
			if (!data.all) return this.errorPage()
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/fcoupons/index/?id='+ code +'&cid='+ cid)+'&bg='+encodeURIComponent('/activity/fcoupons/index/?id='+ code +'&cid='+ cid)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/')
			var params = {
				'title' : data.all.share.title,
				'text' :  data.all.share.text,
				'pic' : data.all.share.src,
				'url' : shareURL,
			};

			var picUrl = "";
			switch(data.coup_list.coupon.can_use) {
		    	case 0://可以使用
		    		picUrl = "butb.png";
		    		break;
		    	case 1://已抢光
		    		picUrl = "stop.png";
		    		break;
		    	case 2://已领过
		    		picUrl = "recv.png";
		    		break;
		    	case 3://准备开抢
		    		picUrl = "start.png";
		    		break;
		    } 
		    data.picUrl = picUrl;

			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;

			data.supportShare = wapMod.supportShare(mSelf.req) 
			data.pageTitle = '精彩专题 - 美丽说';
			data.meta_description = data.all.share.text;
			//base.var_dump(data.all, false, 8);
			data._CSSLinks = ['activity/fwindow'];
			mSelf.render('activity/project/fcoupons.html' , data);
		});
	},
	fuider : function(){
		var php = {};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');

			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data._CSSLinks = ['activity/fanchor'];
			mSelf.render('activity/project/fanchor.html', data);
		});
	}

};
exports.__create = controller.__create(fcoupons , controlFns);

