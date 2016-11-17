/*common*/
var $ = require('wap/zepto')
	touchSlide = require('wap/app/touchSlide'),
	WaterFall = require('circle/component/waterfall'),
	lazy = require('wap/component/lazzyLoad'),
	scroll = require('wap/component/windowScroll'),
	$login = $('.login'),
	$registe = $('.registe'),
	$bottombox = $('.bottom_box'),
	$pullUp = $('.pullUp'),
	$gotop = $('.gotop'),
	min_time = 0;
var lazyer,waterFallInstance;

function bindEvent(){
	$login.on('click', function(){
		var url = fml.vars.isapp ? 'meilishuo://login.meilishuo/' : '/user/login';
		location.href = window.__get_r(url, fml.vars.common_r);
	})
	$registe.on('click', function(){
		var url = fml.vars.isapp ? 'meilishuo://register.meilishuo/' :  '/user/register';
		location.href = window.__get_r(url, fml.vars.common_r);
	})
	window.MLS.didLogin = function() {
		location.reload();
	}
	if(Meilishuo.config.os.mobileQQ){
		$('body').on('click', '.wraper a',function(e){
			e.preventDefault();

			var $t = $('title')
			var title = $t.html()
			var link =  'http://' + location.host + $(this).attr('href');
			
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
		    }, 0)
		    
		});
	}
}
function slide() { //顶部banner轮番
	if (!$('.js-mark')) return;
	$('.js-mark').each(function() {
		var self = $(this),
		len = self.find('li').length;
		if (len > 1) {
			self.touchSlide({
				isAuto: false,
				speed: 300,
				beforeCallback: function() {
					var obj = self.find('li'),
						last = obj.eq(len).find('.bs_load_img'),
						last2 = obj.eq(len + 1).find('.bs_load_img');
					lazyFun(last);
					lazyFun(last2);
					//obj.width(setWidth);
				},
				finishCallback: function(index, curobj) {
					//lazyer.load();
					self.parents('.liked').find('.values').find('a').eq(index).addClass('arrow-down').siblings().removeClass('arrow-down');
					$(window).trigger('scroll');
				}
			});
			$('.num').find('b').text('');
		}
		self.removeClass('js-mark');
	})

	function lazyFun(obj) {
		obj.each(function() {
			$(this).data('shown', 1).css({
				'background-image': 'url(' + $(this).attr('asrc') + ')'
			}).removeAttr('asrc');
		});
	}
}
//去顶部
function topBtnHandle(y){  //页面下拉到一定位置，回顶部按钮显示
	scroll.yIn(y,function(){
		$gotop.show();
	},
	function(){
		$gotop.hide();
	})
	$gotop.on("click", function(e) {
		document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 :
		document.body.scrollTop = 0;
	});
}

function init(){
	topBtnHandle(30);
	lazyer = lazy.init({'xpath' : '.bs_load_img'});
	waterFallInstance = WaterFall.init({
		el: '.wraper',
		url: '/guessulike/aj/recommended_poster_m',
		colGap: fml.vars.isIphone ? 10 : 20,
		data:{
			limit:  4
		},
		dataFilter : function(data){
			min_time = data.min_time;
			return data.rInfo;
		},
		colNum: 1,
		onBeforeFetch: function( config ) {
			config.data.min_time = min_time;
		},
		onFetchSuccess: function(data){
			if(!data.length) {
				waterFallInstance.lock()
				$pullUp.hide();
				$bottombox.show();
			}
			lazyer.load();
		},
		onLayoutFinished: function(data){
			slide();
			if($pullUp[0].getBoundingClientRect().top < $(window).height()){
				$pullUp.hide();
				$bottombox.show();
			}
		},
	}).start(fml.vars.likeGoods);

	lazyer.scroll();
	lazyer.load();
	bindEvent();
}
init();
