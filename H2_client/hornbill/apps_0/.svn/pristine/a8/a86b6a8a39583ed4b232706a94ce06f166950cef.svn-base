function sale820(){
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
	pay820:function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['huodong/pay820'];
			data.pageTitle = '820大促微信专享优惠';
			this.render('biz/huodong/pay820.html' , data);
		});
	},
	act820:function(name,isBrand){
		//this.debugSnake({target : 'devlab1'});
		if (!name || !Number(name)) {
			name = 40525;
		}
		var word = this.readData('word',this.req.__get, 0);
		var page = this.readData('page',this.req.__get, 0)|0;
		var nav_word = this.readData('word',this.req.__get, 40525);
		// if(!word && !name) return this.errorPage(); 
		this.req.__get.frame = 0;
		if (name)
			this.req.__get[isBrand ? 'word_name':'word'] = name;
		var mSelf = this;
		var php = {	
			'attr_top' : '/goods/Attribute_top_ten'		// 左侧人气排行		
			,'new_coupons' : '/customactivity/CustomActivity_offer_venue_coupon'   //优惠券
			,'page_total' : '/goods/attribute_totalnum?frame=0&word_id='+ nav_word +'&word='+nav_word
		};
		var magFavor = false;		//#2836
		if (isMagFavor(mSelf))  {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			//判断瀑布流接口
			if(!data.page_total){
				data.page_total = {"totalNum" : 500}
			}
			if(!data.attr_top){
				data.attr_top = {};
			}
			data.attr_title_keywords={
			    "word_name": "全部",
			    "word_id": "40525"
			}
			// 判断优惠券
			var picurl="http://i.meilishuo.net/css/images/biz/phonepriv/";
			data.imgs = {
				1:picurl,
				2:picurl,
				3:picurl,
				4:picurl
			}
			if(!data.new_coupons){
				data.new_coupons = {};
			}
			data.coupons = data.new_coupons.coupon;
			if(!data.coupons){
                data.coupons = {
                    1 : {"can_use" : 0, "left_amount" : "", "total_amount" : "100", "next" : {"begin" : "2014-08-14 12:00:00"}},
                    2 : {"can_use" : 0, "left_amount" : "", "next" : {"begin" : "2014-08-14 12:00:00"}},
                    3 : {"can_use" : 0, "left_amount" : "", "next" : {"begin" : "2014-08-14 12:00:00"}},
                    4 : {"can_use" : 0, "left_amount" : "", "next" : {"begin" : "2014-08-14 12:00:00"}}
                }  
			}
			data.isMagFavor = magFavor;
			// true 宽屏 
			data.fluid = false;
			// 获取分页总数
			data.groupPg = {}; 
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.page_total.totalNum;
			data.groupPg.current_page = page; 
			data.word_name = name;
			data.k = parseInt(mSelf.req.__get.k);
			data.bg360 = mSelf.req.__get.frm;
			//console.log(data.bg360+"--------")
			//倒计时
			var dd = new Date();
            data.sTime = dd.getTime();
            var currDay = dd.getDate();
            if (currDay < 20) {

                data.remainDay = 20 - currDay;
                if (data.remainDay == 1) {
                    data.remainText = "活动开始就在明天";
                    data.remainDay = '';
                } else {
                    data.remainText = "距活动开始还有";
                }

            } else {

                data.remainDay = 22 - currDay;
                if (data.remainDay <  0) {
                    data.remainText = "活动已结束";
                    data.remainDay = '';
                } else {
                    if (data.remainDay == 0) {
                        data.remainText = "大促活动最后一天";
                        data.remainDay = '';
                    } else {
                        data.remainText = "距活动结束还有";
                    }
                }

            }

			for(var i in data.coupons){
				var coupon = data.coupons[i];
				if(i == 1){
					data.total100 = coupon.total_amount;
					data.left100 = coupon.left_amount;
					data.coded100 = coupon.coupon_code;
					data.typed100 = coupon.coupon_type;

					switch (coupon.can_use){
						//可以使用
						case 0: 				
							if(!coupon.left_amount){  //数据为空，说明活动未开始
								data.imgs[i] += '10time.jpg'
							}else{
								data.imgs[i] +='100ing.jpg';
								data.coupons[i].use1 = '100starting';
							}
						break;
						// 已抢光
						case 1:
							var t=new Date(coupon.next.begin);
							var time=t.getHours();
							var nowH=new Date().getHours();
							if( nowH >= 22 && nowH < 24){
								data.imgs[i] += "100m.jpg";
							}else{
								data.imgs[i] += time+"time.jpg";
							}
						break;
						// 已领过
						case 2:
							var d=new Date();
							if(d.getDate() < 20){
								data.imgs[i] +='100again.jpg';
							}else {
								data.imgs[i] +='100active.jpg';
							};
						break;
						case 3:
							data.imgs[i] += "no100.jpg";
						break;
					}
				}else{
					switch (coupon.can_use){
						//可以使用
						case 0: 				
							if(!coupon.left_amount){  //数据为空，说明活动未开始
								data.imgs[i] += '10other.jpg';
							}else{
								data.imgs[i] += 'othering.jpg';
								data.coupons[i].use = 'ostarting';
							}
						break;
						//已抢光
						case 1:
							var t=new Date(coupon.next.begin);
							var time=t.getHours();
							var nowH=new Date().getHours();
							if( nowH >= 22 && nowH < 24){
								data.imgs[i] += "otherm.jpg";
							}else{
								data.imgs[i] += time+"other.jpg";
							}
						break;
						// 已领过
						case 2:
							var d=new Date();
							if(d.getDate() < 20 ){
								data.imgs[i] +='otheragain.jpg';
							}else {
								data.imgs[i] +='otheractive.jpg';
							};
						break;
						case 3:
							data.imgs[i] += "otherno.jpg";
						break;
					}
				}
			}

			data.reg_feedback = false;
			data.tplName = 'attr';
			data.isShow = true;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act820'];
			data.pageTitle = '820 秋装上新季';
			this.render('biz/huodong/act820.html' , data);
		});
	},
}
exports.__create = controller.__create(sale820, controlFns);