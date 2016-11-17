/*common*/
var $ = require('wap/zepto');
var toCss = require('wap/component/lark/toCss');

var windowWidth = $(window).width()
    ,windowHeight = $(window).height();
var wHeight = window.innerHeight;

var wb = {
	boxId : 'container',
	boxW : windowWidth ,
	boxH : windowHeight ,
	cellW : windowWidth/4 ,
	cellH : windowWidth*1.775/4
}
,countFn
,endFn;

//创建一个新的对象block
function Block(opts){
	$.extend(wb,opts)

	this.dom =  document.getElementById(wb.boxId);
	this.topPos = -wb.cellH*2 ;
	this.step = 0.5;
	this.clock = null;
	this.state = true;
	this.sum = 0 ,
	this.clickCount = 0;
	countFn = wb.countFn;
	endFn = wb.endFn;

	var boxStyle = {
		position: 'absolute' ,
		top : '-300px',
		width: '100%' ,
		height : '600px'
	},

	rowStyle = {
		width : '100%',
		overflow : 'hidden'
	},

	cellStyle = {
		width : '25%', 
		height : wb.cellH+'px'
	},

	css = toCss( boxStyle , '#'+wb.boxId )+toCss( rowStyle , '.row' )+toCss(cellStyle , '.cell');
	if(!document.getElementById('whiteBlockStyle')){
		$('<style id="whiteBlockStyle">'+css+'</style>').appendTo('head');
	}
	
	$('#container').on('touchmove',function (e){
		e.preventDefault();
		e.stopPropagation();	
	});
}

//对block初始化
Block.prototype.init = function() {
	var that = this;
	for(var i = 0 ; i < 4 ; i ++){
		that.insertRow();
	}
	that.start();

	that.dom.ontouchstart = function(e){
		if(!that.state){
			that.dom.ontouchstart = null;
		}
		var target = e.target;
		if(target.className.indexOf('black') > -1){
			that.sum+=1;
			target.className = 'cell shapeshift';
			if(countFn) countFn(that.sum);

		}else{
			target.className = 'row trans';
			that.state = false;
			that.dom.ontouchstart = null;
			if(!window.requestAnimationFrame){
				clearInterval(that.clock)
			}
			if(endFn) endFn(that.sum,'clickFail');
		}
	};
}

//创建一个单元格
Block.prototype.createCell = function(className){
	var oDiv = document.createElement('div');
	oDiv.className = className;
	return oDiv;
}

//添加行，每行4块
Block.prototype.insertRow = function(){
	var oRow = this.createCell('row');
	var oCell = null;
	var i = Math.floor(Math.random()*4);
	var ml =  wb.cellW * i + 'px';

	oCell = this.createCell('cell black');
	oCell.style.marginLeft = ml;
	oRow.appendChild(oCell);

	var firstChild = this.dom.firstChild;
	if(firstChild == null){
 		this.dom.appendChild(oRow);
	}else{
		this.dom.insertBefore(oRow , firstChild);
	}
}

//删除一行
Block.prototype.delRow = function(){
	var child = this.dom.childNodes ,
		len = child.length - 1;
	this.dom.removeChild( child[ len ] );
}
//判断什么时候top拉出去，什么时候开始加速
Block.prototype.judge = function(){
	if(this.topPos >= 0){
		this.topPos = -wb.cellH ;
		this.dom.style.height =  wb.cellH*5+'px';
		this.dom.style.top = this.topPos + 'px';
		this.insertRow();
		this.delRow();
	}
	this.step = this.step+0.001;
}

//block开始移动
Block.prototype.move = function(){
	this.topPos += this.step;
	this.dom.style.top = this.topPos + 'px'; 
	//漏点黑块，停止游戏
    
	var oBlack = document.getElementsByClassName('black');
	var oBlackLen = oBlack.length - 1;
	var oBlackb = oBlack[ oBlackLen ] ? oBlack[ oBlackLen ].getBoundingClientRect().bottom : 0;
	if(oBlackb+3 >= wHeight){
		this.state = false;
		if(!window.requestAnimationFrame){
			clearInterval(this.clock)
		}
		if(endFn) endFn(this.sum,'bottom');
	}
}

Block.prototype.ani = function(){
	//var that = this;
	this.move();
	this.judge();
	if(this.state){
		window.requestAnimationFrame(this.ani.bind(this));
	}
}

Block.prototype.start = function(){
	var that = this;
	if(window.requestAnimationFrame){
		window.requestAnimationFrame(this.ani.bind(this));
		this.ani();
	}else{
		this.clock = setInterval(function(){
			that.move();
			that.judge();
		},16);
	}
}

//游戏结束
Block.prototype.end = function(){}

return Block;
