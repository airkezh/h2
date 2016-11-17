fml.define('wap/app/fallWalls' , ['wap/zepto/touch', 'wap/component/lazyLoad', 'wap/component/windowScroll', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var scroll = require('wap/component/windowScroll');
	var posLoad = require('wap/component/lazyLoad');

	var pullUp = $('.pullUp')
		, win = $(window)
		, win_h = win.height()
		, pullUp_top
	
	var scrollPoster = function(opts){
		var isPosterLoad = true
		var url = opts.url
			, box = opts.box || $('.goods_wall')
			, data = {
				frame : opts.frame
			}

		scroll.bind(function(pos,isDown){
			if(isDown){
				pullUp_top = pullUp[0].getBoundingClientRect().top
				if(pullUp_top - 100 <= win_h && isPosterLoad){
					isPosterLoad = false 
					pullUp.attr('status', 'loading');
					$.get(url, data, function(res){
						if(res.tInfo.length == 0){
							pullUp.attr('status', 'stop');
							return;
						}
						pullUp.attr('status', 'tap');
						if(fml.vars.is_lazyload_poster){
							var posDom = $(shareTmp('posterWall' , res));
							posLoad.load(posDom.find('.bs_load_img'), 'asrc')
							box.append(posDom)
						} else {
							box.append(shareTmp('posterWall' , res))
						}
						fml.emit('posterFinsh');//注册海报加载完成事件
						data.frame++;
						isPosterLoad = true;

					}, 'json')

				}
			}
			
		},'scrollPoster')
	}
	exports.scrollPoster = scrollPoster;
});
