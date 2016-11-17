/*common*/
var $ = require('wap/zepto');
var z = require('wap/page/lark/zt'),
	dabai = z.zt;

//初始化

var ck = $('.ck');
var target = $('.target');
var flag = 0 ;
dabai.into(target,null,null,{'objWidth':1,'objHeight':1});//----------
//click
ck.bind('touchend', function(){
	if(flag == 0){
		dabai.pre(true,target)
		flag = 1 ;
	}else if(flag == 1){
		if(dabai.takePhoto()){
			flag = 2 ;	
		};		
	}else if(flag == 2){
		dabai.photoAgain();
		flag = 1;
	}
});




























