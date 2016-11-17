fml.use('wap/app/screen_iscroll' , function(){
	this.full();
	this.orientation();
});
fml.use('wap/app/frame9' , function(){
	this.openClosedFn();
	this.searchFn();
	this.catalog();
});
fml.use(['wap/app/search'] , function(){
	this.search.check();
});

fml.define('wap/page/common/guang_iscroll',[] ,function(){});
