fml.define('order_app/common/app/confirm', ['order_app/common/component/windowDrive'], function (require, exports) {
    var Drive = require('order_app/common/component/windowDrive');

    function Confirm(options) {
        var defaults = {
            dialogType: 'confirm', onSure: function () {
            }, onCancel: function () {
            }
        }
        this.opts = $.extend({}, defaults, options);
        this.drive = new Drive(this.opts);
        this.sync();
        return this;
    }

    Confirm.prototype.sync = function () {
        this.drive.createWindow();
        this.drive.window
            .on('tap', '.sureBtn', $.proxy(function () {
                this.drive.opts.onSure()
                this.drive.destroyModel();
            }, this))
            .on('tap', '.cancelBtn', $.proxy(function () {
                this.drive.opts.onCancel()
                this.drive.destroyModel();
            }, this))
    }
    return Confirm;
});
