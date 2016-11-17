/*common*/
require('m/zepto/touch');
var signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, loading = require('m/app/loading')

if ( Meilishuo.config.os.weixinBrowser ) {
    signWX()
    shareWX.bind( {
        'desc':    fml.vars.CONFIG_SHARE.desc,
        'title':   fml.vars.CONFIG_SHARE.title,
        'imgUrl':  fml.vars.CONFIG_SHARE.imgUrl,
        'link':    fml.vars.CONFIG_SHARE.link
    } )
}

// 滑动切页
var slipPageFn = require('cooper/component/slipPage');
window.slipPage = slipPageFn.init({
	outer:'.wrap .main'
	, page:'.page'
	, direction : '-x'
});

var staticList = [
	'http://d03.res.meilishuo.net/pic/_o/05/b4/4f26e665d36787ca0f25b7f70136_640_1136.cg.jpg'
	, 'http://d02.res.meilishuo.net/pic/_o/34/4d/03f1932dcf0f9b82cc2a5feaf8a4_636_334.cf.png'

]
loading(staticList, function(ok){
  if(!ok) return;

	$('.wrap').show()

	var t = setTimeout(function(){
		slipPage.deletePage(0)
		var musicOn = $('audio')[0];
		if(musicOn) musicOn.play();

		var url = "http://m.meilishuo.com/runningMan/chat/"

		slipPage.getPage(1).on('pageShow', function(){
			location.href = url 
		})
		slipPage.getPage(0).on('pageHide', function(){
			location.href = url 
		})

	}, 3600)

})
