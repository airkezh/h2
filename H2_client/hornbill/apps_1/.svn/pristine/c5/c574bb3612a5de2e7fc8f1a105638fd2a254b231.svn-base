/**
 * Created by a2014 on 14/11/5.
 */
/**
 * Created by a2014 on 14/11/3.
 */
fml.define('page/csrobot/tc', ['jquery'], function (require, exports) {
    var $ = require('jquery');

    function TC(opt) {
        this.limit = opt.limit || 50;
        this.input = opt.input;
        this.fn = opt.common;
        this.warn = opt.warn;
        this.container = opt.container;
        this.holder = opt.holder || '';
        this.init();
    }

    function trimLR(str) {
        return str.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
    }

    TC.prototype = {
        init: function () {
            var count = 0;
            var me = this;

            function ca() {
                var len = trimLR(me.input.val()).replace(/<[^>]+>/g, '').length;
                if (len <= me.limit) {
                    me.fn(me.limit - len);
                } else {
                    me.warn(len - me.limit);
                }
            }

            this.input.focus(function () {
                if ($(this).val() == me.holder) {
                    $(this).val('');
                }
            });
            this.input.blur(function () {
                if (trimLR($(this).val()) == '') {
                    $(this).val(me.holder);
                }
            })
            this.input.on('input propertychange', ca);
        }
    }
    return TC;
});