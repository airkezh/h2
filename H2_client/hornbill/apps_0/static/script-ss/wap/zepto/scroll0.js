fml.define('wap/zepto/scroll0' , ['wap/zepto'] ,function(){
;(function($){
	var scroll = {}, scrolling, scrollTimeout

	$(window).bind('scroll', function(e){
		scroll.el = $(e.target);

		if ( !scrolling ) {
			scrolling = true;
			var event = $.Event('scrollstart')
			scroll.el.trigger(event)
		}

		clearTimeout( scrollTimeout );
		scrollTimeout = setTimeout(function(){
			scrolling = false;
			var event = $.Event('scrollstop')
			scroll.el.trigger(event)
			scrollTimeout = null
			scroll = {}
		}, 50 );

	})

	;['scrollstart', 'scrollstop'].forEach(function(m){
		$.fn[m] = function(callback){ return this.bind(m, callback) }
	})
})(Zepto)
});
