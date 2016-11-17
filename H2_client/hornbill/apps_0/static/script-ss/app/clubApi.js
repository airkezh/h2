/**
	社区相关接口api
**/
fml.define('app/clubApi', ['component/ajax'], function(require, exports){
	var ajax = require('component/ajax');
	/*
		api接口信息
		create: http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Clubarticle_post
		delete: http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Clubarticle_delete
		like: http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Clubarticle_like
		reply: http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Clubarticle_reply
	*/
	var url_aw = {
		'create' : '/aw/club/create',
		'delete' : '/aw/club/delete',
		'like' : '/aw/club/like',
		'reply' : '/aw/club/reply'
	};
	var url_aj = {
	};

	exports.clubApi = function(type, data, cbk) {
		if (type in url_aw) {
			ajax.aw(url_aw[type], data, cbk);
		} else if (type in url_aj) {
			ajax.aj(url_aj[type], data, cbk);
		}
	}	
})
