/*common*/
require('m/zepto/touch')

var shareTmp = require('wap/component/shareTmp')
	, minHeight = 0
	, maxHeight = 0
	, colsHeight = []
	, $wall
	, colsWidth
	, colNum

var add = function(res, opts){
	var $frame = $('<div />', {
			'class' : 'frame'
			, 'frame' : opts.data.frame

		}).appendTo($wall)

	for(var i = 0;i < colNum; i++){
		colsHeight[i] -= maxHeight 
	}
	minHeight = Math.min.apply(Math , colsHeight)

	$.each(res , function(k , v){
		for(var i = 0;i < colNum; i++){
			if(colsHeight[i] <= minHeight){

				var $tmp = $(shareTmp('posterWall', {v: v, lazyLoad : !!(opts.lazyLoad)}))
					.attr('col', i)
					.css({
						'top': minHeight	
						, 'left' : i * colsWidth + '%'
						, 'width' : colsWidth + '%'
					})
					.appendTo($frame)

				colsHeight[i] += $tmp.height()
				minHeight = Math.min.apply(Math , colsHeight)

				break;
			}
		}
	})
	maxHeight = Math.max.apply(Math , colsHeight)
	$frame.height(maxHeight)

	opts.lazyLoad && opts.lazyLoad.load()
}

var set = function(opts){
	$wall = $(opts.box || '.posterWall').find('.goods_wall')

	colNum = opts.colNum ? opts.colNum : Math.ceil($wall.width() / 200) 
	colsWidth = (1 / colNum) * 100

	for(var i = 0;i < colNum; i++){
		colsHeight[i] = 0 
	}
}

exports.set = set 
exports.add = add

