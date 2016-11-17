fml.define('wap/app/posterWalls1' , ['component/urlHandle' , 'wap/zepto', 'wap/component/windowScroll','wap/component/waterfall', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');
	var pin = require('wap/component/waterfall');
	var query = require('component/urlHandle');

	query = query.getParams(window.location.href.toString());

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
		$.extend(true, urlData, query);
		$.get(url, urlData, function(res){
			/*
			if(res.tInfo.length == 0){
				pullUp.attr('status', 'stop');
				return;
			}
			*/
			loadPoster(urlData, res)
			fml.fireProxy('logPoster' , res)
		}, 'json')
	}
	var loadPoster = function(urlData, data){
		pullUp.attr('status', 'tap');
		pin.append(shareTmp('posterWall' , data))
		urlData.frame++;
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
		if (poster0 && poster0.tInfo.length > 0){
			urlData.frame++;
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
