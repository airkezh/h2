/*common*/
/**
 * wap页面直接调用客户端的分享Scheme,iPhone6.6.0+/Android6.6.0+ 才支持
 * 老版本建议继续用WAP share
 * @author 徐德明 demingxu@meilishuo.com
 * @param {param} 分享的参数对象，一般有title，text，pic和url，每个字段可以是对象
 * @param {channels} 分享去哪个平台，默认包括weibo，qzone，qq，weixin和weixin_timeline
 * @param {shareType} 分享的类型，包括webpage, image, music, video，默认为webpage
 */

function appShare(param, channels, shareType) {
    var shareObj = {
        'share_items': {}
    }
    var shareTypeArr = ['webpage', 'image', 'music', 'video'];
    param = param || {};
    if (!channels) {
        channels = ['weibo', 'qzone', 'qq', 'weixin', 'weixin_timeline'];
    }
    if (!shareType || (shareTypeArr.indexOf(shareType) == -1)) {
        shareType = 'webpage';
    }
    //image, music, video时只提供微信、朋友圈和QQ好友
    if (shareType == 'image' || shareType == 'music' || shareType == 'video') {
        channels = channels.join(',').replace(/(weibo|qzone)/gi, '').split(',');
    }
    channels.forEach(function(chan) {
        chan = chan.trim();
        if (!chan) {
            return;
        }
        //默认分享值
        var obj = {
            'title': '美丽说',
            'text': '美丽说',
            'url': 'http://m.meilishuo.com',
            'pic_url': 'http://i.meilishuo.net/css/images/header/logo_n4.png',
            'message_type': shareType
        }
        obj['type'] = chan;
        // 考虑不同平台不同的title，text，url和pic，即字段不是字符串，而是对象
        getParam(param, 'title', obj, chan);
        getParam(param, 'text', obj, chan);
        getParam(param, 'url', obj, chan);
        //为了向前兼容（WAP分享模式用的是pic），此处把pic赋值给pic_url
        if (param.pic) {
            if (({}).toString.call(param['pic']) === '[object Object]') {
                obj.pic_url = param.pic[chan] || param.pic.default || obj.pic_url;
            } else {
                obj.pic_url = param.pic;
            }
        }
        //image分享类型需要提供thumb_url字段
        if (shareType == 'image') {
            obj.thumb_url = obj.pic_url;
            // Android分享到QQ需要URL
            // delete obj.url;
        } else {
            //QQ weixin weixin_timeline需要把pic_url字段换成thumb_url字段
            if (chan == 'qq' || chan == 'weixin' || chan == 'weixin_timeline') {
                obj.thumb_url = obj.pic_url;
                delete obj.pic_url;
            }
        }
        shareObj.share_items[chan] = {
            'url': 'meilishuo://share.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(obj))
        }
    });
    //调用scheme
    var href = 'meilishuo://menu.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(shareObj));
    var iframe = document.createElement('iframe');
    iframe.src = href;
    iframe.height = 0;
    document.body.appendChild(iframe);
}

//
function getParam(param, field, obj, chan) {
    if (param[field]) {
        if (({}).toString.call(param[field]) === '[object Object]') {
            obj[field] = param[field][chan] || param[field].default || obj.title;
        } else {
            obj[field] = param[field];
        }
    }
}

return appShare;