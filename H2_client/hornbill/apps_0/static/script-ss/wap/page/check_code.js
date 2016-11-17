/*common*/
var $ = require('wap/zepto')
require('wap/zepto/fastclick')
$('#test_close').on('click', function(event) {
	event.preventDefault();
	location.href = 'meilishuo://close.meilishuo'
});