fml.define('md/app/posterWalls' ,['wap/zepto/touch', 'wap/component/windowScroll','md/app/waterfall', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');
	var pin = require('md/app/waterfall');
	var pullUp = $('.pullUp')
		, win = $(window)
		, win_h = win.height()
		, win_w = win.width()
		, isPosterLoad = false
		, pullUp_top
		, urlData
		, pullUpAction

	var ajaxPoster = function(url){
	//	console.log('ajax f')
		isPosterLoad = false 
		pullUp.attr('status', 'loading');
		$.get(url, urlData, function(res){
			
			if(!res.data){
				pullUp.attr('status', 'stop');
				return;
			}
			
			loadPoster(urlData, res)
			fml.fireProxy('logPoster' , res)
		}, 'json')
	}
	var loadPoster = function(urlData, data){
		pullUp.attr('status', 'tap');
		pin.append(shareTmp('posterWall' , data))
		urlData.page++;
	//	console.log('load t')
		isPosterLoad = true;
		fml.vars.toLogPoster && window.setTimeout(function(){
			fml.fireProxy('logPoster' , data)
		}, 2000)
	}

	var scrollPoster = function(isscroll){

		function scrollPoster(pos,isDown){
			if(isDown){
				pullUp_top = pullUp[0].getBoundingClientRect().top
			//	console.log(isPosterLoad)
				if(pullUp_top - 100 <= win_h && isPosterLoad)
					pullUpAction();
			}
		}

	//	if(Meilishuo.config.os.ios && isscroll)
	//		scroll.bind(scrollPoster,'scrollPoster', fml.vars.screen.scroller[0])
	//	else
			scroll.bind(scrollPoster,'scrollPoster')
	}
	var testPoster0 = function(data, action){
		urlData = data
		pullUpAction = action
		var poster0 = Meilishuo.config.poster0; 
		if (poster0.data && poster0.data.length > 0){
			urlData.page++;
		//	console.log('test0 t')
			isPosterLoad = true;	
	//		isPanLoad = true
			minHeight = pin.getAttr('minHeight');
		//	delete Meilishuo.config.poster0	
		}else{
			pullUpAction(urlData);
		}
	}

	exports.testPoster0 = testPoster0;
	exports.ajaxPoster = ajaxPoster;
	exports.scrollPoster = scrollPoster;
});
