/*common*/
var $=require('wap/zepto');
var tracking = require('wap/app/tracking');

var QRCode = require('component/qrcode');
var timer;


//app 登录
if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
		window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
window.MLS = {
    didLogin : function(){  
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}
var shareText =  '起初看到关键词的那一刻，其实我们是拒绝的，后来看了解读......';
var shareImg =  'http://d05.res.meilishuo.net/pic/_o/a2/35/42a7dd2333d0c4c23cc44197b8e8_200_200.cf.png';
var shareTitle =  '我们的爱情关键词居然是酱紫！';
var shareUrl =  window.location.href;
if(fml.vars.isWx){
	//初始化加载分享的资源。
    var shareData;
    var signWX = require('wx/sign'),
        shareWX = require('wx/share');
        signWX();
    shareData = {
        'desc' : shareText ,
        'imgUrl' : shareImg ,
        'title' : shareTitle ,
        'url' : shareUrl
    };
	shareWX.bind(shareData);
}
	



$(".start").on("click",function(){
	//app 登录
	if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
			window.location.href = 'meilishuo://login.meilishuo/?json_params=';
	}else{
		$(".step1").hide();
		$(".step2").show();
		init();
		timer = setInterval(search,500);
	}

	//埋点
	tracking.cr('bilayer_game',{action:'click',page:'home_page',area:'home_page_start'});
});
function init(){
	var code = $('#qrcode_c'),
		screenWidth = $(window).width();
		qrcodeWidth = code.width(),
		code.height(qrcodeWidth);
		code.html('');
		useCode();
};
function useCode(){
	var code = $('#qrcode_c');
	var thisURL = window.location.protocol+'//'+window.location.host+'/activity/twoScreen/guest/?gid='+fml.vars.gid ;
	if(code){
		var qrcode = new QRCode(qrcode_c, {  
	        width : qrcodeWidth,  
	        height : qrcodeWidth  
	    }); 
			qrcode.makeCode(thisURL); 
			
	}

};
//轮询二维码
function search(){
	$.ajax({
		type:"get",
		url:"/aj/twoScreen/player",
		data : {
			gid : fml.vars.gid
		},
		dataType:'json',
		success : function(res){
			if( res.data.flag == 1){
				clearInterval(timer);
				window.location.href = '/activity/twoScreen/guest/?gid='+fml.vars.gid ;
			}
			if( res.data.flag == 0){
			}	
		},
		error : function(){					
		}

	});
};







