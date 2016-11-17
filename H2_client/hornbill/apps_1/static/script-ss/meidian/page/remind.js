/*common*/
require('wap/app/dialog')
var shareTmp = require('wap/component/shareTmp')

$('.share').on('tap' , function(event){
    event.preventDefault();
    var tpl = shareTmp('share_md');
    $.fn.dialog({dialogContent : tpl , dialogTitle : '',dialogWidth : 320}); 
    $('#dialogLayer').css('top',$(window).scrollTop())
    $('#dialogLayer').css('height','240px')
    $('#dialogLayer .dialogTitle .close').text('')      
});
