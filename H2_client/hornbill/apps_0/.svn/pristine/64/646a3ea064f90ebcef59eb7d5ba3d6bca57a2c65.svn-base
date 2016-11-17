fml.define('wap/app/wapWalls2' , ['wap/component/wapfall', 'component/shareTmp', 'component/iStorage', 'wap/jquery'] , function(require , exports){
	var storage = require('component/iStorage');
	var shareTmp = require('component/shareTmp');
	var pin = require('wap/component/wapfall');

	var freshPoster = function(urlData, url, scroll){
		$(scroll.scroller.lastElementChild).attr('status', 'normal');
		urlData.frame = 0;
		urlData.page = 0;
		$.get(url, urlData, function(response){
			pin.init({
				containerId : '.goods_wall'
				, colNum : $('.col_flag').css('z-index') | 0
			});
			pin.append(shareTmp('posterWall' , response));
			scroll.refresh();
		}, 'json')
	}
	var ajaxPoster = function(urlData, url, scroll){
		urlData.frame++;
		if(urlData.frame >= 8){
			urlData.frame = 0
			urlData.page++;
		}
		$.get(url, urlData, function(response){
			if(response.tInfo.length < 20)
				$(scroll.scroller.lastElementChild).attr('status', 'stop');
			pin.append(shareTmp('posterWall' , response));
			scroll.refresh();
		}, 'json')
	}

	exports.freshPoster = freshPoster;
	exports.ajaxPoster = ajaxPoster;
});
