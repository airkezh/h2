fml.define('app/accordion_slider' , ['jquery'] , function(require , exports){
	$ = require('jquery');
	(function($){
		$.fn.kwicks = function(options) {
			var defaults = {
				isVertical: false,//false为水平动画，true为垂直动画
				sticky: false,  //false为鼠标移开可恢复的，true为保留的
				defaultKwick: 0, //默认展开图片的索引值
				event: 'mouseover',
				spacing: 0,  //图片间隔宽度
				duration: 500 //图片动画的时间
			};
			var o = $.extend(defaults, options);
			var WoH = (o.isVertical ? 'height' : 'width'); 
			var LoT = (o.isVertical ? 'top' : 'left'); 

			return this.each(function() {
				container = $(this);
				var kwicks = container.children('li');
				var normWoH = kwicks.eq(0).css(WoH).replace(/px/,''); //第一个li获取默认宽度（5/1），把px去掉
				if(!o.max) {
					o.max = (normWoH * kwicks.length) - (o.min * (kwicks.length - 1));
				} else {
					o.min = ((normWoH * kwicks.length) - o.max) / (kwicks.length - 1);  
				}
				// 设置容器ul的宽度、高度
				if(o.isVertical) {
					container.css({
						width : kwicks.eq(0).css('width'),
						height : (normWoH * kwicks.length) + (o.spacing * (kwicks.length - 1)) + 'px'
					});				
				} else {
					container.css({
						width : (normWoH * kwicks.length) + (o.spacing * (kwicks.length - 1)) + 'px',
						height : kwicks.eq(0).css('height')
					});				
				}

				// i = 当前鼠标覆盖的li的index ， j = 正在计算的li的index 
				var preCalcLoTs = []; // 计算li的left或top值，除了first和last  
				for(i = 0; i < kwicks.length; i++) {
					preCalcLoTs[i] = [];
					for(j = 1; j < kwicks.length - 1; j++) {
						if(i >=j ){
							preCalcLoTs[i][j] =  j * o.min + (j * o.spacing);
						}else{
							preCalcLoTs[i][j] = (j-1) * o.min + o.max + (j * o.spacing);
						}
					}
				}

				kwicks.each(function(i) {
					var kwick = $(this);
					// 设置默认初始的li的width or height and left or top
					// values
					if(i === 0) {
						kwick.css(LoT, '0px');
					}else if(i == kwicks.length - 1) {
						kwick.css(o.isVertical ? 'bottom' : 'right', '0px');
					}else{
						if(o.sticky) {
							kwick.css(LoT, preCalcLoTs[o.defaultKwick][i]);
						} else {
							kwick.css(LoT, (i * normWoH) + (i * o.spacing));
						}
					}
					// sticky下需要设置初始的li的width
					if(o.sticky) {
						if(o.defaultKwick == i) {
							kwick.css(WoH, o.max + 'px');
							kwick.addClass('active');
						} else {
							kwick.css(WoH, o.min + 'px');
						}
					}
					kwick.css({
						margin: 0,
						position: 'absolute'
					});

					kwick.bind(o.event, function() {
						// 获取之前的width or heights and left or top values
						var prevWoHs = []; 
						var prevLoTs = []; 
						kwicks.stop().removeClass('active');
						for(j = 0; j < kwicks.length; j++) {
							prevWoHs[j] = kwicks.eq(j).css(WoH).replace(/px/, '');
							prevLoTs[j] = kwicks.eq(j).css(LoT).replace(/px/, '');
						}
						var aniObj = {};
						aniObj[WoH] = o.max;
						var maxDif = o.max - prevWoHs[i];
						var prevWoHsMaxDifRatio = prevWoHs[i]/maxDif;
						kwick.addClass('active').animate(aniObj, {
							step: function(now) { //now动画每执行一步，aniObj的值
							// 计算动画完成的百分比
							var percentage = maxDif != 0 ? now/maxDif - prevWoHsMaxDifRatio : 1;
							kwicks.each(function(j) {
								if(j != i) {
									kwicks.eq(j).css(WoH, prevWoHs[j] - ((prevWoHs[j] - o.min) * percentage) + 'px');
								}
								if(j > 0 && j < kwicks.length - 1) { // if not the first or last kwick
									kwicks.eq(j).css(LoT, prevLoTs[j] - ((prevLoTs[j] - preCalcLoTs[i][j]) * percentage) + 'px');
								}
							});
							},
							duration: o.duration,
							easing: o.easing
						});
					});
				});
				if(!o.sticky) {
					container.bind("mouseleave", function() {
						var prevWoHs = [];
						var prevLoTs = [];
						kwicks.removeClass('active').stop();
						for(i = 0; i < kwicks.size(); i++) {
							prevWoHs[i] = kwicks.eq(i).css(WoH).replace(/px/, '');
							prevLoTs[i] = kwicks.eq(i).css(LoT).replace(/px/, '');
						}
						var aniObj = {};
						aniObj[WoH] = normWoH;
						var normDif = normWoH - prevWoHs[0];
						kwicks.eq(0).animate(aniObj, {
							step: function(now) {
								var percentage = normDif != 0 ? (now - prevWoHs[0])/normDif : 1;
								for(i = 1; i < kwicks.size(); i++) {
									kwicks.eq(i).css(WoH, prevWoHs[i] - ((prevWoHs[i] - normWoH) * percentage) + 'px');
									if(i < kwicks.size() - 1) {
										kwicks.eq(i).css(LoT, prevLoTs[i] - ((prevLoTs[i] - ((i * normWoH) + (i * o.spacing))) * percentage) + 'px');
									}
								}
							},
							duration: o.duration,
							easing: o.easing
						});
					});
				}
			});
		};
	})(jQuery);

});
