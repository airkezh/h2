/*common*/
require('circle/zepto/touch')
require('circle/component/scrollStop')

var $ 		 = require('circle/zepto')
var WXShare  = require('wx/share')
var WXSign   = require('wx/sign')
var shareTmp = require('circle/component/shareTmp')
var scroll   = require('circle/component/windowScroll')

var $goodsWall = $('.goods_wall')
var $nav 	   = $('#nav')
var $navItem   = $nav.find('span')
var $gotop     = $('.gotop')
var $back 	   = $('.back')
var $pullUp    = $('.pull-up')
var $w 		   = $(window)
var windH      = $w.height()
var $header    = $('header')
var shareInfo  = fml.vars.shareInfo
var freshUrl   = '/aj/circle/fresh?circle_id=' + fml.vars.circle_id 
var hotUrl     = '/aj/circle/hot?circle_id=' + fml.vars.circle_id 
var iAmLoading = false
var kind  	   = 0 		// 0 表示最热；1 表示最新
var settings   = null
var cache      = {
	'fresh' : {
		'url' 	 	 : freshUrl,
		'tInfo' 	 : [],
		'colsHeight' : [ 0,0 ],
		'data' 		 : { 'frame' : 0 },
		'minHeight'  : 0
	},
	'hot' : {
		'url'        : hotUrl,
		'tInfo'      : [],
		'colsHeight' : [ 0,0 ],
		'data'  	 : { 'frame' : 0 },
		'minHeight'  : 0
	}
}
var layoutInfo, windW, getDone
var isFirst = true
var $scanHit
var imgSrc
var xStep = 100 
var yStep = 60

$('.content').css( 'margin-top', $header.height() )

$navItem.on( 'tap', function (){
	var target = $(this)
	var c = 'curr'

	if( target.hasClass(c) )return

	getDone = false
	$pullUp.data( 'status', 'loading' )
	kind = target.index()
	$navItem.removeClass( c )
	target.addClass( c )
	$goodsWall.empty().height( 0 )

	if( kind ){
		settings = cache.fresh
	}else{
		settings = cache.hot
	}

	if( settings.tInfo.length ){
		layout( settings.tInfo )
	}
	/*
	 * tag切换会重置pullUP为loading，这时第一帧如果少于一屏需手动触发scrollToLoad方法
	 */
	scrollToLoad();
} )

/* 首次进入页面第一帧数据 */
$( function (){
	$( '.hot' ).triggerHandler( 'tap' )

	/*
	 * @hack 针对某些手机在dom为ready之前，初始化页面宽度为 980px 的情况
	 */
	windW = $w.width()
	xStep = windW / 3
} )

$back.on( 'tap',function(){
	window.history.back()
} )

$gotop.on( 'click', function( e ) {
	document.body.scrollTop = 0
} );

scroll.bind( scrollToLoad, 'scrolltoload' )
scroll.bind( fixedHeader, 'fixedHeader' )
scroll.bind( gotop, 'gotop' );

function getData( opts, isCache ){  
	if( iAmLoading )return
	iAmLoading = true

	if( isCache ){
		layout( opts.tInfo )
	}else{
		$.get( opts.url, opts.data, function ( res ){
			data = res.tInfo

			if( data.length ){ 
				layoutInfo 			= layout( data, opts.minHeight, opts.colsHeight )
				settings.minHeight  = layoutInfo.minHeight
				settings.colsHeight = layoutInfo.colsHeight
				Array().push.apply( settings.tInfo, data )

				/* 最后一帧加载的单品高度低于一屏时，将loading提示条置为stop */
				if( isInTheLoadRange(0) )$pullUp.data( 'status', 'stop' )

				settings.data.frame++
			}else{
				getDone = true
				$pullUp.data( 'status', 'stop' )
			}
			iAmLoading = false
		}, 'json' )
	}
}

function layout( data, minHeight, colsHeight ){
	if( !data.length )return

	var minH = minHeight || 0
	var ch   = colsHeight || [0,0]
	var $tmp, top, left, h, maxH, mi

	data.forEach( function (item){
		$tmp = $( shareTmp( 'posterWall', { v: item } ) )
		top  = minH + 'px'
		mi 	 = ch[0] > ch[1] ? 1 : 0
		left = mi * 50 + '%'

		$tmp.css( {
			'top' : top,
			'left' : left
		} ).appendTo( $goodsWall )

		h 		= $tmp.height()
		ch[mi] += h
		minH 	= Math.min.apply( this, ch )
		maxH 	= Math.max.apply( this, ch )

		$goodsWall.height( maxH )
	} )

	lazyLoad()

	return {
		'minHeight'  : minH,
		'colsHeight' : ch
	}
}

function gotop( pos ) {
	if ( pos < 30 ){
		$gotop.hide()
	}else{
		$gotop.show()
	}
};

function fixedHeader( pos ){
	if( pos > 0 ){ 
		$header.css( 'box-shadow', '0 1px 1px #d9d9d9' )
	}else{
		$header.css( 'box-shadow', 'none' )
	}
}

function scrollToLoad(){
	if( !isInTheLoadRange( 100 ) || getDone )return
	getData( settings )
}

function isInTheLoadRange( num ){
	var loadLine = $pullUp[0].getBoundingClientRect().top - num
	return windH > loadLine
}

function lazyLoad(){
	var y = 100
	for( ; y < windH; y += yStep ){
		for( var x = xStep; x < windW; x += xStep ){
			$scanHit = $( document.elementFromPoint( x, y ) )
			imgSrc 	 = $scanHit.data( 'image' )

			if( $scanHit.is( '.lazy-bg' ) && imgSrc ){
				$scanHit.css( {
					'background-image' : 'url(' + imgSrc + ')'
				} ).data( 'image', '' ).css( 'opacity', 1 )
			}
		}
	}
	if( isFirst ){
		isFirst = false;
		$w.on( 'scrollStop', arguments.callee );
	}
}

/**
 设置微信二次分享
 */
;
(function() {
    WXSign()
    if(shareInfo.image.indexOf('http://') == -1){
    	shareInfo.image = 'http://d02.res.meilishuo.net/pic/_o/66/cc/8677209a088f37af5b79c3e64d7b_200_200.cf.jpg'
    }
    var shareData = {
        title: shareInfo.title,
        desc: '美丽说精选店铺，质量稳定，服务可靠!',
        imgUrl: shareInfo.image
    };

    WXShare.bind(shareData)
}())