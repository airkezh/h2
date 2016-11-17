/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var s = require("wap/page/activity/promotion/scroll");
var a = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var alertView = function( msg ){
    return new a({
        content : msg,
        onSure : function () {
            return;
        }
    });
}
//到顶/底回调
function onmoveend(m) {
}

var opt;
var sidebar = {

    initDom : function() {
        //添加Dom元素
        var htmlStr = '' +
            '<div class="sidebar_btn">' +
            '<img class="js_open_sidebar" src="' + opt.sidebarBtn.header.img + '"/>' ;
            if( opt.sidebarBtn.share && opt.sidebarBtn.share.img && window.location.href.indexOf('isFromShare') < 0  ){ 
            htmlStr += '<img class="shareButton" src="' + opt.sidebarBtn.share.img + '"/>' ;
            } 
            htmlStr +='<img class="js_go_top" src="' + opt.sidebarBtn.back.img + '" />' +
            '</div>' +
            '<div class="sidebar_data" id="sidebar_data_id">' +
            '</div>' +
            '<div id="scrollerArea">' +
            '<div id="scroller"></div>' +
            '</div>' +
            '<script type="text/html" id="sidebar_tpl">' +
            '<?for (var i = 0; i < this.sidebars.length; i++) {' +
            'var s = this.sidebars[i];' +
            'var picUrl = this.pageIndex == i ? s.img_active : s.img_orginal;' +
            'if(s.url.indexOf("meilishuo://") != 0){s.url = s.url+ (s.url.indexOf("?") < 0 ? "?pageIndex="+i : "&pageIndex="+i);' +
            's.url = this.getAppLink("openURL", {"url" : s.url, "title" : s.title}, null, s.url);}' +
            'var sW = s.width == "50" ? "50%" : "100%" ;' +
            '?>' +
            '<a href="<?=s.url?>" style="width:<?= sW?>;display:block;float:left">' +
            '<img src="<?=picUrl?>"/>' +
            '</a>' +
            '<?}?>' +
            '</script>';
        $("body").append(htmlStr);
        //初始化侧边栏
        var pageIndex = urlHandle.getParams(window.location.search).pageIndex;
        if (!pageIndex && location.href.indexOf("mv") >= 0) {
            pageIndex = 0;
        }
        if (!pageIndex && location.href.indexOf("/coupon") >= 0) {
            pageIndex = opt.sidebars.length - 2;
        }
        var tpl = shareTmp('sidebar_tpl',{"picRootUrl" : opt.picRootUrl, "sidebars" : opt.sidebars, "sidebarBtn" : opt.sidebarBtn, "pageIndex" : pageIndex, "getAppLink" : getAppLink});
        $(".sidebar_data").eq(0).append(tpl);
    },
    initEvent : function() {
        var initTargetTop = $(".sidebar_data").offset().top;
        //侧边栏
        $(".js_open_sidebar").on("click", function() {
            var htmlStr = "<div class='sidebar_shade'></div>"
            $("body").append(htmlStr);
            $(".sidebar_btn").css("right", "-42%");
            $(".sidebar_data").css("right", "0%");
            if (document.body.scrollTop <= 0) {
                window.scrollTo(0,1);
            }
            fml.vars.ss = new s.SimulationScroll({
                tContain : 'bb', //必选：滑动区域id
                tMove : 'sidebar_data_id', //必选：移动区域id
                initTargetTop : initTargetTop
                //tScroller : 'scroller', //必选：自定义滚动条
                //tScrollerArea : 'scrollerArea'//必选：滚动条区域
            }, onmoveend);
        });

        $("body").on("click", ".sidebar_shade", function() {
            $(".sidebar_data").css("right", "-42%");
            $(".sidebar_btn").css("right", "0%")
            $(this).remove();
            fml.vars.ss.destory();
        })

        $(".js_go_top").on("click", function() {
            document.body.scrollTop = 0;
        });
        

    },
    shareTo : function( isCoupon ){
        var share_url = $('#share_ico .active').attr('share_url');
        var os = Meilishuo.config.os;
        $('#share_ico a').bind('click', function(){
            $('#share_ico a.active').removeClass('active')
            $(this).addClass('active')
            share_url = $(this).attr('share_url')
        });
        var overLayer = $("<div class='overLayer'></div>");
        $("body").append( overLayer );
        $(".shareButton").on( "click" , function(){
            $(".overLayer").show();
            $(".starBox").css({'display':'block'});
        });
        $(".overLayer").on( "click" , function(){
            $(".starBox").css({'display':'none'});
            $(".overLayer").hide();
        });
        // $('#shareBtn').on('click', function(){
        //     window.location.href =  share_url 
        // });
        var data_type , data_code , data_key;
        $('#shareBtn').on('click', function(){
            if( isCoupon ){ 
                $.ajax({
                    url : "/aj/huodong/couponInfo?name=" + fml.vars.shareCouponKey,
                    dataType : "json",
                    type : "post",
                    timeout : 5000,
                    async : false,
                    success : function(data) {
                        if (data.error_code != 0){return;}
                        var res = data.data;
                        if( res.islogin == 0){
                            window.location.href = "meilishuo://login.meilishuo/";
                            return;
                        }
                        if( res.coupon[0] ){
                            var tenDate = res.coupon[0];
                            if( tenDate.state == 'applied' || tenDate.state == 'apply_once_more'){      //跳分享
                                window.location.href =  share_url;
                            }else if( tenDate.state == 'can_apply'){
                                data_type = tenDate.threshold + ':' + tenDate.credit + ':' + tenDate.id ;
                                data_code = tenDate.coupon_code;
                            }else{
                                var c = new confirm({
                                content : '今日的优惠券已经被抢光了，明日早点来分享呦'
                                , onSure : function(){
                                    window.location.href =  share_url; 

                                }
                                , onCancel : function(){
                                    return;
                                }
                            });
                            }
                        }else{
                            // $(".overLayer").show();
                            // $("body").append($("#go_share").html());
                            // $(".go_share .text").text('今日的优惠券已经被抢光了，明日早点来分享呦');
                            // $(".go_share .go").on( "click" ,function(){
                            //     window.location.href =  share_url;
                            // })
                            // $(".go_share .return").on( "click" ,function(){
                            //     $(".overLayer").hide();
                            //     $("#go_share").remove();
                            // })
                            var c = new confirm({
                                content : '今日的优惠券已经被抢光了，明日早点来分享呦'
                                , onSure : function(){
                                    window.location.href =  share_url;
                                    // $(".overLayer").show();
                                    // $(".starBox").css({'display':'block'});
                                }
                                , onCancel : function(){
                                    return;
                                }
                            });

                        }
                    },  
                    complete : function(xhr, status) {
                        if (status == "timeout") {
                            alert("请求超时！");
                        } else if (status == "error") {
                            alert("请求超时:" + xhr.responseText);
                        }
                    }
                });
                if( data_type ){
                    $.ajax({
                        url : "/aj/huodong/couponShareApply?rule_id=nR1YvFUYJRTTQwa0SO1SYn/Twq6uNA0oGD/Neh2CPbw=",
                        data:{
                            'type': data_type,
                            'code' : data_code,
                            'key' : '',
                            'name' : fml.vars.shareCouponKey
                        },
                        dataType : "json",
                        type : "post",
                        timeout : 5000,
                        async : false,
                        success : function(data) {
                            if (data.error_code != 0){return;}
                            var data = data.data;
                            if( data.success == 1 ){
                                window.location.href =  share_url;
                            }else{
                                var tips = data.tips
                                var c = new confirm({
                                    content : tips
                                    , onSure : function(){
                                        window.location.href =  share_url;
                                    }
                                    , onCancel : function(){
                                        return;
                                    }
                                });
                            }
                            
                        },  
                        complete : function(xhr, status) {
                            if (status == "timeout") {
                                alert("请求超时！");
                            } else if (status == "error") {
                                alert("请求超时:" + xhr.responseText);
                            }
                        }
                    });
                }
            }else{
                window.location.href =  share_url;
            }
            
        })
    },
    noCoupon : function(){
        var share_url = $('#share_ico .active').attr('share_url');
        var os = Meilishuo.config.os;
        $('#share_ico a').bind('click', function(){
            $('#share_ico a.active').removeClass('active')
            $(this).addClass('active')
            share_url = $(this).attr('share_url')
        });
        var overLayer = $("<div class='overLayer'></div>");
        $("body").append( overLayer );
        // $(".shareButton").on( "click" , function(){
        //     $(".overLayer").show();
        //     $(".starBox").css({'display':'block'});
        // });
        $(".overLayer").on( "click" , function(){
            $(".starBox").css({'display':'none'});
            $(".overLayer").hide();
        });
        // $('#shareBtn').on('click', function(){
        //     window.location.href =  share_url 
        // });
        var data_type , data_code , data_key;
        $('.shareButton').on('click', function(){
            $(".overLayer").show();
            $(".starBox").css({'display':'block'});
            
        })
    }
};


function getAppLink (protocol,param , r ,wapHref ,extra){
    var os = Meilishuo.config.os;
    if (!protocol || !param) return false
    if (!os.mlsApp) return wapHref || '###noapp'
    if (r) param.r = r
    var link = 'meilishuo'
    if (os && os.ipad) link = 'meilishuohd'
    link += '://'+ protocol +'.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param))
    if(extra) link += '&source=' + extra

    return link
}


exports.build = function(_opt) {
    opt = _opt;
    sidebar.initDom();
    sidebar.initEvent();
}
exports.share = function( isCoupon ) {
    sidebar.shareTo( isCoupon );
}