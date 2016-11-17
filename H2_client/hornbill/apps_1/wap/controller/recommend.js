/**
 * @fileoverview 首页 － 个性化推荐
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-12-12
 */

function recommend(){
	return this;	
}

var controlFns = {
	'index' : function(){
		this.debugSnake({target : 'devlab4'});
		var self = this,
			wapMod = base.loadModel('wap/tools.js'),
			php = {
				'poster0' : '/poster/popular_poster_m',
				'mobUserInfo': '/customactivity/CustomActivity_wap_user_info'  // 获取wap用户信息 接口
			};

		self.setMDefault(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
			data.isNewest = wapMod.isNewest(self.req, '4.1.1');
            data.isLogin = (data.mobUserInfo.data.user_id == 0) ? 0 : 1;
            data.pageTitle = '个性化推荐';
            data._CSSLinks = ['recommend'];
            self.render('recommend.html', data);
		});
	}
};

exports.__create = controller.__create(recommend, controlFns);
