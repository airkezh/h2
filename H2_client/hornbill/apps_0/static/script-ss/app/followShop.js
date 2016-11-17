/**
 * @name: followShop
 * @desc: 关注店铺
 * @author: sunzhidong
 * @use：
 *      var followShop = require('app/followShop');
 *      followShop({
 *          el: '.follow-shop',
 *          numEl: '.js-num'
 *      })
 *
 *      <em>需要在关注按钮上使用 data-shop 属性来提供店铺 id</em>
 *
 *      el:必须传入
 *          el 使用事件代理来处理关注按钮的点击
 *
 *      numEl:为关注人数元素，可以不传
 *          @WARN：numEl 必须为『关注按钮』的子元素
 *
 *          如果关注人数元素不能放到按钮下面，可以手动设置 $numEl(必须为 jQuery 对象)
 *
 *      $numEl:关注人数元素的 jQuery 对象
 *          @WARN：该值设置之后不会改变
 *
 *
 *          由于代码中在处理 numEl 时存在的限制，建议自己在事件中处理人数加减。
 *
 */
fml.define('app/followShop', ['jquery', 'app/checkLogin'], function(require) {
    "use strict";

    var $ = require('jquery'),
        checkLogin = require('app/checkLogin'),

        ACTING = '$acting',

        defaultConfig = {
            /**
             * 以下三项为默认文案
             */
            follow: '关注',
            unfollow: '取消关注',
            followed: '已关注',

            /**
             * 按钮上的 class，以此来区分关注状态
             */
            followClass: 'att',
            unfollowClass: 'no_att',

            /**
             * 发送请求的 API
             */
            followApi: '/aj/doota/shop_save?shop_id=',
            unfollowApi:  '/aj/doota/shop_cancel?shop_id=',

            /**
             * 事件处理函数默认 this 为按钮(jQuery 对象)，参数为 config
             */
            events: {
                /**
                 * 关注后触发的事件
                 * 默认为关注人数 + 1
                 */
                'afterFollow': function(c) {
                    var $numEl = c.$numEl;

                    if(!$numEl && c.numEl) {
                        /**
                         * 这里使用了 this.find()
                         */
                        $numEl = this.find(c.numEl);
                    }
                    $numEl && $numEl.html(parseInt($numEl.html()) + 1);
                },

                /**
                 * 取消关注后触发的事件
                 * 默认为关注人数 - 1
                 */
                'afterUnfollow': function(c) {
                    var $numEl = c.$numEl;

                    if(!$numEl && c.numEl) {
                        $numEl = this.find(c.numEl);
                    }
                    $numEl && $numEl.html(parseInt($numEl.html()) - 1);
                },

                /**
                 * 按钮 mouseover 的事件
                 */
                'mouseover': function(c) {
                    if(this.hasClass(c.followClass)) {
                        this.html(c.unfollow);
                    }
                },

                /**
                 * 按钮 mouseout 的事件
                 */
                'mouseout': function(c) {
                    if(this.hasClass(c.followClass)) {
                        this.html(c.followed);
                    }
                }
            }
        };

    return function(config) {
        var defaultShopId = fml.vars.shop_id;

        config = $.extend(true, {}, defaultConfig, config);

        var $el           = $(config.el),
            events        = config.events,
            afterFollow   = events.afterFollow,
            afterUnfollow = events.afterUnfollow,
            mouseover     = events.mouseover,
            mouseout      = events.mouseout;

        $el.on('click', '.' + config.unfollowClass, function (e) {
            if (!checkLogin()) return;

            e.preventDefault();

            var $this = $(this);
            if(!$this.data(ACTING)) {
                $this.data(ACTING, true);
                $.get(config.followApi + ($this.data('shop') || $(e.currentTarget).data('shop') || defaultShopId), function () {
                    $this.html(config.followed)
                        .removeClass(config.unfollowClass)
                        .addClass(config.followClass);

                    afterFollow.call($this, config);
                    $this.data(ACTING, false);
                });
            }
        }).on('click', '.' + config.followClass, function (e) {
            if (!checkLogin()) return;

            e.preventDefault();

            var $this = $(this);
            if(!$this.data(ACTING)) {
                $this.data(ACTING, true);
                $.get(config.unfollowApi + ($this.data('shop') || $(e.currentTarget).data('shop') || defaultShopId), function () {
                    $this.html(config.follow)
                        .removeClass(config.followClass)
                        .addClass(config.unfollowClass);

                    afterUnfollow.call($this, config);
                    $this.data(ACTING, false);
                });
            }
        }).on('mouseenter', '.' + config.followClass, function () {
            mouseover.call($(this), config);
        }).on('mouseleave', '.' + config.followClass, function () {
            mouseout.call($(this), config);
        });
    };
});