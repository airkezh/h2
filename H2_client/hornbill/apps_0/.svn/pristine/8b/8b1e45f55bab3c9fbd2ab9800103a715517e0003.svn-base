/*common*/
/**
 *@file loadFromPoint
 *@desc 通过屏幕扫点进行加载
 *@attention
 */
require('m/component/scrollStop');
var _settings = {
	'xStep' : 60,
	'yStep' : 60,
	'imgFrameClass' : 'img_frame'
};
var $frame = null,
	src = '',
	isFirst = true,
	X = 0,
	Y = 0,
	win = $(window),
	winHeight = win.height(),
	winWidth = win.width();

function initData(settings){
	_settings = $.extend(true, _settings, settings);
	X = _settings.xStep;
	Y = _settings.yStep;
}

function loadDownEvent(){
	$(this).show();
}

function load(settings){
	initData(settings);
	for(var x = X; x <= winWidth; x += X){
		for(var y = Y; y <= winHeight; y += Y){

			$frame = $( document.elementFromPoint(x, y) );
			src = $frame.data('src');
			if(src && $frame.is('.' + _settings.imgFrameClass)){
				$frame.data('src', '')
					  .find('img')
					  .on('load', loadDownEvent)
					  .prop('src', src);
			}

		}
	}
	if(isFirst){
		isFirst = false;
		win.on('scrollStop', arguments.callee);
	}
}

exports.initData = initData;
exports.load = load;