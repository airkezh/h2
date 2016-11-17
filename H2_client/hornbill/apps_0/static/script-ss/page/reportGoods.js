/*common*/
var $ = require('jquery') ;
var check = require('app/checkLogin');
var alertT = require('ui/alert');
var newTopic_ok = require('page/club/newTopic_ok');
var newTopic_ie = require('page/club/newTopic_ie');
var shareTmp = require('wap/component/shareTmp');
//调整容器为article_post
var $article_con = $('.article_post');
var page = 0;
var val ;
var picNece = 0;
var alertTip = function(content) {
	new alertT({
		content: content,
		width: 420
	});
	$('.maga_suc').css('width', '420px');
};
// 固定上传的宝贝和图片总数
window.canPostNum = 8;
// 图片上传,newTopic_ok兼容ie6、7，newTopic_ie使用plupload插件
var overMax_msg = '亲，晒单图片总数最多为8个 ：）'
$('.add_pic').mousedown(function(){
	if (!check()) return false;
	if(canPostNum <= 0){ alertTip(overMax_msg);return false; }
	picNece=1;
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
var type= $('.choiceContain').find('input'),	
	typeChecked;
$('.inputChoice').on('click',function(){
	$('.ignoreChoice').empty();
	val = $(this).val();
	if(val ==1 || val ==3){
		$('.remarkContain .remarkStar').empty();
		$('.remarkContain .remarkStar').text('*');
		if(val==1){
			$('.addPic_tips').html('请上传主图以及详情图，图片最少上传2张，最多支持8张。支持jpg、png和静态gif格式，每张不超过3M。');
			$('.addPic_tips').css('padding-top','5px');
		}else{
			$('.addPic_tips').html('支持jpg、png和静态gif格式，每张不超过3M，最多支持8张。');
			$('.addPic_tips').css('padding-top','12px');
		}
		picNece = 0;
	}else{
		$('.remarkContain .remarkStar').empty();
		$('.addPic_tips').html('支持jpg、png和静态gif格式，每张不超过3M，最多支持8张。');
		$('.addPic_tips').css('padding-top','12px');
		picNece = 1;
	}
});
$('.btnSub').on('click',function(){
	var remarkDesc = $('.remarkDesc').val(),//描述
		remarkDescLen = remarkDesc.length,
		imgsrc = $('.item').find('img'),
		ignoreChoice = $('.ignoreChoice'),
		reportContain = $('.reportContain'),
		successContain = $('.successContain'),
		shop_id = fml.vars.reportType.goods_info.shop_id,
		imgUrl = new Array(),
		imgPid = new Array();
	ignoreChoice.empty();
	for(var j= 0;j<imgsrc.length;j++){
		imgUrl[j] = imgsrc[j].src;//图片地址
		imgPid[j] = imgsrc[j].getAttribute('pid');
	}
	for(var i =0; i<type.length;i++){
		if(type[i].checked==true){
			typeChecked =i+1;//编号type
			break;
		}
	}
	var data ={
		'shop_id':shop_id,
		'desc':remarkDesc,
		'type':val,
		'twitter_id':fml.vars.event_id,
		'pid':imgPid
	}
	if( !check() ){
		return;
	}else if(remarkDesc==''||typeChecked==null){
		ignoreChoice.css('display','block');
		ignoreChoice.append('请检查举报类型或者备注说明是否已填')
	}else if(remarkDescLen>500){
		ignoreChoice.css('display','block');
		ignoreChoice.append('备注说明字数上限为500字，您已超出限制，不能提交。');
	}else if(picNece != 1 && val!=1 ){
			ignoreChoice.css('display','block');
			ignoreChoice.append('请检查图片是否上传');
	}else if(fml.vars.reportCheck.success == 0){
		ignoreChoice.css('display','block');
		ignoreChoice.append('您在72小时之内已经举报过此商品');
	}else if(val==1 && imgPid.length<3){
		ignoreChoice.css('display','block');
		ignoreChoice.append('上传凭证是否达到两张');
	}else if(remarkDescLen != 0){
		reportContain.css('display','none');
		$.post('/aj/reportGoods/report_info',data,function(res){
			if(res.succ == 1){
				$('.sucContain').append(shareTmp('successCon',{}));
			}
			else{
				alertTip("额。。。。很可惜，没上传成功，再来一遍吧");
			}
		},'json');
	}
})


