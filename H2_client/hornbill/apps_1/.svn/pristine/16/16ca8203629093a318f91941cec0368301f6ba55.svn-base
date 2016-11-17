function sale_1501(){
	return this;
}
function isMagFavor(mSelf) {
	var modApp = base.loadModel('mls/application.js');
	var isNew = modApp.isNewUser(mSelf.req, mSelf.res);
	var browser = modApp.getBrowser(mSelf.req);
	var notSafari = !(browser.safari || browser.chrome);
	return isNew && notSafari;
}
function urlTrack( attr , dataPid ){
	if( attr != undefined && attr != ''){
		if( attr.indexOf("_") > 0){
			var nHdtrc = attr.split('_');
			var reg = /\d+/;
			var newHdtrc = nHdtrc[1].replace(reg,'');
			var newHdtrcT = nHdtrc[0] + "_" + newHdtrc;
			return newHdtrcT;	
		}else{
			var len = dataPid.split('').length;
			var trc = attr.split('');
			if( trc.length > len){
				trc.reverse().splice(0,len).reverse();
			}
			var res = trc.join('');
			return res;
		}
	}else{
		return mSelf.redirectTo('/welcome');
	}
}
var controlFns = {
	act_venue:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var cid = this.readData('cid', this.req.__get, 0) | 0;
		var pid = this.readData('pid',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		var hdtrc = this.readData('hdtrc',this.req.__get, 0)|0;
		var mSelf = this;
		var php = {	
			'userInfo' : '/user/headinfo'
			,'act_config' : '/customactivity/CustomActivity_common_tool_singleNew?id=act_common'
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if( !data.poster0 ){
				data.poster0 = {}
			}
			if(!data.act_config){
				data.act_config = {}
			}
			data.locaUrl = this.req.headers.XREF;
			// data.word_id
			data.isMagFavor = magFavor;
			// true 宽屏 
			data.fluid = false;
			// data.cid=cid;
			data.apparel_alert =false
			// 获取分页总数
			data.groupPg = {}; 
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 
			data.word_name = name;
			data.cate_list =data.act_config.cate_list
			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			data.rightNav = 1;
			data.ad_leftPic = false;
			data.apparel_alert = false;
			data.hideGoTop = true;
			data.pid = pid;
			data.cid = cid;
			data.hdtrc = mSelf.req.__get.hdtrc || 0;
			data.newHdtrcT = urlTrack( data.hdtrc , pid );

			data.pageNum = page;
			data.headTag = cid;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/promotion/act_list_common'];
			data.pageTitle = data.act_config.title || '美丽说-活动专场';
			this.render('biz/promotion/act_venue.html' , data);
		});
	},
	shop_venue:function(name,isBrand){
		var cid = this.readData('cid', this.req.__get, 0) | 0;
		var pid = this.readData('pid',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		var hdtrc = this.readData('hdtrc',this.req.__get, 0)|0;
		var mSelf = this;
		var php = {	
			'userInfo' : '/user/headinfo'
			,'act_config' : '/customactivity/CustomActivity_common_tool_singleNew?id=act_common'
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.act_config){
				data.act_config = {}
			}
			data.locaUrl = this.req.headers.XREF;
			data.word_name = name;
			data.cate_list =data.act_config.cate_list
			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			data.rightNav = 1;
			data.ad_leftPic = false;
			data.apparel_alert = false;
			data.pid = pid;
			data.cid = cid;
			data.area = mSelf.req.__get.area || 0;
			data.hdtrc = mSelf.req.__get.hdtrc;
			data.newHdtrcT = urlTrack( data.hdtrc , pid );
			
			data.headTag = cid;
			data._CSSLinks = ['huodong/promotion/shops_common'];
			data.pageTitle = data.act_config.title || '美丽说-好店专场';
			this.render('biz/promotion/shop_venue.html' , data);
		});
	},
	act120:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var mSelf = this;
		var php = {	
			'featured_area11' : '/promotion/promotion_common_featured_area?actid=55'	//精选会场
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.reg_feedback = false;
			data.apparel_alert = false;		//控制全站大弹窗在本次活动页面不显示
			data.ad_leftPic = false;		//控制左下角广告位在本地活动页面不显示
			data.rightNav = 1;
			data.tplName = 'attr';
			data.isShow = true;
			data.headTag = 'act12';
			data._CSSLinks = ['huodong/promotion/act150120'];
			data.pageTitle = '1.20年度畅销单品清仓';
			this.render('biz/promotion/act150120.html' , data);
		});
	},
	act125:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var mSelf = this;
		var php = {	
			'featured_area11' : '/promotion/promotion_common_featured_area?actid=55'	//精选会场
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.reg_feedback = false;
			data.apparel_alert = false;		//控制全站大弹窗在本次活动页面不显示
			data.ad_leftPic = false;		//控制左下角广告位在本地活动页面不显示
			data.rightNav = 1;
			data.tplName = 'attr';
			data.isShow = true;
			data.headTag = 'act12';
			data._CSSLinks = ['huodong/promotion/act150125'];
			data.pageTitle = '精品两折清仓';
			this.render('biz/promotion/act150125.html' , data);
		});
	},
	act119:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var mSelf = this;
		var php = {};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.reg_feedback = false;
			data.apparel_alert = false;		//控制全站大弹窗在本次活动页面不显示
			data.ad_leftPic = false;		//控制左下角广告位在本地活动页面不显示
			data.tplName = 'attr';
			data.isShow = true;
			data.headTag = 'act12';
			data._CSSLinks = ['huodong/promotion/act150119'];
			data.pageTitle = '最潮春装上新';
			this.render('biz/promotion/act150119.html' , data);
		});
	}

}
exports.__create = controller.__create(sale_1501, controlFns);
