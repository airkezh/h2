/*common*/
require('wap/page/sq/search_md')

var shareTmp = require('wap/component/shareTmp')
    , poster = require('m/app/posterPa')
    , lazyLoad = require('m/component/lazyLoad')
    , posterWall = require('m/app/posterWall')
    , tracking = require('wap/app/tracking')

var poster_info = fml.vars.poster
var poster_url = '/aj/sq/interfaces/tuan?cate_id=' + poster_info.cate_id
var data = {
	url : poster_url
	, poster : poster
	, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
	, colNum : 2
}

posterWall.scroll(data)

$('body').on('click','.li_border a,.tuan a',function(e){
	e.preventDefault()
	
	var $t = $('title')
	var title = $t.html()
	var link =  'http://' + location.host + $(this).attr('href') + '&_wv=5123'
		
	$t.html('返回')
	mqq.ui.refreshTitle()
	mqq.ui.openUrl({
		url: link,
		target: 1,
		style: 0
	})

	setTimeout(function (){
		$t.html(title)
		mqq.ui.refreshTitle()
	},0)
})

// 埋点统计
window.onload =  function (){
	tracking.cr('sq/onload')
}

$('a[href="/sq/cart/"]').on('click', function(){
	tracking.cr('sq/statistics_action', {'action': 'goCart', 'value' : 'userCenterPop'})
	return true	
})