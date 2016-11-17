/*common*/

/**
 * @fileoverview 首页－会员足迹
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-11-30
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var appShare = require('wap/app/appShare');
var tracking = require('wap/app/tracking');
var swipe = require("wap/page/member/swipe");
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var checkLogin = require('circle/app/checkLogin');

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var windowWidthRem = windowWidth / 10;
var initMarginLeftRem = 19.5 - (windowWidthRem / 2);

var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
    openApp(window.location.href, '', '', true, 'member');
}

/*if (!fml.vars.isLogin) {
    setTimeout(function(){
        // 判断登录，包含app和wx
        checkLogin();
    }, 500);

    return;
}*/

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
    appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

var curUserRegisterDays = fml.vars.footprintData.register_date_sub || 0;
var curUserTotalSpending = parseInt(fml.vars.footprintData.gmv_total || 0);
var curUserTotalOrders = fml.vars.footprintData.order_cnt_total || 0;
var curUserTotalBeautys = fml.vars.footprintData.user_score || 0;
var curUserFashionGene = fml.vars.footprintData.fashion_gene || [];
var curUserFashionPosition = curUserFashionGene[0] || '';

var step = 0,
    scale = windowWidth * 2 / 640,
    box = {
        w: windowWidth,
        h: windowHeight
    },
    cvs = document.getElementById('cvs'),
    ctx = cvs.getContext('2d');

cvs.width = box.w * 2;
cvs.height = box.h * 2;
cvs.style.width = box.w + 'px';

// 公用 img data
var img_mc = {
        w : 640 * scale,
        h : 1009 * scale,
        x : 0,
        y : 0,
        img : document.getElementById('mc')
    },
    img_bg = {
        w : 450 * scale,
        h : 450 * scale,
        x : 55 * scale,
        y : 230 * scale,
        img : document.getElementById('bg')
    },
    img_moon = {
        w : 640 * scale,
        h : 150 * scale,
        x : 0,
        y : 625 * scale,
        minY : 470 * scale,
        img : document.getElementById('moon')
    };

// 第1帧 img data
var img_flag = {
        w : 102 * scale,
        h : 148 * scale,
        x : 226 * scale,
        y : -600,
        maxY : 355 * scale,
        step : 0,
        img : document.getElementById('flag')
    },
    img_astronaut = {
        w : 138 * scale,
        h : 181 * scale,
        x : 640 * scale + 50,
        y : -50,
        minX : 410 * scale,
        maxY : 237 * scale,
        img : document.getElementById('astronaut')
    };

// 第2帧 img data
var img_cloud = {
        w : 387 * scale,
        h : 124 * scale,
        x : img_mc.w / 2 - 387 * scale / 2,
        y : 625 * scale,
        minY : 470 * scale,
        img : document.getElementById('cloud')
    },
    img_coin = {
        w : 237 * scale,
        h : 104 * scale,
        x : 200 * scale,
        y : 426 * scale,
        alpha : 0,
        img : document.getElementById('coin')
    },
    img_ufo = {
        w : 170 * scale,
        h : 114 * scale,
        x : -870 * scale,
        y : 176 * scale,
        maxX : 90 * scale,
        img : document.getElementById('ufo')
    },
    img_light = {
        w : 308 * scale,
        h : 319 * scale,
        x : 155 * scale,
        y : 230 * scale,
        img : document.getElementById('light')
    },
    img_money1 = {
        w : 50 * scale,
        h : 88 * scale,
        step : 0,
        initAni : {x : 377 * scale, y : 126 * scale},
        ani : {x : 377 * scale, y : 126 * scale},
        img : document.getElementById('money1')
    },
    img_money2 = {
        w : 53 * scale,
        h : 42 * scale,
        initAni : {x : 408 * scale, y : 326 * scale},
        ani : {x : 408 * scale, y : 326 * scale},
        img : document.getElementById('money2')
    },
    img_money3 = {
        w : 62 * scale,
        h : 57 * scale,
        angle : 0.1,
        initAni : {x : 210 * scale, y : 340 * scale},
        ani : {x : 210 * scale, y : 340 * scale},
        img : document.getElementById('money3')
    },
    img_money4 = {
        w : 51 * scale,
        h : 51 * scale,
        step : 0,
        initAni : {x : 350 * scale, y : 326 * scale},
        ani : {x : 350 * scale, y : 326 * scale},
        img : document.getElementById('money4')
    },
    img_money5 = {
        w : 85 * scale,
        h : 39 * scale,
        initAni : {x : 105 * scale, y : 444 * scale},
        ani : {x : 105 * scale, y : 444 * scale},
        img : document.getElementById('money5')
    },
    img_money6 = {
        w : 98 * scale,
        h : 28 * scale,
        initAni : {x : 435 * scale, y : 490 * scale},
        ani : {x : 435 * scale, y : 490 * scale},
        img : document.getElementById('money6')
    },
    img_money = {
        frame : 0,
        step : 0,
        alpha : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1,0]
    };

// 第3帧 img data
var img_dress1 = {
        w : 107 * scale,
        h : 159 * scale,
        x : 120 * scale,
        y : 217 * scale, 
        maxY : 417 * scale,
        img : document.getElementById('dress1')
    },
    img_dress2 = {
        w : 81 * scale,
        h : 77 * scale,
        x : 195 * scale,
        y : 200 * scale,
        maxY : 326 * scale,
        img : document.getElementById('dress2')
    },
    img_hand = {
        w : 137 * scale,
        h : 99 * scale,
        x : (124 + 150) * scale,
        y : 143 * scale,
        angle : 0,
        img : document.getElementById('hand')
    },
    img_alien = {
        w : 333 * scale,
        h : 304 * scale,
        x : (100 + 150) * scale,
        y : 40 * scale,
        maxY : (100 + 130) * scale,
        alpha : 0,
        img : document.getElementById('alien')
    };

// 第4帧 img data 
var img_crowd = {
    w : 361 * scale,
    h : 97 * scale,
    x : 130 * scale,
    y : 404 * scale,
    img : document.getElementById('crowd')
};

var img_cloud4 = {
    w : 90 * scale,
    h : 52 * scale,
    x : -100 * scale,
    y : 354 * scale,
    maxX : 90 * scale,
    img : document.getElementById('cloud4')
};

var img_mooncloud = {
    w : 182 * scale,
    h : 116 * scale,
    x : 684 * scale,
    y : 204 * scale,
    minX : 384 * scale,
    img : document.getElementById('mooncloud')
};

var img_moonlight = {
    w : 297 * scale,
    h : 267 * scale,
    x : 160 * scale,
    y : 264 * scale,
    img : document.getElementById('moonlight')
};

var img_girl = {
    w : 139 * scale,
    h : 184 * scale,
    x : 240 * scale,
    y : 0 * scale,
    maxY : 323 * scale,
    img : document.getElementById('girl')
};

var img_girlshadow = {
    w : 57 * scale,
    h : 16 * scale,
    x : 292 * scale,
    y : 500 * scale,
    img : document.getElementById('girlshadow')
};

var img_bling = {
    w : 228 * scale,
    h : 114 * scale,
    x : 190 * scale,
    y : 330 * scale,
    alpha : 0,
    img : document.getElementById('bling')
};

// 第5帧 img data 
var img_bottomcloud = {
    w : 428 * scale,
    h : 156 * scale,
    x : 100 * scale,
    y : 740 * scale,
    minY : 440 * scale,
    img : document.getElementById('bottomcloud')
};

var img_rocket = {
    w : 340 * scale,
    h : 439 * scale,
    x : 140 * scale,
    y : 560 * scale,
    minY : 160 * scale,
    img : document.getElementById('rocket')
};

var img_topcloud = {
    w : 347 * scale,
    h : 145 * scale,
    x : 135 * scale,
    y : 780 * scale,
    minY : 440 * scale,
    img : document.getElementById('topcloud')
};

var img_ring = {
    w : 496 * scale,
    h : 196 * scale,
    x : 60 * scale,
    y : 300 * scale,
    img : document.getElementById('ring')
};

var img_ball = [
    {
        w : 56 * scale,
        h : 58 * scale,
        x : 60 * scale,
        y : 368 * scale,
        img : document.getElementById('ball1')
    },
    {
        w : 75 * scale,
        h : 75 * scale,
        x : 200 * scale,
        y : 450 * scale,
        img : document.getElementById('ball2')
    },
    {
        w : 57 * scale,
        h : 57 * scale,
        x : 410 * scale,
        y : 413 * scale,
        img : document.getElementById('ball3')
    },
    {
        w : 24 * scale,
        h : 24 * scale,
        x : 538 * scale,
        y : 327 * scale,
        img : document.getElementById('ball4')
    }],
    arr = [
        {x : 418, y : 3},
        {x : 428, y : 4},
        {x : 437, y : 6},
        {x : 447, y : 8},
        {x : 457, y : 10},
        {x : 466, y : 14},
        {x : 475, y : 19},
        {x : 483, y : 25},
        {x : 489, y : 31},
        {x : 494, y : 40},
        {x : 495, y : 50},
        {x : 493, y : 59},
        {x : 489, y : 67},
        {x : 483, y : 76},
        {x : 477, y : 83},
        {x : 470, y : 90},
        {x : 463, y : 97},
        {x : 455, y : 103},
        {x : 447, y : 109},
        {x : 438, y : 114},
        {x : 429, y : 119},
        {x : 421, y : 124},
        {x : 412, y : 128},
        {x : 403, y : 133},
        {x : 394, y : 137},
        {x : 385, y : 141},
        {x : 375, y : 145},
        {x : 366, y : 148},
        {x : 357, y : 152},
        {x : 348, y : 155},
        {x : 338, y : 159},
        {x : 328, y : 162},
        {x : 319, y : 165},
        {x : 309, y : 168},
        {x : 300, y : 170},
        {x : 290, y : 173},
        {x : 280, y : 175},
        {x : 270, y : 177},
        {x : 260, y : 179},
        {x : 250, y : 181},
        {x : 240, y : 183},
        {x : 230, y : 185},
        {x : 222, y : 187},
        {x : 212, y : 188},
        {x : 202, y : 190},
        {x : 192, y : 191},
        {x : 182, y : 192},
        {x : 172, y : 193},
        {x : 162, y : 194},
        {x : 152, y : 194},
        {x : 142, y : 195},
        {x : 132, y : 195},
        {x : 122, y : 196},
        {x : 113, y : 195},
        {x : 103, y : 195},
        {x : 93, y : 194},
        {x : 83, y : 193},
        {x : 73, y : 192},
        {x : 64, y : 190},
        {x : 54, y : 188},
        {x : 44, y : 186},
        {x : 35, y : 183},
        {x : 26, y : 178},
        {x : 17, y : 173},
        {x : 10, y : 167},
        {x : 5, y : 160},
        {x : 1, y : 150},
        {x : 2, y : 140},
        {x : 4, y : 131},
        {x : 9, y : 122},
        {x : 15, y : 114},
        {x : 21, y : 107},
        {x : 29, y : 100},
        {x : 36, y : 93},
        {x : 44, y : 87},
        {x : 52, y : 81},
        {x : 60, y : 76},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000},
        {x : -1000, y : -1000}
    ],
    arrLen = arr.length;

// 第6帧 data
var img_bg2 = {
    w : 400 * scale,
    h : 400 * scale,
    x : 130 * scale,
    y : 250 * scale,
    img : document.getElementById('bg2') 
};

var img_ball61 = {
    w : 50 * scale,
    h : 50 * scale,
    x : 480 * scale,
    y : 370 * scale,
    img : document.getElementById('ball61')
};

var img_ball62 = {
    w : 87 * scale,
    h : 87 * scale,
    x : 110 * scale,
    y : 430 * scale,
    img : document.getElementById('ball62')
};

var img_ball63 = {
    w : 59 * scale,
    h : 59 * scale,
    x : 270 * scale,
    y : 240 * scale,
    img : document.getElementById('ball63')
};

var img_ball64 = {
    w : 40 * scale,
    h : 40 * scale,
    x : 430 * scale,
    y : 470 * scale,
    img : document.getElementById('ball64')
};

var line61 = {
    sx : img_ball61.x + img_ball61.w / 2,
    sy : img_ball61.y + img_ball61.h / 2,
    ex : img_ball62.x + img_ball62.w / 2,
    ey : img_ball62.y + img_ball62.h / 2,
    lx : (img_ball61.x + img_ball61.w / 2) - (img_ball62.x + img_ball62.w / 2),
    ly : (img_ball61.y + img_ball61.y / 2) - (img_ball62.y + img_ball62.h / 2)
};

var line62 = {
    sx : line61.ex,
    sy : line61.ey,
    ex : img_ball63.x + img_ball63.w / 2,
    ey : img_ball63.y + img_ball63.h / 2,
    lx : img_ball63.x + img_ball63.w / 2 - line61.ex,
    ly : line61.ey - (img_ball63.y + img_ball63.h / 2)
};

var line63 = {
    sx : line62.ex,
    sy : line62.ey,
    ex : img_ball64.x + img_ball64.w / 2,
    ey : img_ball64.y + img_ball64.h / 2,
    lx : img_ball64.x + img_ball64.w / 2 - line62.ex,
    ly : img_ball64.y + img_ball64.h / 2 - line62.ey
};

var line64 = {
    sx : line63.ex,
    sy : line63.ey,
    ex : img_ball62.x + img_ball62.w / 2,
    ey : img_ball62.y + img_ball62.h / 2,
    lx : line63.ex - (img_ball62.x + img_ball62.w / 2),
    ly : line63.ey - img_ball62.y - img_ball62.h / 2  
};

// 公用drawImg
function drawImg(opt){
    ctx.drawImage(opt.img, opt.x, opt.y, opt.w, opt.h);
}

// 公用清画布
function clearCanvas(){
    ctx.clearRect(0, 0, box.x, box.y);
}

// 公用drawText
function drawText1(text){
    ctx.lineCap = 'butt';
    ctx.fillStyle = '#fff';
    ctx.font = 26 * scale + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, 640 * scale / 2, 580 * scale);
}

var nubC = 0;

function drawText2(nub){
    var nub = nub,
        nubA =  Math.ceil(nub / 60);

    if (nubC < nub) {
        nubC+= nubA;
    } else {
        nubC = nub;
    }

    ctx.font = 68 * scale + 'px Arial';
    ctx.fillText(nubC, 640 * scale / 2, 660 * scale);
}

function drawText2t(text, fz){
    (!fz) && (fz = 50);

    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.font = fz * scale + 'px Arial';
    ctx.fillText(text, 640 * scale / 2, 650 * scale);
}

function drawText3(unit){
    ctx.font = 28 * scale + 'px Arial';
    ctx.fillText(unit, 640 * scale / 2 + 18 + nubC.toString().length * 40 * scale / 2, 660 * scale);
}

// 第一帧 draw
function init1(){
    nubC = 0;
    img_moon.x = 0;
    img_moon.y = 625 * scale;
    img_moon.minY = 470 * scale;
    img_flag.y = -500;
    img_flag.step = 0;
    img_astronaut.x = 640 * scale + 50;
    img_astronaut.y = -50;
}

function draw1(nub){
    clearCanvas();

    drawImg(img_bg);

    if (img_moon.y > img_moon.minY) {
        img_moon.y = img_moon.y - 7;
    }

    drawImg(img_moon);

    if (img_flag.y < img_flag.maxY) {
        img_flag.y = img_flag.y + 15;
    } else {
        img_flag.step = 1;
    }

    drawImg(img_flag);

    drawImg(img_mc);

    if((img_astronaut.x > img_astronaut.minX) && (img_astronaut.y < img_astronaut.maxY)) {
        img_astronaut.x -= 5;
        img_astronaut.y += 5;
    } else {
        if (img_astronaut.y >= (img_astronaut.maxY + 15)) {
            img_astronaut.up = false;
        } else if (img_astronaut.y <= img_astronaut.maxY) {
            img_astronaut.up = true;
        }
        
        if (img_astronaut.up) {
            img_astronaut.y += 0.5;
        } else {
            img_astronaut.y -= 0.5;
        }
    }

    if (fml.vars.isNewUser) {
        //(img_flag.step >= 1) && drawText2t('终于等到你');
        drawText2t('终于等到你');
    } else {
        /*if (img_flag.step >= 1) {
            drawText2(nub);
        } else {
            //drawText2t('定位中...', 40);
            drawText2(0);
        }*/

        drawText2(nub);

        drawText3('天');
    }

    drawText1('我已加入美丽说');

    drawImg(img_astronaut);
}

// 第2帧 draw
function drawCoin(){
    ctx.globalAlpha = img_coin.alpha;
    ctx.drawImage(img_coin.img, img_coin.x, img_coin.y, img_coin.w, img_coin.h);
    ctx.globalAlpha = 1;
}

function drawMoney(){
    ctx.globalAlpha = img_money.alpha[img_money.frame];
    //drawMoney1
    ctx.drawImage(img_money1.img, img_money1.ani.x, img_money1.ani.y, img_money1.w, img_money1.h);
    //drawMoney2
    ctx.drawImage(img_money2.img, img_money2.ani.x, img_money2.ani.y, img_money2.w, img_money2.h);
    //drawMoney3
    ctx.translate(img_money3.ani.x, img_money3.ani.y);
    ctx.rotate(img_money3.angle * Math.PI / 180);
    ctx.drawImage(img_money3.img, 0, 0, img_money3.w, img_money3.h);
    ctx.rotate(-img_money3.angle * Math.PI / 180);
    ctx.translate(-img_money3.ani.x, -img_money3.ani.y);
    //drawMoney4
    ctx.drawImage(img_money4.img, img_money4.ani.x, img_money4.ani.y, img_money4.w, img_money4.h);
    //drawMoney5
    ctx.drawImage(img_money5.img, img_money5.ani.x, img_money5.ani.y, img_money5.w, img_money5.h);
    //drawMoney6
    ctx.drawImage(img_money6.img, img_money6.ani.x, img_money6.ani.y, img_money6.w, img_money6.h);
    ctx.globalAlpha = 1;
}

function init2(){
    nubC = 0;
    img_cloud.x = img_mc.w / 2 - 387 * scale / 2;
    img_cloud.y = 625 * scale;
    img_coin.x = 200 * scale;
    img_coin.y = 426 * scale;
    img_coin.alpha = 0;
    img_ufo.x = -170 * scale;
    img_ufo.y = 176 * scale;
    img_light.x = 155 * scale;
    img_light.y = 230 * scale;
    img_money.frame = 0;
    img_money1.ani.x = img_money1.initAni.x;
    img_money1.ani.y = img_money1.initAni.y;
    img_money2.ani.x = img_money2.initAni.x;
    img_money2.ani.y = img_money2.initAni.y;
    img_money3.ani.x = img_money3.initAni.x;
    img_money3.ani.y = img_money3.initAni.y;
    img_money3.angle = 0;
    img_money4.ani.x = img_money4.initAni.x;
    img_money4.ani.y = img_money4.initAni.y;
    img_money4.step = 0;
    img_money5.ani.x = img_money5.initAni.x;
    img_money5.ani.y = img_money5.initAni.y;
    img_money6.ani.y = img_money6.initAni.y;    
    img_money.step = 0;
}

function draw2(nub){
    clearCanvas();

    drawImg(img_bg);

    if (img_cloud.y > img_cloud.minY) {
        img_cloud.y = img_cloud.y - 7;
    } else {
        img_money.step = 1;
    }

    drawImg(img_cloud);

    if (img_money.step === 1) {
        if (img_coin.alpha < 1) {
            img_coin.alpha += 0.05;
        }

        drawCoin();
    }

    drawImg(img_mc);

    if (img_ufo.x < (img_ufo.maxX - 5)) {
        img_ufo.x += 10;
    } else {
        drawImg(img_light);
        img_money.step = 2;
    }

    drawImg(img_ufo);

    if (fml.vars.isNewUser) {
        //(img_money.step >= 2) && drawText2t('计算ING…');
        drawText2t('计算ING…');
    } else {
        if (img_money.step >= 2) {
            img_money.frame++;
            img_money1.ani.x--;
            img_money1.ani.y += 2;
            img_money2.ani.x++;
            img_money2.ani.y++;
            img_money3.ani.x--;
            img_money3.ani.y++;
            img_money3.angle -= 0.6;
            
            if (img_money4.step <= 10) {
                img_money4.ani.x++;
            } else if (img_money4.step <= 20) {
                img_money4.ani.x--;
            } else if (img_money4.step <= 30) {
                img_money4.ani.x++;
            } else if (img_money4.step <= 40) {
                img_money4.ani.x--;
            }

            img_money4.step++;
            img_money4.ani.y++;
            img_money5.ani.x += 0.5;
            img_money5.ani.y += 0.5;
            img_money6.ani.y += 0.33333;
            
            if (img_money.frame >= img_money.alpha.length) {
                img_money.frame = 0;
                img_money1.ani.x = img_money1.initAni.x;
                img_money1.ani.y = img_money1.initAni.y;
                img_money2.ani.x = img_money2.initAni.x;
                img_money2.ani.y = img_money2.initAni.y;
                img_money3.ani.x = img_money3.initAni.x;
                img_money3.ani.y = img_money3.initAni.y;
                img_money3.angle = 0;
                img_money4.ani.x = img_money4.initAni.x;
                img_money4.ani.y = img_money4.initAni.y;
                img_money4.step = 0;
                img_money5.ani.x = img_money5.initAni.x;
                img_money5.ani.y = img_money5.initAni.y;
                img_money6.ani.y = img_money6.initAni.y;
            }

            drawMoney();

            //drawText2(nub);
        } else {
            //drawText2t('定位中...', 40);
            //drawText2(0);
        }

        drawText2(nub);

        drawText3('元');
    }

    drawText1('共为时尚买单');
}

// 第3帧 draw
function drawHand(){
    ctx.globalAlpha = img_alien.alpha;
    ctx.drawImage(img_hand.img, img_hand.x, img_hand.y, img_hand.w, img_hand.h);
}

function drawHand2(){
    var w = img_hand.x + img_hand.w,
        h = img_hand.y + img_hand.h,
        angle = img_hand.angle * Math.PI / 180;

    //if( isLowphone ) angle =  ( img_hand.angle*Math.PI/180 ).toFixed(1);

    ctx.translate(w, h);
    ctx.rotate(angle);
    ctx.drawImage(img_hand.img, -img_hand.w, -img_hand.h, img_hand.w, img_hand.h);
    ctx.rotate(-angle);
    ctx.translate(-w, -h);
}

function drawAlien(){
    ctx.globalAlpha = img_alien.alpha;
    ctx.drawImage(img_alien.img, img_alien.x, img_alien.y, img_alien.w, img_alien.h);
    ctx.globalAlpha = 1;
}

function init3(){
    step = 0;
    nubC = 0;
    img_moon.minY = 470 * scale;
    img_dress1.y = 217 * scale;
    img_dress2.y = 200 * scale;
    img_hand.y = 143 * scale;
    img_hand.angle = 0;
    img_alien.y = 40 * scale;
    img_alien.alpha = 0;
}

function draw3(nub){
    clearCanvas();

    drawImg(img_bg);

    if (step >= 2) {
        if (img_dress1.y < img_dress1.maxY) {
            img_dress1.y += 6;
        } else {
            step = 3;
        }

        drawImg(img_dress1);
    }
    
    if (step >= 3) {
        if (img_dress2.y < img_dress2.maxY) {
            img_dress2.y += 6;
        } else {
            step = 4;
        }

        drawImg(img_dress2);
    }

    if (img_moon.y > img_moon.minY) {
        img_moon.y = img_moon.y - 7;
    } else if (step == 0) {
        step = 1;
    }

    drawImg(img_moon);

    drawImg(img_mc);

    if (step >= 1) {
        if (img_alien.y < img_alien.maxY) {
            img_hand.y += 6;
            img_alien.y += 6;
        } else if (step == 1) {
            step = 2;
        }

        if (img_alien.alpha <= 1) {
            img_alien.alpha += 0.05;
        }

        if (step < 4) {
            drawHand();
        } else {
            if (img_hand.angle <= 0) {
                img_hand.angleFlag = true;
            }

            if (img_hand.angle >= 10) {
                img_hand.angleFlag = false;
            }

            if (img_hand.angleFlag) {
                img_hand.angle++;
            } else {
                img_hand.angle--;
            }

            drawHand2();
        }

        drawAlien();
    }

    drawText1('共剁手');

    if (fml.vars.isNewUser) {
        //(step >= 4) && drawText2t('计算ING…');
        drawText2t('计算ING…');
    } else {
        /*if (step >= 4) {
            drawText2(nub);
        } else {
            //drawText2t('定位中...', 40);
            drawText2(0);
        }*/

        drawText2(nub);

        drawText3('次');
    }
}

// 4 draw
function drawBling(){
    ctx.globalAlpha = img_bling.alpha;
    ctx.drawImage(img_bling.img, img_bling.x, img_bling.y, img_bling.w, img_bling.h);
    ctx.globalAlpha = 1;
}

function init4(){
    step = 0;
    nubC = 0;
    img_moon.minY = 470 * scale;
    img_crowd.x = 130 * scale;
    img_cloud4.x = -100 * scale;
    img_mooncloud.x = 684 * scale;
    img_girl.y = 0;
    img_bling.alpha = 0;
}

function draw4(nub){
    clearCanvas();

    drawImg(img_bg);

    drawImg(img_crowd);

    if ( img_moon.y > img_moon.minY) {
        img_moon.y = img_moon.y - 7;
    }

    drawImg(img_moon);

    if (img_girl.y < img_girl.maxY) {
        img_girl.y += 8;
    } else if (step == 1) {
        step = 2;
    }

    drawImg(img_girlshadow);

    drawImg(img_girl);

    if (img_moon.y > img_moon.minY) {
        img_moon.y = img_moon.y - 7;
    } else if (step == 0) {
        step = 1;
    }

    drawImg(img_mc);

    if (step >= 2) {
        if (img_cloud4.x < img_cloud4.maxX) {
            img_cloud4.x += 4;
        }

        if (img_mooncloud.x > img_mooncloud.minX) {
            img_mooncloud.x -= 5;
        } else if (step == 2) {
            step = 3;
        }

        drawImg(img_cloud4);

        if (step >= 3) {
            drawImg(img_moonlight);
            step = 4;
        }

        drawImg(img_mooncloud);
    }

    if (step >= 4) {
        if (img_bling.alpha >= 1) {
            img_bling.alphaFlag = false;
        }

        if (img_bling.alpha < 0.3) {
            img_bling.alphaFlag = true;
        }
        
        if (img_bling.alphaFlag) {
            img_bling.alpha += 0.1;
        } else {
            img_bling.alpha -= 0.1;
        }
        
        drawBling();
    }

    drawText1('美丽值');

    if (fml.vars.isNewUser) {
        //(step >= 4) && drawText2t('计算ING…');
        drawText2t('计算ING…');
    } else {
        /*if (step >= 4) {
            drawText2(nub);
        } else {
            //drawText2t('定位中...', 40);
            drawText2(0);
        }*/

        drawText2(nub);
    }
}

// 5 draw
var i5 = 0;
var ringS1 = 0;
var ringS2 = -24;
var ringS3 = -49;
var ringS4 = -74;

function drawRocket2(){
    ctx.drawImage(img_rocket.img, 0, 0, img_rocket.w/scale, 208, img_rocket.x, img_rocket.y, img_rocket.w, 208 * scale);
}

function drawBall(i,n){
    if (n < 0) {
        return;
    }

    var w = Math.ceil(25 * scale + arr[n].y / 4),
        balls = {
            x : img_ring.x + arr[n].x * scale - w / 2,
            y : img_ring.y + arr[n].y * scale - w / 2,
            w : w,
            h : w
        };

    ctx.drawImage(img_ball[i].img, balls.x, balls.y, balls.w, balls.h);
}

function init5(){
    i5 = 0;
    nubC = 0;
    step = 0;
    ringS1 = 0;
    ringS2 = -24;
    ringS3 = -49;
    ringS4 = -74;
    img_bottomcloud.y = 740 * scale;
    img_rocket.y = 560 * scale;
    img_topcloud.y = 780 * scale;
}

function draw5(nub){
    clearCanvas();

    i5++;

    drawImg(img_bg);

    if (img_topcloud.y > (img_topcloud.minY + 15)) {
        img_topcloud.y -= 8;
        img_bottomcloud.y -= 8;
    } else if (step == 0) {
        step = 1;
    }

    drawImg(img_bottomcloud);

    if (step >= 1) {
        if (img_rocket.y >= img_rocket.minY) {
            img_rocket.y -= 9;
        } else if (step == 1) {
            step = 2;
        }

        drawImg(img_rocket);
    }

    drawImg(img_topcloud);

    drawImg(img_mc);

    if (step >= 1) {
        if (img_rocket.y <= 260 * scale) {
            drawRocket2();
        }
    }

    if (step >= 2) {
        drawImg(img_ring);

        drawBall(0, ringS1);
        drawBall(1, ringS2);
        drawBall(2, ringS3);
        drawBall(3, ringS4);

        if (i5 % 2) {
            ringS1++;
            ringS2++;
            ringS3++;
            ringS4++;
        }

        if (ringS1 >= arrLen) ringS1 = 0;
        if (ringS2 >= arrLen) ringS2 = 0;
        if (ringS3 >= arrLen) ringS3 = 0;
        if (ringS4 >= arrLen) ringS4 = 0;

        //drawText2(nub);
    } else {
        //drawText2t('定位中...', 40);
        //drawText2(0);
    }

    drawText2(nub);

    drawText3('个');

    drawText1('V' + fml.vars.userLevel + '等级拥有的特权');
}

// 6 draw
var title = curUserFashionGene;
var titleSet = [
    {primaryX : 590 * scale / 2, x : 590 * scale / 2, y : 400 * scale, fz : 32, color : '#fff', speed : 0.2},
    {primaryX : 360 * scale, x : 360 * scale, y : 470 * scale, fz : 30, color : '#fff', speed : 0.2},
    {primaryX : 250 * scale, x : 250 * scale, y : 500 * scale, fz : 26, color : '#fff', speed : 0.2},
    {primaryX : 390 * scale, x : 390 * scale, y : 340 * scale, fz : 26, color : '#fff', speed : 0.2},
    {primaryX : 260 * scale, x : 260 * scale, y : 360 * scale, fz : 23, color : '#BEBBC1', speed : 0.2},
    {primaryX : 410 * scale, x : 410 * scale, y : 430 * scale, fz : 23, color : '#BEBBC1', speed : 0.2}
];

var titleDirection = true;
var pre1 = 0, pre2 = 0, pre3 = 0, pre4 = 0;

function drawTitle(set, text){
    if ( set.x > (set.primaryX + 5)) {
        titleDirection = true;
    } else if (set.x < (set.primaryX - 5)) {
        titleDirection = false;
    }

    titleDirection ? (set.x -= set.speed) : (set.x += set.speed);

    (set.x < 0) && (set.x = 640 * scale);

    ctx.lineCap = 'butt';
    ctx.lineWidth = 0;
    ctx.font =  set.fz * scale + 'px Arial';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#2F2852';
    ctx.strokeText(text, set.x, set.y);
    ctx.fillStyle = set.color;
    ctx.fillText(text, set.x, set.y);
}

function drawLine(opt, p, d){
    /* p是百分比，d是描绘方向 */
    var ex = 0, ey = 0;

    if (d == 1) {
        ex = opt.sx - opt.lx * p;
        ey = opt.sy + opt.ly * p;
    }

    if (d == 2) {
        ex = opt.sx + opt.lx * p;
        ey = opt.sy - opt.ly * p;
    }

    if (d == 3) {
        ex = opt.sx + opt.lx * p;
        ey = opt.sy + opt.ly * p;
    }

    if (d == 4) {
        ex = opt.sx - opt.lx * p;
        ey = opt.sy - opt.ly * p;
    }

    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.strokeStyle = '#80797F';
    ctx.moveTo(opt.sx, opt.sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
}

function init6(){
    step = 0;
    pre1 = 0; 
    pre2 = 0;
    pre3 = 0; 
    pre4 = 0;
    img_moon.y = 625 * scale;
    img_moon.minY = 520 * scale;
    line61.sx = img_ball61.x + img_ball61.w / 2;
    line61.sy = img_ball61.y + img_ball61.h / 2;
    line61.ex = img_ball62.x + img_ball62.w / 2;
    line61.ey = img_ball62.y + img_ball62.h / 2;
    line61.lx = (img_ball61.x + img_ball61.w / 2) - (img_ball62.x + img_ball62.w / 2);
    line61.ly = (img_ball61.y + img_ball61.y / 2) - (img_ball62.y + img_ball62.h / 2);
}

function draw6(text){
    clearCanvas();

    drawImg(img_bg2);

    if (img_moon.y > img_moon.minY) {
        img_moon.y = img_moon.y - 7;
    } else if (step == 0) {
        step = 1;
    }

    drawImg(img_moon);

    if (step >= 1) {
        ((pre1 += 0.1) >= 1) && (pre1 = 1);
        ((step == 1) && (pre1 == 1)) && (step = 2);
    }

    if (step >= 2) {
        ((pre2 += 0.1) >= 1) && (pre2 = 1);
        ((step == 2) && (pre2 == 1)) && (step = 3);
    }

    if (step >= 3) {
        ((pre3 += 0.1) >= 1) && (pre3 = 1);
        ((step == 3) && (pre3 == 1)) && (step = 4);
    }

    if (step >= 4) {
        ((pre4 += 0.1) >= 1) &&  (pre4 = 1);
        ((step == 4) && (pre4 == 1)) && (step = 5);
    }

    drawLine(line61, pre1, 1);
    drawLine(line62, pre2, 2);
    drawLine(line63, pre3, 3);
    drawLine(line64, pre4, 4);

    if (step >= 2) {
        drawImg(img_ball62);
    }

    if (step >= 4) {
        drawImg(img_ball64);
    }

    if (step >= 5) {
        for (var i = 0; i < title.length; i++) {
            drawTitle(titleSet[i], title[i]);
        }
    }

    drawImg(img_mc);

    if (step >= 1) {
        drawImg(img_ball61);
    }

    if (step >= 3) {
        drawImg(img_ball63);
    }

    if (fml.vars.isNewUser) {
        //(step >= 4) && drawText2t('定位ING…');
        drawText2t('定位ING…');
    } else {
        /*if (step >= 4) {
            drawText2t(text);
        } else {
            //drawText2t('定位中...', 40);
        }*/
    }

    drawText2t(text);

    drawText1('我的时尚定位');
}

function initTopTab(){
    $('.top_tab_list').css({
        'margin-left': '-' + initMarginLeftRem + 'rem'
    });
}

function activeTopTab(oThat, index){
    $('.bottom_desc_wrap').html('');

    var oParent = oThat.parent();

    if (oParent.length) {
        oParent.addClass('active');
        oParent.siblings().removeClass('active');
    }

    var marginLeftValue = (scale > 1) ? ((index * 6.3) + ((index - 2) * 3.2) - initMarginLeftRem) : ((index * 8.3) + ((index - 2) * 1.3) - initMarginLeftRem);

    oThat.parents('.top_tab_list').css({
        'margin-left': '-' + marginLeftValue + 'rem'
    });
}

function showFootprintDesc(index){
    var oDescWrap = $('.bottom_desc_wrap');

    if (oDescWrap.length) {
        var tpl = shareTmp('footprint_desc_tpl_' + index);

        (tpl != '') && oDescWrap.html(tpl);

        var oDescBox = oDescWrap.find('.footprint_desc_box');

        if (oDescBox.length) {
            oDescBox.animate({'opacity': 1}, 400, function(){
            
            });
        }
    }
}

// 发送数据统计请求
function sendCrTracking(index){
    index && tracking.cr('member_footprint', {'page': index});
}

function drawAnimation(index){
    switch (index) {
        case 1:
            init1();

            clearInterval(animationInterval);

            animationInterval = setInterval(function(){
                draw1(curUserRegisterDays);
            }, timeInterval);

            clearTimeout(showDescTimeout);

            showDescTimeout = setTimeout(function(){
                showFootprintDesc(1);
            }, showDescInterval);

            break;
        case 2:
            init2();

            clearInterval(animationInterval);

            animationInterval = setInterval(function(){
                draw2(curUserTotalSpending);
            }, timeInterval);

            clearTimeout(showDescTimeout);

            showDescTimeout = setTimeout(function(){
                showFootprintDesc(2);
            }, showDescInterval);

            break;
        case 3:
            init3();

            clearInterval(animationInterval);

            animationInterval = setInterval(function(){
                draw3(curUserTotalOrders);
            }, timeInterval);

            clearTimeout(showDescTimeout);

            showDescTimeout = setTimeout(function(){
                showFootprintDesc(3);
            }, showDescInterval);

            break;
        case 4:
            init4();

            clearInterval(animationInterval);

            animationInterval = setInterval(function(){
                draw4(curUserTotalBeautys);
            }, timeInterval);

            clearTimeout(showDescTimeout);

            showDescTimeout = setTimeout(function(){
                showFootprintDesc(4);
            }, showDescInterval);

            break;
        case 5:
            init5();

            clearInterval(animationInterval);

            animationInterval = setInterval(function(){
                draw5(fml.vars.userInterests);
            }, timeInterval);

            clearTimeout(showDescTimeout);

            showDescTimeout = setTimeout(function(){
                showFootprintDesc(5);
            }, showDescInterval);

            break;
        case 6:
            init6();

            clearInterval(animationInterval);

            animationInterval = setInterval(function(){
                draw6(curUserFashionPosition);
            }, timeInterval);

            clearTimeout(showDescTimeout);

            showDescTimeout = setTimeout(function(){
                showFootprintDesc(6);
            }, showDescInterval);

            break;
    }
}

function moveLeftEnd(){
    var oActiveTab = $('.top_tab_list').find('.active'),
        index = oActiveTab.find('.title').data('index') || 0;

    if (index) {
        var tempIndex = index + 1,
            oTempTab = $('.top_tab_list').find('.title[data-index="' + tempIndex + '"]');

        if (oTempTab.length) {
            sendCrTracking(tempIndex);
            activeTopTab(oTempTab, tempIndex);
            drawAnimation(tempIndex);
        }
    }
}

function moveRightEnd(){
    var oActiveTab = $('.top_tab_list').find('.active'),
        index = oActiveTab.find('.title').data('index') || 0;

    if (index) {
        var tempIndex = index - 1,
            oTempTab = $('.top_tab_list').find('.title[data-index="' + tempIndex + '"]');

        if (oTempTab.length) {
            sendCrTracking(tempIndex);
            activeTopTab(oTempTab, tempIndex);
            drawAnimation(tempIndex);
        }
    }
}

initTopTab();

// 动画执行
var timeInterval = 1000 / 32,
    animationInterval = setInterval(function(){
        draw1(curUserRegisterDays);
    }, timeInterval);

var showDescInterval = 500,
    showDescTimeout = null;

showDescTimeout = setTimeout(function(){
    sendCrTracking(1);
    showFootprintDesc(1);
}, showDescInterval);

swipe.init({
    outer: $('body'),
    xDrag: 10,
    moveLeftEndFn: moveLeftEnd,
    moveRightEndFn: moveRightEnd
});

// 动画切换
$('body').on('click', '.top_tab_list .title', function(){
    var that = $(this),
        index = that.data('index') || 0;

    if (index) {
        sendCrTracking(index);
        activeTopTab(that, index);
        drawAnimation(index);
    }
});


/*var footprint = {
    // 初始化页面
    init: function(){
        if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
        }

        this.errorTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.initEvent();
            this.initTopTab();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        $('body').on('click', '.j_login_box', function(){
            //window.location.href = 'meilishuo://login.meilishuo/';
            //return;

            // 判断登录，包含app和wx
            checkLogin();
        });

        $('body').on('click', '.top_tab_list .title', function(){
            var that = $(this),
                index = that.data('index') || 0;

            if (index) {
                var oParent = that.parent();

                oParent.addClass('active');
                oParent.siblings().removeClass('active');

                that.parents('.top_tab_list').css({
                    'margin-left': '-' + ((index * 8.8) + ((index - 2) * 0.8) - initMarginLeftRem) + 'rem'
                });
            }
        });
    },

    initTopTab: function(){
        $('.top_tab_list').css({
            'margin-left': '-' + initMarginLeftRem + 'rem'
        });
    },

    errorTipsLayer: function(){
        if (fml.vars.isLogin && fml.vars.isNormalGetData) {
            var errorText = '',
                confirmText = '';

            if (fml.vars.isNormalGetData == 1) {
                confirmText = '刷新刷新！';
                errorText = '矮油~好像卡住惹<br>刷新一下让我重新加载出来好咩~';
            } else if (fml.vars.isNormalGetData == -1) {
                confirmText = '好哒~';
                errorText = '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';
            }

            if (errorText != '') {
                var alt = new Alert({
                    content: errorText,
                    confirmTxt: confirmText,
                    onSure: function(){
                        (fml.vars.isNormalGetData == 1) && window.location.reload();
                        return;
                    }
                });

                // 发送数据统计请求
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/aj/member/getInfo'});
            }
        }
    }
};

// 初始化页面
footprint.init();*/
