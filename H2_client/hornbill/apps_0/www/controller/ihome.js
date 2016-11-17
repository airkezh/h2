function ihome(){
	return this;	
}
var controlFns = {
	'index' : function(){
		var mSelf = this;
		var page = this.readData('page',this.req.__get, 0)|0;
		var frm = this.readData('frm',this.req.__get);
		var php = {
			'totalNum' : '/home/home_poster_num',
			'userInfo' : '/user/headinfo',
			'recommend' : '/recommend/recommend_shop?num=3'
		};
		if (frm != 'group_rec' && frm != 'regStep4')
			php['ads_top_banner'] = '/commerce/Ads_banner/home/top';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if (!data.userInfo || !data.userInfo.user_id){
				mSelf.redirectTo('/welcome');		
				return;	
			}

			if(data.userInfo.is_actived == 'taobao'){
				return mSelf.redirectTo('/settings/personalUpdate' , false);
			}
			//值为6表示用户修改邮箱后，未激活邮箱
			if(data.userInfo.is_actived == 6){
				return mSelf.redirectTo('/settings/emailSend', false);
			}
			if (data.userInfo.is_actived == 2) {
				mSelf.redirectTo('/user/register/success');
				return;
			}

			if (data.totalNum.totalNum == 0){
				mSelf.redirectTo('/user/register/step3?frm=home_step3');
				return;
			}

			// for yellow banner tip —— ads_banner
			if (frm == 'group_rec') {
				data.banNum = (parseInt(mSelf.readData('num',mSelf.req.__get)) + 1) * 10;
			} else if (frm == 'regStep4') {
				data.banNum = data.totalNum.totalNum;
			}

			var emailReg = /@yahoo|@ymail/; //yahoo 邮箱检查，显示警告信息
			if(emailReg.test(data.userInfo.email)){
				data.sysWarning = false;
			}
			data.onlyShowGoTop = true;
			data._CSSLinks = ['home'];
			data.pageTitle = data.userInfo.nickname + ' - 美丽说，发现、收藏、分享我的美丽点滴，让改变发生';
			data.headTag = 'home';
			// true 宽屏 
			data.fluid = true;
			// 获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page; 
		//	base.var_dump(data , false , 5);
			mSelf.render('home/home.html' , data);	
		});
	}
}
exports.__create = controller.__create(ihome , controlFns);
