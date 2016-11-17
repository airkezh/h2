/*common*/
exports.init = function(opts){
	var isA = 0
		, isZ = 0
		, index = 0
		, $outer = $(opts.outer)
		, $page = $outer.find('.page')
		, $pageNewTpl = $(opts.pageNew)
		, pageSize = $page.length
		, $curr = $page.eq(0)
		, $next = $page.eq(1)
		, $prev
		, id = pageSize

	if(opts.full){
		$outer.height($(window).height())
		$(window).on('resize', function(){
			$outer.height($(window).height())
		})
	}

	reset()

    $page
        .on('onPageHide', function(){console.log('onPageHide', $(this).index())})
        .on('onPageShow', function(){console.log('onPageShow', $(this).index())})

    $curr
        .css({'-webkit-transform' : 'translate(0, 0%)'})
        .siblings().css({'-webkit-transform' : 'translate(0, 100%)'})

	var resetPage = function(){
		$page = $outer.find('.page')

		$curr = $page.eq(index)
		$prev = $page.eq(index-1)
		$next = $page.eq(index+1)

		pageSize = $page.length
	}

	var addPage = function(type){
		var $pageNew = $pageNewTpl.clone()
		var indexNew = 0

		if(pageSize == 0){
			$outer.append($pageNew)

		}else{
			if(type == 'before'){
				$curr.before($pageNew)
				indexNew = index++

			} else{
				$curr.after($pageNew)
				indexNew = ++index
			}
		}

		resetPage()
		reset();

		id++;

		return {index:indexNew, page:$pageNew, id:id};
	}

	var deletePage = function(index){
		var $p = $page.eq(index)

		$p.remove()

		resetPage()
		reset();

		goPage(index)
	}

	var goPage = function(i){
		if(i == index || i < 0 || i >= pageSize) return;

		var ori;

		if(i > index) ori = -1
		else if(i < index) ori = 1

		var $p = $page.eq(index)

		index = i

		resetPage()
		$curr.attr('status', 'drop')

		triggerPage($p, $curr)

		$p.css({'-webkit-transform' : 'translate(0, ' + ori * 100 + '%)'})

		reset()
	}

	var goNext = function(){
		if(isZ){
			$next = null 
			$curr.attr('status', 'drop')

		}else{
			index++;

			resetPage()
			$curr.attr('status', 'drop')

			triggerPage($prev, $curr)
		}

		reset()
	}

	var goPrev = function(){
		if(isA){
			$prev = null 
			$curr.attr('status', 'drop')

		}else{
			index--;

			resetPage()
			$curr.attr('status', 'drop')

			triggerPage($next, $curr)
		}

		reset()
	}

    function triggerPage($page, $curr){

		console.log('triggerPage', $page.index(), $curr.index())

        $page.attr('status', 'drop')

		$curr
			.one('webkitTransitionEnd', function(){
				$curr.trigger('onPageShow')
				$page.trigger('onPageHide')
			}) 

/*
		$page
			.one('webkitTransitionEnd', function(){
				$page.trigger('onPageHide')
			}) 
			*/

	}


	function reset(){
		;(index == 0) ? isA = 1 : isA = 0;
		;(index == pageSize - 1) ? isZ = 1 : isZ = 0;

		$curr.css({'-webkit-transform' : 'translate(0, 0%)'})

		if(!isA) $prev.css({'-webkit-transform' : 'translate(0, -100%)'})
		if(!isZ) $next.css({'-webkit-transform' : 'translate(0, 100%)'})

		$curr.addClass('cur').siblings().removeClass('cur')
	}

	return {
		isA : function(){ return isA }
		, isZ : function(){ return isZ }
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
		, reset : reset
	}

}
