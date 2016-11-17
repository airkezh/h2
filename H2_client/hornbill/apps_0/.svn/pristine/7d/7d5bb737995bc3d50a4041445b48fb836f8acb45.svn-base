/*common*/
require('wap/zepto');
var ShareTo = require('wap/app/shareTo');
var WXShare = require('wx/share');
var WXSign = require('wx/sign');
var OpenApp = require('wap/app/openAppCustom');
var userId = fml.vars.user_id || '';
var isWeixinBrowser = Meilishuo.config.os.weixinBrowser;
var testResult = fml.vars.result.result;
var styleType = testResult.type;
var shareType = '';

//分享文案
switch (styleType) {
    case 1:
        shareType = '我是“纯粹而可爱的天生萌！”，［美丽说］风格小测试，你也来试下吧！';
        break;
    case 2:
        shareType = '我是“拥有众多仰慕者，超越’女神’的存在！”，［美丽说］风格小测试，你也来试下吧！';
        break;
    case 3:
        shareType = "我是“追求尖端时尚的’时装精’！”，［美丽说］风格小测试，你也来试下吧！";
        break;
    case 4:
        shareType = "我“‘端正优美’！拥有皇后般的气场”，［美丽说］风格小测试，你也来试下吧！";
        break;
    default:
        shareType = "想知道你潜在的时尚风格吗？快来测一下吧！"
};

var shareData = {
    'desc': shareType,
    'imgUrl': 'http://d05.res.meilishuo.net/pic/_o/48/b5/0b1dae0c866375873a92b0253dc2_200_200.cg.png',
    'title': shareType,
    'link': 'http://m.meilishuo.com/activity/amazingTest/styleResult/?from_uid=' + userId
};


$('.login_btn').on('click', function() {
    location.href = 'meilishuo://login.meilishuo/'
});

$(document).on('click', '.resutl_wrap .share_box a', function() {
    var opt = {
        'text': shareData.desc,
        'title': shareData.title,
        'pic': shareData.imgUrl,
        'url': shareData.link
    };
    if (Meilishuo.config.os.mlsApp) {
        if ($(this).attr('class') == 'share_pengyou') {
            ShareTo.shareToPengYou(opt);
        } else {
            opt.title = opt.text;
            ShareTo.shareToPengYouQuan(opt);
        }
    } else if (isWeixinBrowser) {
        $('.share_mask').show();
    }
});


$('.start_btn').on('click', function() {
    location.href = 'http://m.meilishuo.com/activity/amazingTest/styleTest/';
});

$('.wx_share').on('click', function() {
    $('.share_mask').show();
});

$('.share_mask').on('click', function() {
    $(this).hide();
});


$('.wx_download').on('click', function() {
    OpenApp.check(function(isInstall) {
        if (isInstall) {
            OpenApp.jump('meilishuo://open.meilishuo')
        } else {
            location.href = '/download/latest'
        }
    })
});

function wxInit() {
    //设置微信二次分享
    if (isWeixinBrowser) {
        WXSign();
        WXShare.bind(shareData);
    }
}

wxInit();
/*
 *  登陆成功后的回调函数
 */
window.MLS = {
    didLogin: pageReload
}

function pageReload() {
    location.reload();
}
