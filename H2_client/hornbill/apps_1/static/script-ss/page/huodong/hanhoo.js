/*common*/
require('jquery');
var share = require('app/shareTo');
//分享到新浪
$('.sharesina').on('click' , function(){
		var s_url = location.href;
		var s_desp = '美丽属于搞好自己的妹纸！花点心思妆扮自己，美美哒，更自信、更开心！韩后919爱购节，抄底价回馈，大手笔豪礼买即送！准备好来血拼，一起来变美吧！@美丽说 @韩后';
		var s_img = 'http://i.meilishuo.net/css/images/huodong/hanhoo/hanhou.jpg';
		share.shareToWeibo(s_url, s_desp, s_img);
});