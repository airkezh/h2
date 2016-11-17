/**
	用户相关接口api
**/
fml.define('app/userApi', ['component/ajax'], function(require, exports){
	var ajax = require('component/ajax');
	/*
		api接口信息
		http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Snake_Documentation
	*/
	var url_aw = {
		'follow' : '/aw/user/follow',
		'unfollow' : '/aw/user/unfollow'
	};
	var url_aj = {
	};

	exports.userApi = function(type, data, cbk) {
		if (type in url_aw) {
			ajax.aw(url_aw[type], data, cbk);
		} else if (type in url_aj) {
			ajax.aj(url_aj[type], data, cbk);
		}
	}	
})
