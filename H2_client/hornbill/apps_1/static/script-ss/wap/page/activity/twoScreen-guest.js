/*common*/
require('wap/jquery');
require('wap/component/lark/slotmachine');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var util = require('wap/page/ws/util-shake');


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
util.shake(function(date){
	if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
		window.location.href = 'meilishuo://login.meilishuo/?json_params=';
	}
})

var clearShake,
	machine = [];
//摇一摇
fml.vars.srandNub = -1;
fml.vars.shakeS = 1;
if(fml.vars.user_C != "C" && fml.vars.flag2 == 1){
	fml.vars.shakeS = 0;
};

//轮询是否扫过二维码
$.ajax({
	type:"get",
	url:"/aj/twoScreen/player",
	data : {
		gid : fml.vars.gid
	},
	dataType:'json',
	success : function(res){
		if( res.data.flag == 1){
			if(fml.vars.user_C != "C" && fml.vars.flag2 == 0){
				tracking.cr('bilayer_game',{action:'jump',page:'game_page',area:'pair_succ'});
			}
			fml.vars.srandNub = res.data.data.srand;
			/*$(".love_keyword").on("tap",function(){
				$('.result_loading').show();
				$(".ready_shake").hide();
				$(".result").show();
				$(".keyword").show();
				$(".keyword1").hide();
				
				for(var i = 0 ;i < 4;i++){
					machine[i] =  $("#text_box"+i).slotMachine({
						active	: 1,
						delay	:2000,
						randomize : function(activeElementIndex){
							return res.data.data.srand
						}});
					machine[i].shuffle();
				}
				clearShake = setInterval(searchShake,2000);
			})*/
		/*摇一摇*/
		};
		if( res.data.flag == 0){
		}		
	},
	error : function(){
	}
});

util.shake(function(date){
	if(fml.vars.user_C != "C" && fml.vars.srandNub >= 0){
		if(fml.vars.shakeS){
			$('.result_loading').show();
			$(".ready_shake").hide();
			$(".result").show();
			$(".keyword").show();
			$(".keyword1").hide();
			tracking.cr('bilayer_game',{action:'jump',page:'game_page',area:'shake_key'});
			for(var i = 0 ;i < 4;i++){
				machine[i] =  $("#text_box"+i).slotMachine({
					active	: 1,
					delay	:2000,
					randomize : function(activeElementIndex){
						return fml.vars.srandNub;
					}});
				machine[i].shuffle();
			}
			clearShake = setInterval(searchShake,500);
		}

	}
	
});


//轮询摇一摇
var count = 0;
//var lock = 0;
function searchShake(){
	//count = count + 1;
	$.ajax({
		type:"get",
		url:"/aj/twoScreen/love_dec",
		data : {
			gid : fml.vars.gid
		},
		dataType:"json",
		success : function(msg){
			fml.vars.shakeS = 0;
			if(msg.data.flag == 0){
				/*if(count > 15){
					alert("超时了")
					clearInterval(clearShake);
				}*/
			}
			if(msg.data.flag == 1){
				//if(lock == 0){
				$('.result_loading').show();
				setTimeout(function(){
					$(".male_min span").html(msg.data.data.words[parseInt(msg.data.data.srand)].userA);
					$(".female_min span").html(msg.data.data.words[parseInt(msg.data.data.srand)].userB);
					$(".wait").hide();
					$(".next").show();	
				},1000);
				for(var i = 0 ;i < 4;i++){
					(function( i ) {
						setTimeout(function(){
							machine[i].stop();
						}, 200 * i );
					})( i )
				}
				tracking.cr('bilayer_game',{action:'jump',page:'game_page',area:'game_over',gid:fml.vars.gid});
				clearInterval(clearShake);
				//lock = 1;
				//}
			}
			
		},
		error : function(){
			fml.vars.shakeS = 1;	
		}
	});

}

//分享
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
	
if(Meilishuo.config.os.mlsApp){
	var schemeJsonWx = {
        	type : 'weixin' , 
        	message_type : 'webpage' ,
        	title : shareTitle,
        	text : shareText,
        	url : shareUrl+"&frm=friend",
        	thumb_url : shareImg
        }
    	,schemeLinkWx = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonWx));
    $('#shareBut_wx').attr('href',schemeLinkWx);
	var schemeJsonPyq = {
        	type : 'weixin_timeline' , 
        	message_type : 'webpage' ,
        	title : shareTitle,
        	text : shareText,
        	url : shareUrl+"&frm=pengyouquan",
        	thumb_url : shareImg
        }
    	,schemeLinkPyq = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonPyq));
    $('#shareBut_pyq').attr('href',schemeLinkPyq);
	
	$(".shareBut_close").on("click",function(){
		$("#mypopbox").hide();
	})
};
	
$(".show_love").on("click",function(){
	//埋点
	tracking.cr('bilayer_game',{action:'click',page:'game_page',area:'game_page_share'});
	
	if(Meilishuo.config.os.mlsApp){
		$(".mypopbox").show();
		$("#dialog_appshare").show();
	}
	if(fml.vars.isWx){	                   
		$(".mypopbox").show();
		$("#dialog_wxshareguide").show().on("click",function(){
		$("#mypopbox").hide();
		});
	}

});


if(fml.vars.user_C == "C"){
	tracking.cr('bilayer_game',{action:'jump',page:'game_page',area:'others_see_end'});
}	

//我还要玩埋点
$(".play_again").on("click",function(){
	tracking.cr('bilayer_game',{action:'click',page:'game_page',area:'game_page_again'});
});

//818埋点
$(".go-to").on("click",function(){
	//openApp('http://m-promotion.meilishuo.com/promotion/sale_1508/mv/');
	tracking.cr('bilayer_game',{action:'click',page:'game_page',area:'game_page_promotion'});
});
//我也要玩埋点
$(".play").on("click",function(){
	tracking.cr('bilayer_game',{action:'click',page:'frishare_page',area:'frishare_page_again'});
});
//c 818大促 埋点
/*$(".C_go_to").on("click",function(){
	//openApp('http://m-promotion.meilishuo.com/promotion/sale_1508/mv/');
	tracking.cr('bilayer_game',{action:'click',page:'frishare_page',area:'frishare_page_promotion'});
});*/

	




