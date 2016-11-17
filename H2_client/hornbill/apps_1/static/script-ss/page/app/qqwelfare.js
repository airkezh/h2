fml.use('app/countdown' , function(){
	this();	
});
fml.use('app/marquee' , function(){
	this($('#tryonMarquee'),51,20,3000);
});
fml.use('sum/qqwelfare' , function(){
	this();
});
fml.define('page/app/qqwelfare' , [] , function(){});
