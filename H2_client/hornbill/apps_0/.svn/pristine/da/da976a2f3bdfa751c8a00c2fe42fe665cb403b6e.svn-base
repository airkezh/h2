/*common*/
require('wap/zepto/fastclick')
require('wap/zepto/scroll')

var $ = require('wap/zepto')
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')
var posterWall = require('wap/app/posterWalls2')
var onscroll = require('wap/component/windowScroll')
var pin = require('wap/component/wapfall')
var $nav = $('.nav');
var $gotop = $('.gotop');
var $curTab = $nav.find('.js_tab.p_tab_active');
var ajaxRequestUrl = '/aj/xuanguan/middle';
var bannerAjaxRequestUrl = '/aj/xuanguan/banner/pageInfo'
var win = $(window);

var requestAnimationFrame = win[0].requestAnimationFrame ||
    win[0].webkitRequestAnimationFrame ||
    win[0].mozRequestAnimationFrame ||
    oldStyleMove;
var tabOffset = 0;
requestAnimationFrame(function() {
    tabOffset = $nav.offset().top;
})


$('body')[0].scrollTop = 0;

// 判断时候支持position：sticky
function hasSticky() {
    var element = document.createElement('div');
    if ('position' in element.style) {
        element.style['position'] = '-webkit-sticky';
        element.style['position'] = '-moz-sticky';
        element.style['position'] = '-o-sticky';
        element.style['position'] = '-ms-sticky';
        element.style['position'] = 'sticky';
        return element.style['position'] === '-webkit-sticky' || element.style['position'] === '-moz-sticky' || element.style['position'] === '-o-sticky' || element.style['position'] === '-ms-sticky' || element.style['position'] === 'sticky'
    } else {
        return false;
    }
}

// tab吸顶
if (!hasSticky()) {
    $(window).scroll(function() {
        var t = $(window).scrollTop();
        if (t > tabOffset) {
          $nav.css({
                'position': 'fixed',
                'left': 0,
                "top": 0
            });
        } else {
           $nav.css({
                'position': 'static'
            });
        }
    });
}

var main = {
	init : function(){ //页面初始化
		/* lazy load setting, 采用全屏扫点方式加载 */
        this.lazyer = lazy.init({'xpath' : '.bs_load_img'});
        this.lazyer.load();
        this.lazyer.scroll();
        $nav.find('.js_tab').css('color', fml.vars.normal_fcolor);
        $curTab.css('color', fml.vars.active_fcolor).find('.word').css('background-color', fml.vars.act_bg_color);
        this.posterWall($curTab.attr('asid'), $curTab.data('r'));
        this.eventInit();
	},
	posterWall : function(type, paramR){
		var search = '';
        var that = this;
        if (type) {
            search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'asid=' + type;
        }
        pin.init({
            containerId: '.goods_wall'
        });
        var urlData = {
            'frame' : 0,
            'page_size' : 30,
            'r' : paramR
        }
        var pullUpAction = function() {
            posterWall.ajaxPoster(ajaxRequestUrl + search);
        }

        Meilishuo.config.poster0 = '';
        posterWall.testPoster0(urlData, pullUpAction);
        posterWall.scrollPoster(true);
	},
	eventInit : function(){
		var that = this;
        fml.eventProxy('logPoster', function(res) {
            if (!res.tInfo.length) {
                $('.pullUp').hide();
            } else {
                $('.pullUp').show();
            };
            that.lazyer.load();
        })
        $nav.find('.js_tab').on('click', function(){
            $('body')[0].scrollTop = tabOffset;
        	var $this = $(this);
            if($(this).hasClass('p_tab_active')) {
                return;
            }
        	$this.addClass('p_tab_active').siblings().removeClass('p_tab_active');
            $nav.find('.js_tab').css('color', fml.vars.normal_fcolor).find('.word').css('background-color', fml.vars.tab_bg);
            $this.css('color', fml.vars.active_fcolor).find('.word').css('background-color', fml.vars.act_bg_color);
        	$('.goods_wall').html('');
            $('.main_image_wrap').html('');
            var asid = $this.attr('asid');
            //去请求主图
            $.get(bannerAjaxRequestUrl,{'asid':asid},function(data) {
                var bannerTpl = shareTmp('main_banner',{'banner': data});
                $('.main_image_wrap').html( bannerTpl );
            },'json');
        	that.posterWall(asid, $this.data('r'));
            if ($nav.hasClass('scrollin')) {
                window.scrollTo(0, $('.nav_wrap').position().top + 10);
            }
        })
	}
}
main.init();

// 回顶部
$gotop.on("click" , function(e){
    document.body.scrollTop = 0;
});
onscroll.bind(gotop,'gotop');

function gotop(pos,isDown){
    if(pos < 30){
        $gotop.hide();
    } else {
        $gotop.show();
    }
}
