fml.use('app/like' , function(){
	this.posterLike('.user_module' , '.poster_likes');
});
fml.use('app/forward' , function(){
	this.posterForward('.user_module' , '.poster_forward');
});
fml.use(['jquery', 'app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'shop_id' : fml.vars.shop_id
	};
	var opts = this.jquery.extend({}, urlData, query);
	if(opts.current_date){
		this.posterWalls(opts , '/aj/shop/new_goods_list');
	} else {
		this.posterWalls(opts , '/aj/shop_list/goods');
	}
});

fml.define('page/shop_new' , [] , function(require , exports){});
