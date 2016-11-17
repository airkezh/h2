/*common*/
fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
	var shareTmp = this.shareTmp;
	var jquery = this.jquery;
	var posterWalls = this.posterWalls;
	var query = this.urlHandle.getParams(window.location.href.toString());
	var $search = $('.search');
	var $goods_wall = $('.goods_wall')
	var $classifyInfo = $('.classifyInfo');
	var $classifyInfoLi = $('.classifyInfo li');
	var $sortWay = $('.sortWay')
	var category = fml.vars.category;
	var style = fml.vars.style;
	// 瀑布流
	function poster(max_price,min_price){
		var urlData = { 
			'frame' : query.frame || 0
			,'page' : query.page || 0
			,'style' : fml.vars.style
			,'category' : fml.vars.category
			,'order' : 'hot'
			,'max_price' :  max_price || 0
			,'min_price' :  min_price || 0
		};
		var opts = jquery.extend({}, urlData, query)
		posterWalls(opts , '/hiGoods/aj/poster');
	}
	poster();
	if( fml.vars.order != 'hot' ){
		$sortWay.removeClass('onWay')
	}
	// 排序
	$search.on( 'click', function(){
		var $lowPrice = $('.lowPrice input');
		var $highPrice = $('.highPrice input');
		var $sortWay = $('.sortWay');
		window.location.href = '/hiGoods/classify/?category='+category + '&style='+ style + '&max_price=' +$highPrice.val() + '&min_price=' + $lowPrice.val() + '&order=';
	})
	// 选择分类
	$classifyInfoLi.on('click',function(){
		var category = fml.vars.category;
		var style = fml.vars.style;
		if( typeof($(this).data('category')) != 'undefined'  ){
			category = $(this).data('category')
		}else{
			style = $(this).data('style')
		}
		window.location.href='/hiGoods/classify/?category='+category + '&style='+ style + '&max_price=' +0 + '&min_price=' + 0 + '&order=hot';
	})
	// 热销
	$sortWay.on( 'click' , function(){
		window.location.href='/hiGoods/classify/?category='+category + '&style='+ style + '&max_price=' +0 + '&min_price=' + 0 + '&order=hot';
	})
});
fml.use('component/lazyLoad' , function(){
    this.load('.goods_pic' ,'asrc');
});
