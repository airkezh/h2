/*common*/
var $ = require('wap/zepto')
	,lazy = require('wap/component/lazzyLoad');

var lazyer = lazy.init({'xpath' : '.bs_load_img'});
lazyer.scroll();
lazyer.load();