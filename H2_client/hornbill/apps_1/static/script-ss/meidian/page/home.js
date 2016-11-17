/*common*/
var touch = require('wap/zepto/touch')
	, shop_id = $('.store_cont').attr('shop_id')
	, category_id = fml.vars.poster.categoryId

$('.moreHide').on('tap',function(){
	$('.tab_list').hide();
	$('.tab_cont').show();
});
$('.moreShow').on('tap',function () {
	$('.tab_cont').hide();
	$('.tab_list').show();
});

fml.use(['md/app/posterWalls'] , function(){
	var posterWall = this.posterWalls;
	var urlData = { 'page' : 1 }

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/goods/list?shop_id=' + shop_id + '&category_id=' + category_id)
	}
	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster(true);
});


