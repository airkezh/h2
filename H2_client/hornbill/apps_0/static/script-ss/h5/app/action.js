/*common*/
var CONFIG_PAGES = fml.vars.CONFIG_PAGES
var actionIndex = []
var page

function go(){
	var $page = page.getCurrentPage().page 
		, pageNum = page.getCurrentPage().index 
		, actions = CONFIG_PAGES[pageNum].actions

	!actionIndex[pageNum] && (actionIndex[pageNum] = 0) 

	//console.log('go', 'pageNum:',pageNum, 'actionIndex:',actionIndex)

	if(actions.length == 0){
		actionIndex[pageNum] = 0
		page.setFinish(1)
		console.log('--------', page.getFinish())
		return;
	}

	var action = actions[actionIndex[pageNum]]
	actionIndex[pageNum]++

	var $item = $page.children('.' + action.item_id) 
	$item.addClass(action.action_id)

/*
	var ani = 0
	$item.one('webkitAnimationStart', function(){
		ani = 1
		console.log('webkitAnimationStart', $item, ani)
	})

	var t = setTimeout(function(){

	*/
	var actionNext = actions[actionIndex[pageNum]]

	if(!actionNext){
		actionIndex[pageNum]--;

	//	if(ani){
			$item.one('webkitAnimationEnd', function(){
				page.setFinish(1)
			});
	//	}else{
	//		page.setFinish(1)
	//	}

		return;
	}

	var actionNextType = actionNext.type

	if(actionNextType == 'auto'){
	//	if(ani)
			$item.one('webkitAnimationEnd', go);
	//	else
	//		go()
	
	}else if(actionNextType == 'before'){
		go();
	
	}else{
		$(window).one('moveUpEnd', go)

	}

//	}, 10)
}

function back(){
	var $page = $(this) 
		, pageNum = $page.index()
		, actions = CONFIG_PAGES[pageNum].actions

	actionIndex[pageNum] = 0 

	$.each(actions, function(k, action){
		$page.children('.' + action.item_id).removeClass(action.action_id)
	})

	console.log('back', 'pageNum:',pageNum, 'actionIndex:',actionIndex, 'currentPage',page.getCurrentPage().index)
}


exports.init = function(p){
	page = p

	page.getPages()
		.on('onPageHide', back)
		.on('onPageShow', function(){
			page.setFinish(0)
			go()
		})


	page.getCurrentPage().page.trigger('onPageShow')

	return {
		go : go
		, back : back
	}
}

