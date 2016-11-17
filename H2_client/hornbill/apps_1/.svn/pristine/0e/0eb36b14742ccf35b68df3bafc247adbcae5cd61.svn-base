fml.define('app/topBanner2000' ,['jquery'] ,function(require, exports){
    var $ = require('jquery');
    $(function(){
        var _intervalTimer=null;
        function tuanMove(){
            var _li=$('.mlsslide_img li');
            var _index;
            var nextLi;
            var _tit=$('.mlsslide_tit li');
            _index=$('.mlsslide_img li:visible').index();
            if(_index<_li.length-1){
                nextLi=_li.eq(_index+1);
            }else{
                nextLi=_li.eq(0);
            }
            _li.eq(_index).stop().animate({opacity:0},1000,function(){
                $(this).hide();
            });
            nextLi.css('background-image','url('+nextLi.attr("murl")+')');
            nextLi.show().stop().animate({opacity:1},1000);
            _tit.removeClass('slide_tit_active').eq(nextLi.index()).addClass('slide_tit_active');
        }

        /*定时播放*/
        function startTimer(){
            clearInterval(_intervalTimer);
            _intervalTimer=setInterval(function(){
                tuanMove();
            },5000);
        }

        /*鼠标覆盖/移开列表标题*/
        $('.mlsslide_tit li').hover(function(){
            var _titThis = $(this);
            var _index = _titThis.index();
            clearInterval(_intervalTimer);
            _titThis.addClass('slide_tit_active').siblings().removeClass('slide_tit_active');
            $('.mlsslide_img li').eq(_index).css('background-image','url('+$('.mlsslide_img li').eq(_index).attr("murl")+')');  
            $('.mlsslide_img li').eq(_index).stop().animate({'opacity':'1'},1000).show();
            $('.mlsslide_img li').eq(_index).siblings().stop().animate({'opacity':0},1000,function(){
                $(this).hide();
            });
        },function(){
            startTimer();
        })

        /*鼠标覆盖/移开图片标题*/
        $('.mlsslide_img').hover(function(){
            clearInterval(_intervalTimer);
        },function(){
            startTimer();
        })

        /*判断页面是否需要加载动画效果*/
        if(('.mlsslide_img li').length==1){
            $('.mlsslide_tit').hide();
            $('mlsslide_shade').hide();
        }else{
            startTimer();
        }


    })
});