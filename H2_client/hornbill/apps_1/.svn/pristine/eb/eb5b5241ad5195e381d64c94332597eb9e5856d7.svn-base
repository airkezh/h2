fml.define('md/app/fallWalls' , ['wap/zepto/touch', 'wap/component/windowScroll', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');

	var pullUp = $('.pullUp')
		, win = $(window)
		, win_h = win.height()
		, pullUp_top
	
	var scrollPoster = function(opts){
		var isPosterLoad = true
		var url = opts.url
			, box = opts.box || $('.goods_wall')
			, data = {
				page : opts.page
			}

		scroll.bind(function(pos,isDown){
			if(isDown){
				pullUp_top = pullUp[0].getBoundingClientRect().top
				if(pullUp_top - 100 <= win_h && isPosterLoad){
					isPosterLoad = false 
					pullUp.attr('status', 'loading');
					$.get(url, data, function(res){
						if(!res.data){
							pullUp.attr('status', 'stop');
							return;
						}
						pullUp.attr('status', 'tap');
						box.append(shareTmp('posterWall' , res))

						data.page++;
						isPosterLoad = true;

					}, 'json')

				}
			}
			
		},'scrollPoster')
	}
	exports.scrollPoster = scrollPoster;
});
