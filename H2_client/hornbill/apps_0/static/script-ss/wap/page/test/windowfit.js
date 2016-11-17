fml.use(['wap/app/windowfit', 'wap/app/wapWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var doFresh = this.wapWalls.freshWall;
	var doAjax = this.wapWalls.ajaxWall;
	var windowfit = this.windowfit;
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'word_name' : query.word_name || fml.vars._guang_word_name,
	};  
	var opts = $.extend({}, urlData, query);
	windowfit.windowfit({
		'freshFn' : function(done){
			doFresh(opts , '/aj/getGoods/goods', done)
		},
		'ajaxFn' : function(done){
			doAjax(opts , '/aj/getGoods/goods', done);
		}
	});
});

fml.define('wap/page/test/windowfit',[] ,function(){});
