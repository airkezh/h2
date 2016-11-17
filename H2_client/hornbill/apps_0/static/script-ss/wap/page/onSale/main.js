/*common*/
var shareJs = require('wap/page/onSale/shareJs');
//缓存变量
var banner = $('#banner'),
	li = banner.find('li');

//banner
var bannerIndex = 1,
	len = li.length;
li.eq(0).show();

function bannerFun() {
	li.hide().eq(bannerIndex).show();
	bannerIndex < (len - 1) ? bannerIndex++ : bannerIndex = 0;
}
// setInterval(bannerFun, 3000);
document.addEventListener('webkitAnimationEnd',bannerFun);

// shareJs
shareJs.shareWx();

//阻止页面出现滚动条
function touchStart(event) {
	// event.preventDefault();
}

function touchMove(event) {
	event.preventDefault();
}

function touchEnd(event) {
	// event.preventDefault();
};
//手机是高级浏览器，不必做addEventListener的兼容
// document.body.addEventListener("touchstart", touchStart, false);
document.body.addEventListener("touchmove", touchMove, false);
// document.body.addEventListener("touchend", touchEnd, false);
