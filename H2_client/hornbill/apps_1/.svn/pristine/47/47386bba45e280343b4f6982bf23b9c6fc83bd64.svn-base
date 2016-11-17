fml.define('wap/app/lark/shake' , ['wap/zepto'] , function(require , exports){

    return function (cla,clb){
        var _class = cla;
        if (window.DeviceMotionEvent) {  
            window.addEventListener('devicemotion',deviceMotionS, false); 
       
        }
        var ltime=0;
        var arr = [];
        window.cleart = 0;
        var started = false;
        function deviceMotionS(e){
            var acc=e.accelerationIncludingGravity;
            var ctime=new Date().getTime();
            if (window.stopMark) {
                return;
            };
            if((ctime-ltime)>10){
                ltime=ctime;
                var x=acc.x,
                    y=acc.y,
                    z=acc.z;
                var c=(Math.sqrt(x*x+y*y+z*z)*10-98)/3; 
                if(c > 20|| started){
                    started = true;
                    arr.push(c);
                }else{
                    arr = [];
                }             
                 
                if(arr.length >= 10){
                    window.stopMark = 1;
                   $(_class).addClass('shake-act');
                   window.arr = arr;
                   if(window.cleart){
                    clearTimeout(window.tt);
                    window.cleart = 0;
                   }
                   window.cleart=setTimeout(function(){
                        clb(Math.max.apply(null,window.arr));
                        // shakesuccess(1);

                    },0); 
                    started = false;
                    arr = [];  
                }
                /*===ajax开始====*/
                function shakesuccess(s){
                    $.post("/aj/tuan/ajlist?frame=0",null,function(data){
                        if(s==1){
                            alert("好棒，摇到了哟！");
                        }else{
                            alert("sorry");
                        }
                    },'json');   


                }
                
                 /*======ajax结束========*/

        }
    }
}
});


