/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')
var lazy = require('wap/component/lazzyLoad')
var timedown = require('wap/app/doota/timedown')
var iscroll = require('wap/iscroll')
var posterWall = require('wap/app/posterWalls2')
var pin = require('wap/component/wapfall')
var sidebar = require("wap/page/activity/promotion/sidebar")

var curNavListLength = fml.vars.tablen;
var ajaxRequestUrl = '/clearance/activityShopList/'; 
var $gotop = $('.gotop');
var $pullUp = $('.pullUp');
var $nav = $('.nav_iscroll');
var $navWrap = $('.nav_wrap');
var $banner = $('.banner');
var timer;

//tab滑动
if(curNavListLength >= 5){
    var nav_width = 1.46;
    $('#nav_iscroll').css({
        'width': (nav_width * curNavListLength) + 'rem'
    });
    curNavScroll = new iScroll('nav_wrap', {
        vScroll: false,
        bounce: false,
        hScrollbar: false,
        vScrollbar: false,
        onBeforeScrollStart: function(e){
            if (this.absDistX > this.absDistY) {
                e.preventDefault();
            }
        },
        //解决第一次无法滑动的问题
        onTouchEnd: function(){
            var self = this;
            if (self.touchEndTimeId) {
               clearTimeout(self.touchEndTimeId);
            }
            self.touchEndTimeId = setTimeout(function(){
                self.absDistX = 0;
                self.absDistY = 0;
            }, 600);
        }
    });
    curNavScroll.refresh();
}

var main = {
    init: function(){  //初始化页面
        /* lazy load setting, 采用全屏扫点方式加载 */
        this.lazyer = lazy.init({'xpath' : '.bs_load_img'});
        this.lazyer.load()
        this.lazyer.scroll();
        this.posterWall($navWrap.find('li.curr').data('tab'), $navWrap.find('li.curr').data('r'));
        /*图片加载完成后再吸顶*/
        var oImg = $banner.find('img').last().get(0);
        if($nav.length){
            this.imgLoaded(oImg,this.navFixed);
        }   
        this.eventInit();
    },
    posterWall: function(type,paramR){
        var search = '';
        var that = this;
        if (type) {
            search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'tab=' + type;
        }
        pin.init({
            containerId: '.goods_wall'
        });
        var urlData = {
            'frame': 1,
            'event_id':fml.vars.event_id,
            'r': paramR
        }
        var pullUpAction = function() {
            posterWall.ajaxPoster(ajaxRequestUrl + search);
        }
        Meilishuo.config.poster0 = '';
        posterWall.testPoster0(urlData, pullUpAction);
        posterWall.scrollPoster(true);

    },
    imgLoaded: function(el,callback){
        if(el){
            if (el.complete) {
               callback();
            } else {
               el.onload = function() {
                    callback();
               }
            }
        }
        else{
            callback();
        }
    },
    navFixed: function(){
        onscroll.yIn($navWrap.position().top + 10,function(){
            $nav.removeClass('scrollout').addClass('scrollin shadow');
        },
        function(){
            $nav.removeClass('scrollin shadow').addClass('scrollout');
        })
    },
    getData: function(me){
        $(me).addClass('curr').siblings().removeClass('curr');
        $('.goods_wall').html('');
        main.posterWall($(me).data('tab'), $(me).data('r'));
        document.body.scrollTop = document.body.scrollTop +1;
        if ($nav.hasClass('scrollin')) {
            window.scrollTo(0, $navWrap.position().top + $nav.height() + 10);
        }
    },
    eventInit: function(){
        var that = this;
        fml.eventProxy('logPoster', function(res) {
            if (!res.data.tInfo.length) {
                $('.pullUp').hide();
            } else {
                $('.pullUp').show();
            };
            that.lazyer.load();
        })
        $nav.find('li').on('click', function(){
            if($(this).hasClass('curr')) {
                return;
            }
            that.getData($(this));
        })
    }
}
main.init();

// gotop
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

// timedown
function end_down(mSelf){
    var d = 0
        , unix = $(mSelf).data('timee');
    if(unix > 345600){
        $(mSelf).hide();
        clearInterval(timer);
        var timer = setInterval(function(){
            unix--;
            if(unix == 345600){
                window.location.reload();
            }
        },1000);
    }else{
        timedown.down(mSelf, $(mSelf).data('timee'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
            if(t.d != undefined) d = t.d;
            if(t.h != undefined){ t.h += d*24;$(mSelf).find('.hour').html(t.h<10 ? '0'+t.h : t.h); }
            if(t.i != undefined){ $(mSelf).find('.min').html(t.i<10 ? '0'+t.i : t.i);}
            $(mSelf).find('.sec').html(t.s<10 ? '0'+t.s : t.s);
        }).onTimeOver(function(){
            $(mSelf).html('抢购结束');
        }).correct();
    }
}
function start_down(mSelf){
    var d = 0
        , unix = $(mSelf).data('times');
    if($(mSelf).data('times') > 345600){
        $(mSelf).hide();
        clearInterval(timer);
        var timer = setInterval(function(){
            unix--;
            if(unix == 345600){
                window.location.reload();
            }
        }, 1000);
    }else{
        timedown.down(mSelf, $(mSelf).data('times'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
            if(t.d != undefined) d = t.d;
            if(t.h != undefined){ t.h += d*24; $(mSelf).find('.hour').html(t.h<10 ? '0'+t.h : t.h); }
            if(t.i != undefined){ $(mSelf).find('.min').html(t.i<10 ? '0'+t.i : t.i);}
            $(mSelf).find('.sec').html(t.s<10 ? '0'+t.s : t.s);
        }).onTimeOver(function(){
            window.location.reload()
        }).correct();
    }
}
$('.js_timeStamp').each(function(){
    var self = this;
    if($(self).data('times') < 1){
        end_down(self)
    } else {
        start_down(self)
    }
});

if(!Meilishuo.config.os.mobileQQ && fml.vars.isShow ){
    //侧边栏数据
    $.post("/aj/huodong/navi_data", {"actid" : 1201}, function(data) {
        if(data.data && data.data.navis){
            sidebar.build({
                "sidebars" : data.data.navis,
                "sidebarBtn" : {"header" : data.data.header, "back" : data.data.back}
            });
        }
    }, "json");
}