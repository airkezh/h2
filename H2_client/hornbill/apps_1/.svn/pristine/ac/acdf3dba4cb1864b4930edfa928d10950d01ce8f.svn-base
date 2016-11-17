/*common*/
require('wap/zepto');

var shake =  function (fn){
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
                //return;
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

					fn(Math.max.apply(null,window.arr));

                    started = false;
                    arr = [];  
                }

        }
    }
};

exports.shake = shake ;











