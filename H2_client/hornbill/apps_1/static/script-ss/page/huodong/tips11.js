fml.define('page/huodong/tips11' , ['jquery' , 'component/storage'] , function(require, exports){
	var storage = require('component/storage');

    var waitsTime = +storage.getCookie('busy_times');
	
	if(!waitsTime){
        waitsTime = 60;
    }

    var isReload = true;

    waitTime();

    function waitTime(){
        if( waitsTime > 1){
            waitsTime --;
            $(".tips_btn").html( waitsTime  + " 秒" );
            setTimeout(waitTime,1000);
        }else{
            isReload = false;
            window.location.href = "/biz/sale/act11/";
        }
    }

    $(window).unload(function(){
        if (isReload) {
            storage.setCookie("busy_times", waitsTime, {duration : 4});
        }

    });




    

    // window.onload = function(){
    // 	if( storage.getCookie('getCookie') ){
    // 		console.log('true');
	   //  	$(".tips_btn").html( waitsTime  + " 秒" );
	   //  	waitTime();  
	   //  }
    // }
    

});
