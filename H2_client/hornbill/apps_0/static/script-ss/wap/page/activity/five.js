/*common*/
require('wap/app/activity/five')
var scrash = require('wap/app/scrash')
function initScratch(){
    scrash.createScratchCard('body',70,function(f,t ,cvs){
        if (cvs){
            cvs.parentNode && cvs.parentNode.removeChild(cvs)
        }
    },true)
}
initScratch()
var width = $('body').width();
var canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext("2d");
context.font = "Bold 24px Arial";
// 设置对齐方式
context.textAlign = "center";
// 设置填充颜色
context.fillStyle = "#000000";
// 设置字体内容，以及在画布上的位置
context.fillText("轻轻擦拭", width/2, 320);
context.fillText("开启美丽之旅...", width/2, 350);
$('.mask').height($(window).height());

window.onresize = function(){
    $(".content-li").each(function () {
        $(this).css("height", $(window).height());
    });
    screenHeight = $(window).height();
};

setTimeout(function(){
    $(window).resize();
},1000);
