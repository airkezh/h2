/*common*/
require('wap/zepto/touch')
var posterWall = require('m/app/posterWall')
	,poster = require('m/app/posterPa')
	,lazyLoad = require('m/component/lazyLoad')
	,urlHandle = require('wap/component/urlHandle')
	,tracking = require('wap/app/tracking')
	,Alert = require('wap/ui/alert')

	/* 瀑布流滚动加载 */
	// poster.set({colNum:2});
	var data = {
		url : '/aj/wx_new/normal_goods?page_name=' + fml.vars.poster.pageName
		, poster : poster
		, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
		, colNum : 2
	}
	var _o = urlHandle.getParams(window.location.search)['cate_id']
	if (_o) {
		data.url += '&cate_id=' + _o;
	};
	posterWall.scroll(data);

	/* 弹窗 */
	var alertCon = function(msg){
		var a = new Alert({
			content : msg
		});
	}

	/* 砸蛋逻辑 */
	var $egg = $('#egg')
		,mark = true

	$egg.find('.egg').click(function(event) {
		if(mark){
			mark = false
			$.post('/aj/wx_new/hit_egg', function(data){
				if (data && data.ret == 0) {
					tracking.cr('wx/receive_coupon', {'action' : 'click', 'result' : 'success','name':'320大促'});
					$egg.find('.egg').hide();
					$egg.find('.egg-open').show();
					setTimeout(function(){
						alertCon('恭喜您获得10元优惠券，马上可以使用哦！');
						$egg.find('.egg-open').hide();
					},500);
				}else{
					tracking.cr('wx/receive_coupon', {'action' : 'click', 'result' : 'fail','name':'320大促'});
					alertCon(data.msg);
				}
				mark = true
			}, 'json')
		}
	});

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
