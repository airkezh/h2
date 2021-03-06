fml.define('page/doota/itemCom', ['ui/alert','component/ajax' , 'jquery','component/callApi','component/windowScroll','component/windowResize', 'app/doota/tab','component/lazyLoad'] , function( require, exports ) {
    var $       = require( 'jquery' ),
        scroll  = require( 'windowScroll' ),
        resize  = require( 'windowResize' ),
        ajax    = require( 'component/ajax' ),
        Alert   = require( 'ui/alert'),
        callApi = require( 'component/callApi' ),

        $doc         = $( document ),
        subNav       = $( '.tab_tle' ),
        subOrgParent = subNav.parent(),
        $navBar      = $( '#navbar' ),
        subHolder    = $navBar.find( '.sec_nav' ),
        wheader      = $navBar.find( '.wheader, .sale_nav' ),
        $nowPrice    = $( '#price-now' ),
        $tabPrice    = $( '.js-item-price' ),
        $firstAnchor, $parent, hasTabWrap, minHeight, maxHeight, frstNavHeight, y,

        TAB_WRAP  = 'js-tab-wrap'

    if ( !subNav.length ) {
        return
    }

    $parent      = subNav.parent()
    $firstAnchor = subNav.find( '.tabArea' ).first()
    hasTabWrap   = $parent.hasClass( TAB_WRAP )
    maxHeight    = subNav.height()
    minHeight    = subNav.find( '.tab_top' ).height()

    frstNavHeight = $navBar.find( '.wheader' ).height() || 0
    y = subNav.offset().top - frstNavHeight

    scroll.yIn( y, function() {
        if ( hasTabWrap ) {
            if ( $firstAnchor.hasClass( 'cur' ) ) {
                $parent.css( 'height', maxHeight )
            } else {
                $parent.css( 'height', minHeight )
            }
        }
        subHolder.append(subNav)
        wheader.stop().animate({
            'margin-top': -frstNavHeight
        }, function() {
            if ( subNav.parent().is(subHolder) ) {
                $(this).hide()
            }
        })
        /*
         * 显示当前价格
         * 价格有可能是区间，并且不断变化
         */
        $tabPrice.html( '￥' + $nowPrice.html() )
    }, function() {
        if ( hasTabWrap ) {
            $parent.css( 'height', 'auto' )
        }
        subOrgParent.prepend(subNav)
        wheader.show().stop().animate({
            'margin-top':0
        })
        $tabPrice.html('')
    })

    var rightBar = $('#goTop')[0].style
    if($('#fixWidget')[0]){
        var fixWidget = $('#fixWidget')[0].style
    } else {
        var fixWidget = {}
    }
    resize.bind( setRightBar )

    function setRightBar() {
        if ( $doc.width() >= 1325 ) {
            rightBar.left= '50%'
            rightBar.marginLeft= '620px'
            fixWidget.left= '50%'
            fixWidget.marginLeft= '620px'
        } else {
            rightBar.left= rightBar.marginLeft= 'auto'
            fixWidget.left= fixWidget.marginLeft= 'auto'
        }
    }

    var tab = require('tab')
    function setTab(callback){
        var detail_items = $('.tab_tle .detail_items')
            ,tab_tle_height = $('.tab_tle').height()
        tab.bind({
            'tagPnl' : '.tab_tle'
            ,'tabTag' :'.tabArea'
            ,'activeTagClass' : 'cur'
            ,'contents': '.contentArea'
            ,'onShowed' : function(context , last , now){
                detail_items[ now > 0?'hide':'show']()
                if (!$('.wrap .tab_tle').length )
                    window.scrollTo(0 , context.parent().offset().top )

                callback && callback(context);
            }
        })
        detail_items.on( 'click', 'a', function() {
            var anchor = $(this).attr('href').slice(1);
            anchor = $('#'+anchor)
            if (anchor.length){
                window.scrollTo(0 , anchor.offset().top - tab_tle_height );
            }
            this.blur()
            return false
        })
    }

    exports.setRightBar = setRightBar
    exports.setTab = setTab

    var lazyLoad = require('component/lazyLoad')
    exports.lazyLoad = function(){
        lazyLoad.load('.more_pic span' ,'asrc');
        lazyLoad.load('.pro_pic span' ,'asrc');
    }

    exports.addToCart = function(orderInfo){
        callApi.write({'url':'/cart/add'}, orderInfo , function(res){
            var sid = res && res.info && res.info.sid
            if (sid) {
                var cartHref = '/cart/addToCart/'+ orderInfo.twitter_id +'?sid=' + sid;
                if (fml.vars.shop_id) cartHref += '&shop_id='+fml.vars.shop_id
                window.location.href = cartHref
            }else {
                var errMsg;
                if (!res ) errMsg = 'opps,有点错误,一会儿再试试吧'
                else if (res.code) errMsg = res.info.msg;

                new Alert({
                    width : 370,
                    title : '我的购物车',
                    confirmTxt : res && '去整理购物车',
                    content : errMsg
                }).onSure(function(){
                        /*
                         韩国馆要跳到『韩国馆商品』tab
                         */
                        if (res) window.open( '/cart' + ($('.js-haitao').length ? '/haitao' : ''));
                    })

            }
        })
    }
})
