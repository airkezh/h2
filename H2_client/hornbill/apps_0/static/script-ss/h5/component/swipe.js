/*common*/
require('m/zepto')

var $outer
	, outer_height
	, outer_width

	, y = 0
	, x = 0
	, yStart = 0
	, xStart = 0

	, y2 = 0
	, yOri = 0
	, yDrag = 0

	, x2 = 0
	, xOri = 0
	, xDrag = 0
	, startTime = 0

var touchStart = function(event){
//	event.preventDefault();
	if (!event.touches.length)
		return;
	var touch = event.touches[0];
	outer_height = $outer.height()
	outer_width = $outer.width()
	yStart = touch.pageY - y;
	xStart = touch.pageX - x;
	startTime = +new Date;
};

var touchMove = function(event){
	event.preventDefault();
	if (!event.touches.length)
		return;
	var touch = event.touches[0];
	y = touch.pageY - yStart
	y2 = y / outer_height * 100;

	x = touch.pageX - xStart
	x2 = x / outer_width * 100;

	if(y2 > -100 && y2 < 100){
		if(y2 > 0){
			y2 >= yDrag ? yOri = 1 : yOri = 0
			$outer.trigger('moveDown', {y:y2, yOri:yOri, yDrag:yDrag})

		}else if(y2 < 0){
			y2 <= -yDrag ? yOri = -1 : yOri = 0
			$outer.trigger('moveUp', {y:y2, yOri:yOri, yDrag:yDrag})

		}else{
			yOri = 0
		}
	}


	if(x2 > -100 && x2 < 100){
		if(x2 > 0){
			x2 >= xDrag ? xOri = 1 : xOri = 0
			$outer.trigger('moveRight', {x:x2, xOri:xOri, xDrag:xDrag})

		}else if(x2 < 0){
			x2 <= -xDrag ? xOri = -1 : xOri = 0
			$outer.trigger('moveLeft', {x:x2, xOri:xOri, xDrag:xDrag})

		}else{
			xOri = 0
		}
	}
	$outer.trigger('move', {x:x2, y:y2, xOri:xOri, yOri:yOri, xDrag:xDrag, yDrag:yDrag})
}

var touchEnd = function(event){
	yStart = 0

	xStart = 0

	var duration = +new Date - startTime
	var isValidSlide = Number(duration) < 250 && Math.abs(x) > 15 || Math.abs(x) > outer_width / 2;

	if (!isValidSlide) {
		return;
	}

	if(yOri == 1) $outer.trigger('moveDownEnd', {x:x2, y:y2, xOri:xOri, yOri:yOri, xDrag:xDrag, yDrag:yDrag})
	else if(yOri == -1) $outer.trigger('moveUpEnd', {x:x2, y:y2, xOri:xOri, yOri:yOri, xDrag:xDrag, yDrag:yDrag})
	else $outer.trigger('moveAbandonY')

	if(xOri == 1) $outer.trigger('moveRightEnd', {x:x2, y:y2, xOri:xOri, yOri:yOri, xDrag:xDrag, yDrag:yDrag})
	else if(xOri == -1) $outer.trigger('moveLeftEnd', {x:x2, y:y2, xOri:xOri, yOri:yOri, xDrag:xDrag, yDrag:yDrag})
	else $outer.trigger('moveAbandonX')

	$outer.trigger('moveEnd', {x:x2, y:y2, xOri:xOri, yOri:yOri, xDrag:xDrag, yDrag:yDrag})

	y = 0
	y2 = 0
	x = 0
	x2 = 0
	yOri = 0
}

var init = function(settings){

	$outer = settings.outer || $(window)
	yDrag = settings.yDrag || 0
	xDrag = settings.xDrag || 0

	$outer
		.on("touchstart", touchStart)
		.on("touchmove", touchMove)
		.on("touchend", touchEnd)

        /*
        .on('move', function(e, offset){ console.log('move', offset) })
        .on('moveEnd', function(e, offset){ console.log('move', offset) })
        */
        /*
        .on('moveUp', function(e, offset){ console.log('moveUp', offset) })
        .on('moveDown', function(e, offset){ console.log('moveDown', offset) })
        */

		/*
        .on('moveUpEnd', function(e){ console.log('moveUpEnd') })
        .on('moveDownEnd', function(e){ console.log('moveDownEnd') })
        .on('moveAbandonY', function(e){ console.log('moveAbandonY') })
		*/

        /*
        .on('moveLeft', function(e, offset){ console.log('moveLeft', offset) })
        .on('moveRight', function(e, offset){ console.log('moveRight', offset) })
        .on('moveLeftEnd', function(e, offset){ console.log('moveLeftEnd') })
        .on('moveRightEnd', function(e, offset){ console.log('moveRightEnd') })
        .on('moveAbandonX', function(e){ console.log('moveAbandonX') })
        */
}

exports.init = init;
