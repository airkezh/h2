/*common*/

var $ = require('wap/zepto')
	, Swipe = require('wap/component/swipe')
	, WaterFall = require('circle/component/waterfall')
	, lazy = require('wap/component/lazzyLoad')
	, slide = $('#slider')[0]
	, $topicSlide = $('.topic').find('.gtthree')
	, $topicWraper = $topicSlide.find('.wraper')
	, $pullUp = $('.pullUp');
var lazyer,waterFallInstance;

function getStyle(obj,attr){    //获取非行间样式，obj是对象，attr是值
	if(obj.currentStyle){   //针对ie获取非行间样式
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];   //针对非ie
	};
}

function eventBind(){
	$('.activity .js-stats').on('click', function(){
		$that = $(this);
		$.post('/brand/aj/stats', {'title' : encodeURIComponent($that.data('title'))});
	}).removeClass('js-stats');
}

function init(){
	if(slide){
		$swip_num_list = $('.swipe_num').find('span');
		$swip_num_list.first().addClass('active');
		var swip = new Swipe(slide, {
			speed: 400
			, auto: 3000
			, continuous: true
			, disableScroll: false
			, stopPropagation: false
			, isScrolling: true
			, callback: function(index, elem){
				swip.restore();
				$swip_num_list.removeClass('active').eq(index).addClass('active');
			}
		})
	}
	if($topicWraper.find('a').length){
		var len = $topicWraper.find('a').length;
		var $firstobj = $topicWraper.find('a').first();
		var slideitemW = Math.ceil(parseFloat(getStyle($firstobj[0],'width')) + parseFloat(getStyle($firstobj[0],'marginRight')) * 2);
		$topicWraper.width(slideitemW * len);
	}
	lazyer = lazy.init({'xpath' : '.bs_load_img'});
	waterFallInstance = WaterFall.init({
		el: '.activity .list',
		url: '/brand/aj/activity_poster_m?__get_r=1',
		data:{
			limit:  5
		},
		colGap: fml.vars.isIphone ? 3 : 6,
		dataFilter : function(data){
			return data.data;
		},
		colNum: 1,
		onFetchSuccess: function(data){
			if(!data.length) {
				waterFallInstance.lock()
				$pullUp.attr('status' , 'stop');
			}
			lazyer.load();
		},
		onLayoutFinished: function(data){
			eventBind();
		}
	}).start(fml.vars.activityList);
	lazyer.scroll();
	lazyer.load();
}
init();
