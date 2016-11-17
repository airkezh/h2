/*common*/
require('wap/zepto/touch')
require('wap/app/dialog')
var shareTmp = require('wap/component/shareTmp')

var show = $('.show')
$('.goods_img').on('tap' , function(){
    var tpl = shareTmp('share_md');
    $.fn.dialog({dialogContent : tpl , dialogTitle : '',dialogWidth : 320}); 
    $('.dialogTitle').append(show)
    $('.show').css('display','block')
    $('#dialogLayer').css('top',($(window).height()-$('.show').height())/2) 
    $('#dialogLayer .dialogTitle .close').css('height',$(window).height())
    $('#dialogLayer .dialogTitle .close').css('top',-($(window).height()-$('.show').height())/2)
    $('#dialogLayer .dialogTitle .close').text('')     
});

