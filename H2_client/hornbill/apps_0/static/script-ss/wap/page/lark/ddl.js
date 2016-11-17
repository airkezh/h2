/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick')

//判断dom是否存在
$.fn.exist = function(){
    if($(this).length>=1){
        return true;
    };
    return false;
};

var $window = $(window),
	screenWidth = $window.width(),
	screenHeight = $window.height(),

	ddl = {//叠叠乐游戏对外暴露的总接口
		gameBox:{ //游戏盒子的属性
			className : 'ddl_box', //游戏盒子dom的class,用于修改盒子的样式等。
			id : 'ddl_box', //游戏盒子dom的id，
			w : screenWidth, //游戏盒子的宽度，默认设备屏幕宽度，单位是px，下同。
			h : screenHeight //游戏盒子的高度，默认设备屏幕高度。
		},
		actor:{//游戏中的角色
			faller:{//下落的物体，游戏角色之一
				w:200, //物体宽度，默认50.
				h:20,//物体高度，默认20.
				style:['http://i.meilishuo.net/css//images/lark/cookie/cookie-last.png','http://i.meilishuo.net/css/images/lark/cookie/count1.png'] //物体的一组修饰图片,看到UI后定细节
			},
			tray:{//接下落物体的盘子，游戏角色之二
				w:screenWidth, //物体宽度，默认200.
				h:40, //物体高度，默认40.
				style:'http://i.meilishuo.net/css/images/lark/cookie/plate.png'
			}
		}
	};

ddl.random = function(Min,Max){
	return (Min + Math.round(Math.random() * (Max - Min)));
}
ddl.intoState = false; //初始化状态
ddl.into = function(options){
	ddl.options = options;
	if(options){
		ddl.gameBox.className = options.gameBox.className || ddl.gameBox.className;
		ddl.gameBox.id = options.gameBox.id || ddl.gameBox.id;
		ddl.gameBox.w = options.gameBox.w || ddl.gameBox.w;
		ddl.gameBox.h = options.gameBox.h || ddl.gameBox.h;

		ddl.actor.faller.w = options.actor.faller.w || ddl.actor.faller.w;
		ddl.actor.faller.h = options.actor.faller.h || ddl.actor.faller.h;
		ddl.actor.faller.style = options.actor.faller.style || ddl.actor.faller.style;

		ddl.actor.tray.w = options.actor.tray.w || ddl.actor.tray.w;
		ddl.actor.tray.h = options.actor.tray.h || ddl.actor.tray.h;
		ddl.actor.tray.style = options.actor.tray.style || ddl.actor.tray.style;
	};


	//判断DOM中是否有游戏盒子，没有创建一个
	if(!$('.'+ddl.gameBox.className).exist() && !$('#'+ddl.gameBox.id).exist()){
		$('<div class="'+ddl.gameBox.className+'" id="'+ddl.gameBox.id+'" style="position:absolute;width:'+ddl.gameBox.w+'px; height:'+ddl.gameBox.h+'px;"></div>').appendTo('body');
		ddl.gameBox.dom = $('#'+ddl.gameBox.id);
	}else{
		ddl.gameBox.dom = $('#'+ddl.gameBox.id) || $('.'+ddl.gameBox.className);
	};


	//创建tray
	var trayCSS = '.tray{position:absolute;background-size:100%;background-repeat: no-repeat;left:0;bottom:0;}';
	$('<style>'+trayCSS+'</style>').appendTo('head');
	$('<div class="tray"></div>').css({
		'width':ddl.actor.tray.w,
		'height':ddl.actor.tray.h,
		'background-image':'url("'+ddl.actor.tray.style+'")'
	}).appendTo(ddl.gameBox.dom);


	//创建faller
	var fallerCSS = '.faller{position:absolute;';
		fallerCSS+= 'background-size:'+ddl.actor.faller.w+'px '+ddl.actor.faller.h+'px;';
		fallerCSS+= 'background-repeat: no-repeat;';
		fallerCSS+= 'border-radius:4px;}';
	$('<style>'+fallerCSS+'</style>').appendTo('head');
	var  randomN = ddl.random(0,ddl.actor.faller.style.length-1);
	ddl.creatFaller(randomN);

	fallerHeight = ddl.actor.faller.h;
	trayHeight = ddl.actor.tray.h;
	ddl.intoState = true;
};


var count = 1,
	sliderSpeed = 0,
	downSpeed = 0,
	downFlag = true,
	clickFlag = true,
	gameOver = false,
	moveFaller = $('.moveFaller'),
	trayDom = $('.tray'),
	gameBoxHeight = screenHeight,
	fallerHeight = ddl.actor.faller.h,
	trayHeight = ddl.actor.tray.h;


//木头左右移动
ddl.slider = function(sliderSpeed){
	moveFaller.css({'visibility' : 'visible'});
	var sliderFlag = false;
	var posLeft = 0;
	sliderTimmer = setInterval(function(){
		moveFaller = $('.moveFaller');
		if(moveFaller.offset().left >= ddl.gameBox.w - moveFaller.width() ){
			sliderFlag = true;
		}else if(moveFaller.offset().left <= 0){
			sliderFlag = false;
		}
		sliderFlag ? posLeft-=sliderSpeed : posLeft+=sliderSpeed;
		moveFaller.css({
			'left': posLeft
		});

	},20);
};
//木头下落
ddl.down = function(downSpeed,countFn,endFn){
	moveFaller = $('.moveFaller');
	var posTop = moveFaller.offset().top;
	var posBtm = gameBoxHeight - fallerHeight -80;
	moveFaller.css({
		'top':'auto',
		'bottom':posBtm
	});

	downTimmer = setInterval(function(){
		posBtm-=downSpeed;
		
		moveFaller = $('.moveFaller');
		moveFaller.css({
			'bottom':posBtm
		});
		
		if(posBtm <=  trayHeight*0.5  + (fallerHeight-2)*(count-1) ){
			
			moveFaller.css('bottom', trayHeight*0.5  + (fallerHeight-2)*(count-1)  );
			
			clearInterval(downTimmer);
			if(count == 1){
				var judgResult = ddl.inPlate();
			}else{
				var judgResult = ddl.judg();
			}
			if(judgResult){
				if(count == 1){
					ddl.cutFirst();
				}else if(count > 1){
					ddl.cut();
				}else{
					$('.moveFaller').removeClass('moveFaller');
				}
				if(countFn) {countFn(count)};
				ddl.add();
			}else{
				gameOver = true; 
				if(endFn) {endFn(count)};
			}
		}
	},5);
};
ddl.creatFaller = function(randomN){
	
	$('<div class="faller moveFaller" alt=""></div>').css({
		'top':80,
		'left':0,
		'width':ddl.actor.faller.w,
		'height':ddl.actor.faller.h,
		'background-image':'url("'+ddl.actor.faller.style[randomN]+'")'
	}).appendTo(ddl.gameBox.dom);
}

//添加木头
ddl.add = function(){
	
	if(gameBoxHeight - fallerHeight*count -120 <150){
		gameBoxHeight+=150;
		ddl.gameBox.dom.height(gameBoxHeight);
	}
	
	var pageFlag = false;
	clickFlag = true;
	count++;
	//$('.number span').html(count-1);

	//创建moveFaller
	var  randomN = ddl.random(0,ddl.actor.faller.style.length-1);
	ddl.creatFaller(randomN);


	moveFaller = $('.moveFaller');
	moveFaller.css({
		'width': moveFaller.prev().width()
	});
	ddl.slider(count);
	
};
//判断是否放在盘子中
ddl.inPlate = function(){
	var moveFaller = $('.moveFaller'),
		trayDom = $('.tray');
	if(moveFaller.offset().left + moveFaller.width() < trayDom.offset().left
		|| moveFaller.offset().left > trayDom.offset().left + trayDom.width()){
		downFlag = false;
		return count-1;
		// return false;
	}else{
		clickFlag = true;
		return true;
	}
};
//判断是否放在上一个木头上
ddl.judg = function(){
	var moveFaller = $('.moveFaller')
		moveFallerPrev = moveFaller.prev();
	if( moveFaller.offset().left + moveFaller.width() < moveFallerPrev.offset().left 
		|| moveFaller.offset().left > moveFallerPrev.offset().left + moveFallerPrev.width() ){
		downFlag = false;
		return false;
	}else{
		return true;
	}
};
//截断木头
ddl.cutFirst = function(){
	var moveFaller = $('.moveFaller'), trayDom = $('.tray');
	if(moveFaller.offset().left < trayDom.offset().left){
		moveFaller.css({
			'width': moveFaller.width() - (trayDom.offset().left - moveFaller.offset().left),
			'left': trayDom.offset().left
		});
	}else if(moveFaller.offset().left + moveFaller.width() > trayDom.offset().left + trayDom.width()){
		moveFaller.css({
			'width': moveFaller.width() - ( moveFaller.offset().left + moveFaller.width()) - (trayDom.offset().left+trayDom.width())
		});
	}
	moveFaller.removeClass('moveFaller');
};
ddl.cut = function(){
	var moveFaller = $('.moveFaller'), trayDom = $('.tray');
	if(moveFaller.offset().left < moveFaller.prev().offset().left){
		moveFaller.css({
			'width': moveFaller.width() - (moveFaller.prev().offset().left - moveFaller.offset().left),
			'left': moveFaller.prev().offset().left,
			'background-position': '-'+(moveFaller.prev().offset().left - moveFaller.offset().left)+'px 0'
		});
	}else if(moveFaller.offset().left > moveFaller.prev().offset().left ){
		moveFaller.css({
			'width': moveFaller.width() - ( moveFaller.offset().left  - moveFaller.prev().offset().left )
		});
	}
	moveFaller.removeClass('moveFaller');
};

//游戏开始
ddl.start = function(countFn,endFn){
	if(!gameOver){
		if(!ddl.intoState){ //若未初始化，初始化
			ddl.into();

		};

		ddl.endFn = endFn;
		ddl.countFn = countFn;

		ddl.gameBox.dom.on('tap',function(){
			if(downFlag && clickFlag){
				clickFlag = false;
				clearInterval(sliderTimmer);
				ddl.down(2,ddl.countFn,ddl.endFn);
			}
		});
		ddl.slider(count);
	};
};


//游戏开始
ddl.restart = function(){
	if(gameOver){
		$('body').remove(ddl.gameBox.dom);
		count = 1;
		sliderSpeed = 0;
		downSpeed = 0;
		downFlag = true;
		clickFlag = true;
		gameOver = false;
		gameBoxHeight = screenHeight;

		ddl.into(ddl.options);
		ddl.start(ddl.countFn,ddl.endFn);

	};
}

exports.ddl = ddl;