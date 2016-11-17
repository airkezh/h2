/*common*/
require('wap/zepto')
require('wap/zepto/touch')

var RenderTpl       = require('wap/component/shareTmp')
var UrlProcessor    = require('wap/component/urlHandle')

var $wd             = $(window)
var $s              = $('.search')
var $f              = $('#form')
var $sm             = $('#submit')
var $cc             = $('#cancel')
var $ct             = $('.js-search-r')
var $i              = $f.find('#input')
var $cl             = $f.find('#clear')
var $awl            = $('#associated_word_list')
var $sw             = $('.section_wrap')
var $m50            = $('.m50')      // 撑起底部导航的那块砖~
var $nav            = $('.nav-c')
var pt              = $s.css('position')
var dumbInput       = $('#dumb-input')[ 0 ]

var SEARCH_HEIGHT   = $wd.height() - (+($('html').css('fontSize')).slice(0, -2)*.1)
var PATH            = '/sq/search/?'
var historyWord     = JSON.parse(localStorage.getItem('historyWord')) || []
var url             = '/aj/sq/interfaces/associated_word'
var keyWord         = fml.vars.keyWord
var windowScrollTop = 0
var flag1           = true
var flag2           = true

var EventHandler    = {
	submit : search,
	cancel : function (){
		$cc.hide()
		$ct.show()
		$awl.empty()
		$m50.show()
		$nav.show()
		$sw.show()
		$wd.scrollTop(windowScrollTop)
		restoreStyles()
		flag2 = true

		if(keyWord && keyWord != 'undefined'){
			$i.val(keyWord)
		}
	},
	clear  : function (){
		$i.val('')
		$cl.hide()
		$sm.hide()
		$cc.show()
		$awl.empty()
		/** hack
		 *  @desc: 点击清楚按钮输入框不会失去焦点，这里手动让它失去
		 *  @target: 魅族4，Galaxy S4
		 */
		$i.blur()	

		$i.focus()
	},
	jump   : function (){
		var $m = this
		var keyWord = $m.data('kw')

		if(keyWord){
			storageSearchWord(keyWord)
			location.href = PATH + 'key_word=' + encodeURIComponent(keyWord)
		}
	}
}

function search(e){
	e && e.preventDefault()

	var v = $.trim( $i.val() )

	if(v){
		storageSearchWord(v)
		location.href = PATH + 'key_word=' + encodeURIComponent(v)
	}else{
		$i.val('')
	}
}

function forBrevityOnly($a, $b, $c, d){
	$a.hide()
	if(d || $i.val() ){
		$b.show()
		$c.hide()
	}else{
		$b.hide()
		$c.show()
	}
}

function clearInput(){
	$i.val('')
	forBrevityOnly($cc, $sm, $ct)
	$awl.empty()
	$cl.hide()
	$m50.show()
	$nav.show()
	$sw.show()
	$wd.scrollTop(windowScrollTop)
}

function changeSyles(){
	$s.css({
		//height: 'calc(100% - .15rem)' 有支持性问题
		height: SEARCH_HEIGHT + 'px'
	})
	$awl.css({
		height: '100%'
	})

	if(pt == 'static' || pt == 'relative'){
		$s.css({
			position: 'fixed',
			top: 0,
			left: 0
		})
	}
}

function restoreStyles(){
	$s.css({
		height: 'auto'
	})
	$awl.css({
		height: 0
	})

	if(pt == 'static' || pt == 'relative'){
		$s.css('position', pt)
	}
}

function showRecommendWord(){
	var renderData = {
		hotWord: fml.vars.hotWord, 
		historyWord: historyWord
	}

	var tpl = RenderTpl('recommend_word_tpl', renderData)
	$awl.empty().append(tpl)
}

// 收索词存储为历史浏览记录
function storageSearchWord(kw){
	historyWord = historyWord.filter(function (v, k){
		return v != kw
	})

	historyWord.unshift(kw)

	var wordNum = historyWord.length

	while(wordNum > 10){
		historyWord.pop()
		wordNum --
	}

	localStorage.setItem('historyWord', JSON.stringify(historyWord))
}

function getData(param){
	$.get(url, param, function (res){
		if(res.count > 0 && $i.val() != ''){
			var tpl = RenderTpl('associated_word_tpl', res.associative_word)
			$awl.empty().append(tpl)
		}
		flag1 = true
	}, 'json')
}

function hackInputFocusBug() {
	setTimeout( function() {
		dumbInput.focus()
		setTimeout( function() {
			dumbInput.blur()
		}, 0 )
	}, 0 )
}

if(keyWord && keyWord != 'undefined'){
	var $filter    = $('.filter')
	var $filterCtn = $filter.find('#filter-content')
	var $price     = $('.price')
	var $service   = $('.service')
	var $discount  = $('.discount')
	var urlParams    = UrlProcessor.getParams(location.href)

	showHistoryOption()

	EventHandler.showFilterPanel =  function (){

		$filter.show()
		setTimeout(function (){
			$filterCtn.css('width', '5.14rem')
			$filter.css('background-color', 'rgba(0,0,0,.7)')
		}, 0)
	}

	EventHandler.filterItemSelect = function (){
		var $me = this
		var S   = 'selected'

		if($me.hasClass('price')){
			if($me.hasClass(S)){
				$me.removeClass(S)
			}else{
				$price.removeClass(S)
				$me.addClass(S)
			}
		}else{
			$me.toggleClass(S)
		}
	}

	EventHandler.filterCancel = function (){
		$filterCtn.css('width', 0)
		$filter.css('background-color', 'rgba(0,0,0,0)')
		setTimeout(function (){
			$filter.hide()
		}, 800)
	}

	EventHandler.gotoFilter = function (){
		/** hack
		 *  @desc: 点击输入框padding唤起键盘bug
		 *  @target: Lenovo A708t
		 */
		hackInputFocusBug()

		var $selected    = $filter.find('.selected')
		var filterParams = {}

		if($selected && $selected.length){
			$selected.each(function (index, item){
				var $i    = $(item)
				var name  = $i.data('name')
				var value = $i.data('value')

				filterParams[name] || (filterParams[name] = [])
				filterParams[name].push(value)
			})

			for(var name in filterParams){
				filterParams[name] = filterParams[name].join(',')
			}

			urlParams.filter_params = JSON.stringify(filterParams)
			location.href = PATH + UrlProcessor.http_build_query(urlParams)
		}else{
			EventHandler.filterCancel()
		}
	}

	function showHistoryOption(){
		var filterParams = urlParams.filter_params

		if(filterParams){
			filterParams = JSON.parse(filterParams)
			for(var name in filterParams){
				var arr = filterParams[name].split(',')
				arr.forEach(function (v){
					$('[data-value="'+v+'"]').addClass('selected')
				})
			}
		}
	}
}

$wd.on('scroll', function (e){
	if(flag2){
		windowScrollTop = $wd.scrollTop()
	}
})

$i.on('focus', function (){
	changeSyles()
	var v = $i.val()

	flag2 = false
	$ct.hide()
	$m50.hide()
	$nav.hide()
	$sw.hide()

	if(v){
		$sm.show()
		$cl.show()

		getData({key_word: v})
	}else{
		$sm.hide()
		$cc.show()
		showRecommendWord()
	}
}).on('input', function (){ 
	var v = $i.val()

	if(v){
		forBrevityOnly($cc, $sm, $ct, true)

		if(flag1){
			var param = { key_word: v }

			flag1 = false
			getData(param)
		}
		$cl.show()
	}else{
		$cl.hide()
		forBrevityOnly($sm, $ct, $cc, false)
		$awl.empty()
		showRecommendWord()
	}

})

$f.on('submit', search)

$('body').on('tap', function (e){
	var $t = $(e.target)
	var fn = $t.data('action')
	var _e = EventHandler[fn]

	_e && _e.call($t)
})
