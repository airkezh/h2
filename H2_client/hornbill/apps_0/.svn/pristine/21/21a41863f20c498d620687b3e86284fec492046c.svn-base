function sale11(){
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
	act_list11:function(name,isBrand){
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
			data.area = mSelf.req.__get.area || 0;
			data.hdtrc = mSelf.req.__get.hdtrc;
			data.nHdtrc = data.hdtrc.split('_');
			data.reg = /\d+/;
			data.newHdtrc =  data.nHdtrc[1].replace(data.reg,'');
			data.newHdtrcT = data.nHdtrc[0] + "_" + data.newHdtrc;

			data.pageNum = page;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act618'];
			data.pageTitle = data.act_config.title || '美丽说-活动专场';

			this.render('biz/huodong/act_list11.html' , data);
		});
	},
	act11:function(name,isBrand){
		// this.debugSnake({target : 'devlab1'});

		var mSelf = this;
		var php = {	
			'new_coupons' : '/customactivity/CustomActivity_coupon_venue?type=pc&name=encore_11'   //优惠券
			,'featured_area11' : '/customactivity/CustomActivity_common_featured_area?actid=19'	//精选会场
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// 判断优惠券
			var picurl="http://i.meilishuo.net/css/images/biz/salePrice/";
			data.imgs = {
				0:picurl,
				1:picurl,
				2:picurl
			}
			if(!data.new_coupons){
				data.new_coupons = {};
			}
			if( !data.featured_area11 ){
				var featured_area11 = {};
				featured_area11.code = 0;
				featured_area11.data = {};
			}
			data.coupons = data.new_coupons.coupon;
			if(!data.coupons){
                data.coupons = [
                    {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}},
                    {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}},
                    {"can_use" : 0, "left_amount" : "", "total_amount" : "", "next" : {"begin" : "2014-09-01 10:00:00"}}
                ]  
			}
			for(var i = 0;i < data.coupons.length;i++){
				data.couponType = data.coupons[i].threshold + ":" + data.coupons[i].credit + ":" + data.coupons[i].id;
				var coupon = data.coupons[i];
				switch (coupon.can_use){
					//可以使用
					case 0: 				
						if(!coupon.left_amount){  //数据为空，说明活动未开始
							data.imgs[ i ] += '8time_11.png';
						}else{
							data.imgs[ i ] += 'ing_11.png';
							data.coupons[i].use = 'starting';
						}
					break;
					//已抢光
					case 1:
						var t = new Date(coupon.next.begin);
						var time=t.getHours();
						var nowH=new Date().getHours();
						if( nowH >= 21 && nowH < 24){
							data.imgs[ i ] += "tomorrow_11.png";
						}else{
							data.imgs[ i ] += time + "time_11.png";
						}
					break;
					// 已领过
					case 2:
						var d=new Date();
						if(d.getDate() < 11 ){
							data.imgs[ i ] +='again_11.png';
						}else {
							data.imgs[ i ] +='active_11.png';
						};
					break;
				}
			}
			//倒计时
			var end_time = '2014/11/12 00:00:00';
			var start_time = '2014/11/11 00:00:00';
			data.cur_time = new Date(data.new_coupons.timestamp);
			data.start_time = new Date(start_time);
			data.end_time = new Date(end_time);
			if( data.cur_time < data.start_time ){
				data.tips = "nostart";
				data.countdown_text = '距离11.11还有';
				data.countdown_time = data.start_time;
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.tips = "ing";
				data.countdown_text = '距离11.11结束还有';
				data.countdown_time = data.end_time;
			}else{ 
				data.tips = "end";
				data.countdown_text = '活动已结束';
			}
			data.reg_feedback = false;
			data.tplName = 'attr';
			data.isShow = true;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act11'];
			data.pageTitle = '11.11女生专属版 败家嘉年华';
			this.render('biz/huodong/act11.html' , data);
		});
	}

}
exports.__create = controller.__create(sale11, controlFns);
