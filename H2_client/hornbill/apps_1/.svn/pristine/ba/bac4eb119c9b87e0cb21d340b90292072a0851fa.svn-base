fml.define('test/app/adPoster' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	
	function adBanner(pos_type, page_name) {
		var ad_urls = {'top' : '/ads/getTopBanner/', 'bottom' : '/ads/getBottomBanner/'};
		var ad_url = ad_urls[pos_type] + page_name;
		var ad = '.ads_' + pos_type;
		if ($(ad).length == 0) return;
		$.get(ad_url, function(res) {
			if (!res || res.length == 0) return;
			fml.fireProxy('showNav');
			init(ad, res, { width:2000 });
		}, 'json');
	}

	function tuanBanner() {
		var url = 'http://www.meilishuo.com/tuan/tuanad_jsonp?callback=?';
		$.getJSON(url,function(res){
			if (!res || res.length == 0) return;
			init('.ads_banner', res, { width:2000 });
		});
	}

	function init(adBoxId, adImgsData, options) {
		var defaults = {
			width : 200,
			height : 100,
			gap : 3000,			//carousel gap time
			type : 1,			//1: carousel top, 2: carousel left, 3: fade, ...
			numType : 1			//num style
		};
		if(!(adImgsData instanceof Array)) return false;	//judge adImgsData is array
		var $box = $(adBoxId).show(),
			len = adImgsData.length,
			opts = $.extend({}, defaults, options);
		if (len === 0) return;
		$box.html('<div class="boxImg"><ul class="_img"></ul></div><div class="_num"></div>');
		var $boxImg = $box.find('._img'),
			$boxNum = $box.find('._num');	
		generateImgLi($boxImg, $boxNum, adImgsData, len, opts);
		timer(0, len, $boxImg, $boxNum, opts);
	}

	function generateImgLi($boxImg, $boxNum, adImgsData, len, opts) {
		if (len === 1) {
			$boxImg.append(getImgLi(adImgsData[0], opts));
		} else {
			for(var i=0; i<len; i++) {
				$boxImg.append(getImgLi(adImgsData[i], opts));
				$boxNum.append('<a><span class="none_f">' + (i+1) + '</span></a>');
			}
			$boxNum.addClass('adType' + opts.numType);
			switch(opts.type) {
				case 1:
					$boxImg.css({'width':'100%', 'position':'absolute'})
						.find('li').css({'float':'left','display':'block','width':'100%'});
					break;
				case 2:
					$boxImg.css({'width' : opts.width * len, 'display' : 'inline-block'});
					break;
				case 3:
					$boxNum.hide();
					break;
			}
		}
	}
	
	function getImgLi(imgData, opts) {
		var imgli = '<li><div style="position:relative; height:' + opts.height + 'px; background:url(' + imgData.imgurl + ') center top no-repeat;">' 
			+ '<a target="_blank" href="' + imgData.linkurl + '" style="top:0;left:0;width:100%;height:' + opts.height + 'px;background-position:0 200px;position:absolute; _font-size:' + opts.height + 'px;"></a></div></li>';
		return imgli;
	}

	function timer(k, len, $boxImg, $boxNum, opts) {
		if (len === 1) return;
		var clockTimeout = null;
		var act = function(k) {
			$boxImg.stop(true, true);
			if (k == len && opts.type == 3) k = 0;
			switch(opts.type) {
				case 1:
					$boxImg.animate({top : -opts.height * k + 'px'},300);
					carouselLast('top', 'height');
					break;
				case 2:
					$boxImg.animate({left: -opts.width * k + 'px'}, 300);
					carouselLast('left', 'width');
					break;
				case 3:
					$boxNum.hide();
					$boxImg.children('li').fadeOut();
					setTimeout(function(){ $boxImg.children('li').eq(k).fadeIn(); }, 400);
					break;
			}
			//for carousel naturely roll
			function carouselLast(pos, wh) {
				if (k == len) {
					var $firstLi = $boxImg.children('li').eq(0);
					$firstLi.css('position','relative').css(pos, opts[wh]*k + 'px');
					setTimeout(function(){
						$boxImg.css(pos, 0);
						$firstLi.css({'position':''});
					},400);
					k = 0;
				}
			}
			$boxNum.find('.current').removeClass('current');
			$boxNum.children('a').eq(k).addClass('current');
		};
		var clock = function() {
	//		if (k++ >= len-1) k = 0;
			act(++k);
			if (k == len) k = 0;
			clockTimeout = setTimeout(clock, opts.gap);
		};
		var start = function() {
			act(k);
			clockTimeout = setTimeout(clock, opts.gap);
			$boxNum.find('a').hover(function(){
				clearTimeout(clockTimeout);
				k = $(this).children('span').text() - 1;
				act(k);
			}, function(){
				clockTimeout = setTimeout(clock, opts.gap);
			});
			$boxImg.hover(function(){
				clearTimeout(clockTimeout);
			}, function(){
				clockTimeout = setTimeout(clock, opts.gap);
			});
		};
		start();
	}

	exports.adBanner = adBanner;
	exports.carousel = timer;
	exports.tuanBanner = tuanBanner;
});
