function popular(){
	return this;
}
var controlFns = {
	'question' : function(p){
		var php = {
			'my_info' : '/activity/Activity_red_black_userinfo?operate=get',
			'baseData' : '/activity/Activity_red_black_question'	
		} 
		var self = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.my_info.hasPlayed == 1){
				if(data.my_info.isCorrect == 1){
					return self.redirectTo('/popular/answer/yes' ,true);
				}else{
					return self.redirectTo('/popular/answer/no' ,true);
				}
			}
			
			data.XR = true;
			data._CSSLinks = ['popular'];
			data.use_rem_screen = true;
			data.pageTitle = '挑战选款师';
			data.p = p;

			self.render('popular.html',data);

		});
	},
	'answer' : function(isCorrect){
		var php = {
			'my_info' : '/activity/Activity_red_black_userinfo?operate=get',
			'baseData' : '/activity/Activity_red_black_question'
		} 
		// var wapMod = base.loadModel( 'wap/tools.js' );
		var self = this;
		// var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/popular/question/')+'&bg='+encodeURIComponent('/goto/download/ ')+'&bg2='+encodeURIComponent('http://www.meilishuo.com/client/');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//分享
			/*var params = { 
				'title' : '我是标题',
				'text' : '我是内容',
				'pic' : '',
				'url' : shareURL
			};
			data.share = wapMod.shareTo( this.req, params,['weixin_timeline','weixin']);*/

			data.XR = true;
			data._CSSLinks = ['popular_select'];
			data.use_rem_screen = true;
			data.pageTitle = '挑战选款师';
			data.isCorrect = isCorrect;

			self.render('popular_select.html',data);

		});
	},
	'aj' : function(params){
		var php = {
			'red_black' : '/activity/Activity_red_black_userinfo'
		}
		this.ajaxTo(php[params]);
	}
	
};

exports.__create = controller.__create(popular , controlFns);
