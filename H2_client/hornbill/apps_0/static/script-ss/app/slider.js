fml.use('app/focus_banner' , function(){
	this.bind({
		'unit' : '#slider a,#slider span'
		,'btn': '.round .adType a'
		// ,'transition' : 'scrollV'
		,'transition' : 'scrollH'
		,'fcsCls' : null 
		,'btnStepAttr' : 'data-style'
	});
	document.execCommand("BackgroundImageCache",false,true);
	$('.adType a').mouseover(function(){
		$('.adType a').animate({
			opacity:1
		});
	}).mouseout(function(){
		$('.adType a').animate({
			opacity:.2
		});
	})
});


fml.define('app/slider',['jquery'],function(require , exports){});
