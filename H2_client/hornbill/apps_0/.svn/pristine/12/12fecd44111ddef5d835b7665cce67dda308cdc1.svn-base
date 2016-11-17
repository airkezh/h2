fml.define('wap/app/summerMatchWall' , ['wap/zepto', 'wap/component/windowScroll', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');
	// var pin = require('wap/component/waterfall');

	var pullUp = $('.pullUp')
		, win = $(window)
		, win_h = win.height()
		, win_w = win.width()
		, isPosterLoad = false
		, pullUp_top
		, urlData
		, pullUpAction
	
	var ajaxPoster = function(url , onEnd){
		isPosterLoad = false;
		pullUp.attr('status', 'loading');

		$.ajax({
			url: url,
			data: urlData,
			success: function(res){
				if(res.length == 0){
					/*pullUp.attr('status', 'stop').hide().before('<div class="pullend">木有了...</div>') */;
					pullUp.attr('status', 'stop').hide();
					return;
				}
				loadPoster(urlData, res)
				if(res.length < 10){
					/*pullUp.attr('status', 'stop').hide().before('<div class="pullend">木有了...</div>') */;
					pullUp.attr('status', 'stop').hide();
					isPosterLoad = false;
					onEnd && onEnd()
				}
			},
			error: function(err){
				if(err){
					/*pullUp.attr('status', 'stop').hide().before('<div class="pullend">木有了...</div>') */;
					pullUp.attr('status', 'stop').hide();
					isPosterLoad = false;
					onEnd && onEnd()
				}
			},
			dataType: 'json'
		});
	}
	var loadPoster = function(urlData, data){
		pullUp.attr('status', 'tap');
		var tempHtml = shareTmp('posterWall' , {'poster': data,'fml':fml.vars.poster});
		var fragment = document.createDocumentFragment();
		var tempDom = $(tempHtml);
		for(var i = 0, k = tempDom.length;i<k;i++){
			fragment.appendChild(tempDom[i]);
		}
		$('.waterfall').append(fragment);
		//$('.waterfall').append(shareTmp('posterWall' , {'poster': data,'fml':fml.vars.poster}))

		urlData.frame++;

		isPosterLoad = true;
	}

	var scrollPoster = function(isscroll){

		function scrollPoster(pos,isDown){
			if(isDown){
				pullUp_top = pullUp[0].getBoundingClientRect().top
				if(pullUp_top - 100 <= win_h && isPosterLoad)
					pullUpAction();
			}
		}
		if(Meilishuo.config.os.ios && isscroll)
			scroll.bind(scrollPoster,'scrollPoster', $('.scroller')[0])
		else
			scroll.bind(scrollPoster,'scrollPoster')
	}
	var testPoster0 = function(data, action){
		urlData = data
		pullUpAction = action

		var poster0 = Meilishuo.config.poster0; 
		if (poster0 && poster0.length > 0){
			urlData.frame++;
			isPosterLoad = true;	
	//		isPanLoad = true
			// minHeight = pin.getAttr('minHeight');
		//	delete Meilishuo.config.poster0	
		}else{
			pullUpAction(urlData);
		}
	}

	exports.testPoster0 = testPoster0;
	exports.ajaxPoster = ajaxPoster;
	exports.scrollPoster = scrollPoster;
});
