/*common*/
require('wap/zepto')

var urlHandler = require('wap/component/urlHandle')
var Alert      = require('wap/ui/alert')

var $B         = $('body')
var $starList  = $('.star_list')
var $goodsList = $('.goods')
var $comprehensive_comment_list = $goodsList.find('.comprehensive_comment_list')
var goodsListLength = $goodsList.length
var SELECTED = 'selected'
var starList = forBrevityOnly(5)
var canClick = true

// 需提交的评价数据
var data = { 
	shopComments: {
		accord: 5,
		attitude: 5,
		fast: 5,
		quality: 5
	},
	goodsComments: [],
	order_id: urlHandler.getParams(location.href).order_id 
}
var EventHandler = {
	giveMeStar : function (){
		var $me      = $(this)
		var $parent  = $me.parent()
		var dataName = $parent.attr('id')
		var rowNum   = $parent.data('index')
		var colNum   = $me.index() 
		var $stars   = starList[rowNum]

		$stars.removeClass(SELECTED)
		for(var i = 0; i < colNum; i++){
			$stars.eq(i).addClass(SELECTED)
		}

		// 写入数据
		data.shopComments[dataName] = colNum
	},

	submitComment: function (){
		var comprehensive_comment_level = [5,3,1] // 好评 5 中评 3 差评 1
		var comprehensive_comment_index = 0

		canClick = false
		for(var i = 0; i < goodsListLength; i++){
			var $goods = $goodsList.eq(i)
			comprehensive_comment_index = $goods.find('.selected').index() - 1
			data.goodsComments.push({
				level : comprehensive_comment_level[comprehensive_comment_index],
				mid : $goods.data('mid'),
				content : $goods.find('.text_area').val()
			})
		}

		$.post('/aj/sq/interfaces/comment_submit', data, commentCbk, 'json')
	},

	comprehensiveComment: function (){
		var $me = $(this)
		var $siblings = $me.siblings('.comprehensive')

		if($me.hasClass(SELECTED)) return

		$siblings.removeClass(SELECTED)
		$me.addClass(SELECTED)
	}
}

$B.on('click', function (e){
	var target = e.target
	var action = $(target).data('action')
	var actionEvent = EventHandler[action]

	if(actionEvent){
		actionEvent.call(target)
	}
})

// style hack
$('.sec3').css({
	'padding-top' : $('body').height() - $('.section_wrap').height() + 'px'
})

function leaveAndNotTurnBack (){
	location.replace('/sq/user/?orderStatus=0')
}

function myAlert(ct, cbk){
	return new Alert({ 
		content: ct,
		onSure : cbk
	})
}

function commentCbk (res){
	var txt = "评价成功！"

	if(res.error_code != 0){
		txt = res.message
	}

	canClick = true
	myAlert(txt, leaveAndNotTurnBack)
}

function forBrevityOnly (counter){
	var result = []

	for(var i = 0; i < counter; i++){
		result.push( $starList.eq(i).find('.star') )
	}
	return result
}