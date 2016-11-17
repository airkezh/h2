/*common*/
require('m/zepto/touch');
var $ = require('wap/zepto');
//滑动翻页效果
var slipPageFn = require('cooper/component/slipPage');
var shareTmp = require('wap/component/shareTmp');
var Alert = require( 'wap/ui/alert' );
var WXShare = require('wx/share');
var WXSign = require('wx/sign');
var testArray = fml.vars.quesList;
var isWeixinBrowser = Meilishuo.config.os.weixinBrowser;
var curPageNum = 0;
var prePageNum = 0;
var appendFlag = true;
var chosenArray = [];
var chooseAmount = 0;
var chooseStr = '';
var shareData = {
    'desc': '想知道你潜在的时尚风格吗？快来测一下吧！',
    'imgUrl': 'http://d05.res.meilishuo.net/pic/_o/48/b5/0b1dae0c866375873a92b0253dc2_200_200.cg.png',
    'title': '想知道你潜在的时尚风格吗？快来测一下吧！',
    'link': 'http://m.meilishuo.com/activity/amazingTest/styleTest/'
};

function wxInit() {
    //设置微信二次分享
    if (isWeixinBrowser) {
        WXSign();
        WXShare.bind(shareData);
    }
}

wxInit();

$(document).ready(function(){
    $('.main').show();
    $('.page').show();
})



var tpl = shareTmp('options', {'options': testArray[0]});
$('.p1').append(tpl);


// hack 
var tpl = shareTmp('options', {'options': testArray[1]});
$('.p2').append(tpl);


window.slipPage = slipPageFn.init({
    outer: '.wrap .main'
    , page: '.page'
    , direction: 'x'
});

slipPage.getPages().on('pageShow', function () {
    // 页面show事件
    prePageNum = curPageNum;
    var nextPage = slipPage.getNextPage().page[0];
    curPageNum = slipPage.getPageNum();
    var appendBox = $('.p' + (curPageNum + 2));
    if( appendBox.length > 0 && appendBox.children('ul').length == 0 ){
        //提前一页加载图片
        tpl = shareTmp('options', {'options': testArray[curPageNum + 1]});
        $('.p' + (curPageNum + 2)).append(tpl);
    }

    if( curPageNum == 5 ){
    	appendFlag = false;
    }

    if (!appendFlag || (prePageNum > curPageNum)) {
        return;
    }

    checkEnd();
});

$(document).on('tap', '.item', function () {
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
    checkEnd();

    if (curPageNum != 5 && chooseAmount != 6) {
        setTimeout(function () {
            slipPage.goNext();
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

function checkEnd() {
    if ( chooseAmount == 6 ) {
        setTimeout(function () {
            location.href = 'http://m.meilishuo.com/activity/amazingTest/styleResult/?answer=' + myChoice();
        }, 500);
    }else if( curPageNum == 5 ){
    	var uncheckPage;
    	for( var i = 0; i < 6; i ++ ){
    		if( chosenArray[i] == undefined ){
    			uncheckPage = i;
    			break;
    		}
    	}

    	setTimeout(function(){
		    var winAlert = new Alert( {
		        'content': '还有没有选择的选项哦！',
		        'onSure' : function() {
		        	slipPage.goPage( uncheckPage );
		        }
		    } );
    	},500);	
    }
}


