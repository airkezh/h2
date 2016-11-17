/*common*/
var poster = require('m/app/posterPa')
	,lazyLoad = require('m/component/lazyLoad')
	,tracking = require('wap/app/tracking')
	,append = require('m/component/append');


var data = {
	url : '/aj/wx_new/q_waterfall'
	, poster : poster
	, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
	, colNum : 2
}

var scroll = function(opts, add){
	opts.poster.set(opts)
	opts.box = '.posterWall'
	opts.data = {
		frame : opts.frame || 0 
		,trace : opts.trace || 0
	}
	opts.filter = function(res){
		opts.data.trace = res['trace']
		return res['tInfo']	
	}
	opts.action = opts.poster.add
	append.init(opts)
	append.append(opts)
	if(add){
		opts.data.frame++
		append.append(opts)
		opts.data.frame--
	}
	append.scroll(opts)
}

scroll(data);

/* 兼容中部场馆页面滑动穿透 */
var newURL, isJump
$( 'body' ).on( 'touchstart', '.js-anchor, .list_img', function() {
    isJump = true
    newURL = $( this ).data( 'href' ) || $( this ).attr('href')
}).on( 'touchmove', function() {
    isJump = false
}).on( 'touchend', function( e ) {
   if ( isJump ) {
        e.preventDefault()
        e.stopPropagation()
        location.assign( newURL )
   } else {
       isJump = false
   }
})

window.onload =  function(){
	tracking.cr('wx/onload');
}

