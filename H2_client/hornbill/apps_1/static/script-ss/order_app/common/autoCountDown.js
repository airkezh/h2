fml.define('order_app/common/autoCountDown' ,["order_app/common/zepto"] , function(require,exports){
    var $ = require("order_app/common/zepto");
    /**
     * 倒计时，根据服务器时间和结束时间计算模拟倒计时
     * @param ele 整个节点标签
     * @param serverTime 服务器时间戳
     * @param finishTime  结束时间戳
     * @param formatStyle 倒计时的格式化样式
     */

    var countdown = function(ele,serverTime,finishTime,formatStyle){
       console.log(ele,serverTime,finishTime);

//        return;
        //计算秒
        var seconds =  finishTime - serverTime;
        seconds = Math.round(seconds);
        console.log(seconds);
        if(seconds>0){
            //timedown

          timedown(ele,seconds,formatStyle);
        }

    }

    function timedown(ele,seconds,formatStyle){
       render(ele,formatDate(seconds));
       var timer = setInterval(function(){
            seconds--;
           // console.log(seconds);
            if(seconds<=0){
                clearInterval(timer);
            }
            render(ele,formatDate(seconds));
        },1000);
    }
    function formatDate(s){
        var hour = Math.floor(s/3600),
            min = Math.floor(s/60)%60,
            sec = s % 60,
            day = parseInt(hour /24);
            if(day>0){
                hour = hour - 24*day;
            }

        return [day,hour,min,sec];
    }


    function render(ele,str){
        //渲染日期   str = [day,hour,min,sec];
        var rest = "";
        if(str[0]>0){
            rest = str[0]+"天";
        }
        if(str[1]>0){
            rest += str[1]+"时";
        }
        if(str[2]>0){
            rest += str[2]+ "分";
        }
        rest += str[3] + "秒";

        $(ele).find(".replaceWrap").text(rest);
    }
    return countdown;
});
