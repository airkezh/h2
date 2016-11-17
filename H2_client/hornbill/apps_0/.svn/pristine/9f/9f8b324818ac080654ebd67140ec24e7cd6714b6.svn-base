/*common*/
require('wap/zepto/fastclick');
var $ = require('wap/zepto')
    , lazy = require('wap/component/lazzyLoad')
    , scroll = require('wap/component/windowScroll')
    , sticky = require('wap/component/sticky')
    , iscroll = require('wap/iscroll')
    , timedown = require('wap/app/doota/timedown');

/* 扫点加载 */
var lazyer = lazy.init({'xpath' : '.bs_load_img'});
lazyer.load();
lazyer.scroll();

/* 吸顶 */
var stickyItems = sticky.init('.nav', {
    'infinity' : true
});

/* 倒计时 */
function end_down(mSelf){
    timedown.down(mSelf, $(mSelf).attr('time'), '0d-0h-0i-0s',['%v: ','%v: ','%v', '<b class="none_f">%v</b>']).onAction(function(t){
        if(t.d != undefined) d = t.d;
        if(t.h != undefined) h = t.h;
        if(t.i != undefined) i = t.i;
        $(mSelf).html(d + '天' + h + '小时' + i + '分钟')
    }).onTimeOver(function(){
        $(mSelf).html('抢购结束');
    }).correct();
}
$('.time').each(function(){
    var self = this;
    end_down(self);
})

if($('.rushTime').length > 0){
    var $rushTime = $('.rushTime')
    timedown.down($rushTime[0], $rushTime.attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>', '%v: ','%v: ','%v']).onAction(function(t){
        if(t.d != undefined) d = t.d;
        if(t.h != undefined) { t.h += d*24; $rushTime.find('.hour').html(t.h<10 ? '0'+t.h : t.h);}
        if(t.i != undefined) { $rushTime.find('.minute').html(t.i<10 ? '0'+t.i : t.i); }
        $rushTime.find('.second').html(t.s<10 ? '0'+t.s : t.s);
    }).onTimeOver(function(){
        window.location.reload();
    }).correct();
}

/*清仓产品滑动*/
var nav_width = 1.85;
$('.goodsIscroll').each(function(){
    var self = this;
    var len = $(self).find('.goods').length;
    if(len >= 4){
        goodsScroll($(self), len);
    }
})

function goodsScroll (obj, len){
    var $this = obj
        , $parent = $this.parents('.goodsWrap');
    $this.css({
        'width': (nav_width * len) + 0.15 + 'rem'
    })
    curNavScroll = new iScroll($parent[0], {
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