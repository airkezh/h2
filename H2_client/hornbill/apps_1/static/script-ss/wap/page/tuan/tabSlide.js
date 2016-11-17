fml.define('wap/page/tuan/tabSlide', ['wap/zepto'], function() {
	(function($){
		window.tabSlide = function(options){
			var defaults = {
				duration: 400,  //滑动时间
				callback: function(){}
			};
			var params = $.extend(true, {}, defaults, options);

			var $ele = params.element
			,$container = params.container
			,containerW = $container.width()
			,isclick = true  //区分点击还是滑动
			,ismove = false  //是否滑动中
			,startx = 0  //左侧边界相对父元素的x坐标值
			,endx = 0  //右侧边界相对父元素的x坐标值
			,startP = {}  //滑动开始时相对父元素的坐标
			,endP = {}  //滑动结束时相对父元素的坐标
			,eventType = {
				start : 'touchstart',
				move : 'touchmove',
				end : 'touchend'
			};
			
			function initPosition(){ //定位
				var elewidth = 0;
				$ele.children().each(function(){
					elewidth += this.clientWidth;
				});
				//这里加1是兼容安卓手机少一像素换行问题
				$ele.width(elewidth +1 );
				endx = $container.width() - $ele.width();
				initEvent();
			}
			function start(event){
				event.preventDefault();
				ismove = true;
				isclick = true;
				startP.x = event.changedTouches[0].clientX - startx ;
			}
			function move(event){
				if(ismove){
					endP.x = event.changedTouches[0].clientX;
					if(endP.x -startP.x > 0){
						//startx = (endP.x - startP.x) / 3 ;
						startx = 0;
					}else if( ( endP.x - startP.x) < endx){
						//startx = endx + (endP.x - (startP.x +startx)) / 3 ; 
						startx = endx;
					}
					else{
						startx = endP.x -startP.x;
					}
					setCss(0, startx);
					isclick = false;
				}
			}
			function end(event){
				//autoTranslate(event);
				ismove = false;
				if(isclick){
					autoTranslate(event);
				}
			}
			function initEvent(){
				$ele.on(eventType.start,start);
				$ele.on(eventType.move, move);
				$ele.on(eventType.end, end);
				//$ele.find('a').on(eventType.start, autoTranslate);
			}
			
			function autoTranslate(event){

				var me = event.target;
				var targetX = params.targetX || (containerW - me.clientWidth)/2; // 目标点的坐标位置
				var stepX = targetX - me.offsetLeft;
				//边界考虑
				if(stepX > 0){
					stepX = 0;
				}
				if(stepX < endx){
					stepX = endx;
				}
				setCss(params.duration, stepX);
				params.callback(me);
			
			}
			function setCss(duration, translateX){
				$ele.css({'-webkit-transition-duration': duration + 'ms','-webkit-transform' : 'translate('+ translateX +'px, 0px) translateZ(0px)'});
			}

			return {
				init: function(){
					initPosition();
				}
			};
		}

	})(Zepto)
});