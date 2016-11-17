/*common*/
require('jquery');
var shareTmp = require('component/shareTmp');
var dialogUI = require('ui/dialog');
var check = require('app/checkLogin');

var couponPop = function(r){
	var tpl = shareTmp(r);
	var shes_dia = new dialogUI({
		'content' : tpl,
		'width' : '397px',
		'title' : '优惠券'
	}); 
}
$('.shes').on('click' , function(){
	if(!check()) return;
	var shesIndex = $('.shes').index($(this)) + 1;
	var _this = $(this);
	$.post('/aj/huodong/shes' , {'vote' : shesIndex} , function(res){
		if(res.code == 0){
			var lm = _this.siblings('.likeNum1').children('em');
			lm.html(parseInt(lm.html()) + 1);
			couponPop('shes_pop');
		}else{
			if(res.message){
				alert(res.message);	
			}else{
				alert('出错啦');	
			}
		}
	} , 'json');
});
$('.shesG').on('click' , function(){
	if(!check()) return;
	var shesGIndex = $('.shesG').index($(this)) + 5; 
	var _this = $(this);
	$.post('/aj/huodong/shes' , {'vote' : shesGIndex} , function(res){
		if(res.code == 0){
			var lm = _this.siblings('.likeNum2').children('em');
			lm.html(parseInt(lm.html()) + 1);	
			couponPop('shesG_pop');
		}else{
			alert(res.message);
		}
	} , 'json');
});

var select = { 0:[0,1,2] , 1:[3,4] , 2:[2,3,4] , 3:[5,6,7,8,9] };

var firLi = $('.first li');
var secLi = $('.sec li');
firLi.on('click' , function(){
	$(this).addClass('active').siblings('li').removeClass('active');
	var index = firLi.index($(this));
	var sec = select[index];
	secLi.removeClass('no');
	for(var i = 0; i<sec.length; i++){
		$(secLi[sec[i]]).addClass('no').removeClass('active2');
	}
});

secLi.on('click' , function(event){
	if($(this).hasClass('no')){
		event.preventDefault();
	}else{
		$(this).addClass('active2').siblings('li').removeClass('active2');	
	}
});

