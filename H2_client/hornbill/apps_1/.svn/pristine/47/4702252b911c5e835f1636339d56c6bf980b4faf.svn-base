fml.use(['wap/app/fallAdd', 'wap/zepto/touch'], function() {
	this.fallAdd({
		'url': '/aj/single/reply',
		'aid': fml.vars.aid,
		'processData': function(res) {
			return {
				'item': res.ainfo,
				'totalNum': res.pages.totalNum
			}
		},
		'box': '.wrap',
		'tmpId': 'replyListTpl',
		'page': 0,
		'firstView' : 1
	});
})

fml.define('wap/page/doota/single' , [] , function(require){});