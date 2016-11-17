/*common*/
require('wap/zepto/fastclick')
var gotop = require('wap/app/gotop')
	,tracking = require('wap/app/tracking')

$('#go_top').on('click',function(){
	tracking.cr('wx/statistics_action', {'action': 'clickGoTop', 'value': 'null'})
})

window.setTimeout(function(){
	gotop.gotop(true);
},100);
