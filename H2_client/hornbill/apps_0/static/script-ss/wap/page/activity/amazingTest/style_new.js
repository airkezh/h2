/*common*/

var $ = require('wap/zepto');
var Alert = require( 'wap/ui/alert' );
var WXShare = require('wx/share');
var WXSign = require('wx/sign');
var testArray = fml.vars.quesList;
var isWeixinBrowser = Meilishuo.config.os.weixinBrowser;
var $wholePages = $('.page');
var chosenArray = [];
var chooseAmount = 0;
var chooseStr = '';
var shareData = {
    'desc': '想知道你潜在的时尚风格吗？快来测一下吧！',
    'imgUrl': 'http://d05.res.meilishuo.net/pic/_o/48/b5/0b1dae0c866375873a92b0253dc2_200_200.cg.png',
    'title': '想知道你潜在的时尚风格吗？快来测一下吧！',
    'link': 'http://m.meilishuo.com/activity/amazingTest/styleTest/'
};


showPage($('.p0'));

function showPage( $currentPage ) {
    $wholePages.hide();
    $currentPage.show();
}

function wxInit() {
    //设置微信二次分享
    if (isWeixinBrowser) {
        WXSign();
        WXShare.bind(shareData);
    }
}

wxInit();

$(document).on('tap', '.item', function () {
	var curPageNum = parseInt($(this).data('page'));
	var nextPageNum = curPageNum+1;
    if ($(this).hasClass('selected')) {
        return;
    }

    if ($(this).parent().data('choosed') != '') {
    	var selectItem = $(this).parent().find('.selected');
        selectItem.find('.mask').remove();
        selectItem.removeClass('selected');
        chooseAmount -= 1;
    }

    $(this).addClass('selected');
    $(this).find('.img').append('<div class="mask"><img src="' + testArray[curPageNum].check_img + '" alt=""></div>');
    var chooseItem = $(this).find('.desc').children('span').html();
    chosenArray[curPageNum] = chooseItem;
    $(this).parent().data('choosed', 'true');
    chooseAmount += 1;
    
    if ( curPageNum == 5 ){
    	setTimeout(function () {
	        location.href = 'http://m.meilishuo.com/activity/amazingTest/styleResult/?answer=' + myChoice();
	    }, 500);
    }else{
    	setTimeout(function () {
	        showPage($('.p'+ nextPageNum));
	    }, 500);
    }
    
})

function myChoice() {
    var i;
    for (i = 0; i < 6; i++) {
        chooseStr += chosenArray[i];
        if (i != 5) {
            chooseStr += ',';
        }
    }
    return chooseStr;
}