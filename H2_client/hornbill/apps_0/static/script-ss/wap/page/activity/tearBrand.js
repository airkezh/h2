/*common*/
var $ = require('wap/zepto')
	,swipe = require('cooper/component/swipe');
       var bai = [0,40,80,120,160,200];
        var blackTouMingDu = [0,.20,.60,.60,.60,.50];
        var blackWidth = [30,30,30,30,15,15];
        var rotate = [0,16,20,25,30,35,40];
        var height = [0,104,106,110,116,122]
        // 接口数据
        var times = 0;  //表示已经完成几步了
        var flag = false;  //true表示可以撕，false不可以撕
        // 接口数据
        var _flag = flag
        window.onload = function(){
            var $content = $(".content")
                ,$coverBlack = $(".cover_black")
                ,$coverLeft =  $(".cover_left")
                ,$cover = $(".cover")
                ,music = $('audio')[0];
            new swipe.init({outer:$content});
            move_next(times);
            $content.on("moveRightEnd",function(){
                if(times==5){return;};
                back_before(times);
                music.play();
            });
            $content.on("moveLeftEnd",function(){
                if(times==5){return;};
                back_before(times);
                music.play();
            });
            function move_next(status){
                $coverBlack.css({width:blackWidth[status]+"%"});
                $coverBlack.css({background:"-webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, " + blackTouMingDu[status] + ")), to(rgba(0,0,0,0)))"});
                $coverLeft.css({"-webkit-transform":"rotate(-"+rotate[status]+"deg)","height":+height[status]+"%"})
                $cover.css({"width":bai[status]+"%"}); 
                $cover.on('webkitTransitionEnd', function(){
                    if(times == 5){
                      $coverLeft.hide();
                      return;
                    }
                });
            }
            function back_before(num){
                if(_flag){ 
                    _flag = false;
                    times = ++num;
                }else{
                    setTimeout(function(){
                        $cover.css({"width": bai[times]+"%"});
                    },200);   
                    num = times + 1;
                }  
                move_next(num);
            }
        }
