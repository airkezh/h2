/*common*/
var $ = require('jquery');
var shareTmp = require('component/shareTmp');
var alertT = require('ui/alert');
var newTopic_ok = require('page/club/newTopic_ok');
var newTopic_ie = require('page/club/newTopic_ie');
var $article_con = $('.article_post');
var alertTip = function(content) {
	new alertT({
		content: content,
		width: 420
	});
	$('.maga_suc').css('width', '420px');
};
var $year = $('.year')
	,$month = $('.month')
	,$yearUl = $('.yearWrap ul li')
	,$monthUl = $('.monthWrap ul li')
	,$next = $('.next')
	,$realName = $('.realName')
	,$idCard = $('.id_card')
	,$telphone = $('.telphone')
	,$loginAddress = $('.loginAddress')
	,$receiptInfo = $('.receiptInfo')
	,$helpInfo = $('.helpInfo')
	,$chooseYear = $('.chooseYear')
	,$chooseMonth = $('.chooseMonth')
	,$waitingCheck = $('.waitingCheck')
	,$userInfo = $('.userInfo')
	,$third = $('.third')
	,$validateFalse = $('.validateFalse')
	,$warn = $('.warn')
var date = new Date();
var nowYear = date.getFullYear()
	,nowMonth = date.getMonth()
var chooseYear = nowYear
	,chooseMonth = nowMonth
	,imgPid = new Array();
// 固定上传的宝贝和图片总数
window.canPostNum = 3;
// 图片上传,newTopic_ok兼容ie6、7，newTopic_ie使用plupload插件
var overMax_msg = '亲，最多可以上传3个图片'
$('.add_pic').mousedown(function(){
	if(canPostNum <= 0){ alertTip(overMax_msg);return false; }
});
var userAgent = window.navigator.userAgent.toLowerCase();
var msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
var msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);
var is_badie = msie7 || msie6;
if(is_badie){
	newTopic_ok.tool();
} else {
	newTopic_ie.tool();
}
//注册时间菜单
fml.use('app/eventHover' , function(){
	this.hoverShow('.yearWrap' , '.add_menu_leo');
	this.hoverShow('.monthWrap' , '.add_menu_leo');
})
$yearUl.mouseover(function(){
	$(this).css('background-color','#DDDDDD');
})
$yearUl.mouseout(function(){
	$(this).css('background-color','#FFFFFF');
})
$monthUl.mouseover(function(){
	$(this).css('background-color','#DDDDDD');
})
$monthUl.mouseout(function(){
	$(this).css('background-color','#FFFFFF');
})
//获取注册时间
$chooseYear.on( 'click' , function(){
	chooseYear = $(this).html().trim();
	var $yearWrap = $(this).parents('.yearWrap')
		,$ul = $yearWrap.children('ul')
		,$timeYear = $('.timeYear')
	$timeYear.html(chooseYear);
	$ul.hide();
})
$chooseMonth.on( 'click' , function(){
	chooseMonth = $(this).html().trim();
	var $monthWrap = $(this).parents('.monthWrap')
		,$ul = $monthWrap.children('ul')
		,$timeMonth = $('.timeMonth');
	$timeMonth.html(chooseMonth);
	$ul.hide();
})
//提交资料

$next.on( 'click' , function(){
	var $imgsrc = $('.item').find('img');
	for(var j= 0;j<$imgsrc.length;j++){
		imgPid[j] = $imgsrc[j].getAttribute('src');
	}
	var data={
	    'nickname' : fml.vars.nickname
	    ,'realname' : $realName.val().trim()
	    ,'id_card' : $idCard.val().trim()
	    ,'mobile' : $telphone.val().trim()
	    ,'reg_time' : chooseYear+'-'+chooseMonth
	    ,'often_login_place' : $loginAddress.val().trim()
	    ,'often_take_goods_info' : $receiptInfo.val().trim()
	    ,'orther_desc' : $helpInfo.val().trim()
	    ,'validate_code' : fml.vars.validate_code
	    ,'pic_url' : imgPid.join(',')
	}
	,url="/aj/freeze_aj/index/apply_unfreeze";
	$warn.hide();
	if($realName.val().trim().length == 0){
		$realName.parents('.info').children('.warn').show();
	}else if($idCard.val().trim().length != 18){
		$idCard.parents('.info').children('.warn').show();
	}else if($telphone.val().trim().length != 11 ){
		$telphone.parents('.info').children('.warn').show();
	}else if($loginAddress.val().trim().length == 0){
		$loginAddress.parents('.info').children('.warn').show();
	}else if($receiptInfo.val().trim().length == 0){
		$receiptInfo.parents('.info').children('.warn').show();
	}else{
		$.post( url , data , function(res){
			if(res.code==1001){
				$validateFalse.html(res.message);
			}else if(res.code==0){
				$userInfo.empty();
				$waitingCheck.append(shareTmp('sucessFreeze',{}));
				$third.addClass('current');
			}
		},'json');
	}
})
if(fml.vars.statusCode == 2001){
	$third.addClass('current');
	$userInfo.hide();
	$waitingCheck.append(shareTmp('sucessFreeze',{}));
}
