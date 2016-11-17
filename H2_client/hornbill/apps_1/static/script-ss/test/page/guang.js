fml.use(['test/app/posterWall'] , function(){
	window.console && console.timeEnd('page/guang 2 use/app/posterWall');
//	var query = this.urlHandle.getParams(window.location.href.toString());
	var query = {}
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'word_name' : query.word_name || fml.vars._guang_word_name,
		'section' : query.section || 'hot',
		'price' : query.price || 'all'
	};  
//	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(urlData , '/aj/getGoods/goods');
});
fml.define('test/page/guang' , [] , function(require,exports){
	window.console && console.time('page/guang 2 use/app/posterWall');
	window.console && console.time('page/guang 2 use/app/adPoster');
	window.console && console.time('page/guang 2 use/component/poster');
	window.console && console.time('page/guang 2 use/app/follow');
	window.console && console.time('page/guang 2 use/newShare');
	window.console && console.time('page/guang 2 app/posterWall');
});
