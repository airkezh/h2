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

/* 微信分享 */
if(fml.vars.isShare === true){
	var signWX = require( 'wx/sign' ),
    	shareWX = require( 'wx/share' );

	signWX();
	var txt = '专属达人挑款师带你开启美丽说时尚之旅！加入我们，发现流行，占有世界！'
	fml.vars.shareData = {
		'title' : '美丽说 ' + txt
	    ,'desc': txt
	    ,'imgUrl' : 'http://d04.res.meilishuo.net/pic/_o/e1/57/23da17ce0853a6b5589a1492ce34_200_200.cf.png'
	};
	shareWX.bind( fml.vars.shareData );
}