/*common*/
require('m/zepto/touch')

var shareTmp = require('wap/component/shareTmp')
	, $wall
	, colsWidth
	, colNum
	, pt

var add = function(res, opts){
	var $frame = $('<div />', {
			'class' : 'frame'
			, 'frame' : opts.data.frame

		}).appendTo($wall)

	var fragment = document.createDocumentFragment()

	$.each(res , function(k , v){
		var $tmp = $(shareTmp('posterWall', {v: v, pt : pt, lazyLoad : !!(opts.lazyLoad)}))
			.css({
				'width' : colsWidth + '%'
			})
		fragment.appendChild($tmp[0]);
	});
	$frame.append(fragment)

	opts.lazyLoad && opts.lazyLoad.load()
}

var set = function(opts){
	$wall = $(opts.box || '.posterWall').find('.goods_wall')

	colNum = opts.colNum ? opts.colNum : Math.ceil($wall.width() / 200) 
	colsWidth = (1 / colNum) * 100
	pt = opts.pt
}

exports.set = set 
exports.add = add
