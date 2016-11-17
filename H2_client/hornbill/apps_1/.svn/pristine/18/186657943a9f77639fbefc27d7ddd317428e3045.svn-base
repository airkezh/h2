/*common*/
var IsTouch = "ontouchend" in document
var START_EVENT = IsTouch ? 'touchstart' : 'mousedown'
var MOVE_EVENT = IsTouch ? 'touchmove' : 'mousemove'
var END_EVENT = IsTouch ? 'touchend' : 'mouseup'

return IsTouch 
	? function(event) {
		var e, touches;
		touches = event.touches && (event.touches.length ? event.touches : [event]);
		e = (event.changedTouches && event.changedTouches[0]) || (event.originalEvent && event.originalEvent.changedTouches && event.originalEvent.changedTouches[0]) || touches[0].originalEvent || touches[0];
		return {
			"x": e.clientX,
			"y": e.clientY
		};
	}
	: function(event) {
		var e;
		e = event;
		return {
			"x": e.clientX,
			"y": e.clientY
		};
	}
