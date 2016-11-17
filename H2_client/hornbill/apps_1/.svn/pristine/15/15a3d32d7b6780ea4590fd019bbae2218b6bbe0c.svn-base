/**
 * 好店宽屏优化
 */
fml.define('page/doota/shop_wide' , ['jquery', 'app/posterWalls', 'app/followShop','component/shareTmp', 'component/urlHandle'] , function(require) {
    var $      = require('jquery');
    var global = window;

    /**
     * 顶部 banner 的轮播
     */
    ;(function() {
        var $banner   = $('#banner'),
            $banners  = $banner.find('.js-banners li'),
            $handlers = $banner.find('.js-handlers li'),
            len       = $handlers.size(),
            index     = 0,
            timerID   = 0,
            time      = 2000,
            $cur,

            ACTIVE = 'active';

        /*
            确保第一个元素是 handler，因为 highLight() 里要做判断

            使用 $().add() 的问题：
                从 DOM 结构上来说，handler 在 banner 的后面
                使用 add() 函数时，jQuery 会执行 unique() 操作，
                在这个过程中会对元素按照 DOM 结构顺序来排序，导致顺序错误。
        */
        $cur = $([$handlers.get(index), $banners.get(index)]);

        $handlers.hover(function(e) {
            clearTimeout(timerID);
            highLight(this);
        }, function() {
            slide();
        });

        $banners.hover(function() {
            clearTimeout(timerID);
        }, function() {
            slide();
        });

        function slide() {
            clearTimeout(timerID);
            timerID = setTimeout(function() {
                ++index >= len && (index = 0);
                highLight($handlers.get(index));
                slide();
            }, time)
        }

        function highLight(el) {
            if(el != $cur[0]) {
                $cur.removeClass(ACTIVE);
                index = $(el).index();
                ($cur = $([el, $banners.get(index)])).addClass(ACTIVE);
            }
        }

        slide();
    }())

    /**
     * 获取全部好店
     * 不包括推荐好店的内容，需要将“推荐好店”的 6 个 id 回传
     * 使用全局变量 GLOBAL_SUGGEST_SHOPS 来记录 id
     */
    ;(function() {
        var posterWalls = require('app/posterWalls'),
            shareTmp    = require('component/shareTmp'),
            query       = require('component/urlHandle').getParams(global.location.href.toString()),

            $shopCat      = $('#js-shopcat'),
            $shopSort     = $('#js-shopsort'),
            $paging       = $('#js-paging'),
            $suggestShops = $('#js-shop-suggest'),
            $allShops     = $('#js-shop-all'),

            isFirstLoad = true,

            urlData = $.extend({
                'frame' : query.frame || 0,
                'page'  : 0,
                'cata'  : 0,
                'style' : 0,
                'sortby': ''
            }, urlData, query),

            options = {
                'colWidth' : fml.vars.colWidth,
                'colHeight': fml.vars.colHeight,
                'colNumMin': 3,
                'isShop'   : true
            },

            suggestShopIds = global.GLOBAL_SUGGEST_SHOPS,

            ACTIVE    = 'active',
            SHOPS_API = '/aj/doota/shop_info_b';
        /**
         * 向后台传递的 page 是从 0 开始计数
         * 分页则从 1 开始
         */
        urlData.page > 0 && (urlData.page -= 1);

        options.onData = function(resp) {

            /**
             * 第一次加载成功后生成分页
             */
            if(isFirstLoad) {
                isFirstLoad = false;
                renderPaging(resp, query.page - 1);
            }
            return resp;
        };

        /**
         * 店铺过滤
         */
        $shopCat.on('click', '.js-filter', function(e) {
            var $el   = $(this),
                type  = $el.data('type'),
                value = $el.data('value');
            //不在第一页就跳转，否则使用 ajax
            if(urlData.page > 0) {
                var param = '?' + (type == 'cata' ?
                                  'cata='  + value + '&style=' + urlData.style :
                                  'style=' + value + '&cata=' + urlData.cata) +
                        '&sortby=' + urlData.sortby + '&page=1';

                return this.href = '/shop' + param;
            } else {
                urlData[type] = value;
                urlData.frame = 0;
                $el.parents('ul').find('.' + ACTIVE).removeClass(ACTIVE);
                $el.addClass(ACTIVE);
                requestSuggestShops();
            }
            e.preventDefault();
        });

        /**
         * 店铺排序
         */
        $shopSort.on('click', '.js-sort', function(e) {
            $(this).siblings('.' + ACTIVE).removeClass(ACTIVE).end().addClass(ACTIVE);
            urlData.frame  = 0;
            urlData.sortby = $(this).data('sort');
            requestAllShops();

            e.preventDefault();
        });

        /**
         * 翻页
         */
        $paging.on('click', '.js-page', function(e) {
            var $el = $(this);
            if(!$el.hasClass('currentpage')) {
                //将参数拼成 url
                var param = '?' + [
                        'cata='   + urlData.cata,
                        'style='  + urlData.style,
                        'sortby=' + urlData.sortby,
                        'page='   + (+$el.data('page'))
                ].join('&');

                return this.href = '/shop' + param;
            }
            e.preventDefault();
        });

        /**
         * 获取推荐好店
         */
        function requestSuggestShops() {
            urlData.shop_ids = '';
            urlData.s_type = 1;
            $.get(SHOPS_API, urlData, function(resp) {
                if(resp && resp.tInfo) {
                    $suggestShops.find('.bd').html(shareTmp('tmplSuggestShop', resp));

                    suggestShopIds = [];
                    $.each(resp.tInfo, function(i, v) {
                        suggestShopIds.push(v.shop_id);
                    });
                    $allShops.html('').css('width', 'auto');
                    requestAllShops();
                    renderPaging(resp, urlData.page);
                }

            }, 'json')
        }

        /**
         * 获取全部好店
         */
        function requestAllShops() {
            $allShops.html('');
            urlData.shop_ids = suggestShopIds ? suggestShopIds.join(',') : '';
            urlData.s_type = 2;
            posterWalls(urlData , SHOPS_API, options);
        }

        /**
         *  显示分页
         */
        function renderPaging(resp, cur) {
            $paging.html(shareTmp('paging', {
                totalNum: Math.floor(resp.totalNum / (resp.page_frame * resp.frame_size)),
                curPageNum: cur || 0
            }));
        }

        requestAllShops();
    }())


    require('app/followShop')({
        el: '.shop',
        follow: '<i class="icon-add">+</i>关 注'
    })
});
