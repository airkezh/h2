function new_user(){
	return this;	
}
var controlFns = {
	vip : function(id){
		// this.debugSnake({'target':'devlab1'});
		var mSelf = this;
		var php = {
			'banner' : '/section/focus?id='+id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.vip_id = id;
			
			data.pageTitle = '新人专享';
			data._CSSLinks = ['activity/new_user'];
			mSelf.render('activity/new_user.html' , data);
		});
	}
	,june : function(id){
		// this.debugSnake({'target':'devlab1'});
		var device_code = this.readData('device_code', this.req.__get, '') || '';
		var mSelf = this;
		var php = {
			'banner' : '/section/focus?id='+id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.vip_id = id;
			data.device_code = device_code;
			
			data.pageTitle = '优惠活动';
			data._CSSLinks = ['activity/new_user'];
			mSelf.render('activity/new_user_june.html' , data);
		});
	}
	,vip1 : function(id){
		// this.debugSnake({'target':'devlab1'});
		var mSelf = this;
		var php = {
			'banner' : '/section/focus?id='+id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.vip_id = id;
			
			data.pageTitle = '新人专享';
			data._CSSLinks = ['activity/new_user'];
			mSelf.render('activity/new_user1.html' , data);
		});
	}
};
exports.__create = controller.__create(new_user , controlFns);
