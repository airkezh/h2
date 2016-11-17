/*common*/
/**
 * @page 4天内的倒计时展示
 * @author weijingdu@meilishuo.com
 * @date 2015-06-03
 * @todo 使用canvas制作绚丽多彩的倒计时效果
 */
var WIN_WIDTH   ,
    WIN_HEIGHT  ,
    RADIUS      ,
    MARGIN_TOP  ,
    MARGIN_LEFT ;

var endTime     = new Date();
    endTime.setTime(endTime.getTime()+3600*1000);

var balls  = [];
var colors = ["#FFC0CB","#FF3E96","#EE799F","#E0FFFF","#C1FFC1","#A0522D","#8E388E","#79CDCD","#218868","#00CED1"]

var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
/**
 * 最后一个数子的x为(43*2+7)*(RADIUS+1)
 * 每一个数字占15*(RADIUS+1)
 * 所以总共占108个
 */


window.onload = function(){
    WIN_WIDTH   = document.body.clientWidth;
    WIN_HEIGHT  = document.body.clientHeight;

    MARGIN_LEFT = Math.round(WIN_WIDTH/10);
    RADIUS      = Math.round((WIN_WIDTH*4/5/108)-1);
    MARGIN_TOP  = Math.round(WIN_HEIGHT/5)

    var canvas = document.getElementById('canvas');
    var cxt    = canvas.getContext('2d');

    canvas.width  = WIN_WIDTH;
    canvas.height = WIN_HEIGHT;

    curShowTimeSec = getCurrentShowTimeSeconds();
    setInterval(function(){
        render(cxt);
        update();
    },50);

}
/**
 *  手机旋屏
 */
window.addEventListener(resizeEvt, function(){
    window.onload();
}, false);

/**
 *  计算截至时间与当前时间的时间间隔"秒数"
 */
function getCurrentShowTimeSeconds(){
    var curTime = new Date();
    var ret     = endTime.getTime() - curTime.getTime();
    ret         = Math.round( ret/1000 );
    return ret >= 0 ? ret : 0;
}

/**
 * 绘制digit内某一个数字的样式
 * x : 绘制数字的x坐标
 * y : 绘制数字的y坐标
 * num : 绘制的是digit数组中的第num项所代表的数字
 * cxt : cxt传递的是canvas的绘制上下文环境
 */
function renderDigit( x , y , num , cxt ){
    cxt.fillStyle = '#3B3B3B';
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j] == 1){
                cxt.beginPath();
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 2*Math.PI ,false);
                cxt.closePath();
                cxt.fill();
            }
        };
    };
}

/**
 * 第一步 : 渲染背景
 * 第二步 : 渲染添加的彩色小球
 * 
 */
function render(cxt){
    cxt.clearRect( 0 , 0 , WIN_WIDTH ,WIN_HEIGHT);

    var hours   = parseInt(curShowTimeSec/3600);
    var minutes = parseInt((curShowTimeSec%3600)/60);
    var seconds = parseInt(curShowTimeSec%60);

    renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt );
    renderDigit( MARGIN_LEFT+(7*2+1)*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt );
    renderDigit( MARGIN_LEFT+(14*2+2)*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT+(18*2+3)*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt );
    renderDigit( MARGIN_LEFT+(25*2+4)*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt );
    renderDigit( MARGIN_LEFT+(32*2+5)*(RADIUS+1) , MARGIN_TOP , 10 , cxt );
    renderDigit( MARGIN_LEFT+(36*2+6)*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt );
    renderDigit( MARGIN_LEFT+(43*2+7)*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt );

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc( balls[i].x ,balls[i].y , RADIUS , 0 , 2*Math.PI ,true);
        cxt.closePath();
        cxt.fill();
    };
}

/**
 * 收集组成变动时刻的一个球
 * x : 绘制数字的x坐标
 * y : 绘制数字的y坐标
 * num : 绘制的是digit数组中的第num项所代表的数字
 * aBall参数：
 * vx : x方向的速度
 * vy : y方向的速度,负值有迸发的效果
 * color : 小球的颜色
 */
function addBalls( x , y ,num ){
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if(digit[num][i][j] == 1){
                var aBall = {
                    x : x+j*2*(RADIUS+1)+(RADIUS+1),
                    y : y+i*2*(RADIUS+1)+(RADIUS+1),
                    g : 1.5+Math.random(),
                    vx : Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy : -5,
                    color : colors[ Math.floor(Math.random()*colors.length)]
                }
                balls.push(aBall);
            }
            
        };
    };
}

/**
 * 更新运动球的状态
 * 碰撞检测
 */
function updateBalls(){
    var cnt = 0;  
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y+RADIUS > WIN_HEIGHT ){
            balls[i].y = WIN_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.70;
        }
      
      if( balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WIN_WIDTH ){
            balls[cnt++] = balls[i];
        }  

    };

    while(balls.length>Math.min(400,cnt)){
        balls.pop();
    }
}
/**
 * 更新
 * 第一步：更新当前显示时间，逐个添加变动时刻的彩球
 * 第二步：更新运动球的状态
 */
function update(){
    var nextShowTimeSec = getCurrentShowTimeSeconds();

    var curHours   = parseInt(curShowTimeSec/3600);
    var curMinutes = parseInt((curShowTimeSec%3600)/60);
    var curSeconds = parseInt(curShowTimeSec%60);

    var nextHours   = parseInt(nextShowTimeSec/3600);
    var nextMinutes = parseInt((nextShowTimeSec%3600)/60);
    var nextSeconds = parseInt(nextShowTimeSec%60);

    if( nextShowTimeSec != curShowTimeSec ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(nextHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT+(7*2+1)*(RADIUS+1) , MARGIN_TOP , parseInt(nextHours%10) );
        }
        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT+(18*2+3)*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT+(25*2+4)*(RADIUS+1) , MARGIN_TOP , parseInt(nextMinutes%10) );
        }
        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT+(36*2+6)*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT+(43*2+7)*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
        curShowTimeSec = nextShowTimeSec;
    }
    updateBalls();
}


















