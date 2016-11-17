function inviteFriends(){
	return this;
}
var controlFns = {
	index : function(){
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			data.hide_gotop = true;
			data.uid = data.userInfo.user_id;
			data.pageTitle = '邀请好友得优惠！';
			data._CSSLinks = ['activity/inviteFriends'];
			this.render('activity/inviteFriends/inviteFriends.html' , data);
		});
	},
	invite : function(id){
		var php = {
			'user' : '/user/Get_user_by_userid?user_id='+id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			data.hide_gotop = true;
			data.uid = id;
			data.nickname = data.userInfo.nickname
			data.pageTitle = '美丽说新人领红包';
			data._CSSLinks = ['activity/invite'];
			this.render('activity/inviteFriends/invite.html' , data);
		});
	},

};
exports.__create = controller.__create(inviteFriends , controlFns);
