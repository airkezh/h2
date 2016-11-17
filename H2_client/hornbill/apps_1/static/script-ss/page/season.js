fml.use('app/countdown' , function(){
	this();	
});
fml.use('app/calendar' , function(){
	this.tomorrow();	
});
fml.define('page/season', [], function(require, exports){});
