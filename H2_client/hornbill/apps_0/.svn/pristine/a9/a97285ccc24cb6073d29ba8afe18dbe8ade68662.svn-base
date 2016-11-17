/*common*/
/**
 * 此组件是个性化定制APP右上角的各种功能icon，包括分享，购物车及自定义的功能；
 * 购物车及自定义的功能7.3.1才支持，老版本默认显示购物车，而且不能自定义功能；
 * APP7.3.1版本更改了scheme，现在是兼容了新老版本，等7.3.1覆盖一段时间再干掉老版本；
 * @author 徐德明 demingxu@meilishuo.com
 * @param {opts} Object，写了什么就有什么，默认什么都没有
 * {
    //具体请查看appShareFun组件，默认没有分享
    'share':{
        'param':分享的参数对象，一般有title，text，pic和url，每个字段可以是对象,
        'channels':分享去哪个平台，默认包括weibo，qzone，qq，weixin和weixin_timeline,
        'shareType':分享的类型，包括webpage, image, music, video，默认为webpage,可为对象
    },
    //是否显示购物车，默认不显示
    'cart':false,
    //其他ICON，默认没有
    'icons':[
        {
            'title':'首页',
            //因为自定义icon都是在APP里面打开，所以m会被转成mapp
            'url':'http://m.meilishuo.com'
        },
        {
            'title':'desire',
            //url可以写绝对地址，也可以相对地址
            'url':'/zulily'
        }
    ]
   } 
*/

var isNewest = require('wap/app/isNewest'),
    appShareFun = require('wap/app/appShareFun');

function appIcon(opts) {
    opts = opts || {};
    var appObject = {};
    if (isNewest('7.3.1')) {
        appObject = {
            'buttons': []
        };
        if (opts.share) {
            appObject.buttons.push({
                'type': 'share',
                'share_items': {}
            });
        }
        if (opts.cart) {
            appObject.buttons.push({
                'type': 'cart'
            });
        }
        if (opts.icons && Array.isArray(opts.icons) && opts.icons.length) {
            for (var i = 0, len = opts.icons.length; i < len; i++) {
                var href = (opts.icons[i] && opts.icons[i].url) || '',
                    isAbsoluteUrl = href.match(/\/\//g) ? true : false,
                    isForgetHttp = href.match(/\.meilishuo\.com/g) ? true : false;
                if (isAbsoluteUrl) {
                    href = href.replace(/m\.meilishuo/ig, 'mapp.meilishuo');
                } else if (isForgetHttp) {
                    href = location.protocol + '//' + href.replace(/m\.meilishuo/ig, 'mapp.meilishuo');
                } else {
                    href = location.protocol + '//' + location.host + href;
                }
                appObject.buttons.push({
                    'type': 'text',
                    'title': opts.icons[i] && opts.icons[i].title,
                    'url': href
                });
            }
        }
    } else {
        if (opts.share) {
            appObject = {
                'share_items': {}
            };
        }
    }
    if (opts.share) {
        appShareFun(appObject, opts.share.param, opts.share.channels, opts.share.shareType);
    }
}

return appIcon;