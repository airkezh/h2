/*common*/
/**
 *模拟滚动
 * @param config
 * @param callback
 */
var SimulationScroll = function(config, callback) {
    this.touchContain = document.getElementById(config.tContain) || document.body;
    this.target = document.getElementById(config.tMove);
    //滚动条参数不传则没有滚动条
    this.touchScroller = document.getElementById(config.tScroller);
    this.touchScrollerArea = document.getElementById(config.tScrollerArea);
    //滚出效果
    this.topRollOut = config.topRollOut;
    this.bottomRollOut = config.bottomRollOut;
    //touchEnd后的回调函数
    this.callbackfn = callback;
    // window.scrollTo(0,2);
    this.move();
}
SimulationScroll.prototype = {
    destory : function() {
        this.touchContain.removeEventListener("touchstart", this.moveStart, false);
        this.touchContain.removeEventListener("touchmove", this.moveIn, false);
        this.touchContain.removeEventListener("touchend", this.moveEnd, false);
        this.touchContain.style.height = this.touchContain.oriHeight; //还原高度
    },
    move : function(e) {
        var monitor = this.touchContain; //监听事件的容器
        if (monitor.nodeName == "BODY") {
            monitor.oriHeight = monitor.offsetHeight + "px";
            monitor.style.height = window.innerHeight + "px"; //将body的高度设为视口高度
        }
        var  target = this.target, //移动目标
            scroller = this.touchScroller, //自定义滚动条
            scrollerArea = this.touchScrollerArea, //滚动条区域
            sheight =  monitor.offsetHeight / target.offsetHeight * monitor.offsetHeight, //计算滚动条滑块的高度
            st = (target.offsetHeight - monitor.offsetHeight) / (monitor.offsetHeight - sheight), //滑块对应页面滚动比
            tslow = 4, //到顶/底减基数
            tMove = target.offsetTop, //滑块到顶top值
            tMoveL = tMove + (this.topRollOut || 0), //到顶允许下拉范围
            bMove = monitor.offsetHeight -(target.offsetHeight + target.offsetTop) > 0 ? target.offsetTop : monitor.offsetHeight -target.offsetHeight,//滑块到底top值,如果为正数，说明target高度小于视口高度，则不能向上滚动
            bMoveL = bMove - (this.bottomRollOut || 0), //到底允许上滑范围
            callbackfn = this.callbackfn, //回调函数
            flg = false, //标记是否滑动
            startY, //标记起始位置
            startTop, //标记滑动起始时的高度值
            move = 0;
        //移动距离
        //鼠标事件注册
        /*addEvent(monitor, 'mousedown', moveStart);
         addEvent(monitor, 'mousemove', moveIn);
         addEvent(monitor, 'mouseup', moveEnd);
         addEvent(window, 'mousemove', moveIn);
         addEvent(window, 'mouseup', moveEnd);*/
        //移动设备触摸事件注册
        addEvent(monitor, 'touchstart', moveStart);
        addEvent(monitor, 'touchmove', moveIn);
        addEvent(monitor, 'touchend', moveEnd);
        /**
         *外观/门面模式包装
         */
        /*事件监听 */
        function addEvent(el, type, fn) {
            el.addEventListener(type, fn, false);
        }
        //取消浏览器默认行为
        function stop(e) {
            //Opera/Chrome/FF
            if (e.preventDefault)
                e.preventDefault();
            //IE
            e.returnValue = false;
        }
        //包装结束
        /**
         *操作函数
         */
        //惯性缓动参数
        var lastMoveTime = 0;
        var lastMoveStart = 0;
        var stopInertiaMove = false;
        /*移动触发*/
        function moveStart(e) {
            // stop(e);
            flg = true;
            if (e.touches)
                e = e.touches[0];
            startY = e.clientY;
            startTop = target.style.top || tMove;
            //惯性缓动
            lastMoveStart = startY;
            lastMoveTime = new Date().getTime();
            stopInertiaMove = true;
            scrollerArea && (scrollerArea.style.visibility = 'visible');
        }
        /*移动过程中*/
        function moveIn(e) {
            if (flg) {
                stop(e);
                if (e.touches)
                    e = e.touches[0];
                move = e.clientY - startY + parseInt(startTop);
                //touchMove事件滚出效果控制：由tMoveL 和 bMoveL控制
                if (move > tMove) {
                    (move - tMove) / tslow + tMove > tMoveL ? move = tMoveL : move = (move - tMove) / tslow + tMove
                } else if (move < bMove) {
                    (move - bMove) / tslow + bMove < bMoveL ? move = bMoveL : move = (move - bMove) / tslow + bMove;
                }
                target.style.top = move + 'px';
                scroller && (scroller.style.top = -move / st + 'px');
                //惯性缓动
                var nowTime = new Date().getTime();
                stopInertiaMove = true;
                if (nowTime - lastMoveTime > 300) {
                    lastMoveTime = nowTime;
                    lastMoveStart = e.clientY;
                }
            }
        }
        /**
         * 移动结束
         * 两处控制惯性停止：滚出效果开启时，由nowV控制；滚出效果关闭时，由tMove bMove控制。
         * */
        function moveEnd(e) {
            //  stop(e);
            if (e.changedTouches && e.changedTouches.length > 0) {
                e = e.changedTouches[0];
            }

            //惯性缓动
            var contentTop = target.style.top.replace('px', '');
            var contentY = parseInt(contentTop);
            var nowTime = new Date().getTime();
            var v = (e.clientY - lastMoveStart) / (nowTime - lastMoveTime); //系数，手指抬起的越慢，惯性越不明显，当足够慢时，惯性效果即可忽略
            //最后一段时间手指划动速度
            stopInertiaMove = false;
            (function(v, startTime, contentY) {
                var dir = v > 0 ? -1 : 1;
                //加速度方向
                var deceleration = dir * 0.005;
                function inertiaMove() {
                    if (stopInertiaMove)
                        return;
                    var nowTime = new Date().getTime();
                    var t = nowTime - startTime; //startTime不变，t会越来越大
                    var nowV = v + t * deceleration; //用来控制惯性停止的变量（t越小，t越大，停止的时间就越快）
                    var moveY = (v + nowV) / 2 * t; //惯性每次移动的距离
                    // 速度方向变化表示速度达到0了
                    if (dir * nowV > 0) {
                        if (move > tMove) {
                            callbackfn('到顶了');
                            target.style.top = tMove + 'px';
                            scroller && (scroller.style.top = tMove + 'px');
                        } else if (move < bMove) {
                            callbackfn('到底了');
                            target.style.top = bMove + 'px';
                            scroller && (scroller.style.top = -bMove / st + 'px');
                        }
                        setTimeout(function() {
                            if (!stopInertiaMove)
                                scrollerArea && (scrollerArea.style.visibility = 'hidden');
                        }, 4000);
                        return;
                    }
                    move = contentY + moveY;

                    //end事件滚出效果控制
                    if (true) { //这里可以配置一个参数，是否开启滚出效果，true为关闭
                        //滚出后复位
                        if (move > tMove || move < bMove) {
                            if (move >= tMove) {
                                callbackfn('到顶了1');
                                target.style.top = tMove + 'px';
                                scroller && (scroller.style.top = tMove + 'px');
                            } else if (move <= bMove) {
                                callbackfn('到底了1');
                                target.style.top = bMove + 'px';
                                scroller && (scroller.style.top = -bMove / st + 'px');
                            }
                            return; //跳出setTimeout
                        }
                    } else { //开始滚出效果的时候，缩小滚出距离
                        if (move > tMove) {
                            move = (move - tMove) / 10 + tMove;
                        } else if (move < bMove) {
                            move = (move - bMove) / 10 + bMove;
                        }
                    }

                    target.style.top = move + "px";
                    scroller && (scroller.style.top = -move / st + 'px');

                    setTimeout(inertiaMove, 10);
                }
                inertiaMove();
            })(v, nowTime, contentY);
            move = 0;
            flg = false;
        }

        this.moveStart = moveStart;
        this.moveIn = moveIn;
        this.moveEnd = moveEnd;
        //操作结束
        /**
         *相关初始化
         */
            //滚动条长度初始化
            scroller && (scroller.style.height = sheight + 'px');
        //初始化结束
    },
    otherInteract : function() {
        //其他功能扩充
    }
}

exports.SimulationScroll = SimulationScroll;
