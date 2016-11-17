/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');
require('wap/component/shareTmp');

var tracking = require('wap/app/tracking');

var WXShare = require('wx/share');
var WXSign = require('wx/sign');
var randomN = require('wap/component/lark/random');
var openApp = require('wap/app/openApp');

if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
	$('.first-btn').attr('href','meilishuo://login.meilishuo/?json_params=');
	window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
window.MLS = {
    didLogin : function(){
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}

/* 第一页面助攻按钮 */
var firstHeight = $('.first-bg').height();
var firstFrm = fml.vars.isWx?'isWx':'isMLS'
$('.first-btn').attr('href',$('.first-btn').attr('href')+'&frm='+firstFrm);

/* 活动规则按钮 */
$('.first-rules').on('touchstart',function(){
	$('.first-popwin').css('height',$('body').height()+100).show();
	$('.first-popwin-know').css('top',$('body').height()*0.04 + $('.first-popwin-rules').height()*0.88 + 'px');
	$('.rules-content').css({
		'top':$('body').height()*0.04 + $('.first-popwin-rules').height()*0.14 + 'px',
		'height' : $('.first-popwin-rules').height() * 0.66 + 'px'
	});
	$('.first-popwin-know').on('touchstart',function(){
		$('.first-popwin').hide();
	});
});

/* 朋友头像 */
$('.friend-img').css('height',$('.friend-img').width());

/* 助攻按钮 */
var zhuFlag = 0;
function myajax(){
    $.ajax({
        type : 'get',
        url : '/aj/distance/friend',
        data : {
        	ass_gid : fml.vars.ass_gid
        },
        success : function(data){
            res = JSON.parse(data);
            // console.log(res);
            if(res && res.error_code ==0 ){
            	
            	// console.log(res.data.assistant[0]);
            	var jinduW = res.data.originator.fin_dist / res.data.originator.total_dist * 100;
            	var jinducha = res.data.originator.total_dist - res.data.originator.fin_dist;
            	$('.have-jindu').css('width',jinduW + '%');
            	$('.num2').html(jinducha);
            	$('.friend-txt-change').show();
            	$('.cha-distance').hide();
            	$('.num-friend').html(res.data.assistant[0].ass_dist);

            	var newMsg = res.data.assistant[0];
            	var friendsMsg = $('<div class="friends-msg"></div>');
            	var friendsImg = $('<div class="friend-img"></div>');
            	friendsMsg.append(friendsImg);
            	var img = $('<img src="'+ newMsg.user_pic +'">');
            	friendsImg.append(img);
            	var friendName = $('<span class="friend-name">'+ newMsg.nick_name +'</span>');
            	var friendDesc = $('<span class="friend-desc">&nbsp;&nbsp;&nbsp;'+ newMsg.ass_desc +'</span>');
            	var friendDistance = $('<span class="friend-distance">'+ newMsg.ass_dist +'米</span>');
            	friendsMsg.append(friendName);
            	friendsMsg.append(friendDesc);
            	friendsMsg.append(friendDistance);
            	$('.friends-list').prepend(friendsMsg);

            	$('.zhu-btn').hide();
            	$('.play-btn').css({'margin-left':'auto','margin-right':'auto'});
            	//路程结束
            	if(res.data.originator.fin_status == 1){
            		window.location.href = '/activity/distance/award/?ass_gid=' + fml.vars.ass_gid;
            	}
			}
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
           
        }
    });
};
$('.zhu-btn').on('touchstart',function(){
	if(zhuFlag == 0){
		myajax();
	}
	zhuFlag++;
});

/* 花 */
var aFlowers = $('.flower');
var firstImgH = $('.title').height(),
	secondImgH = $('.person').height();

$(aFlowers).eq(0).css({'top':firstImgH + secondImgH * 0.21 + 'px', 'left':'23%'});
$(aFlowers).eq(1).css({'top':firstImgH + secondImgH * 0.6 + 'px', 'left':'31%'});
$(aFlowers).eq(2).css({'top':firstImgH + secondImgH * 0.26 + 'px', 'left':'57%'});
$(aFlowers).eq(3).css({'top':firstImgH + secondImgH * 0.18 + 'px', 'left':'94%'});

/* 优惠券*/
function coupon(){
	
	$.ajax({
	    type : 'get',
	    url : '/aj/distance/coupon',
	    data : {
	    	'act_code' : 'friend_help',
	    	'her_id' : fml.vars.originatorId
	    },
	    dataType: 'json',
	    success : function(res){
	        

	       if(fml.vars.role !=1 ){
	       		
	       		$('.friend-txt-thank2').show();
	       		
	       		if(res.data.length > 0){
	       			if(res.data[0].award_id == 119){
			    		$('.friend-money span').html('1');
			    		$('.friend-money p').html('无门槛使用');
			    		$('.money-friend').html('1元现金券');
			    		$('.friend-money').show();
			    	}else if(res.data[0].award_id == 121){
			    		$('.friend-money span').html('5');
			    		$('.friend-money p').html('无门槛使用');
			    		$('.money-friend').html('5元现金券');
			    		$('.friend-money').show();
			    	}else if(res.data[0].award_id == 123){
			    		$('.friend-money span').html('10');
			    		$('.friend-money p').html('消费满20使用');
			    		$('.money-friend').html('10元现金券');
			    		$('.friend-money').show();
			    	}else if(res.data[0].award_id == 125){
			    		$('.friend-money span').html('15');
			    		$('.friend-money p').html('消费满30使用');
			    		$('.money-friend').html('15元现金券');
			    		$('.friend-money').show();
			    	}else{
			    		
			    		$('.friend-txt-thank2').html('谢谢各位大神么么哒！');
			    	}
	       		}else{
	       			$('.friend-txt-thank2').html('谢谢各位大神么么哒！');
	       		}

		       
		    }else{
		    	$('.txt-thank2').show();

	       		if(res.data.length > 0){
			    	if(res.data[0].award_id == 119){
			    		
			    		$('.money span').html('1');
			    		$('.money p').html('无门槛使用');
			    		$('.txt-thank span').html('1元现金券');
			    		$('.money').show();
			    		
			    	}else if(res.data[0].award_id == 121){
			    		
			    		$('.money span').html('5');
			    		$('.money p').html('无门槛使用');
			    		$('.txt-thank span').html('5元现金券');
			    		$('.money').show();
			    		
			    	}else if(res.data[0].award_id == 123){
			    		
			    		$('.money span').html('10');
			    		$('.money p').html('消费满20使用');
			    		$('.txt-thank span').html('10元现金券');
			    		$('.money').show();
			    		s
			    	}else if(res.data[0].award_id == 125){
			    		
			    		$('.money span').html('15');
			    		$('.money p').html('消费满30使用');
			    		$('.txt-thank span').html('15元现金券');
			    		$('.money').show();
			    		
			    	}else{
			    		
			    		$('.txt-thank2').html('美丽说提前预祝你七夕快乐！');
			    	}
			    }else{
			    	$('.txt-thank2').html('美丽说提前预祝你七夕快乐！');
			    }
		    	
			}
	    },
	    error:  function (XMLHttpRequest, textStatus, errorThrown) {}
	});
}
function meCoupon(){

	$.ajax({
	    type : 'get',
	    url : '/aj/distance/lottery',
	    data : {
	    	'act_code' : 'friend_help'
	    },
	    dataType: 'json',
	    success : function(res){
	    	if( res.data.id == 119){  //线上119
	    		$('.money span').html('1');
	    		$('.money p').html('无门槛使用');
	    		$('.txt-thank span').html('1元现金券');
	    		$('.money').show();
	    	}else if(res.data.id == 121){
	    		$('.money span').html('5');
	    		$('.money p').html('无门槛使用');
	    		$('.txt-thank span').html('5元现金券');
	    		$('.money').show();
	    	}else if(res.data.id == 123){
	    		$('.money span').html('10');
	    		$('.money p').html('消费满20使用');
	    		$('.txt-thank span').html('10元现金券');
	    		$('.money').show();
	    	}else if(res.data.id == 125){
	    		$('.money span').html('15');
	    		$('.money p').html('消费满30使用');
	    		$('.txt-thank span').html('15元现金券');
	    		$('.money').show();
	    	}else{
	    		$('.txt-thank2').html('美丽说提前预祝你七夕快乐！');
				$('.money').hide();
	    	};
	        $.ajax({
		       	type : 'get',
			    url : '/aj/distance/set',
			    data : {},
			    dataType: 'json',
			    success : function(res){
			    	
				},
				error:  function (XMLHttpRequest, textStatus, errorThrown) {
					console.log('distance/set  error');
				}
	    	});


	    },
	    error:  function (XMLHttpRequest, textStatus, errorThrown) {}
	});
}

if(fml.vars.status == '1' && fml.vars.role == '1' && fml.vars.got_coupon == '0'){
	meCoupon();
};

if(fml.vars.got_coupon == '1'){
	coupon();
};

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

//分享文字内容    //后面会呆一个字
var shareTextArr = ['含泪求助攻！','真爱快来送助攻！','给我个助攻好么~','求神助攻出现！','等你送助攻喔~','送助攻瘦十斤！',
				'姐妹们来助攻我！','I NEED 助攻！','我需要你们助攻！','我的助攻在哪里！'];
fml.vars.jinducha = fml.vars.jinducha ? fml.vars.jinducha : '7000';
var shareText =  '美丽说七夕特别策划，情侣成功相遇就有机会得优惠券！1-15元领到手软！还有777直减大礼等你哦~',
	shareImg =  'http://d03.res.meilishuo.net/pic/_o/a7/57/2d79ed9a3369988f7d0c986e0fa3_200_200.cg.jpg' ,
	shareTitle =  "还差"+ fml.vars.jinducha +"m就能得券，最高777！" + shareTextArr[ randomN(9) ] ,
	shareUrl =  window.location.href;

if(fml.vars.status == '1'  || fml.vars.pageId == 'index'){
	shareTitle =  '我得到现金券啦！在美丽说我又相信爱情了~';
};

if(Meilishuo.config.os.mlsApp){
	var schemeJsonWx = {
        	type : 'weixin' , 
        	message_type : 'webpage' ,
        	title : shareTitle,
        	text : shareText,
        	url : shareUrl + '&frm=friend',
        	thumb_url : shareImg 
        }
    	,schemeLinkWx = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonWx));

    $('#shareBut_wx').attr('href',schemeLinkWx);

	var schemeJsonPyq = {
        	type : 'weixin_timeline' , 
        	message_type : 'webpage' ,
        	title : shareTitle,
        	text : shareText,
        	url : shareUrl + '&frm=pengyouquan',
        	thumb_url : shareImg
        }
    	,schemeLinkPyq = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonPyq));

    $('#shareBut_pyq').attr('href',schemeLinkPyq);
	
	$('.start-btn').on('click',function(){
		$('#mypopbox , #dialog_appshare').show();
	});

	$('.shai-btn').on('click',function(){
		$('#mypopbox , #dialog_appshare').show();
	});

	$('.shareBut_close').on('click',function(){
		$('#mypopbox , #dialog_appshare').hide();
	});	

};

if(fml.vars.isWx){
// 设置微信二次分享
	var shareData = {
        'desc' : shareText ,
        'imgUrl' : shareImg ,
        'title' : shareTitle ,
        'url' : shareUrl
    };

	//初始化加载分享的资源。
    WXSign();
    shareData = {
        'desc' : shareText ,
        'imgUrl' : shareImg ,
        'title' : shareTitle ,
        'url' : shareUrl
    };

	WXShare.bind(shareData)

	/* 分享按钮*/
	$('.start-btn').on('click',function(){
		$('.share-popwin').css( 'height' , $('body').height()+100 );
		$('.share-popwin').show();
	});

	$('.shai-btn').on('click',function(){
		$('.share-popwin').css( 'height' , $('body').height()+100 );
		$('.share-popwin').show();
	});

	$('.share-popwin').on('click',function(){
		$(this).hide();
	});
}

if(fml.vars.isWx){
	$('.guang-btn').attr('href','http://m-promotion.meilishuo.com/promotion/sale_1508/mv/?isFromShare=true&frm=zhuli');
};

// 埋点
$('.first-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'home_page',area:'home_page_start'});
});
$('.guang-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'winning_page',area:'winning_page_promotion'});
	//openApp(hcUrl);
});
$('.start-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'help_page',area:'help_page_invitation'});
});
$('.shai-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'winning_page',area:'winning_page_show'});
});
$('.zhu-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'friend_help_page',area:'friend_help_page_assist'});
});
$('.play-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'friend_help_page',area:'friend_help_page_play'});
});
$('.search-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'friend_help_page',area:'friend_help_page_followup'});
});
$('.friend-play-btn').on('touchstart',function(){
	tracking.cr('friend_assists',{action:'click',page:'winning_page',area:'winning_page_play'});
});


