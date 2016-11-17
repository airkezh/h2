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
				return mSelf.redirectTo('/promotion/sale_1412/act12/');
			}
			data.pageNum = page;
			data.headTag = cid;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/promotion/act_list'];
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
				return mSelf.redirectTo('/promotion/sale_1412/act12/');
			}
			data.headTag = cid;
			data._CSSLinks = ['huodong/promotion/shops'];
			data.pageTitle = data.act_config.title || '美丽说-好店专场';
			this.render('biz/promotion/shops.html' , data);
		});
	},
	act12:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});
		var mSelf = this;
		var php = {	
			'featured_area11' : '/promotion/promotion_common_featured_area?actid=35'	//精选会场
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
			data.tplName = 'attr';
			data.isShow = true;
			data.headTag = 'act12';
			data._CSSLinks = ['huodong/promotion/act1412'];
			data.pageTitle = '【12.12年末犒劳节】';
			this.render('biz/promotion/act1412.html' , data);
		});
	},
	money12:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//倒计时
			var end_time = '2014/12/15 00:00:00';
			var start_time = '2014/12/11 20:00:00';
			data.cur_time = new Date();
			data.start_time = new Date(start_time);
			data.end_time = new Date(end_time);
			if( data.cur_time < data.start_time ){
				data.tips = "nostart";
				data.countdown_text = '距1212年末犒劳节开抢，还有';
				data.countdown_time = data.start_time;
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.tips = "ing";
				data.countdown_text = '距1212年末犒劳节结束，还有';
				data.countdown_time = data.end_time;
			}else{ 
				data.tips = "end";
				data.countdown_text = '活动已结束';
			}
			data.headTag = 'money12';
			data._CSSLinks = ['huodong/promotion/money12'];
			data.pageTitle = '12.12省钱攻略';
			this.render('biz/promotion/money12.html' , data);
		});
	}

}
exports.__create = controller.__create(sale1412, controlFns);
