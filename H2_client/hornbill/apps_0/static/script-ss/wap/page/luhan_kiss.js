/*common*/
require('m/zepto/touch');
var signWX = require( 'wx/sign' );
var shareWX = require( 'wx/share' );
// var tracking = require('wap/app/tracking');


if(Meilishuo.config.os.weixinBrowser){
	signWX();
	shareWX.bind({
        'desc': '哈哈！我亲了鹿晗！这件事要昭告天下！！鹿晗要一个爱的鼓励，这种事情怎么能忘记告诉你',
        'imgUrl': 'http://d05.res.meilishuo.net/pic/_o/15/40/02c43b87ba766291b6283a79e674_200_289.cg.jpg',
        'title': '我居然亲了鹿晗了！告诉大家来拉仇恨！',
        'link': 'http://m.meilishuo.com/luhan/kiss'
    });
}

var musicOn = $('audio')[0];
if(musicOn) musicOn.play();

// 滑动切页
var slipPageFn = require('cooper/component/slipPage');
window.slipPage = slipPageFn.init({
	outer:'.wrap .main'
	, page:'.page'
	, direction : '-x'
});
slipPage.getPages().on('pageShow', function(){
	// tracking.cr('luhan', { 'page':($(this).index()+1)});
	if($(this).index() == 1){
		$('.talk1 , .talk2 , .talk4').addClass('moveL');
		$('.talk3').addClass('moveR');
	}	
})












