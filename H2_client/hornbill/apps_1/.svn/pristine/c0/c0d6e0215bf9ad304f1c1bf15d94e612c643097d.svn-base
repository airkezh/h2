/*common*/
var $ = require('jquery')
	,shareTmp = require('component/shareTmp')
	,dialog = require('ui/dialog')
	,share = require('app/shareTo')

$('.video_btn_wrapper').on('click', 'a', function(event) {
	event.preventDefault();
	if($(this).hasClass('act')) return
	$(this).addClass('act').siblings('.act').removeClass('act')
	var flashid = $(this).data('vid')
	var html = shareTmp('video_tmp',{flashid:flashid})
	$('.video_wrapper').html(html)
});


$('.s_btn_r').on('click', function(event) {
	event.preventDefault();
	$('.s_all').animate({marginLeft:"-100%"}, 300)
});

$('.s_btn_l').on('click', function(event) {
	event.preventDefault();
	$('.s_all').animate({marginLeft:"0"}, 300)
});

function pop(sid){
	var tpl = shareTmp(sid);
	var popRule = new dialog({ 
		'content':tpl , 
		'width': '714px' , 
		'onStart':function(){
			$('#overlay').css({'background-color':'white'});
		},
		'onChange' : function(){
			$('#dialogTitle').hide(); 
			$('#dialogLayer').css({'background':'none' , 'padding-right':'20px','filter':''});
			$('#dialogContent').css({});
		},
		'onClose' : function(){}
		});
		$('.close_btn').on('click' , function(){
			popRule.drive.destroyModel();
		});
}

var aid = 0
$('.share_btn').on('click', function(event) {
	event.preventDefault();
	var s_url=location.href
		,s_content="＃一秒水光肌，约会MR.光鹿晗＃ 深情对视or摸摸脸or霸道壁咚，任选一种你希望鹿晗对你做的事！分享视频，即可获得鹿晗限量版表情包，一起来分享吧！@美丽说 "
	share.shareToWeibo(s_url, s_content, false);
	if(aid) return
	aid = setTimeout(function(){
		pop('pop_tmp')
		aid = 0
	},3000)
	
});