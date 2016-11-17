/*common*/
require('wap/zepto')
var mlss = require('wap/component/mls')

mlss.ready(function(){
	$('.botton').on('click', function(){
		mlss.login({
			success: function(res){
				alert(1)
			}
		})
	})
	$('.open').on('click', function(){
		mlss.openURL({
			'url' : 'http://www.baidu.com'
			, 'inApp' : 1
		})
	})
	$('.goods').on('click', function(){
		mlss.twitter_single({
			'twitter_info': {
				'twitter_id': '3978246561',
				'is_doota': '1'
			}
		})
	})
	$('.pick_address').on('click', function(){
		mlss.pick_address({
			'success': function(res){
				alert(JSON.stringify(res))
			}
		})
	})
	$('.scanner').on('click', function(){
		mlss.scanner({
			'success': function(res){
				alert(JSON.stringify(res))
			}
		})
	})
	$('.show_share').on('click', function(){
		mlss.menu({
			'buttons': [{
				'type': 'cart'
			}, {
				'type': 'share',
				'share_items': {
					"weibo": {
						"url": "meilishuo:\/\/share.meilishuo?json_params=%7B%22type%22%3A%22weibo%22%2C%22text%22%3A%22%5Cu6715%5Cu662f%5Cu5206%5Cu4eab%5Cu5230%5Cu5fae%5Cu535a%5Cu7684text297%22%2C%22url%22%3A%22http%3A%5C%2F%5C%2Fwww.meilishuo.com%22%2C%22pic_url%22%3A%22http%3A%5C%2F%5C%2Fimgtest-dl.meiliworks.com%5C%2Fpic%5C%2F_o%5C%2F66%5C%2Fc5%5C%2Fd87ed57c2296df467be8816f82f9_252_600.jpg%22%7D"
					},
					"qzone": {
						"url": "meilishuo:\/\/share.meilishuo?json_params=%7B%22type%22%3A%22qzone%22%2C%22text%22%3A%22%5Cu6715%5Cu662f%5Cu5206%5Cu4eab%5Cu5230%5Cu5fae%5Cu535a%5Cu7684text%22%2C%22url%22%3A%22http%3A%5C%2F%5C%2Fwww.meilishuo.com%22%2C%22pic_url%22%3A%22http%3A%5C%2F%5C%2Fimgtest-dl.meiliworks.com%5C%2Fpic%5C%2F_o%5C%2F66%5C%2Fc5%5C%2Fd87ed57c2296df467be8816f82f9_252_600.jpg%22%2C%22title%22%3A%22%5Cu6211%5Cu662ftitle%22%2C%22comment%22%3A%22%5Cu6211%5Cu662fcomment%22%2C%22message_type%22%3A%22webpage%22%7D"
					},
					"qq": {
						"url": "meilishuo:\/\/share.meilishuo?json_params=%7B%22type%22%3A%22qq%22%2C%22title%22%3A%22%5Cu5367%5Cu5ba4title%22%2C%22text%22%3A%22%5Cu6715%5Cu662f%5Cu5fae%5Cu4fe1text%22%2C%22message_type%22%3A%22webpage%22%2C%22url%22%3A%22http%3A%5C%2F%5C%2Fwap.meilishuo.com%22%2C%22thumb_url%22%3A%22http%3A%5C%2F%5C%2Fd01.res.meilishuo.net%5C%2Fpic%5C%2F_o%5C%2F82%5C%2F2d%5C%2F161e43c3979e5325a1fb9dadd3bf_267_300.jpg%22%7D"
					},
					"weixin": {
						"url": "meilishuo:\/\/share.meilishuo?json_params=%7B%22type%22%3A%22weixin%22%2C%22title%22%3A%22%5Cu5367%5Cu5ba4title%22%2C%22text%22%3A%22%5Cu6715%5Cu662f%5Cu5fae%5Cu4fe1text%22%2C%22message_type%22%3A%22webpage%22%2C%22url%22%3A%22http%3A%5C%2F%5C%2Fwap.meilishuo.com%22%2C%22thumb_url%22%3A%22http%3A%5C%2F%5C%2Fd01.res.meilishuo.net%5C%2Fpic%5C%2F_o%5C%2F82%5C%2F2d%5C%2F161e43c3979e5325a1fb9dadd3bf_267_300.jpg%22%7D"
					},
					"weixin_timeline": {
						"url": "meilishuo:\/\/share.meilishuo?json_params=%7B%22type%22%3A%22weixin_timeline%22%2C%22title%22%3A%22%5Cu5367%5Cu5ba4title%22%2C%22text%22%3A%22%5Cu6715%5Cu662f%5Cu5fae%5Cu4fe1text%22%2C%22message_type%22%3A%22webpage%22%2C%22url%22%3A%22http%3A%5C%2F%5C%2Fwap.meilishuo.com%22%2C%22thumb_url%22%3A%22http%3A%5C%2F%5C%2Fd01.res.meilishuo.net%5C%2Fpic%5C%2F_o%5C%2F82%5C%2F2d%5C%2F161e43c3979e5325a1fb9dadd3bf_267_300.jpg%22%7D"
					}
				}
			}]
		})
	})
})
