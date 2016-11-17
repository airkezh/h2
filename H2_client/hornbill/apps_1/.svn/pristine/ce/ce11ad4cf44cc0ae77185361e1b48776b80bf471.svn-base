/*common*/
var $ = require('wap/zepto');

var zt = {};
//接口
var initClass = {
	targetClassName:"target"
	,centerClassName:"center"
	,coreClassName:"core"
	,btnClassName:"ck"
	,objClassName:"dabai"
	,cdClassName:"countDown"
}
var initdata = {
	countDown:3
	,countDownSpace:1000
	,zhuantiTime:3
	,zhuantiDegree:720
}
var initStyle = {
	centerBorder:'0.04rem solid white'
	,objURL:"http://d03.res.meilishuo.net/pic/_o/c3/35/533853572dc856c0b0857f9ecc60_724_1024.cg.png"
	,objWidth:1.2
	,objHeight:1.2

}
//公共数据
 var cd,target,center,core,obj;
 var result;
 var date1,date2;
 var top,rot;
 var WH = $(window).height();
 var WW = $(window).width();
 var data = initdata;
 var style = initStyle;
 var time;
 var d,s;
 var cls;

 //标识
 var cdflag = true;
 var photoFlag = 0;

//转体游戏初始化

zt.into = function (targ,className,dataValue,styleValue) {
	target = targ;
	if(className){
		$.extend(true, initClass, className);
	}
	cls = initClass;
	//初始化动画数据
	 if(dataValue){
	 	$.extend(true, initdata, dataValue);
	 }
	 //初始化样式数据
	 if(styleValue){
	 	$.extend(true, initStyle, styleValue);
	 }
	//创建dom元素
	 center = $('<div class="'+cls.centerClassName+'"></div>').appendTo(target);
	 center.css({
	 	'border':style.centerBorder
	 	,'border-radius':'100%'
	 	,'position':'absolute'
	 	,'top':'48%'
	 	,'right':'48%'
	 	,'box-sizing': 'border-box'
	 	,'-webkit-box-sizing': 'border-box'
	 });
	 var bd = target.css('border-width').replace(/(\d+)px/,'$1');
	 core = $('<div class="'+cls.coreClassName+'"></div>').appendTo(target);
	 core.css({
	 	'position':'absolute'
	 	,'display':'none'
	 	,'z-index':2
	 });
	 cd = $('<p class="'+cls.cdClassName+'"></p>');
	 cd.css({
	 	'position':'absolute'
	 });
	 target.appendTo('body');
	 obj = $('<div class="'+cls.objClassName+'"></div>').appendTo('body');
	 obj.css({
	 	'background':'url('+style.objURL+') no-repeat'
	 	,'background-size':'contain'
	 	,'position':'absolute'
	 	,'width':style.objWidth+'rem'
	 	,'height':style.objHeight+'rem'
	 	,'z-index':1
	 	,'top':'-'+style.objHeight+'rem'
	 	,'left':(3.2-style.objWidth/2)+'rem'
	 });
}

//倒计时逻辑，wrap为必填，根据该参数可以将倒计时的显示输出在wrap元素内－－－－－－ok
zt.countDown = function(wrap,i,interval){
	data.countDown = i ? i : data.countDown;
	data.countDownSpace = interval ? interval : data.countDownSpace;
	cd.appendTo(wrap);
	var n = data.countDown;
	d = setInterval(function(){
		if(n>0){	
			cd.text(n);		
			n--;
		}
	},data.countDownSpace);
	cdflag = true;
}
//转体
 zt.zhuanti = function(delay,time,degree){
 	 // 判断如果进行了倒计时则，，，
 	if(!cdflag){
	  	cd.text("");
		cd.hide();		
 	}
 	data.zhuantiTime = time ? time : data.zhuantiTime;
 	data.zhuantiDegree = degree ? degree : data.zhuantiDegree;
 	var a = "all "+data.zhuantiTime +"s linear";	
	obj.css({
		'background-size':'contain'//zepto 会令pc端浏览器每次加载动态样式时恢复成initial，需要重新指定
		,"transition":a
		,"-webkit-transition":a
		,"-webkit-transform":"translate(0px,"+WH+"px) rotate("+data.zhuantiDegree+"deg)"		
	});
	ztFlag = 1 ;
 }
 // 显示分数，wrap为必填字段，注明分数显示的地方
 zt.cor = function(wrap){
 	core.show();
 	core.appendTo('wrap');
	core.text(result+'分');
 }
//show
zt.stop = function(date1,date2){
	//根据time*speed求得开始转体与点击拍照这个过程的最终效果
	top = (date2-date1)*(WH/(data.zhuantiTime*1000));
	rot = (date2-date1)*(data.zhuantiDegree/(data.zhuantiTime*1000));
	obj.css({
		'background-size':'contain'
		,"transition":"all 0s linear"
		,"-webkit-transition":"all 0s linear"
		,"-webkit-transform":"translate(0px,"+top+"px) rotate("+rot+"deg)"		
	});	
	return {'top':top,'rot':rot};
}
zt.show = function(pos,wrap){
	//Dt:旋转元素距离顶端的距离；Tt:目标区域距离顶端的距离；Tb:目标区域底端距离顶端的距离；Ct:目标区域中心距离目标区域顶端的距离
	var Dt = pos.top-obj.height()/2;
	var Tt = target.offset().top;
	var Tb = Tt+target.height();
	var Ct = center.offset().top+center.height()/2;

	if(Dt<Tt){
		result = 0;
		zt.cor(wrap);
	}else if(Dt>Tt&&Dt<Tb){
		var dis = Math.ceil(Math.abs(Dt-Ct));
		var con = target.height()/2;
		result = Math.abs(100-Math.ceil((dis/con)*100));
		zt.cor(wrap);
	}else{
		result = 0;
		zt.cor(wrap);
	}
}
//重拍，归位
zt.reback = function(){
	core.hide();
	obj.css({
		"-webkit-transform":"translate(0,0) rotate(0deg)"	//???需要时间
	});
}
//bol:表示需不需要倒数计时器,剩余参数是倒数计时器需要的， 返回一个常数：false表示倒计时完毕，true表示倒计时进行
zt.pre = function(bol,tar,i,interval){
	if(bol){
		zt.countDown(tar,i,interval);//cdflag=1
		setTimeout(function(){
			clearInterval(d);
			date1 = new Date();
			cdflag = false ;
			zt.zhuanti();
		},(data.countDown + 1)* data.countDownSpace)
	}else{
		setTimeout(function(){
			date1 = new Date();
			cdflag = false ;
			zt.zhuanti();
		},data.countDownSpace)
	}
	return cdflag;
}
zt.takePhoto = function(){
	if(!cdflag){
		date2 = new Date();
		var pos = zt.stop(date1,date2);
		zt.show(pos,target);
		return true;
	}else{
		return false;
	}
	
}
zt.photoAgain = function(){
	zt.reback();//需要给reback提供一定的时间
	setTimeout(function(){
		date1 = new Date();
		zt.zhuanti();	
	},50)
}


exports.zt = zt;










