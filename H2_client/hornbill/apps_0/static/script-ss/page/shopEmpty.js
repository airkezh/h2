/*common*/
var $ = require('jquery');
var followShop = require('app/followShop');
var lazyLoad = require('component/lazyLoad');
var callApi = require( 'component/callApi' );
var check = require('app/checkLogin');


// 优惠券领取
$('.posterWall').on('click','.triangle', function(){
	$(this).next('.dropdown_panel').show();
	return false;
});

$("body").on('click', function(e){
	if(!$(e.target).closest('.dropdown_panel').length){
		$('.dropdown_panel').hide();
	}
	// var is_panel = $(e.target).parents().is('.dropdown_panel');
	// var is_triangle = $(e.target).is('.triangle');
	// if(is_triangle){
	// 	$('.dropdown_panel').hide();
	// 	$(e.target).find($('.dropdown_panel')).show();
	// }
	// if(!is_panel && !is_triangle){
	// 	$('.dropdown_panel').hide();
	// }
});

$('.posterWall').on('click','.coupon .dropdown_panel .apply_status', function(e){
	var code = $(this).attr('data-coupon');
	var $this = $(this);
	var $el = $this.parents('.dropdown_panel');
	var $info = $el.find('.info');
	var $target = $(e.target);

	if(!check()){
		return;
	}else{
		callApi.write( {
		    url: '/coupon/coupon_apply'
		}, {
		    coupon_apply_code: code
		}, function( data ) {
			var timeoutId;
		    if ( data.code ) {
		    	$this.text('已领完');
		    }else{
		    	clearTimeout( timeoutId );
	           $info.text( '领取成功' )
	               .css( 'top', $target.position().top + 5 )
	               .show()
	               .animate( {
	                   opacity: 1
	               }, 500 );
		    }
		    timeoutId = setTimeout( function() {
		        $info.animate( {
		            opacity: 0
		        }, 1000, function() {
		            $info.hide();
		        } );
		    }, 2000 )
		    

		} )
	}
});

// 关注店铺
	followShop({
		el : '.posterWall',
		unfollowClass : 'add',
		followClass : 'unadd',
		follow : '关注'
	});

// 懒加载
lazyLoad.load('.posterWall>.goods_pic' ,'asrc');


