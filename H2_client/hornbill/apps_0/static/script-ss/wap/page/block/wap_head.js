/*common*/

var $ = require('wap/zepto')
	, sticky = require('wap/component/sticky')
	, shareTmp = require('wap/component/shareTmp')
	, storage = require('wap/component/storage')

/**
 * 搜索联想功能
 */
var s_pageContent = ''
	, s_searchContent = ''
	, olsSearchWords = []
	, preSearchKey = ''
	, s_searchSection = ''
	, s_cateBtn = ''
	, s_input = ''
	, search_url = ''
	, search_placeholder = ''
	, s_searchForm = ''
	, old_keywords = ''
	, s_deleteBtn = ''
	, HISTORYSEARCHLENGTH = 8


function initSearchWrap(){
	var s_wapNav = $('.wap_nav')
	sc_waoNav = s_wapNav.clone()
	sc_waoNav.addClass('wap_nav_clone').hide()
	$('body').prepend(sc_waoNav)
	sc_waoNav.wrap('<div class="search_section none_f">')

	var sc_waoNavParent = sc_waoNav.parent()
	sc_waoNavParent.append('<div class="search_content"></div>')
	s_pageContent = sc_waoNavParent.siblings().not('script')
	s_searchContent = $('.search_content')
	s_searchSection = sc_waoNavParent
	sc_waoNav.show()

	s_cateBtn = $('.js_cate_btn')
	s_input = $('.js_input')
	s_searchForm = $('.js_search_form')
	s_deleteBtn = $('.js_word_delete')

	search_url = s_input.data('url')
	search_placeholder = s_input.data('placeholder')
	old_keywords = s_input.data('keywords')
}

function setSearchConH(){
	var winH = $(window).height()
		, wapHeadH = $('.wap_head').height()

	s_searchContent.css('min-height', winH - wapHeadH)
}

function showSearchContent(is_show){
	if(is_show){
		$(document).trigger('search_start')
		s_pageContent.hide()
		s_searchSection.show().find('.js_input').focus()
		s_deleteBtn.show()
		return
	}
	s_deleteBtn.hide()
	s_searchSection.hide()
	s_pageContent.show()
	$(document).trigger('search_cancel')
}

function getHotSearch(){
	$.get('/aj/wap/welcome/Search_word_recommend', {}, function(res){
		var tpl = shareTmp('hotSearch', res)
		s_searchContent.prepend(tpl)
	}, 'json')
}

function setHistorySearch(word){
	var word_index = -1
	olsSearchWords.every(function(ele, index){
		if(ele.words == word){
			word_index = index
			return false
		}
		return true
	})
	if(word_index > -1){
		olsSearchWords.splice(word_index, 1)
	}
	olsSearchWords.unshift({'words' : word})

	var olsSearchWordsLength = olsSearchWords.length
	olsSearchWords.length = olsSearchWordsLength > HISTORYSEARCHLENGTH ? HISTORYSEARCHLENGTH : olsSearchWordsLength

	storage.set('historySearch', JSON.stringify(olsSearchWords))
}

function clearHistorySearch(){
	storage.remove('historySearch')
}

function getHistorySearch(){
	storage.get('historySearch', function(res){
		var res = JSON.parse(res)

		if(!res) return

		olsSearchWords = res
		s_searchContent.append(shareTmp('hisSearch', res))

		$('.clear_his').one('click', function(){
			clearHistorySearch()
			$('.his_box').remove()

			alert('历史记录已经清空')
		})
	})
}

function saveSL(keyword, data){
	if($.trim(keyword)) storage.setSession(keyword, data)
}

function readSL(keyword, callback){
	storage.getSession(keyword, callback)
}

function showLenovo(is_show){
	if(is_show === false){
		$('.sea_box').hide()
		$('.hot_box, .his_box').show()
	} else {
		$('.hot_box, .his_box').hide()
		$('.sea_box').show()
	}
}

function getSearchLenovo(keyword){
	readSL(keyword, function(res){
		res = JSON.parse(res)

		if(res && res.length){
			var tpl = shareTmp('wordsList', res)

			$('.sea_box').remove()
			s_searchContent.prepend(tpl)
			return
		}

		$.get('/aj/wap/search/Search_autocomplete', {searchKey: keyword}, function(res){
			var promptData = res.prompt
				, tpl = ''

			if(promptData.length == 0) return

			tpl = shareTmp('wordsList', promptData)

			$('.sea_box').remove()
			s_searchContent.prepend(tpl)

			saveSL(keyword, JSON.stringify(promptData))
		}, 'json')
	})
}


/**
 * 搜索提交
 */
function searchWords(){
	var keyword = $.trim(s_input.val())

	if(!keyword){
		if(search_url){
			return window.location.href = search_url
		}
		if(old_keywords && old_keywords != '搜索宝贝'){
			setHistorySearch(old_keywords)

			return window.location.href = '/search/?keyword=' + encodeURIComponent(old_keywords);
		}
		return false;
	} else {
		setHistorySearch(keyword)

		return window.location.href = '/search/?keyword=' + encodeURIComponent(keyword);
	}
}

function bindSubmit(){
	s_searchForm.on('submit', function(e){
		event.preventDefault();

		searchWords()
	})
}

/**
 * 搜索点击切换
 */
function rightBtnQiefan(is_search){
	if(is_search){
		setTimeout(function(){
			$('.wap_nav').removeClass('wap_nav_show')
		}, 0)
	} else {
		$('.wap_nav').addClass('wap_nav_show')
	}
}

function bindCancel(){
	s_cateBtn.on('click', function(){
		if(!$(this).hasClass('search_btn')){
			rightBtnQiefan(true)
			showSearchContent(false)
		} else {
			searchWords()
		}
	})

	s_searchContent.on('click', function(e){
		if($(e.target).hasClass('search_content')){
			rightBtnQiefan(true)
			showSearchContent(false)
		}
	})
}

function bindInput(){
	s_input.on('focus', function(e){
		$('body').scrollTop(0)
		e.stopPropagation()

		if(!$(this).parents('.wap_nav').hasClass('wap_nav_clone')) showSearchContent(true)

		s_input.attr('placeholder', $(this).data('keywords'))

		rightBtnQiefan(false)

		// 判断是否存在搜索词，如果有就显示联想词
		var keyword = $(this).val()
		keyword && getSearchLenovo(keyword)
	}).on('blur', function(e){
		e.stopPropagation()

		s_input.eq(1).val(s_input.eq(0).val())
		s_input.attr('placeholder', $(this).data('placeholder'))
	}).on('input', function(){
		var keyword = $(this).val()

		if(!keyword){
			return showLenovo(false)
		} else {
			showLenovo()
		}
		if(keyword == preSearchKey) return

		preSearchKey = keyword

		getSearchLenovo(keyword)
	}).on('click', function(e){
		e.stopPropagation()
	})
}

function bindDeleteBtn(){
	s_deleteBtn.on('click', function(){
		s_input.val('').focus().trigger('input')
	})
}

function bindSearchWord(){
	s_searchContent.on('click', '.js_search_item', function(e){
		setHistorySearch($(this).html())
	})
}

/**
 * 读取im的数量
 */
var s_imIcon = $('.js_im_btn .im_icon')
	, IMDELAY = 10000

function readImNums(){
	if(Meilishuo.config.user_id == 0) return

	$.get('/aj/im/im/open_msg_num', {}, function(res){
		if(res.data){
			var nums = res.data.msg_num
			s_imIcon.html('')
			if(nums){
				nums = nums > 99 ? 99 : nums
				s_imIcon.append('<span>' + nums + '</span>')
			}
		}

		setTimeout(function(){
			readImNums()
		}, IMDELAY)
	}, 'json')
}

function bindImLogin(){
	$('.js_im_btn').on('click', function(e){
		if(Meilishuo.config.user_id == 0){
			e.preventDefault()
			window.location.href = '/user/login'
			return false
		}
	})
}

(function(){
	// 头部吸顶
	if(!fml.vars.hide_sticky){
		sticky.init('.wap_head', {'infinity': true})
	}

	// 初始化隐藏搜索栏
	initSearchWrap()

	// 设置搜索栏高度
	setSearchConH()
	// 获取热搜和历史搜索
	getHotSearch()
	getHistorySearch()

	// 点击、搜索提交、事件绑定
	bindInput()
	bindCancel()
	bindSubmit()
	bindSearchWord()
	bindDeleteBtn()

	bindImLogin()
	readImNums()
})();

