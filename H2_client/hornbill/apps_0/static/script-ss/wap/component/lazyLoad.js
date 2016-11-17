fml.define('wap/component/lazyLoad' , ['wap/zepto', 'wap/component/windowScroll'] , function(require , exports){
	var preN = 100;
	var loadingImg = 'http://img.meilishuo.net/css/images/group/g_loading2.gif';

	function loadImg(item , attrName ) {
		var src = item.getAttribute(attrName);
		if ('null' == src || src.indexOf('.') < 0 ) return;
		var img = new Image;
		
		function onload(){
			img.onload = null;
			var title = item.getAttribute('title')
			if (title) img.setAttribute('title' , title )
			var alt = item.getAttribute('alt')
			if (alt) img.setAttribute('alt' , alt )
			img.className = item.className;
			img.style.cssText = item.style.cssText;
			var pnl = item.parentNode;
			pnl.insertBefore(img,item);
			item.style.display = 'none';
			pnl.removeChild(item);
		}
		img.onload = onload;
		img.src = src  ;
		
	}
	function loadBg(item ,attrName){
		item.style.backgroundImage = 'url('+item.getAttribute(attrName) +')' 
		}
	function showImg(items, attrName , loadStyle){
		var j = items.length;
		if ('function' == typeof loadStyle)
			var callFn = loadStyle
		else
			var callFn = loadStyle == 'bg' ? loadBg : loadImg

		for (var i=0 ; i<j;i++){
			callFn( items[i] , attrName );
			}
		
		}
	exports.setLoading = function(src){
		loadingImg = src;
		}
	exports.load =	function (xpath , soureAttrName , loadStyle , container){
		window.setTimeout(function(){
			bindLoad(xpath , soureAttrName , loadStyle , container);
			} , 30);
	}
	function pushInLine(topv,lines,imgs ,index , index_end){
		var total = imgs.length;
		for (var i = index;i<=index_end; i++){
			if (i >= total) return true;
			var offset = imgs.eq(i).offset().top;
			if (! lines.hasOwnProperty(offset) ) {
				lines[offset] = []; 	
				topv.push(offset);
			}
			lines[offset].push(imgs[i]);
			}
			return false;
		
		}
	function bindLoad(xpath , soureAttrName , loadStyle, container){
		var	onscroll = require('wap/component/windowScroll');
		var lines = {}, 
			topv = [];
		var imgs,vi,container_height ;
		imgs = $(xpath , container);
		if (container) {
			container = $(container)
			container_height = container.height()
			preN += container.offset().top
			container = $(container)[0]
		}

		var imgs_count = imgs.length;
		var index=0 ,index_end , step = 50,
			sleep = 30;
		var done = false;
		while(index <= imgs_count){
			index_end = index + step - 1;
			if (index_end>= imgs_count) {
				index_end = imgs_count-1;
				}
			window.setTimeout((function(index , index_end){
				return function(){
					done = pushInLine(topv , lines , imgs , index , index_end) || done;	
					}
				})(index , index_end) , sleep );
			sleep += 15;
			index += step;
			}
		//preN = onscroll.property('height') / 2;
		window.setTimeout(function(){
			handler(onscroll.property('scrollTop' , container) , true);
		} , sleep+5);
		onscroll.bind(handler, null ,container);
		

		function handler(pos,down){
			if (!down) return;
			pos += (container_height? container_height : onscroll.property('height' ) ) + preN 
			var j = topv.length;
			var max_vi = -1;
			for (var i = 0 ; i<j ; i++){
				var vi = topv[i];
				if (vi < pos) {
					lines.hasOwnProperty(vi) &&showImg(lines[vi] , soureAttrName , loadStyle);	
					delete lines[vi];
					max_vi = i;
					}	
				}
			if (max_vi >-1  ) topv.splice(0 , max_vi + 1);
			//console.log(max_vi , topv.length , topv);
			if (topv.length == 0 && done) onscroll.unBind(handler);
			};
		
		}
});
