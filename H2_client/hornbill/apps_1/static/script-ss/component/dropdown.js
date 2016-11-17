/**
 * @name: dropdown
 * @desc: 点击按钮，显示面板,
 *        点击页面其他区域，面板隐藏
 *
 * @author: sunzhidong
 * @create-date: 2014-08-27
 */
fml.define('component/dropdown', ['jquery'], function(require) {
    var $     = require('jquery'),
        $doc  = $(document),
        noop  = function() { return true;},

        CLICK = 'click.comp.dropdown',
        FALSE = false;

    function DropDown(config) {
        var defaultConfig = {
            /**
             * 激活面板的事件
             */
            action: 'click',

            /**
             * 面板被激活时，按钮上获得的 class
             */
            activeClass: 'active',

            /**
             * 点击页面区域(除面板外)，隐藏面板
             */
            globalHide: true,

            events: {
                beforeShow: noop,
                beforeHide: noop,
                show: noop,
                hide: noop
            }
        };

        config = this.config = $.extend(true, {}, defaultConfig, config);
        if(!config.el || !config.panel) throw new Error('Must provide el and panel.');

        var that   = this,
            $el    = that.$el = $(config.el),
            $panel = that.$panel = $(config.panel);

        $el.on(config.action, function(e) {
            e.preventDefault();
            e.stopPropagation();
            /**
             * 所有下拉面板默认是互斥的
             */
            $doc.triggerHandler(CLICK);
            that.show();
        });

        if(config.globalHide) {
            $panel.on(CLICK, function(e) {
                e.stopPropagation();
            });

            $doc.on(CLICK, function() {
                /**
                 * 判断 panel 是否显示，减少不必要的函数调用
                 */
                that.isShowed && that.hide();
            });
        }
    }

    DropDown.prototype = {
        constructor: DropDown,

        /**
         * 显示面板
         * 如果 beforeShow() 返回值不为 FALSE，则调用 show 事件
         */
        show: function() {
            var that   = this,
                conf   = that.config,
                $el    = that.$el,
                events = conf.events,
                activeClass = conf.activeClass;

            if(events.beforeShow.call(that) !== FALSE) {
                !$el.hasClass(activeClass) && $el.addClass(activeClass);
                that.$panel.show();
                events.show.call(that);
                that.isShowed = true;
            }
        },

        /**
         * 隐藏面板
         * 如果 beforeHide() 返回值不为 FALSE，则调用 hide 事件
         */
        hide: function() {
            var that   = this,
                conf   = that.config,
                $el    = that.$el,
                events = conf.events,
                activeClass = conf.activeClass;

            if(events.beforeHide.call(that) !== FALSE) {
                $el.hasClass(activeClass) && $el.removeClass(activeClass);
                that.$panel.hide();
                events.hide.call(that);
                that.isShowed = false;
            }
        }
    };

    return {
        init: function(config) {
            return new DropDown(config);
        }
    }
});
