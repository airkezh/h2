/*common*/
var $ = require('wap/zepto')
	,tracking  = require('wap/app/tracking');

$(".save_it").on("click",function(){
	tracking.cr('wx/statistics_action', {'action': 'activityclick', 'value': 'save'});
	$(".mask").show();
});
$(".mask").on("click",function(){
	$(".mask").hide();
});
