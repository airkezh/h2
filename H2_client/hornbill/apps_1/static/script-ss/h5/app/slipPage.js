/*common*/
var swipe = require('h5/component/swipe')
var cPage = require('h5/component/page')

var move = 1
	, finish = 1
	, page
	, isA
	, isZ
	, $curr
	, $prev
	, $next
	, $page
	, $outer

var moveDrop = function(){
	console.log('moveDrop')

	$curr.attr('status', 'drop')

	!isZ && $next.attr('status', 'drop')
	!isA && $prev.attr('status', 'drop')

	page.reset()
}

var moving = function(y){
	var y2 = y.y

	if(y2 <= -100 || y2 >= 100) return;

	$curr.css({'-webkit-transform':'translate(0, ' + y2 + '%)'})

	if(!isZ)
		$next.css({'-webkit-transform':'translate(0, ' + (100 + (y2> 0 ? 0 : y2)) + '%)'})

	if(!isA)
		$prev.css({'-webkit-transform':'translate(0, ' + (-100 + (y2< 0 ? 0 : y2)) + '%)'})

}

var reset = function(){
	$page.removeAttr('status')
	isA = page.isA()
	isZ = page.isZ()
	$curr = page.getCurrentPage().page
	$prev = page.getPrevPage().page
	$next = page.getNextPage().page


	//console.log($prev, $curr, $next, isA, isZ)
}

var resizeOuter = function(auto, s){
	var height = $(window).height()

	if(auto){
		var width = $(window).width()
			, scale = s || 960/640
			, scale0 = height/width

		console.log(scale, scale0)

		if(scale < scale0) height = width*scale
		else width = height/scale 

		$outer.width(width)
	}

	$outer.height(height)
}

exports.init = function(opts){
	page = new cPage.init(opts)

	$page = page.getPages()

	$outer = $(opts.outer)

	swipe.init({outer:$outer, yDrag:10})

	resizeOuter(opts.auto, opts.scale)
	$(window).on('resize', function(){
		resizeOuter(opts.auto, opts.scale)
	})

	reset()
	$page.on('touchstart', reset)

	$(window).on('moveUp', function(e,y){
		if(finish && move) moving(y)
	})
	$(window).on('moveDown', function(e,y){
		if(move) moving(y)
	})
	$(window).on('moveUpEnd', function(){
		if(finish && move) page.goNext()
		else page.reset()
	})
	$(window).on('moveDownEnd', function(){
		if(move) page.goPrev()
	})
	$(window).on('moveAbandonY', function(){
		if(move) moveDrop()
	})
	
	return $.extend(page, {
		moveDrop : moveDrop
		, moving : moving
		, getFinish : function(){ return finish }
		, setFinish : function(f){ finish = f; return finish }
		, getMove : function(){ return move }
		, setMove : function(m){ move = m; return move }
	})
}
