/*common*/
var swipe = require('h5/component/swipe')

var $outer

function set($o){
	$outer = $o
	swipe.init({outer:$outer})
}

function get(){
	return $outer
}


function moving(e,offset){
	var y2 = offset.y
		, x2 = offset.x

	if(y2 <= -100 || y2 >= 100 || x2 <= -100 || x2 >= 100) return;

	$outer.css({'-webkit-transform':'translate(' + x2 + '%, ' + y2 + '%) translateZ(0)'})
}
function flyLeft(e,offset){
	var y2 = offset.y*10
		, x2 = -120 

	$outer
		.attr('status', 'drop')
		.css({'-webkit-transform':'translate(' + x2 + '%, ' + y2 + '%) translateZ(0)'})
}

function flyRight(e,offset){
	var y2 = offset.y*10
		, x2 = 120 

	$outer
		.attr('status', 'drop')
		.css({'-webkit-transform':'translate(' + x2 + '%, ' + y2 + '%) translateZ(0)'})
}

return {
	moving : function(fn){
		$outer.on('move', function(e,offset){
			moving(e,offset)	
			fn && fn(e,offset)
		})
	}
	, flyLeft:function(cbk){
		$outer.on('moveLeftEnd', function(e,offset){
			flyLeft(e,offset)	
			cbk && cbk()
		})
	}
	, flyRight:function(cbk){
		$outer.on('moveRightEnd', function(e,offset){
			flyRight(e,offset)	
			cbk && cbk()
		})
	}
	, set : set
	, get : get
}
