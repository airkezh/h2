/*common*/
var transition = require('cooper/component/transition')
var dirSet = {
	y:[0,1]
	, x:[1,0]
	, '-x':[-1,0]
}

exports.init = function(opts){
	var isA = 0
		, isZ = 0
		, isY = 0

		, index = 0
		, id = 0

		, direction = opts.direction || 'y'
		, dir = dirSet[direction] 

		, $pageNewTpl = $(opts.pageNew || getTpl(opts.page))

		, $outer = $(opts.outer)
		, $page
		, $curr
		, $next
		, $prev
		, pageSize

	function setAnimate(){
		$page.removeAttr('status')
	}

	function clearAnimate(){
		$curr.attr('status', 'move')
		$prev.attr('status', 'move')
		$next.attr('status', 'move')
	}

	function transitionFn(transType, dir, type, y){
		var style = {}
		var trans = (transition[transType] || transition['translate'])(dir, type, y)

		for(var k in trans){
			!style[k] && (style[k] = [])
			style[k].push(trans[k])
		}

		if(opts.transitionExt){
			var transExt = opts.transitionExt(dir, type, y)

			for(var k in transExt){
				!style[k] && (style[k] = [])
				style[k].push(transExt[k])
			}
		}

		var styles = {}
		style['transform'] && (styles['-webkit-transform'] = style['transform'].join(' '))
		style['opacity'] && (styles['opacity'] = style['opacity'])

		return styles 

	}

	function transform($p, type, y){
		var style = (opts.transition || transitionFn($p.attr('transition')||'translateY', dir, type, y||0))
		$p.css(style)
	}


	var initPage = function(i){

		$page = $outer.find(opts.page)
		pageSize = $page.length

		if(i != undefined) index = i

		resetAZ()
		resetCPN()
	}

	if(opts.full){
		$outer.height($(window).height())
		$(window).on('resize', function(){
			$outer.height($(window).height())
		})
	}

	initPage()

	var addPage = function(type, isReset){
		var $pageNew = $pageNewTpl.clone()
		var indexNew = 0

		if(pageSize == 0){
			$outer.append($pageNew)
			transform($pageNew, 'curr')
			id = 1

		}else{
			if(type == 'before'){
				$curr.before($pageNew)
				indexNew = index++

			}else if(type == 'end'){
				$curr.parent().append($pageNew)

			} else{
				$curr.after($pageNew)
				indexNew = ++index
			}

			transform($pageNew, 'next')
			id++
		}

		pageSize++

		initPage()

		if(isReset != false) resetPage();

		return {index:indexNew, page:$pageNew, id:id};
	}

	var deletePage = function(index){
		var $p = $page.eq(index)

		$p.remove()
		
		pageSize--

		initPage()

		resetPage();

		goPage(index)
	}

	var goPage = function(i, isReset){
		//if( i < 0 || i >= pageSize || i == index){
		if( i < 0 || i >= pageSize ){
			return;
		}

		var $p1 = $page.eq(i)
					.attr('shown', 2)
					.attr('status', 'move')

		if(i > index) transform($p1, 'next')
		else if(i < index) transform($p1, 'prev')

		var t = setTimeout(function(){
			setAnimate()

			if(i > index) transform($curr, 'prev')
			else if(i < index) transform($curr, 'next')

			index = i
			resetAZ()
			resetCPN()

			if(isReset != false) resetPage()

		}, 100)
	}

	var goNext = function(isReset){
		setAnimate()

		if(!isZ){
			index++;
			resetAZ()
			resetCPN()
		}
		
		if(isReset != false) resetPage()
	}

	var goPrev = function(isReset){
		setAnimate()

		if(!isA){
			index--;
			resetAZ()
			resetCPN()
		}

		if(isReset != false) resetPage()
	}

	function resetAZ(){
		;(index == 0) ? isA = 1 : isA = 0;
		;(index == pageSize - 1) ? isZ = 1 : isZ = 0;
		;(index == pageSize - 2) ? isY = 1 : isY = 0;
	}

	function resetCPN(){
		$curr && $curr[0] && triggerPage.call($curr)

		$curr = $page.eq(index)
		$next = (index == pageSize-1 ? $('') : $curr.next())
		$prev = (index == 0 ? $('') : $curr.prev())

		$page.removeClass('cur prev next')
		$curr.addClass('cur')
		$prev.addClass('prev')
		$next.addClass('next')

		triggerPage.call($curr, true)
	}

	function triggerPage(current){
		var $p = $(this)
		/*
		if(current)
			trigger.call($p)
		else
		*/
			$p.one('webkitTransitionEnd', trigger)
	}

	function trigger(){
		var $p = $(this)

		if($p.index() == index){
			console.log('pageShow', $p.index())
			$p.trigger('pageShow')
				.attr('shown', 1)

		}else{
			console.log('pageHide', $p.index())
			$p.trigger('pageHide')
				.attr('shown', 0)
		}
	}

	function resetPage(){
		transform($curr, 'curr')
		transform($prev, 'prev')
		transform($next, 'next')
	}

	return {
		getIsA : function(){ return isA }
		, getIsZ : function(){ return isZ }
		, getIsY : function(){ return isY }
		, getDir : function(){ return dir }
		, getDirection : function(){ return direction }
		, getPages : function(){ return $page }
		, getPageNum : function(){ return index }
		, getPageSize : function(){ return pageSize }
		, getCurrentPage : function(){ return {page:$curr,index:$curr.index()} }
		, getNextPage : function(){ return {page:$next,index:$next ? $next.index() : -1} }
		, getPrevPage : function(){ return {page:$prev,index:$prev ? $prev.index() : -1} }
		, getPage : function(index){return $page.eq(index)} 
		, goNext : goNext
		, goPrev : goPrev
		, goPage : goPage
		, addPage : addPage
		, deletePage : deletePage
		, resetPage : resetPage
		, initPage : initPage
		, transform : transform
		, setAnimate : setAnimate
		, clearAnimate : clearAnimate
	}

}


function getTpl(tag){
	if(/\./.test(tag)) return '<div class="' + tag.replace('.', '') + '"></div>';

	else if(/\#/.test(tag)) return '<div id="' + tag.replace('#', '') + '"></div>';

	else return '<' + tag + '></' + tag + '>';
}


