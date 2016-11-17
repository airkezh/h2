fml.use(['wap/app/iscroll', 'component/urlHandle', 'wap/app/posterWalls'] , function(){
	var iscroll = this.iscroll;
	var query = this.urlHandle.getParams(window.location.href.toString());
	var posterWall = this.posterWalls;
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'word_name' : query.word_name || fml.vars._guang_word_name,
	};  
	var opts = $.extend({}, urlData, query);
	var pullDownAction = function(scroll){
		posterWall.freshPoster(opts , '/aj/getGoods/goods', scroll)
	}
	var pullUpAction = function(scroll){
		posterWall.ajaxPoster(opts , '/aj/getGoods/goods', scroll)
	}

	var mainScroll = iscroll.pull2refresh('wrapper_main', pullDownAction, pullUpAction)

});

fml.define('wap/page/welcome2',[] ,function(){});
