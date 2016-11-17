/*common*/

 var $ = require('wap/zepto')
 	 ,tracking = require("wap/app/tracking")

require("wap/zepto/fastclick");

//用户头像点击
$('.top_nav_img').on('click',function(){
	tracking.cr('wx/statistics_action', {'action': 'userCenterClick', 'value' : 'pop'})
	$user_box = $('.user_box');
	$user_box.css('display') == 'none' ? $user_box.show() : $user_box.hide()
	// window.location.href="/wx/user";
})