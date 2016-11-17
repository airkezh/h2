/*common*/
require('wap/zepto/fastclick');

var lazy = require('wap/component/lazzyLoad'),
	tracking = require('wap/app/tracking');


var postwall = $('#postwall'),
	download = $('#download');
/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({
	'xpath': '.lazy_pic'
});
lazy_pic.scroll();

lazy_pic.load();


// download
download.on('click', function() {
	//axis统计代码
	_fxcmd.push(['trackEvent', 'event', 'download', 'label', '0']);
	tracking.cr('semDownload', {
		'refer': encodeURIComponent(fml.vars.refer)
	})
	window.location.href = fml.vars.appUrl;
})