fml.define('wap/page/activity/good_time',['wap/zepto','wap/zepto/touch'] ,function(){

   //window.scrollTo(0, 1);

    slide();
    function slide() {
        var outer = $('.banner-slider')
            , banner = outer.children('.banner-slider-wrap').children('li')
            , point = outer.children('.banner-slider-point').children('li')

            , page = banner.length
            , x = 0
            , startX = 0
            , startY
            , xx = 0
            , xp = 0
            , xn = 0
            , bx = banner.eq(0)
            , bp = banner.eq(1)
            , bn = banner.eq(-1)
            , index = 0
            , ori = 0
            , outer_width
            , timerRoll
            , timerInit
            , time_space = 5000

        if (fml.vars.time_space) {
            time_space = fml.vars.time_space;
        }

        var touchStart = function(event){

            console.log(bx.css("webkitTransform"));
            banner.attr('status', 'move')

            clearTimeout(timerRoll)
            clearTimeout(timerInit)

            event.preventDefault();
            if (!event.touches.length)
                return;
            var touch = event.touches[0];
            outer_width = outer.width()
            startX = touch.pageX - x;
            startY = touch.pageY;
        };

        var touchMove = function(event){
            if (!event.touches.length)
                return;
            var touch = event.touches[0];
            if (touch.pageY - startY > 0 && Math.abs(touch.pageX - startX) < 10) {
                return;
            }
            event.preventDefault();


            x = touch.pageX - startX
            xx = x / outer_width * 100;

            xx >= 40 ? ori = 1 : (xx <= -40 ? ori = -1 : ori = 0)

            if(xx <= -100 || xx >= 100)
                return;

            xp = 100 + xx
            xn = -100 + xx

            bx.css({'-webkit-transform' : 'translate(' + xx + '%, 0)'})
            bp.css({'-webkit-transform' : 'translate(' + xp + '%, 0)'})
            bn.css({'-webkit-transform' : 'translate(' + xn + '%, 0)'})
            console.log(touch.pageY);
        }

        var touchEnd = function(event){

            if(x == xx){
                var href = $(this).attr('ahref')
                if(href){
                    window.location.href = href
                    return;
                }
            }else{
                x = 0
                startX = 0
                xx = 0
            }

            act()
            //timerInit = setTimeout(rollBanner, time_space)
            console.log(bx.css("webkitTransform"));
        }

        var act = function(){
            if(ori == 1){
                index--;
                if(index < 0){
                    index = page - 1
                    bp = banner.eq(0)
                }else{
                    bp = banner.eq(index+1)
                }

                bx = banner.eq(index)
                bn = banner.eq(index-1)

                bp.attr('status', 'drop')

            }else if(ori == -1){
                index++;
                if(index > page - 1){
                    index = 0
                    bp = banner.eq(1)
                }else if(index > page - 2){
                    bp = banner.eq(0)
                }else{
                    bp = banner.eq(index+1)
                }

                bx = banner.eq(index)
                bn = banner.eq(index-1)

                bn.attr('status', 'drop')

            }else{
                bp.attr('status', 'drop')
                bn.attr('status', 'drop')
            }

            bx.attr('status', 'drop')

            reset()

        }
        var reset = function(){
            bx.css({'-webkit-transform' : 'translate(0%, 0)'})
            bp.css({'-webkit-transform' : 'translate(100%, 0)'})
            bn.css({'-webkit-transform' : 'translate(-100%, 0)'})

            point.removeClass('curr').eq(index).addClass('curr')
        }

        var rollBanner = function(){
            ori = -1
            banner.attr('status', 'move')
            act()
            timerRoll = setTimeout(arguments.callee, time_space)
        }

        var init = function(){
            for(var i = 0; i < page; i++){
                banner.eq(i).css({ 'left' : -i * 100 + '%' })
            }
            banner.css({'-webkit-transform' : 'translate(100%, 0)'})

            reset()

            banner
                .on("touchstart", touchStart)
                .on("touchmove", touchMove)
                .on("touchend", touchEnd)

            //timerInit = setTimeout(rollBanner, time_space)

        }

        if(banner && banner.length > 1) init()
    }

});
