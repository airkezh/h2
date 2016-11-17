function sale1412(){
	return this;
}
function isMagFavor(mSelf) {
	var modApp = base.loadModel('mls/application.js');
	var isNew = modApp.isNewUser(mSelf.req, mSelf.res);
	var browser = modApp.getBrowser(mSelf.req);
	var notSafari = !(browser.safari || browser.chrome);
	return isNew && notSafari;
}
var controlFns = {
	act_list:function(name,isBrand){
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
			data.rightNav = false;
			data.ad_leftPic = false;
			data.pid = pid;
			data.cid = cid;
			data.hdtrc = mSelf.req.__get.hdtrc || 0;
			if( data.hdtrc != undefined && data.hdtrc != ''){
				if( data.hdtrc.indexOf("_") > 0){
					data.nHdtrc = data.hdtrc.split('_');
					data.reg = /\d+/;
					data.newHdtrc =  data.nHdtrc[1].replace(data.reg,'');
					data.newHdtrcT = data.nHdtrc[0] + "_" + data.newHdtrc;
				}else{
					var len = data.pid.split('').length;
					var trc = data.hdtrc.split('');
					if( trc.length > len){
						trc.reverse().splice(0,len).reverse();
					}
					data.newHdtrcT = trc;
				}
			}else{
				return mSelf.redirectTo('/promotion/sale_141220/act1225/');
			}
			data.pageNum = page;
			data.headTag = cid;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/promotion/act_list141225'];
			data.pageTitle = data.act_config.title || '美丽说-活动专场';
			this.render('biz/promotion/act_list.html' , data);
		});
	},
	act_shops:function(name,isBrand){
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
			
			data.word_name = name;
			data.cate_list =data.act_config.cate_list
			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			if( new Date() > new Date('2014-12-22').setHours(20)){
				data.rightNav = 1;
			}else{
				data.rightNav = false;
			}
			data.ad_leftPic = false;
			data.pid = pid;
			data.cid = cid;
			data.area = mSelf.req.__get.area || 0;
			data.hdtrc = mSelf.req.__get.hdtrc;
			if( data.hdtrc != undefined && data.hdtrc != ''){
				if( data.hdtrc.indexOf("_") > 0){
					data.nHdtrc = data.hdtrc.split('_');
					data.reg = /\d+/;
					data.newHdtrc =  data.nHdtrc[1].replace(data.reg,'');
					data.newHdtrcT = data.nHdtrc[0] + "_" + data.newHdtrc;
				}else{
					var len = data.pid.split('').length;
					var trc = data.hdtrc.split('');
					if( trc.length > len){
						trc.reverse().splice(0,len).reverse();
					}
					data.newHdtrcT = trc;
				}
			}else{
				return mSelf.redirectTo('/promotion/sale_141220/act1225/');
			}
			data.headTag = cid;
			data._CSSLinks = ['huodong/promotion/shops141225'];
			data.pageTitle = data.act_config.title || '美丽说-好店专场';
			this.render('biz/promotion/shops.html' , data);
		});
	},
	act1220:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var mSelf = this;
		var php = {	
			'featured_area1' : '/promotion/promotion_common_topic_list?id=39&type=pc'	//精选商品
			, 'nav_area' : '/promotion/promotion_common_featured_area?actid=39'			//气泡
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if( data.featured_area1.error_code == 0){
				data.featured_area = data.featured_area1.data;
			}
			data.reg_feedback = false;
			data.apparel_alert = false;		//控制全站大弹窗在本次活动页面不显示
			data.ad_leftPic = false;
			data.tplName = 'attr';
			data.isShow = true;
			data.headTag = 'act1220';
			data._CSSLinks = ['huodong/promotion/act141220'];
			data.pageTitle = '【12.20年末大促销】';
			this.render('biz/promotion/act141220.html' , data);
		});
	},
	act1225:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var mSelf = this;
		var php = {	
			'featured_area11' : '/promotion/promotion_common_featured_area?actid=45'	//精选会场
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
			data.tplName = 'attr';
			data.isShow = true;
			data.headTag = 'act12';
			data._CSSLinks = ['huodong/promotion/act141225'];
			data.pageTitle = 'Final Sale终极大促';
			this.render('biz/promotion/act141225.html' , data);
		});
	}

}
exports.__create = controller.__create(sale1412, controlFns);
