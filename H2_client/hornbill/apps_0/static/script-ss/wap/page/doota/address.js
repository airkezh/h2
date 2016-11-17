fml.use('wap/app/doota/address' , function(){
	this(function(){
		/*
		var history = window.history

		if(history && history.length > 1){
			history.back(function(){
				window.location.reload()
			});	
		}else{
			window.location.href = "/address/"	
		}
		*/
		window.location.href = "/address/"	
	});
});
fml.use('wap/app/goBack' , function(){
	this();
});
fml.define('wap/page/doota/address' , [] , function(){});
