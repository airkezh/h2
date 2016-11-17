/*common*/
require('m/component/scrollStop') 
var preN = 200

var handler = function(topv, lines, soureAttrName, loadStyle){
	var posA = $(window).scrollTop()
		, posB = posA + $(window).height()
		, j = topv.length
		, min_vi = -1
		, num = 0 
		, i = 0
		, vi

	for (i = 0; i<j; i++){
		vi = topv[i]

		if (vi < posB && vi > posA - preN) {
			if(min_vi == -1) min_vi = i

	//		console.log(min_vi)
	//		console.log(vi, lines[vi])

			lines[vi] && showImg(lines[vi] , soureAttrName , loadStyle)
			delete lines[vi]

			num++
		}	
	}

	if (num){
		topv.splice(min_vi , num);
	}
}

var pushInLine = function(topv,lines,imgs ,index , index_end){
	var total = imgs.length
		, i
		, offset

	for (i = index; i<=index_end; i++){
		if (i >= total) return true;
		offset = imgs.eq(i).offset().top

		if (!lines[offset] ) {
			lines[offset] = []; 	
			topv.push(offset);

		//	console.log(topv)
		}
		lines[offset].push(imgs[i]);
	}
	return false;
}

var showImg = function(items, attrName , loadStyle){
	var callFn = loadStyle == 'bg' 
		? function($item ,attrName){
			$item.css({
				'background-image' : 'url(' + $item.attr(attrName) +')'
			}) 
		}
		: function($item ,attrName){
			var $img = $('<img />', {
					'src' : $item.attr(attrName)
					, 'class' : $item.attr('class')
					, 'title' : $item.attr('title')
					, 'alt' : $item.attr('alt')
					, 'style' : $item.attr('style')
				})
				.css({
					opacity : 0	
				})

			$item.before($img).remove()

			$img.animate({
				opacity : 1	
			})

		} 

	var j = items.length
	for (var i=0 ; i<j;i++){
		callFn( $(items[i]) , attrName );
	}
}
exports.load =	function (xpath , soureAttrName , loadStyle){
	var lines = {}, 
		topv = []

	var imgs = $(xpath)
		,vi

	var imgs_count = imgs.length;
	var index = 0
		, index_end
		, step = 50
		, done = false

	while(index <= imgs_count){
		index_end = index + step - 1;
		if (index_end>= imgs_count) {
			index_end = imgs_count-1;
		}
		done = pushInLine(topv , lines , imgs , index , index_end) || done

		index += step;
	}

	handler(topv, lines, soureAttrName, loadStyle)

	$(window).on('scrollStop', function(){
		handler(topv, lines, soureAttrName, loadStyle)
	})
}
