/*common*/
/*
 *  
 */

var img,
	isFirst = true,
	Canvas,
	Ctx,
	winH,
	winW,
	cH,
	cW,
	birdImg,
	flakes = [];

var rAF     = window.requestAnimationFrame ||
			  window.mozRequestAnimationFrame ||
			  window.webkitRequestAnimationFrame ||
			  window.msRequestAnimationFrame || 
			  window.oRequestAnimationFrame ||
  			  function(callback){ setTimeout(callback, 1000 / 60); },
	cAF 	= window.cancelAnimationFrame ||
			  window.mozCancelAnimationFrame ||
			  window.webkitCancelAnimationFrame ||
			  window.msCancelAnimationFrame || 
			  window.oCancelAnimationFrame;

window.onload     = function (){
	winH          = window.innerHeight;
	winW 	      = window.innerWidth;
	Canvas        = document.getElementById( 'fall' );
	Canvas.width  = cW = winW;
	Canvas.height = cH = winH * 0.85;
	Ctx           = Canvas.getContext( '2d' );
};

// 控制下雪
function fall(settings){
	settings 		 = settings || {};
	this.maxFlake 	 = settings.maxFlake || 30;	//最多片数
	this.flakeSize   = settings.flakeSize || 0.4;    //缩放控制
	this.flakeWidth  = settings.flakeWidth || 0;
	this.flakeHeight = settings.flakeHeight || 0;	
	this.fallSpeed   = settings.fallSpeed || 3;	//坠落速度
	this.imgSrc 	 = settings.imgSrc;
	this.canvas      = Canvas;
	this.ctx 		 = Ctx;
	this.isFlyBird   = settings.isFlyBird || false;
}

// 开始下雪
fall.prototype.start = function (){
	this.createFlakes();
	if(isFirst){
		isFirst = false;
		draw.apply(this);
	}
};

// 创建下落对象
fall.prototype.createFlakes = function (){
	var Move,
		i        = 0,
		maxFlake = this.maxFlake;
	if( this.isFlyBird ){
		// 飞鸟
		flakes.push( new flyBird(this.flakeWidth, this.flakeHeight, this.fallSpeed, this.imgSrc) );
	}else{
		// 雪花
		for ( ; i < maxFlake; i++ ){
			Move = new flakeMove( this.flakeSize, this.flakeWidth, this.flakeHeight, this.fallSpeed + (Math.random() * 2), this.imgSrc );
			flakes.push(Move);
		}
	}
};

// 雪运动对象
function flakeMove( flakeSize, flakeWidth, flakeHeight, speed, src ){
	flakeWidth = ((typeof flakeWidth ==='object' && Array == flakeWidth.constructor) ? flakeWidth[Math.floor( Math.random() * flakeWidth.length)] : flakeWidth) * flakeSize;
	flakeHeight = ((typeof flakeHeight ==='object' && Array == flakeHeight.constructor) ? flakeHeight[Math.floor( Math.random() * flakeHeight.length)] : flakeHeight) * flakeSize;
	src = (typeof src ==='object' && Array == src.constructor) ? src[Math.floor( Math.random() * src.length )] : src;
	this.x 			 = getNum( cW - flakeWidth * 3 / 4, -1 * flakeWidth / 4 );
	this.y 			 = -1 * getNum( cH * 2 );	
	this.flakeSize   = Math.random() * flakeSize + 0.5;
	this.width       = flakeWidth;
	this.height 	 = flakeHeight;
	this.Y 			 = Math.random() * 2 + speed;							  
	this.X 			 = 0;									    
	this.stepSize 	 = Math.random() / 12;			    
	this.step 		 = 0;
	this.imgSrc      = src;								    
	this.img 		 = document.createElement('img');
	this.img.src 	 = this.imgSrc;
	this.kind        = 'flake';
}

// 飞鸟对象
function flyBird( width, height, speed, src ){
	this.x 			 = winW + 2;
	this.y 			 = getNum( 0.7 * winH - 70 );
	this.width       = width * 0.6;
	this.height      = height * 0.6;		      						
	this.Y 			 = 0;							 
	this.X 			 = -2.3;									   
	this.stepSize 	 = 0;				
	this.step 		 = 0;	
	this.imgSrc      = src;								
	this.img 		 = document.createElement('img');
	this.img.src 	 = this.imgSrc;
	this.kind		 = 'bird';
}

// 画雪
function draw(len){
	var maxFlake = this.maxFlake,
	    //ctx 	 = this.ctx,
		canvas   = this.canvas,
		i 		 = 0,
		that     = this;
	len 		 = len || flakes.length;
	// 清空雪花
	ctxClear(Ctx);
	for ( ; i < len; i++ ){
		update.call( flakes[i], i ,that );
	}
	flakes = flakes.filter(function (item){
		return !!item;
	});
	len = flakes.length;
	// 一帧一帧的画
	rAF(function (){
		draw.call( that, len );
	});
}

 var update = function (index, obj){
	var x = this.x,
	    y = this.y,
	    random = Math.random();
	if(this.kind === 'flake'){
		//this.X *= 0.98;
		this.X += Math.cos( this.step += 0.05 ) * this.stepSize;
		//this.X = ( -1 * Math.cos( this.step ) + Math.cos( this.step += PI * (3+random*5) * this.Y /winH ) ) * this.stepSize;	
	}

	this.y += this.Y;
	this.x += this.X;
	// 飞出边界的处理
	switch(this.kind){
		case 'flake':
			if ( this.x >= cW || (this.x <= -1 * this.width) || this.y >= cH ){
				flakes[index] = false;
			}else{
				render.call(this);
			} break;
		case 'bird':
			if ( this.x < -239 || this.y < 0 || this.y > winH * 0.8 ){
				flakes[index] = false;
			}else{
				render.call(this);
			} break;
	}

};

function render(){
	Ctx.drawImage( this.img, this.x, this.y, this.width, this.height );
}

function go(settings){
	new fall(settings).start();
}

function getNum( a, b ){
	a = a || 1;
	b = b || 0;
	return Math.floor( Math.random() * a + b );
}

function ctxClear(ctx){
	ctx.clearRect( 0, 0, cW, cH );
}

exports.go = go;


