/*common*/
require('wap/zepto');
var tracking = require('wap/app/tracking');
require('wap/zepto/fastclick')

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

//游戏设置
var nunImgArr = [
	'http://d02.res.meilishuo.net/pic/_o/92/3a/cd66691e0caf32b9085d1bba4bd1_45_80.cf.png'
	,'http://d05.res.meilishuo.net/pic/_o/91/d0/91f5cabdabec7d752d077893bce7_45_80.cf.png'
	,'http://d04.res.meilishuo.net/pic/_o/65/28/dd11b1941550d4c039a5d79d4f3c_45_80.cf.png'
	,'http://d03.res.meilishuo.net/pic/_o/91/8c/e62a91840e552f142fa7b084fb4a_45_80.cg.png'
	,'http://d01.res.meilishuo.net/pic/_o/48/61/bb8bf5f67a281bdf002dfd211ea3_45_80.cg.png'
	,'http://d05.res.meilishuo.net/pic/_o/6b/f0/cc2264a694fea81c270978714182_45_80.cg.png'
	,'http://d04.res.meilishuo.net/pic/_o/03/33/03b6a387a96e71d70729c317b77f_45_80.cg.png'
	,'http://d03.res.meilishuo.net/pic/_o/8d/28/759c7dbb99f468fb330bac71c65b_45_80.cg.png'
	,'http://d02.res.meilishuo.net/pic/_o/e9/31/0e1bb2fa85a5f5abbcdaa8a3b278_45_80.cf.png'
	,'http://d01.res.meilishuo.net/pic/_o/e6/1e/7e9b55e67d3b35ff4417337b76d3_45_80.ch.png'
];

var $gameImgs = $('#game_nub').find('img')
function countFn(nub){
	var n = nub.toString();
	var arr = n.split('')
	if(arr.length==1){
		arr.unshift('0')
	}
	$gameImgs.hide()
	for (var i = 0 , l=arr.length ; i < l; i++) {
		$gameImgs.eq(i*10+(arr[i]|0)).show()
	};
}

function endFn(nub , failType){

	fml.vars.count = nub;
	if(nub < 1){
		if(failType==='bottom'){
			openDialog('fail');
		} else {
			setTimeout(function(){
				openDialog('fail');
			},1500)
		}
		
	}else{
		lottery(nub)
	}

	var  gameType = (failType == 'bottom')?1:2;
	tracking.cr('save_dog_h5',{action:'gameover',type:gameType,score:nub});
}

function lottery(nub){
    $.ajax({
        type : 'get',
        url : '/aj/singleDog/lottery',
        data : {
        	'act_code' : 'single_dog'
        },
        dataType: 'json',
        success : function(res){
            if( res.data.id == 99 || res.data.id ==97 || res.data.id ==95 ){
        		$('#quan').html(res.data.name);
        		openDialog('win',nub)
        	}else{
        		openDialog('success',nub);
        	}
        
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
        	openDialog('success',nub);
        }
    });
};

var opts = {
	boxId : 'container' ,
	countFn : countFn ,
	endFn : endFn
}
var block = {
	init : function(){
		var windowWidth = $(window).width()
			,windowHeight = $(window).height();
		var num =0
		var ty = 0, speed=1
		var keepRun = true
		var itemHeight = windowWidth/4/160*284

		var $parent = $('<div id="moveWrapper">').css({
			height : itemHeight
			,'transform': 'rotateX(180deg) translateY(0%)'
			,'-webkit-transform': 'rotateX(180deg) translateY(0%)'
		}).on('click', 'img', function(event) {
			if(this.clicked) return;
			this.clicked = true
			$(this).attr('clicked', 1)
			this.src = 'http://d04.res.meilishuo.net/pic/_o/0e/d4/adbb059c29b81bf25a533195ac23_160_284.cg.png'
			num++
			countFn(num)
			event.stopPropagation()
		})
		var _imgHtml = ''
		for (var i = 0; i < 300; i++) {
			_imgHtml += '<img id="item_img_'+i+'" src="http://d02.res.meilishuo.net/pic/_o/f2/12/6441b5c7b77c4541fff200abdea0_160_284.cg.png" width="25%" height="'+itemHeight+'" style="-webkit-transform:rotateX(180deg) translateX('+Math.floor(Math.random()*4)+'00%);"/><br>'
		};
		$parent.html(_imgHtml)

		$('#container').empty().append($parent)
			.off('click')
			.on('click',function(event) {
				keepRun = false;
				var left = (event.clientX/(windowWidth/4))|0
				left = left*25+'%'
				$('<div class="warning"></div>').css({
					left:left
				}).appendTo($(this))
				endFn(num, 'clickblank')
			});


		var winTy = 100*windowHeight/itemHeight
		function checkIfToBottom(){
			if(ty<winTy) return;
			var currBottomIndex = (((ty-winTy)/100)|0)
			var $item = $('#item_img_'+currBottomIndex)
			if(!$item.attr('clicked')){
				keepRun = false
				endFn(num, 'bottom')
			}
		}

		var raf = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame

		var times = 0
		function ff(){
			times++
			if(times%10===0){
				checkIfToBottom()
			}
			ty = ty+speed
			if(ty>5000) speed=8;
			else if(ty>4000) speed=7;
			else if(ty>3000) speed=6;
			else if(ty>2000) speed=5;
			else if(ty>1500) speed=4;
			else if(ty>800) speed=3;
			else if(ty>300) speed=2;
			$parent.css({
				'transform': 'rotateX(180deg) translateY(-'+ty+'%)'
				,'-webkit-transform': 'rotateX(180deg) translateY(-'+ty+'%)'
			})
			if(keepRun){
				raf(ff)
			}
		}
		raf(ff)
	}
}

$('#container').on('touchmove',function (e){
		e.preventDefault();
		e.stopPropagation();	
	});

// //页面初始化
// $('body').on('touchmove',function(e){
// 	e.preventDefault();
// 	e.stopPropagation();	
// });

var windowWidth = $(window).width()
    ,windowHeight = $(window).height();
$('.warp,.index,.guide,.game').css({'height':windowHeight});

$('.guide').click(function(){
	$('.game').show().siblings().hide();
	block.init();
});

//首次用户打cookie标记。
if( getCookie('isPlaySingleDog') ){
	$('#startBut').on('click', function(){
		tracking.cr('save_dog_h5',{action:'click',page:'home',area:'startgame'});
		if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
			window.location.href = 'meilishuo://login.meilishuo/?json_params=';
			return ;
		}else{
			$('.game').show().siblings().hide();
			block.init();
		}
		
	})
}else{
	setCookie('isPlaySingleDog',1,100);
	
	$('#startBut').on('click', function(){
		if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
			window.location.href = 'meilishuo://login.meilishuo/?json_params=';
			return ;
		}else{
			$('.guide').show().siblings().hide();
		}
	})
}

//弹出层关闭按钮等逻辑

var dialogFlag = '';
function openDialog(parm , nub){
	if(nub){
		$('#'+parm+'_n').html(nub);
	}
	dialogFlag = parm ;
  	$('.dialog').hide();
	$('#mypopbox , .dialog_'+parm).show();

}
$('.shareBut_close').click(function(){
	$('#mypopbox , .dialog').hide();
	if(dialogFlag) openDialog(dialogFlag);
});



$('#indexRule').click(function(){
	$('.dialog').hide();
	$('#mypopbox , .dialog_rule').show();
});

$('.dialog_but').click(function(){
	$('#mypopbox , .dialog').hide();
});

$('.dialog_play_but').click(function(){
	$('#mypopbox , .dialog').hide();
	$('.row').remove();
	$gameImgs.hide()
	block.init();
});

//app 登录
setTimeout(function(){
if(Meilishuo.config.os.mlsApp && !Meilishuo.config.user_id ){
		// $('.dialog').hide();
		// $('#mypopbox , .dialog_applogin').show();
		window.location.href = 'meilishuo://login.meilishuo/?json_params=';
}
}, 500)
window.MLS = {
    didLogin : function(){  
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}

//分享
var shareText =  '美丽说七夕特别策划~拯救成功有机会获七夕优惠券，5元、10元领到手软！还不快来！';
var shareImg =  'http://d01.res.meilishuo.net/pic/_o/e1/03/b7779095b1be47b681416d80917e_100_100.cf.jpg';
var shareTitle =  '跟我一起拯救单身狗吧~还能中超值优惠券喔！';
var shareUrl =  window.location.protocol+'//'+window.location.host+'/activity/singleDog/index/';
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

$('.dialog_share_but,#indexShare').on('click',function(e){

    e.preventDefault();
    e.stopPropagation();

	if(fml.vars.count == 0){
		shareTitle = '游戏大神！快来帮我拯救单身狗吧！'
	}else if(fml.vars.count > 0){
		shareTitle = '成功拯救'+fml.vars.count+'只单身狗！能超越我么？'
	}

	if(Meilishuo.config.os.mlsApp){
		var schemeJsonWx = {
	        	type : 'weixin' , 
	        	message_type : 'webpage' ,
	        	title : shareTitle,
	        	text : shareText,
	        	url : shareUrl + '?frm=friend',
	        	thumb_url : shareImg
	        }
	    	,schemeLinkWx = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonWx));

	    $('#shareBut_wx').attr('href',schemeLinkWx);

		var schemeJsonPyq = {
	        	type : 'weixin_timeline' , 
	        	message_type : 'webpage' ,
	        	title : shareTitle,
	        	text : shareText,
	        	url : shareUrl  + '?frm=pengyouquan',
	        	thumb_url : shareImg
	        }
	    	,schemeLinkPyq = "meilishuo://share.meilishuo/?json_params=" + encodeURIComponent(JSON.stringify(schemeJsonPyq));

	    $('#shareBut_pyq').attr('href',schemeLinkPyq);
		$('.dialog').hide();
		$('#mypopbox , #dialog_appshare').show();

	};

	if(fml.vars.isWx){
	                   
	    //初始化加载分享的资源。

	    shareData = {
	        'desc' : shareText ,
	        'imgUrl' : shareImg ,
	        'title' : shareTitle ,
	        'url' : shareUrl
	    };
  		shareWX.bind(shareData);

		$('.dialog').hide();
		$('#mypopbox , .dialog_wxshareguide').show();
		
	    $('#dialog_wxshareguide').click(function(event) {
	    	$('#mypopbox , .dialog').hide();
	    	if(dialogFlag) openDialog(dialogFlag);
	    });

	}

 });

// 埋点
$('#indexShare').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'home',area:'share'});
})

$('#dialog_win .dialog_play_but').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'win_pop',area:'restart'});
})

$('#dialog_success .dialog_play_but').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'succ_pop',area:'restart'});
})

$('#dialog_fail .dialog_play_but').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'fail_pop',area:'restart'});
})

$('#dialog_win .dialog_share_but').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'win_pop',area:'share'});
})

$('#dialog_success .dialog_share_but').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'succ_pop',area:'share'});
})

$('#dialog_fail .dialog_share_but').on('click',function(){
	tracking.cr('save_dog_h5',{action:'click',page:'fail_pop',area:'share'});
})

//初始化必备的图片
var imgArr = [
	'http://d02.res.meilishuo.net/pic/_o/92/3a/cd66691e0caf32b9085d1bba4bd1_45_80.cf.png'
	,'http://d05.res.meilishuo.net/pic/_o/91/d0/91f5cabdabec7d752d077893bce7_45_80.cf.png'
	,'http://d04.res.meilishuo.net/pic/_o/65/28/dd11b1941550d4c039a5d79d4f3c_45_80.cf.png'
	,'http://d03.res.meilishuo.net/pic/_o/91/8c/e62a91840e552f142fa7b084fb4a_45_80.cg.png'
	,'http://d01.res.meilishuo.net/pic/_o/48/61/bb8bf5f67a281bdf002dfd211ea3_45_80.cg.png'
	,'http://d05.res.meilishuo.net/pic/_o/6b/f0/cc2264a694fea81c270978714182_45_80.cg.png'
	,'http://d04.res.meilishuo.net/pic/_o/03/33/03b6a387a96e71d70729c317b77f_45_80.cg.png'
	,'http://d03.res.meilishuo.net/pic/_o/8d/28/759c7dbb99f468fb330bac71c65b_45_80.cg.png'
	,'http://d02.res.meilishuo.net/pic/_o/e9/31/0e1bb2fa85a5f5abbcdaa8a3b278_45_80.cf.png'
	,'http://d01.res.meilishuo.net/pic/_o/e6/1e/7e9b55e67d3b35ff4417337b76d3_45_80.ch.png'
	,'http://d04.res.meilishuo.net/pic/_o/0e/d4/adbb059c29b81bf25a533195ac23_160_284.cg.png'
	,'http://d02.res.meilishuo.net/pic/_o/f2/12/6441b5c7b77c4541fff200abdea0_160_284.cg.png'
	,'http://d05.res.meilishuo.net/pic/_o/f0/7c/a0935a3945e7d16bc1f56a69a9c1_159_283.ch.png'
];

for (var j = 0 , len = imgArr.length ; j < len; j++) {
	var img = new Image();  
    img.src = imgArr[ j ];  
};


