fml.use(['jquery','component/windowScroll','component/windowResize'] , function(){
	var $ = this.jquery
		,scroll = this.windowScroll
		,resize = this.windowResize

	var subNav = $('#catagory_list .catagory_list')
		,subOrgParent = subNav.parent()
		,subHolder = $('#navbar .sec_nav')
		,wheader = $('#navbar .wheader,#navbar .sale_nav')
	if (!subNav.length) return
	var y = subNav.offset().top;
	if(location.href.indexOf('to_c=1')>-1){
		var scrollY = $('.goods_list').length > 0 ? $('.goods_list').offset().top - 60 : y;
		$('html,body').animate({scrollTop : scrollY}, 'fast');
	}
	scroll.yIn(y, function(){
		subHolder.append(subNav)
		subHolder.show();
		wheader.stop().animate({'margin-top':-30},function(){
			if (subNav.parent().is(subHolder)) $(this).hide()
			})
		},function(){
		subOrgParent.prepend(subNav)
		subHolder.hide();
		wheader.show().stop().animate({'margin-top':0})
			})

});

fml.use( [ 'jquery', 'component/windowScroll', 'page/nav' ], function() {
	var $ 	  	     = this.jquery,
		WindowScroll = this.windowScroll;

	/**
	 * 导航条吸顶
	 */
	;(function() {
		var $shopHd  = $( '#shop-hd' ),
			$shopNav = $( '#shop-nav'),

			FIXED_CLASS      = 'shop-nav-fixed'

		$shopHd.css( 'height', $shopHd.height() )

		WindowScroll.yIn( $shopNav.offset().top, function() {
			$shopNav.addClass( FIXED_CLASS )
		}, function() {
			$shopNav.removeClass( FIXED_CLASS )
		})
	}())
} );

fml.define('app/shop_catalog' , ['jquery', 'component/shareTmp'] , function(require , exports){
});
