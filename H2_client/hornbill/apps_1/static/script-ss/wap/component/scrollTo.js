fml.define('wap/component/scrollTo', [] , function(require , exports){
	return function(x,y, fn){
		var x = x || 0
			, y = y || 0
			, tmp = document.getElementById('scrollTmp')
	//		, tmp_pt = parseInt(tmp.style.paddingTop) | 0

		window.scrollTo(x,y)
	//	tmp_pt++;
		var t = setTimeout(function(){
//			fml.vars.screen.body.height('').css('overflow','')
	//		tmp.style.paddingTop = tmp_pt + 'px'
			if(fn)
				fn();
		}, 10);

	}

});
