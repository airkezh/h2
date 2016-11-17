fml.define('app/marquee' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	return function(o,lh,speed,delay){
		var t;
		var p = false; 
		o = $(o)
		o.html(o.html()+o.html()); 
		o.hover(function(){p=true},function(){p=false});
		o.scrollTop(0);
		function start(){
			t=setInterval(scrolling,speed);
			if(!p){ o.scrollTop(o.scrollTop()+1);} 
		}    
		function scrolling(){ 
			if(o.scrollTop()%lh!=0){
				o.scrollTop(o.scrollTop()+1); 
				if(o.scrollTop()>=o[0].scrollHeight/2) o.scrollTop(0);
			}else{ 
				clearInterval(t);
				setTimeout(start,delay); 
			}
		}    
		setTimeout(start,delay);
	}
});
