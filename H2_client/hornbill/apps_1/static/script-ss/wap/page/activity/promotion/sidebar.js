/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var s = require("wap/page/activity/promotion/scroll");


//到顶/底回调
function onmoveend(m) {
    console.log(m);
}

var opt;
var sidebar = {
    initDom : function() {
        //添加Dom元素
        var htmlStr = '' +
            '<div class="sidebar_btn">' +
            '<img class="js_open_sidebar" src="' + opt.sidebarBtn.header.img + '"/>' +
            '<img class="js_go_top" src="' + opt.sidebarBtn.back.img + '" />' +
            '</div>' +
            '<div class="sidebar_data" id="sidebar_data_id">' +
            '</div>' +
            '<div id="scrollerArea">' +
            '<div id="scroller"></div>' +
            '</div>' +
            '<script type="text/html" id="sidebar_tpl">' +
            '<?for (var i = 0; i < this.sidebars.length; i++) {' +
            'var s = this.sidebars[i];' +
            'var srcRoot = this.picRootUrl + (i+1);' +
            'var picUrl = this.pageIndex == i ? s.img_active : s.img_orginal;' +
            'if(s.url.indexOf("meilishuo://") != 0){s.url = s.url+ (s.url.indexOf("&") < 0 ? "?pageIndex="+i : "&pageIndex="+i);' +
            's.url = this.getAppLink("openURL", {"url" : s.url, "title" : s.title}, null, s.url);}' +
            '?>' +
            '<a href="<?=s.url?>">' +
            '<img src="<?=picUrl?>"/>' +
            '</a>' +
            '<?}?>' +
            '</script>';
        $("body").append(htmlStr);
        //初始化侧边栏
        var pageIndex = urlHandle.getParams(window.location.search).pageIndex;
        if (!pageIndex && location.href.indexOf("main_venue") >= 0) {
            pageIndex = 0;
        }
        if (!pageIndex && location.href.indexOf("/coupon") >= 0) {
            pageIndex = opt.sidebars.length - 2;
        }
        /*var sidebars = [
         {'link' : '/promotion/sale_141212/main_venue/?pageIndex=0'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=342&type=mob&show_cid=4579&all_cid=4579&r=main12mob_yifu342&pageIndex=1'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=388&type=mob&show_cid=4595&all_cid=4595&r=main12mob_kuzi388&pageIndex=2'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=420&type=mob&show_cid=4627&all_cid=4627&r=main12mob_skirt420&pageIndex=3'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=424&type=mob&show_cid=4625&all_cid=4625&r=main12mob_shoes424&pageIndex=4'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=360&type=mob&show_cid=4563&all_cid=4563&r=main12mob_bag360&pageIndex=5'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=358&type=mob&show_cid=4545&all_cid=4545&r=main12mob_peishi358&pageIndex=6'},
         {'link' : '/promotion/sale_141212/sub_venue/?pid=426&type=mob&show_cid=4655&all_cid=4655&r=main12mob_home426&pageIndex=7'}, //居家
         {'link' : 'meilishuo://openURL.meilishuo?json_params='  + encodeURIComponent('{"title":"1212美妆", "url" : "http://mapp.meilishuo.com/biz/beauty/saleDec/?acid=4427&r=hdtrc.mz1212toplist_1212mainfloat"}')},
         {'link' : 'meilishuo://openURL.meilishuo?json_params='  + encodeURIComponent('{"title":"1212团购", "url" : "http://mapp.meilishuo.com/activity/tuan/hd/1289?hdtrc=tuan1289_mobmain"}')}, //团购
         {'link' : '/promotion/sale_141212/coupon/'},
         {'link' : 'meilishuo://coupons.meilishuo'}
         ];*/
        //var picRootUrl = Meilishuo.config.picture_url + "images/wap/activity/promotion/1212/sidebar1/s";
        var tpl = shareTmp('sidebar_tpl',{"picRootUrl" : opt.picRootUrl, "sidebars" : opt.sidebars, "sidebarBtn" : opt.sidebarBtn, "pageIndex" : pageIndex, "getAppLink" : getAppLink});
        $(".sidebar_data").eq(0).append(tpl);
    },
    initEvent : function() {
        //侧边栏
        $(".js_open_sidebar").on("click", function() {
            var htmlStr = "<div class='sidebar_shade'></div>"
            $("body").append(htmlStr);
            $(".sidebar_btn").css("right", "-20%");
            $(".sidebar_data").css("right", "0%");
            fml.vars.ss = new s.SimulationScroll({
                tContain : 'bb', //必选：滑动区域id
                tMove : 'sidebar_data_id' //必选：移动区域id
                //tScroller : 'scroller', //必选：自定义滚动条
                //tScrollerArea : 'scrollerArea'//必选：滚动条区域
            }, onmoveend);
        });

        $("body").on("click", ".sidebar_shade", function() {
            $(".sidebar_data").css("right", "-30%");
            $(".sidebar_btn").css("right", "0%")
            $(this).remove();
            fml.vars.ss.destory();
        })

        $(".js_go_top").on("click", function() {
            document.body.scrollTop = 0;
        });
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