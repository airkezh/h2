/*common*/
/**
 * Created by a2014 on 14/11/4.
 */
/**
 * Created by a2014 on 14/11/3.
 */


fml.define('page/csrobot/post', ['jquery'], function (require, exports) {
    var $ = require('jquery');
    var post = function (url, params, fn, type) {
        if (Meilishuo.config.isBusiness) {
            params.source = 'pc_business';
        }
        return   $.post(url, params, function (data) {
            if (data.error_code == 0) {
                fn && fn(data);
            }
        }, type || 'json');
    }
    return post;
});