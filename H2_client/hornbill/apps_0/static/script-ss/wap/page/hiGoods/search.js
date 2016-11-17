/*common*/
require('wap/zepto/fastclick');
var $search = $('.search')
	,$mask = $('.mask')
	,$maskWrap = $('.maskWrap')
	,$inputDiv = $('.inputDiv')
	,$inputDivInput = $('.inputDiv input')
	,$inputDivI = $('.inputDiv i')
	,searchForm = $('#searchForm')
	,input = searchForm.find('input')
	,$goodsWrap = $('.goodsWrap')
	,$close = $('.close')
/*-------------搜索-----------*/
$search.on( 'click' , function(){
	$(document.querySelector('html')).addClass('win_lock')
	$mask.show();
	$maskWrap.show();
	$inputDivInput.focus();
	$inputDivInput.val(fml.vars.val);
	$goodsWrap.hide();
})
$mask.on( 'click' , function(){
	$mask.hide();
	$maskWrap.hide();
	$goodsWrap.show();
	$inputDivInput.val(fml.vars.val);
})
$inputDivI.on( 'click' , function(){
	var val = $inputDivInput.val();
	window.location.href = '/hiGoods/result/?keyword='+ encodeURI( val ) + 'category=' + encodeURI( val ) +'&r=hiGoods-index:_page_code=hiGoods-index:_page_area=search:_action=hand:tag_word=' + encodeURI( val )
})
$close.on( 'click' , function(){
	$inputDivInput.val('');
})
//submit
searchForm.on('submit', function(event) {
	event.preventDefault();
	var val = $inputDivInput.val();
	var self = $(this),
		url = self.attr('action'),
		searchWord = $.trim(input.val()) || fml.vars.searchWord;
	window.location.href = window.__get_r( url + '?keyword=' + encodeURIComponent(searchWord) + '&category=' + encodeURIComponent(searchWord) + '&search=' + searchWord, 'hiGoods-index:_page_code=hiGoods-index:_page_area=search:_action=hand:tag_word=' + encodeURI( val ) );
})