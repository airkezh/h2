/*common*/
var $ = require('wap/zepto');
var WaterFall = require( 'circle/component/waterfall' );
var lazy = require( 'm/component/lazyLoad' )

// 手Q默认分享 先引入：<script src="http://pub.idqqimg.com/qqmobile/qqapi.js?_bid=152"></script>
// 	var imgPath = 'http://mat1.gtimg.com/gongyi/m/wx/logo2.jpg';
// 	mqq.data.setShareInfo({share_url:window.location.href, title:'美丽说', desc:'购时尚', image_url:imgPath}, function(result){});

var lazyLoad = lazy.init({xpath:'.pic_load'})

var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: '/aj/sq/normal_goods?page_name=' + fml.vars.poster.pageName + '&cate_id=' + fml.vars.poster.cate_id,
	dataName: 'tInfo', //默认
	colNum: 2,
	colGap : 0,
	// onFetchStart: function(wf){
	// 	// wf.data.offset = wf.data.frame*10;
	// },
	onFetchSuccess: function(data){
		lazyLoad.scroll()
		if(data.length === 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	},
	onFetchFinished: function(data){
		lazyLoad.load()
		// hide_loading();
	}
}).start()

