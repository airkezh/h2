/*common*/

require('wap/zepto');

//调用ui的提示框
var Alert = require('wap/ui/alert');
function alertCon(msg){
	var a = new Alert({
		content : msg
	});
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



//页面初始化
var windowWidth = $(window).width()
    ,windowHeight = $(window).height();
$('#warp').css({'height':windowHeight});


//touchmove禁止事件冒泡

$('#warp,#game,#game_box').on('touchmove', function(e) {
    //e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
});



//禁止事件冒泡
$('.dialog').click(function(e){
    e.stopPropagation();
})

$('#start_but').click(function(){
    $('#index').hide();
    $('#game').show();

	startGame();
})

$('.js_addressBut').click(function(){
    $('#index').hide();
    $('#game').hide();
    $('.dialog').hide();
	$('#mypopbox').hide();
    $('#address').show();
})

$("#dialogRuleClose").click(function(){
	$('.dialog').hide();
	$('#mypopbox').hide();
})


$("#dialogGiftClose").click(function(){
	$('.dialog').hide();
	$('#mypopbox').hide();
})

$("#giftBut").click(function(){
	$('.dialog').hide();
	$('#dialogGift').show();
	$('#mypopbox').show();
})

$("#ruleBut").click(function(){
	$('.dialog').hide();
	$('#dialogRule').show();
	$('#mypopbox').show();
})

$("#mypopbox").click(function(){
	$('.dialog').hide();
	$('#wxGuide').hide();
	$('#mypopbox').hide();
})


$(".js_gameStart").click(function(){
	$('.dialog').hide();
	$('#wxGuide').hide();
	$('#mypopbox').hide();

	$('#index').hide();
	$('#game').show();

	startGame();
})


//分享 
if(fml.vars.isWx){
      
    //初始化加载分享的资源。
    var shareData;
    var signWX = require('wx/sign'),
        shareWX = require('wx/share');
        signWX();
        
    var shareData = {
        'desc' : fml.vars.shareContent,
        'imgUrl' : fml.vars.shareIcon,
        'title' : fml.vars.shareTitle,
        'url' : fml.vars.shareLink
    };
    
    shareWX.bind(shareData);

    $('.shareBut').click(function(){
        $('#mypopbox').show();
        $('.dialog').hide();
        $('#wxGuide').show();
    })


}else{
	var schemeJsonObj = {
        	type : 'weixin_timeline' , 
        	message_type : 'webpage' ,
        	title : fml.vars.shareTitle ,
        	text : fml.vars.shareContent ,
        	url : fml.vars.shareLink ,
        	thumb_url : fml.vars.shareIcon
        }
		,schemeJson = JSON.stringify(schemeJsonObj)
    	,schemeLink = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(schemeJson) ;

    $('.shareBut').attr('href',schemeLink)

}



//pt

var imgBase64 = require('wap/page/activity/designer-pt-img')
function randomN(Min,Max){
	return (Min + Math.round(Math.random() * (Max - Min)));
};
var ex = require("wap/app/lark/splitImg2");
var opt = {
    file : imgBase64[randomN(0,7)],//
    split : 3,//切分成4*4的图
    cbk : function(code,arr){
    	if (code == 0) {
    		$('#game_box').remove();
    		var liWidth = (windowWidth*0.7)/opt.split;
    		$('#game').append($('<div id="game_box" class="game_box" >'));

    		var gameBoxW = windowWidth * 0.71 ;
			$('#game_box').css({'width':gameBoxW,'height':gameBoxW});

			var  split = this.split;
	    	for(var i = 0; i < split*split; i++){
				$('#game_box').append($('<img style="width:'+liWidth+'px'+';float:left;margin-right:1px;margin-bottom:1px;">').attr({'src':arr[i],'num':i+1}))
			}
			setTimeout(function(){
				start();

			},4000);

			
			countDown();


    	}else{
    		alert('error');
    	}
    }
}

var gamePlaying = 0;

function startGame(){
	gamePlaying = 1 ;
	opt.file = imgBase64[randomN(0,7)];
	ex(opt);
};
	


function countDown(){
	$('.time_box').html(countTime);
	$("#countDown").show().html('Ready').animate({'font-size':'50px'},500)
	
	setTimeout(function(){
		$("#countDown").html('Go').css({'font-size':'60px'}).animate({'font-size':'50px'},500)
	},500)

	setTimeout(function(){
		$("#countDown").html('3')
	},1000)

	setTimeout(function(){
		$("#countDown").html('2')
	},2000)
	setTimeout(function(){
		$("#countDown").html('1')
	},3000)
	setTimeout(function(){
		$("#countDown").hide();
	},4000)
};

var countTime = 20;
var countTimeInt;

function start(){

	function countTimeFn(){
		countTime = 20 ;
		
		countTimeInt = setInterval(function() {
			
			$('.time_box').html(countTime);
			countTime--;
			
			if(countTime < 1){
				
				$('#dialogAlert0').show();
				$('#mypopbox').show();
				gamePlaying = 0;
				clearInterval(countTimeInt);
				
			}
		}, 1000)
	};
	countTimeFn();

	var split = opt.split;
	var aImg = $("#game_box img");
	aImg.sort(function(){return Math.random()>0.5?-1:1;})
	var liWidth = (windowWidth*0.7)/split;
	for(var i=0;i<aImg.length;i++){
		aImg.eq(i).css("width",liWidth); //aImg.eq(i).css();
	}
	var width = $(aImg[0]).width()+1;
	var height = $(aImg[0]).height()+1;
	for(var i=0;i<aImg.length;i++){
		var top = parseInt(i/split)*height;
		var left = parseInt(i%split)*width;
		aImg.eq(i).css({"position":"absolute","left":left,"top":top});
	}
	for(var i=0;i<aImg.length;i++){ 
		var zIndex = 0;
		var flag = 0;
		(function(i){
			aImg[i].addEventListener('touchstart' , function (e) {
				var _this = this;
				iMinIndex = 0;
				flag = 0;
				var e = e || event;
				position = {left:aImg[i].offsetLeft,top:aImg[i].offsetTop};
				disX = e.targetTouches[0].pageX - aImg[i].offsetLeft;
				disY = e.targetTouches[0].pageY - aImg[i].offsetTop;
				_this.style.zIndex = ++zIndex;
				
			});
			aImg[i].addEventListener('touchmove' , function (e) {
				flag = 1;
				var _this = this;
				var e = e || event;
				var l = e.targetTouches[0].pageX - disX;
				var t = e.targetTouches[0].pageY - disY;
				if (l<0) {
					l = 0;
				} else if (l>document.documentElement.clientWidth - aImg[i].offsetWidth) {
					l = document.documentElement.clientWidth - aImg[i].offsetWidth;
				}
				if (t<0) {
					t = 0;
				}else if (t>document.documentElement.clientHeight - aImg[i].offsetHeight) {
					t = document.documentElement.clientHeight - aImg[i].offsetHeight;
				}
				aImg[i].style.left = l +'px';
				aImg[i].style.top = t +'px';

				// 调用碰撞检测
				iMinIndex = findNearest(_this);
				endX = aImg[iMinIndex].offsetLeft;
				endY = aImg[iMinIndex].offsetTop;
				if(e && e.preventDefault) {  
					//阻止默认浏览器动作(W3C)  
					e.preventDefault();  
				} else {  
					//IE中阻止函数器默认动作的方式   
					window.event.returnValue = false;   
				}
		        return false;
			});
			aImg[i].addEventListener('touchend' , function () {
				var _this = this;
				if(flag ==1){
					aImg[iMinIndex].style.left = position.left + 'px';
					aImg[iMinIndex].style.top = position.top + 'px';
					_this.style.left = endX + 'px';
					_this.style.top = endY + 'px';
					
					success();
				}
			});
		})(i);
		
		//判断位置是否正确
		function success(){
			var aImg = $("#game_box img");
			for(var i=0;i<aImg.length;i++){
				var _l = parseInt(aImg[i].style.left)/width + 1 +  split * (parseInt(aImg[i].style.top)/height );
				if (aImg[i].getAttribute('num') != Math.round(_l)) {
					return false;
				};
			}
			
			if(countTime>0 ){
				
				var countPre = countTime*100 / 20 ;
				

				$('.js_countTime').html(20-countTime+'s');
				$('.js_countPre').html( countPre + '%' );    

				clearInterval(countTimeInt);
				
				$('#dialogAlert1').show();
				$('#mypopbox').show();
				gamePlaying = 0 ;
				lottery();
				
				return true;

			}else{
				
				$('#dialogAlert0').show();
				$('#mypopbox').show();
				gamePlaying = 0 ;
				clearInterval(countTimeInt);

				return false;
			}

		};

		//碰撞检测
		function findNearest(_this){
			var iMinDistance = 10000;
			var iIndex = 0;
			for(var j=0;j<aImg.length;j++){
				if(aImg[j]!=_this&&testDistance(_this,aImg[j])){
					var distance=getDistance(_this,aImg[j]);  
                    if(distance<iMinDistance){  
                        iMinDistance=distance;  
                        iIndex=j;  
                    }  
				}
			}
			return iIndex;
		};

		//是否符合碰撞条件
		function testDistance(obj1,obj2){
			var left1=obj1.offsetLeft,
				leftwidth1=left1+obj1.offsetWidth,  
                top1=obj1.offsetTop,
                topheight1=top1+obj1.offsetHeight;  
                left2=obj2.offsetLeft,
                leftwidth2=left2+obj2.offsetWidth,  
                top2=obj2.offsetTop,
                topheight2=top2+obj2.offsetHeight;  
                      
                if(leftwidth1<left2||topheight1<top2||left1>leftwidth2||top1>topheight2){  
                    return false;  
                }else{  
                    return true;  
                }
		};

		//计算距离
		function getDistance(obj1,obj2){
			var x=obj1.offsetLeft-obj2.offsetLeft,  
                y=obj1.offsetTop-obj2.offsetTop;  

            return Math.sqrt(x*x+y*y);
		};

	};

};


//lottery
function lottery(){
    $.ajax({
        type : 'get',
        url : '/aj/designer/lottery',
        data : {
            
        },
        success : function(data){
            res = JSON.parse(data);
            
			setTimeout(function(){
				if (res.error_code == 1) {
					if (res.data.award.award == 3648767861 ) {
						//'Win1'
						$('.dialog').hide();
						$('#dialogWin1').show();
						$('#mypopbox').show();

					}else if (res.data.award.award == 3648726981 ) {
						//'Win2'
						$('.dialog').hide();
						$('#dialogWin2').show();
						$('#mypopbox').show();
					}
				}else if(res.error_code == 0){
					//Nowin
					setTimeout(function(){
						$('.dialog').hide();
						$('#dialogWin0').show();
						$('#mypopbox').show();
					},2000)
					

				}else if(res.error_code == -1){
					setTimeout(function(){
						$('.dialog').hide();
						$('#dialogWin0').show();
						$('#mypopbox').show();
					},2000)
				}
			},2000)
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
            alertCon('额，error！');
        }
    });
}

//submitn address
$('.submitBut').click(function(){
	var _data = {
		'name' : $('#name').val(),
		'mobile' : $('#tel').val(),
		'address' : $('#addr').val()
	};
	var _num = _data.mobile;
	if(!_data.name || !_data.address) return alertCon('信息输入不完整，请重新输入。');
	if(!/^\d{11}$/.test(_num)) return alertCon('手机号输入错误，请重新输入。');
	$.post('/aj/designer/save', _data, function(data) {
		data = JSON.parse(data);
		
		if (data.error_code == 0) {
			alertCon('保存成功！')
			setTimeout(function(){
				$('#index').show();
			    $('#game').hide();
			    $('#address').hide();
			},5000)
		}else{
			alertCon(data.message);
		};
	});
});


