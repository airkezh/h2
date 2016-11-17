/**
	杂志社相关接口api
**/
fml.define('app/groupApi', ['component/ajax'], function(require, exports){
	var ajax = require('component/ajax');
	/*
		api接口信息
		http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Snake_Documentation
	*/
	var url_aw = {
		'elite' : '/aj/magazine/twitter_elite',
		'user_groups' : '/aj/magazine/user_groups',
		'remove' : '/aw/group/remove',
		'create' : '/aw/group/create'
	};
	var url_aj = {
		'style' : '/aj/magazine/group_style',
		'quit' : '/aj/magazine/quit',
		'follow' : '/aj/magazine/follow'
	};

	exports.groupApi = function(type, data, cbk) {
		if (type in url_aw) {
			ajax.aw(url_aw[type], data, cbk);
		} else if (type in url_aj) {
			ajax.aj(url_aj[type], data, cbk);
		}
	}	
})
