/*common*/
/**
 * @fileoverview 美妆微信凑单活动
 * @author yunqian@meilishuo.com
 * @date 2015-01-12
 */
require('wap/zepto')
require('wap/zepto/fastclick')

/**
* 微信分享
*/
var ShareTo = require('wap/app/shareTo')
var WXShare = require('wap/app/lark/wxShare')
var Timedown = require('wap/app/doota/timedown')
var ShareTmp = require('wap/component/shareTmp')
var Scroll = require('wap/component/windowScroll')

var $time = $('#time')
var $wx_tips = $('#wx_tips')
var USERID = fml.vars.user_id
var GROUPID = fml.vars.group_id
var WEIXIN_TITLE = fml.vars.weixin_title
var WEIXIN_PAGE_TITLE = fml.vars.weixin_pagetitle
var WEIXIN_PICTURE = fml.vars.weixin_picture
var WEIXIN_URL = window.location.href
var IS_WEIXIN_APP = navigator.userAgent.indexOf('MicroMessenger') > -1

if($time.data('time') > 0){
    Timedown
        .down($time, $time.data('time'), '0d-0h-0i-0s', ['<b>%v</b>天', '<b>%v</b>小时', '<b>%v</b>分', '<b>%v</b>'])
        .onAction(function(t){
            if(t.d != undefined) $('#day').html(t.d<10 ? '0'+t.d : t.d);
            if(t.h != undefined) $('#hour').html(t.h<10 ? '0'+t.h : t.h);
            if(t.i != undefined) $('#min').html(t.i<10 ? '0'+t.i : t.i);
            if(t.s != undefined) $('#sec').html(t.s<10 ? '0'+t.s : t.s);
        })
        .onTimeOver(function(){
            window.location.reload()
        })
        .correct()
}

function showAlert() {
    var tpl = ShareTmp('join_alert')
    $('body').append(tpl)
    $('.join_wrap .mask').on('click', function(){
        $('.join_wrap').remove()
    })
    $('#commit').on('click', function(){
        commit()
    })
}

function commit() {
    var data = {
        group_id : GROUPID
        , phone : $('#phone_num').val()
    }
    if(!/\d{11}/.test(data.phone)){
        return alert('请输入正确的手机号')
    }
    var url = '/aj/promote/group_join'
    var callback = function(res){
        if(res.info == 1){
            var old_num = +$('.progress b').html()
            var new_num = old_num - 1
            if(fml.vars.enroll_limit >= fml.vars.limit - 1){
                $('.progress span').html('报名人数已达<b>' + (fml.vars.enroll_limit + 1) + '</b>人，抢购即将开始')
            } else {
                $('.progress b').html(new_num)
                $('.in').css('width', (fml.vars.limit - new_num) / fml.vars.limit * 100 + '%')
            }
            $('.status').html('已报名，邀请好友').removeClass('goin_us').addClass('js_share')
            alert('报名成功，邀请好友一起来参团吧~')
            if(Meilishuo.config.os.mlsApp){
                ShareTo.shareToPengYouQuan({
                    'title': WEIXIN_TITLE,
                    'pic': WEIXIN_PICTURE,
                    'url': WEIXIN_URL
                })
            } else if(IS_WEIXIN_APP) {
                $wx_tips.show()
            }
        } else {
            alert('报名失败~')
        }
        $('.join_wrap').remove()

    }
    $.post(url, data, callback, 'json')
}
function commitPengyou() {
    var data = {
        group_id : GROUPID
        , phone : ''
    }
    var url = '/aj/promote/group_join'
    var callback = function(res){
        if(res.info == 1){
            var old_num = +$('.progress b').html()
            var new_num = old_num - 1
            if(fml.vars.enroll_limit >= fml.vars.limit - 1){
                $('.progress span').html('报名人数已达<b>' + (fml.vars.enroll_limit + 1) + '</b>人，抢购即将开始')
            } else {
                $('.progress b').html(new_num)
                $('.in').css('width', (fml.vars.limit - new_num) / fml.vars.limit * 100 + '%')
            }
            $('.status').html('已报名，邀请好友').removeClass('goin_us').addClass('js_share')
            showAlert()
        } else if(res.info == 2){
            alert('已经报过名了~')
        } else {
            alert('报名不成功,过会儿再来~')
        }
    }
    $.post(url, data, callback, 'json')
}

function fixShareCallback() {
    setTimeout(function(){
        $wx_tips.hide()
        commitPengyou()
    }, 2000)
}
function checkLogIn() {
    if(!fml.vars.user_id){
        if(Meilishuo.config.os.mlsApp){
            window.MLS = {
                didLogin : function() {
                    window.location.reload();
                }
            }
            window.location.href = "meilishuo://login.meilishuo/"
        } else {
            alert('请使用app登录美丽说，访问美妆频道参加本活动～')
        }
        return true
    }
    return false
}

$wx_tips.on('click', function(){
    $wx_tips.hide()
})

$('.goin_us').on('click', function(){
    if(checkLogIn()) return

    showAlert()
})

$('.status').on('click', function(){
    if($(this).hasClass('js_share')){
        if(IS_WEIXIN_APP){
            $wx_tips.show()
        } else if(Meilishuo.config.os.mlsApp){
            ShareTo.shareToPengYouQuan({
                'title': WEIXIN_TITLE,
                'pic': WEIXIN_PICTURE,
                'url': WEIXIN_URL
            })
        }
    }
})

// 简易分享
var signWX = require('wx/sign')
var shareWX = require('wx/share')

signWX()

fml.vars.shareData = {
    desc: WEIXIN_TITLE
    , title:WEIXIN_PAGE_TITLE
    , imgUrl: WEIXIN_PICTURE
    , link : WEIXIN_URL
}
shareWX.bind(fml.vars.shareData)

/* //由于分享功能不OK，更改产品策略，直接填入手机号
if(IS_WEIXIN_APP){
    var weixin_sign = fml.vars.weixin_sign
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: weixin_sign.appId, // 必填，公众号的唯一标识
        timestamp: weixin_sign.timestamp, // 必填，生成签名的时间戳
        nonceStr: weixin_sign.nonceStr, // 必填，生成签名的随机串
        signature: weixin_sign.signature,// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function(res){
        wx.onMenuShareTimeline({
           title: WEIXIN_TITLE,
           link: WEIXIN_URL,
           imgUrl: WEIXIN_PICTURE,
           success: function(res) {
                if(!fml.vars.is_enroll) commitPengyou()
           },
           cancel: function(res) {
                if(!fml.vars.is_enroll){
                    alert('分享到朋友圈即可报名哦~');
                    $wx_tips.hide()
                }
           },
           trigger: function() {
                $wx_tips.hide()
           }
        });
        $('.goin_us').on('click', function () {
            $wx_tips.show()
        });
    });
} else {
    $('.goin_us').on('click', function(){
        if(Meilishuo.config.os.mlsApp && checkLogIn()) {
            ShareTo.shareToPengYouQuan({
                'title': WEIXIN_TITLE,
                'pic': WEIXIN_PICTURE,
                'url': WEIXIN_URL
            })
            fixShareCallback()
        }
    })
}
*/

/**
 * 底部交叉bannar动画
 */
var win_h = $(window).height()

function scrollPoster(pos,isDown){
    if(isDown){
        pullUp_top = $('.bounding')[0].getBoundingClientRect().top
        if(pullUp_top - win_h < 50){
            $('.other_act').addClass('slide_bottom_in')
        }
    }
}
Scroll.bind(scrollPoster,'scrollPoster')

$('.buy_link').on('click', function(){
    window.location.href = $('.title').attr('href')
})
$('.other_link').on('click', function(){
    window.location.href = '/goto/open/?appUrl='+encodeURIComponent('/biz/shareact/main/')
})




