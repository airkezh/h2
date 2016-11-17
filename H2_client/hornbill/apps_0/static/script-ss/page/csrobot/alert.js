/**
 * Created by a2014 on 14/11/3.
 */
fml.define('page/csrobot/alert', ['jquery'], function (require, exports) {
    var $ = require('jquery');

    var html = '<div class="win-alert"></div>';

    function alert(opt) {
        /*
         * opt:
         *  height  body 高度
         *  width   body 宽度
         *  html    body inner html
         *  css     body css
         *  addEvent body内元素加事件
         * */
        this.opt = opt;
        this.canSubmit = true;
        this.init();
    }

    alert.prototype = {
        init: function () {
            var opt = this.opt,
                css = opt.css,
                w = parseInt(css.width) || 1,
                h = parseInt(css.height) || 1;
            this.mask = $('<div class="overpage"></div>');
            this.el = $(html).html(opt.html);

            var width = $(window).width(),
                height = $(window).height(),
                top = height / 2 - h / 2 + 'px',
                left = width / 2 - w / 2 + 'px';
            this.mask.css({
                height: window.screen.height + 'px',
                width: window.screen.width + 'px',
                position: 'absolute',
                top: '0px',
                left: '0px'
            });

            opt.css.top = top;
            opt.css.left = left;
            this.el.css(opt.css);
            this.opt.addEvent && this.opt.addEvent.call(this);
            return this;
        },
        show: function () {
            this.mask.show();
            this.el.fadeIn();
        },
        hide: function () {
            this.el.fadeOut();
            this.mask.hide();
        }
    }
    return alert;

});