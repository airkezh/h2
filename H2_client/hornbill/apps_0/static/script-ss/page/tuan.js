fml.define('page/tuan', ['jquery', 'component/windowScroll'], function(require, exports) {
    var $ = require('jquery'),
        scroll = require('component/windowScroll'),
        subNav = $('.f_container');
    if (!subNav.length) return;

    var menuBox = $('#m_ca'),
        menuBoxHeight = menuBox.height(),
        goods_wall_box=$('.main'),
        navHeight = $('#nav').height(),
        y = menuBox.offset().top - navHeight;
    scroll.yIn(y, function() {
        menuBox.addClass('m_ca_fixed');
        goods_wall_box.css('margin-top', (menuBoxHeight + 10) + 'px');
        menuBox.addClass('shadow');
    }, function() {
        menuBox.removeClass('m_ca_fixed');
        goods_wall_box.css('margin-top', '0');
        menuBox.removeClass('shadow');
    })

    $(function() {
        var _intervalTimer = null;

        function tuanMove() {
                var _li = $('.mlsslide_img li');
                var _index;
                var nextLi;
                var _tit = $('.mlsslide_tit li');
                _index = $('.mlsslide_img li:visible').index();
                if (_index < _li.length - 1) {
                    nextLi = _li.eq(_index + 1);
                } else {
                    nextLi = _li.eq(0);
                }
                _li.eq(_index).stop().animate({
                    opacity: 0
                }, 1000, function() {
                    $(this).hide();
                });
                nextLi.css('background-image', 'url(' + nextLi.attr("murl") + ')');
                nextLi.show().stop().animate({
                    opacity: 1
                }, 1000);
                _tit.removeClass('slide_tit_active').eq(nextLi.index()).addClass('slide_tit_active');
            }

        /*定时播放*/
        function startTimer() {
            clearInterval(_intervalTimer);
            _intervalTimer = setInterval(function() {
                tuanMove();
            }, 5000);
        }

        /*鼠标覆盖/移开列表标题*/
        $('.mlsslide_tit li').hover(function() {
            var _titThis = $(this);
            var _index = _titThis.index();
            clearInterval(_intervalTimer);
            _titThis.addClass('slide_tit_active').siblings().removeClass('slide_tit_active');
            $('.mlsslide_img li').eq(_index).css('background-image', 'url(' + $('.mlsslide_img li').eq(_index).attr("murl") + ')');
            $('.mlsslide_img li').eq(_index).stop().animate({
                'opacity': '1'
            }, 1000).show();
            $('.mlsslide_img li').eq(_index).siblings().stop().animate({
                'opacity': 0
            }, 1000, function() {
                $(this).hide();
            });
        }, function() {
            startTimer();
        })

        /*鼠标覆盖/移开图片标题*/
        $('.mlsslide_img').hover(function() {
            clearInterval(_intervalTimer);
        }, function() {
            startTimer();
        })

        /*判断页面是否需要加载动画效果*/
        if (('.mlsslide_img li').length == 1) {
            $('.mlsslide_tit').hide();
        } else {
            startTimer();
        }

        /*鼠标覆盖tab/显示本周精选或最后疯抢产品*/
        $('.editorrecom').find('.recom_tab span').hover(function() {
                $(this).addClass('tab_active').siblings().removeClass('tab_active');
                $('.' + $(this).attr('id')).show().siblings().hide();
            })
            /*产品分类导航虚线分隔*/
        $('.classify .c_menu').children('.split').show().end()
            .find('[class=tab_active]').prev().hide().end().next().hide();

    })
});
fml.use(['jquery', 'component/urlHandle', 'app/doota/timedown', 'component/waterfall', 'app/posterWalls', 'component/shareTmp'], function() {
    var shareTmp = this.shareTmp,
        pin = this.waterfall;
    window.timedown = this.timedown;
    var query = this.urlHandle.getParams(window.location.href.toString());
    var urlData = {
        'frame': query.frame || 0,
        'page': query.page || 0,
        'limit': 25
    };
    pin.init({
        colWidth: 242,
        offset: {
            x: 0,
            y: 6
        },
        colNumMin: 5,
        containerId: '.goods_wall',
        preLayout: {
            '.corner_stamp': -1
        },
        autoResize: null,
        resizeCallback: function() {}
    });
    fml.vars.toLogPoster = true
    fml.eventProxy('logPoster', function() {
        var $_this = this;
        $('.time').each(
            function($_this) {
                var _this = $(this);
                var leftsecond = _this.attr('time');
                d = parseInt(leftsecond / (3600 * 24)); //计算出相差天数
                h = parseInt((leftsecond / 3600) % 24); //扣除相差天数，计算出相差小时数
                m = parseInt((leftsecond / 60) % 60); //扣除相差天数，小时数，计算出相差分钟数
                // s=parseInt(leftsecond%60);//扣除相差天数、小时数、分钟数相差数，计算出相差秒速
                _this.parent('span').html('剩余' + d + '天' + (h < 10 ? '0' + h : h) + '小时' + (m < 10 ? '0' + m : m) + '分');
            }
        )
    })
    var opts = this.jquery.extend({}, urlData, query);
    var _url = '/aj/tuan/list'
    this.posterWalls(opts, _url, {
        'pageSize': 9,
        'Infinite': 1
    });
});