/*common*/
require('wap/zepto');

//中奖上翻滚
function upScroll(wraper,scrollDom,speed){
    var wraper = $(wraper),
    	scrollDom = $(scrollDom),
    	scrollDomChlid = scrollDom.find('li'),
    	h = scrollDomChlid.height(),
    	s = parseInt(speed);

    var scroll =function () {
    	scrollDom.animate({'margin-top': -h },function(){
			scrollDom.find('li').eq(0).appendTo(scrollDom);
			scrollDom.css({'margin-top':0});
		});
	};

    var ad = setInterval(scroll,s);

};
upScroll("#scrollWarp","#scrollDom",2000);


//调用ui的提示框
var Alert = require('wap/ui/alert');
function alertCon(msg){
	var a = new Alert({
		content : msg
	});
};
	
//页面初始化
var windowWidth = $(window).width()
    ,windowHeight = $(window).height();
$('.main').css({'height':windowHeight});

//touchmove禁止事件冒泡
function touchmoveStop(dom){
	if ($.isArray(dom)) {
		$.each(dom,function(index, item){
			$(dom[index]).on('touchmove', function(e) {
				e = e || window.event;
				e.preventDefault();
				e.stopPropagation();
			});
		});
	}else{
		if(dom){
			$(dom).on('touchmove', function(e) {
				e = e || window.event;
				e.preventDefault();
				e.stopPropagation();
			});
		}
		
	};
};
touchmoveStop(['.main','#mypopbox','.fixedWarp']);



//Cookie 操作
function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1 ;
			c_end=document.cookie.indexOf(";",c_start) ;
			if (c_end==-1){ c_end=document.cookie.length }

			return unescape(document.cookie.substring(c_start,c_end))

		}
	}
	return "";
};

function setCookie(c_name,value,expiredays){
	var exdate = new Date();

	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};

var shares = parseInt( getCookie('my_shares_num')|| 0 ),
	haveShared = 0,
	usedTimes = 0;
function getnumFn(){
	var url = '/aj/ws_shake/shake_get',
		_data = {};
	$.get(url, _data, function(res) {
		res = JSON.parse(res);
		
		if(res.data.user.haveShared == 0){
			shares = 0;
			setCookie('my_shares_num',shares,1);

			haveShared =  res.data.user.haveShared;
			usedTimes = res.data.user.usedTimes
		}else if(res.data.user.haveShared == 1){
			var  shares_num = parseInt( getCookie('my_shares_num') );
			shares = (shares_num >= 1) ? shares_num : 1 ;
			haveShared =  res.data.user.haveShared;
			usedTimes = res.data.user.usedTimes + 6;
		};
		
	});
};
getnumFn();


function shareFn(){
	var url = '/aj/ws_shake/shake_share',
		_data = {};
	$.get(url, _data, function(res) {
		res = JSON.parse(res);
		//console.log(res);
		shares+=1;
		setCookie('my_shares_num',shares,1);
		if(res.data.user.haveShared == 0){
			haveShared =  res.data.user.haveShared;
			usedTimes = res.data.user.usedTimes
		}else if(res.data.user.haveShared == 1){
			haveShared =  res.data.user.haveShared;
			usedTimes = res.data.user.usedTimes + 6;
		};
	});
};
$('.shareTo a').click(function(i){
	shareFn();
});


//分享文字设置
var shakePrize ={
	1:'iPhone6 Plus 一台',
	2:'iPad mini 3 一台',
	3:'Beats Mixr 混音师头戴耳机 一部',
	4:'小恶魔电源 一个'
};

var  nowinShereText = 'duang~我在美丽微店参与0元抢iPhone6 Plus，快来和我一起任性变土豪吧！';
var  winshereTextStart = 'duang~我在美丽微店摇一摇活动中了';
var  winshereTextEnd = '小伙伴们速来围观，有图有真相！';
var sharaImg = 'http://d05.res.meilishuo.net/pic/_o/5d/54/4ecf69d4637fe395546107b236ec_100_100.cf.jpg';
var shareDomin = window.location.protocol+'//'+window.location.host+'/ws/ws-share/';
var sheraText = {
	pyq : "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent('{"type":"weixin_timeline","text":"'+ nowinShereText +'","url":"'+shareDomin+'?frm=weixin_timeline","thumb_url":"'+ sharaImg +'","message_type":"webpage","title":"duang~我在美丽微店参与0元抢iPhone6 Plus，快来和我一起任性变土豪吧"}'),
	wx : "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent('{"type":"weixin","text":"'+ nowinShereText +'","url":"'+shareDomin+'?frm=weixin","thumb_url":"'+ sharaImg +'","message_type":"webpage","title":"duang~我在美丽微店参与0元抢iPhone6 Plus，快来和我一起任性变土豪吧"}'),
};

$('.shareTo a').each(function(i){
	$(this).attr({
		href: sheraText[$(this).attr('name')]
	});
});

function winShereText(n){
	var texts = {
		pyq : "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent('{"type":"weixin_timeline","text":"'+ winshereTextStart +shakePrize[n]+ winshereTextEnd +'","url":"'+shareDomin+'?frm=weixin_timeline","thumb_url":"'+ sharaImg +'","message_type":"webpage","title":"'+ winshereTextStart +shakePrize[n]+ winshereTextEnd +'"}'),
		wx : "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent('{"type":"weixin","text":"'+ winshereTextStart +shakePrize[n]+ winshereTextEnd  +'","url":"'+shareDomin+'?frm=weixin","thumb_url":"'+ sharaImg +'","message_type":"webpage","title":"'+ winshereTextStart +shakePrize[n]+ winshereTextEnd +'"}'),
	};
	$('.shareTo a').each(function(i){
		$(this).attr({
			href: texts[$(this).attr('name')]
		});
	});
}


//弹出框开关控制
window.shakeFlag = 0  ; //0没摇过，可以摇，1已摇，不能继续摇。

window.winFlag = false;

function popClose(){
	$('#mypopbox').hide();
	$('.dialog').hide();
	$('#dialogNowinShare').show();
	window.shakeFlag = 0;
};

$('#mypopbox .close , #againBut').click(function(){ //, #mypopbox .overlay
	if(!window.winFlag){
		popClose();
	}else{
		window.location.reload();
	}
});

function popOpen(type,level){
	popClose();

	window.shakeFlag = 1;
	$('#mypopbox').show();
	$('#mypopbox .overlay').show();
	if( type == 'Win' && level){
		$('#dialogWinPrize').html( shakePrize[level] );
	}
	
	$('#dialog'+type).show();
	
	if( type == 'Input'){
		$('#name').focus();
	};
};



// function keepFn(){
	
// 		$('#clearBut').append(" <b> Hello world! </b> ");
	
// };

//摇一摇中奖
var util = require('wap/page/ws/util-shake');
util.shake(function(date){
	
	if(window.shakeFlag == 0){
		lotteryFn() ;
	}
	
});

function lotteryFn(){
	
	window.shakeFlag = 1;

	shares = parseInt( getCookie('my_shares_num')|| 0 );

	//keepFn();

	$('.swimg').addClass('shake-act');

	$('.swimg').on('webkitAnimationEnd',function(){
		$('.swimg').removeClass('shake-act');
	});


	if(shares == 0 &&  usedTimes >=1 ){
		
		setTimeout(function(){
			popOpen('Share');
		},2000)
		return ;
	}

	if(shares == 1 &&  usedTimes >=4 ){
		
		setTimeout(function(){
			popOpen('Share');
		},2000)
		return;
	}

	if(shares >= 2 &&  usedTimes >=7){
		
		setTimeout(function(){
			popOpen('Nocount');
		},2000)
		return;
	}


	var url = '/aj/ws_shake/shake_set',
		_data = {};
	


	$.get(url, _data, function(res) {
		res = JSON.parse(res);
		
		getnumFn();

		setTimeout(function(){
			if (res.error_code == 1) {
				if (res.data.award) {
					var _level = res.data.award.prize_level;
					winShereText(_level);
					window.winFlag = true ;
					popOpen('Win',_level);

				}else{
					
					popOpen('Nowin');
				}
			}else if(res.error_code == 0){
				
				popOpen('Nowin');
			}else if(res.error_code == -1){
				if(shares < 2){
					
					popOpen('Share');
				}else{
					popOpen('Nocount');
				}
			}
		},2000)
	});

};

// 中奖后收件人输入框
$('#winBut').click(function(){
	popClose();
	popOpen('Input');
});


$('.mask-btn-one').on('click', function(){
	$('#dialogInput input').blur();

	var _this = $(this);
	var _data = {
		'name' : $('#name').val(),
		'mobile' : $('#tel').val(),
		'address' : $('#addr').val()
	};
	var _num = _data.mobile;
	if(!_data.name || !_data.address) return alertCon('信息输入不完整，请重新输入。');
	if(!/^\d{11}$/.test(_num)) return alertCon('手机号输入错误，请重新输入。');
	$.post('/aj/wx_new/shake_save', _data, function(data) {
		data = JSON.parse(data);
		
		if (data.error_code == 0) {
			popOpen('Submit');
		}else{
			alertCon(data.message);
		};
	});
});

//popOpen('Win');

// $('#test_but').click(function(){
// 	lotteryFn();
// });





