fml.define('order_pc/common/foot', ['jquery', 'ui/alert'], function(require, exports) {

	var $ = require('jquery'),
		alert = require('ui/alert');

	var support = 7; //ie7以上
	
	if ($.browser.msie && parseInt($.browser.version, 10) < support) {
		var close = new alert({
			width: 380,
			content: '为了能有更好的浏览体验，美丽说建议您升级到最新版本IE浏览器或选择其他浏览器。',
			discover: true,
			hasClose:false,
			confirmTxt:'继续访问>>'
		});
	}
});