fml.define('wap/app/posterWalls4' , ['component/urlHandle' ,'wap/component/lazyLoad', 'wap/zepto', 'wap/component/windowScroll','wap/component/waterfall', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');
	var pin = require('wap/component/waterfall');
	var lazyLoad = require('wap/component/lazyLoad');
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
		isPosterLoad = false 
		pullUp.attr('status', 'loading');
		$.extend(true, urlData ,query);
		$.get(url, urlData, function(res){
			if(res.tInfo.length == 0){
				pullUp.attr('status', 'stop');
				return;
			}
			loadPoster(urlData, res)
			fml.fireProxy('logPoster' , res)
		}, 'json')
	}
	var loadPoster = function(urlData, data){
		pullUp.attr('status', 'tap');		
		if(fml.vars.is_lazyload_poster){
			var posDom=$(shareTmp('posterWall' , data));		
			lazyLoad.load(posDom.find('.bs_load_img'), 'data-src')
			pin.append(posDom);
		}else{ 
			pin.append(shareTmp('posterWall' , data))
		}
		urlData.frame++;
		isPosterLoad = true;
		fml.vars.toLogPoster && window.setTimeout(function(){
			fml.fireProxy('logPoster' , data)
		}, 1000)

	}

	var scrollPoster = function(isscroll){

		function scrollPoster(pos,isDown){
			if(isDown){
				pullUp_top = pullUp[0].getBoundingClientRect().top
				if(pullUp_top - 100 <= win_h && isPosterLoad)
					pullUpAction();
			}
		}
			scroll.bind(scrollPoster,'scrollPoster')
	}
	var testPoster0 = function(data, action){
		urlData = data
		pullUpAction = action

		var poster0 = Meilishuo.config.poster0; 
		if (poster0 && poster0.tInfo.length > 0){
			urlData.frame++;
			isPosterLoad = true;	
			minHeight = pin.getAttr('minHeight');
		}else{
			pullUpAction(urlData);
		}

	}

	exports.testPoster0 = testPoster0;
	exports.ajaxPoster = ajaxPoster;
	exports.scrollPoster = scrollPoster;
});
