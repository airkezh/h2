/**
* 抓宝、发宝、发推、喜欢api接口
* @author chu dongjie
**/
fml.define('app/twitterApi', ['component/ajax'], function(require, exports){
	var ajax = require('component/ajax');
	/*
		api接口信息
		抓宝：http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Twitterfetch
		发推：http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Twittercreate
		喜欢：http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Twitterlike
		删推：http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Twitterdestroy
	*/
	var url_aw = {
		'fetch' : '/aj/twitter/fetch',
		'create' : '/aw/twitter/create',
		'like' : '/aw/twitter/like',
		'destroy' : '/aw/twitter/destroy',
		'destroy_spam' : '/aw/twitter/destroy_spam'
	}

	exports.twitterApi = function(type, data, cbk , onFail) {
		//console.log(data)
		if (type in url_aw) {
			ajax.aw(url_aw[type], data, cbk ,onFail);
		}
	}
})
