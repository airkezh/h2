/*common*/
require('m/zepto')

var $outer
	, outer_height
	, outer_width

	, y
	, x

	, y0 = 0
	, x0 = 0
	, yStart = 0
	, xStart = 0

	, yOri = 0
	, yDrag = 0

	, xOri = 0
	, xDrag = 0


var touchStart = function(event){
//	event.preventDefault();
	if (!event.touches.length)
		return;
	var touch = event.touches[0];
	outer_height = $outer.height()
	outer_width = $outer.width()
	yStart = touch.pageY - y0;
	xStart = touch.pageX - x0;
};

var touchMove = function(event){
	event.preventDefault();
	if (!event.touches.length)
		return;
	var touch = event.touches[0];
	y0 = touch.pageY - yStart
	x0 = touch.pageX - xStart
	y = y0 / outer_height * 100;
	x = x0 / outer_width * 100;

	if(y > -100 && y < 100){
		if(y > 0){
			y >= yDrag ? yOri = 1 : yOri = 0

			$outer.trigger('moveDown', {y:y})

		}else if(y < 0){
			y <= -yDrag ? yOri = -1 : yOri = 0
			$outer.trigger('moveUp', {y:y})

		}else{
			yOri = 0
		}
	}


	if(x > -100 && x < 100){
		if(x > 0){
			x >= xDrag ? xOri = 1 : xOri = 0
			$outer.trigger('moveRight', {x:x})

		}else if(x < 0){
			x <= -xDrag ? xOri = -1 : xOri = 0
			$outer.trigger('moveLeft', {x:x})

		}else{
			xOri = 0
		}
	}
}

var touchEnd = function(event){
	if(yOri == 1) $outer.trigger('moveDownEnd', {y:y})
	else if(yOri == -1) $outer.trigger('moveUpEnd', {y:y})
	else $outer.trigger('moveAbandonY', {y:y})

	if(xOri == 1) $outer.trigger('moveRightEnd', {x:x})
	else if(xOri == -1) $outer.trigger('moveLeftEnd', {x:x})
	else $outer.trigger('moveAbandonX', {x:x})

	yOri = 0
	xOri = 0

	y0 = 0
	x0 = 0
	yStart = 0
	xStart = 0

}


var eventsSet = [
	'moveUp'
	, 'moveDown'
	, 'moveUpEnd'
	, 'moveDownEnd'
	, 'moveAbandonY'
	, 'moveLeft'
	, 'moveRight'
	, 'moveLeftEnd'
	, 'moveRightEnd'
	, 'moveAbandonX'
]

var init = function(opt){

	var opts = opt || {}

	$outer = opts.outer || $(window)
	yDrag = opts.yDrag || 0
	xDrag = opts.xDrag || 0

	$outer
		.on("touchstart", touchStart)
		.on("touchmove", touchMove)
		.on("touchend", touchEnd)

/*
	for(var i = 0;i<eventsSet.length;i++){
		$outer.on(eventsSet[i], function(e, offset){ console.log(this, e.type, offset) })
	}
	*/


}

exports.init = init;
