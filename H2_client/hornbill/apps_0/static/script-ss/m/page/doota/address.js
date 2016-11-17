fml.use('m/app/doota/address' , function(){
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
fml.use('m/app/goBack' , function(){
	this();
});
fml.define('m/page/doota/address' , [] , function(){});
