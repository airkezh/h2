/*common*/
require('wap/zepto')

var x = 0,
	x2 = 0,
	xOri = 0,
	xDrag = 0,
	xStart = 0,
	$outer,
	outer_width,
	startTime = 0;

var touchStart = function(event){
	//event.preventDefault();

	if (!event.touches.length) {
		return;
	}

	var touch = event.touches[0];

	outer_width = $outer.width();
	xStart = touch.pageX - x;
	startTime = +new Date;
};

var touchMove = function(event){
	event.preventDefault();

	if (!event.touches.length) {
		return;
	}

	var touch = event.touches[0];

	x = touch.pageX - xStart;
	x2 = x / outer_width * 100;

	if ((x2 > -100) && (x2 < 100)) {
		if (x2 > 0) {
			xOri = (x2 >= xDrag) ? 1 : 0;
			$outer.trigger('moveRight');
		} else if (x2 < 0) {
			xOri = (x2 <= -xDrag) ? -1 : 0;
			$outer.trigger('moveLeft');
		} else {
			xOri = 0;
		}
	}

	$outer.trigger('move');
}

var touchEnd = function(event){
	xStart = 0;

	var duration = +new Date - startTime,
		isValidSlide = (Number(duration) < 250) && (Math.abs(x) > 15) || (Math.abs(x) > outer_width / 2);

	if (!isValidSlide) {
		return;
	}

	if (xOri == 1) {
		$outer.trigger('moveRightEnd');
	} else if (xOri == -1) {
		$outer.trigger('moveLeftEnd');
	} else {
		$outer.trigger('moveAbandonX');
	}

	$outer.trigger('moveEnd');

	x = 0;
	x2 = 0;
}

var fn = function(){};

var init = function(settings){
	xDrag = settings.xDrag || 0;
	$outer = settings.outer || $(window);
	moveLeftFn = settings.moveLeftFn || fn;
	moveRightFn = settings.moveRightFn || fn;
	moveLeftEndFn = settings.moveLeftEndFn || fn;
	moveRightEndFn = settings.moveRightEndFn || fn;

	$outer
		.on('touchstart', touchStart)
		.on('touchmove', touchMove)
		.on('touchend', touchEnd)
		.on('moveLeft', moveLeftFn)
		.on('moveRight', moveRightFn)
		.on('moveLeftEnd', moveLeftEndFn)
		.on('moveRightEnd', moveRightEndFn);
}

exports.init = init;
