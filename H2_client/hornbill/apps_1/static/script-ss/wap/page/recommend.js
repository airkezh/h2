/**
 * @fileoverview 首页 － 个性化推荐
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-12-12
 */

fml.use(['wap/app/posterWalls'], function(){
	// 登陆成功后的回调函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    // 登录
    if (!fml.vars.isLogin) {
        window.location.href = "meilishuo://login.meilishuo/";
        return;
    }

	var urlData = {'frame' : 0},
		posterWall = this.posterWalls,
		pullUpAction = function(){
			posterWall.ajaxPoster('/aj/getRecommendGoods/list');
		};

	posterWall.testPoster0(urlData, pullUpAction);
	posterWall.scrollPoster(true);
});

fml.define('wap/page/recommend', [], function(){});
