/*common*/
var $ = require('jquery');
var dialogUI = require('ui/dialog');
var check = require('app/checkLogin');
var shareTmp = require('component/shareTmp');
var Alert = require('ui/alert');
var a = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}
$(".apply_btn").on( "click" , function(){
	// var _this = $(this).attr('data-type');
	var tpl = shareTmp('apply_layer');
	var html = tpl;
	var shop_Layer = new dialogUI({ 
		'content':html , 
		'width': '600px' , 
		'onStart':function(){
			$('#overlay').addClass('overblack');
		},
		'onChange' : function(){
			$('#dialogTitle').hide();  
			$(".maskLayer").css({'opacity':'.4'});
			$(".dialogContent").css({'background':'none'});	
			$('#dialogLayer').css({'background' : 'none' , 'padding' : '0' , 'top' : '20px'});
		},
		'onClose' : function(){
			$('#overlay').removeClass('overblack');	
		}
	});
	$('.close_apply').on('click' , function(){
		shop_Layer.drive.destroyModel();	
	});
	$(".form_li input").focus( function(){
		if( this.value == '' || this.value == '请填写11位手机号码' || this.value == '链接请以http://开头'){
			this.value = '';
		}
	});
	$(".form_li input").bind( "blur" ,function(){
		if( this.value == '' || this.value == '请填写11位手机号码' || this.value == '链接请以http://开头'){
			$(this).next('span').text('请填写正确信息');
		}else{
			$(this).next('span').empty();
		}
	})
	$(".submit_btn").on( "click" ,function(){
		var checkName = $(".check_name").val();
		var checkTel = $(".check_tel").val();
		var checkQq = $(".check_qq").val();
		var checkShop = $(".check_shop").val();
		check_form( checkName , checkTel , checkQq , checkShop );
		
	})
})
function check_form( checkName , checkTel , checkQq , checkShop){
	$(".form_li").find("span").empty();
	if( checkName == '' ){
		$(".check_name").next("span").text("请输入姓名！");
		return;
	}
	var userName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
	if( userName.test( checkName ) == 0 ){
		$(".check_name").next("span").text("请输入正确的姓名！");
		return;
	}
	if( checkTel == '' || checkTel == '请填写11位手机号码'){
		$(".check_tel").next("span").text("请输入电话！");
		return;
	}
	var phoneReg = /^1[3|5|4|7|8|][0-9]{9}$/;
	if( phoneReg.test( checkTel ) == 0 ){
		$(".check_tel").next("span").text("请输入正确的手机号！");
		return;
	}
	// var telReg = /^(([0\+]\d{2,3}-)?(0\d{2,3}-?)|400|800)(\d{7,8})(-(\d+))?$/;
	// if( checkTel.indexOf('-') < 0 ){
	// 	if( phoneReg.test( checkTel ) == 0 ){
	// 		$(".check_tel").next("span").text("请输入正确的手机号！");
	// 		return;
	// 	}
	// }else{
	// 	if( checkTel.indexOf('-') > 0 && telReg.test( checkTel) == 0){
	// 		$(".check_tel").next("span").text("请输入正确的电话！");
	// 		return;
	// 	}
	// }
	if( checkQq == ''){
		$(".check_qq").next("span").text("请输入QQ！");
		return;
	}
	var qqReg = /^\d{5,12}$/;
	if( qqReg.test(checkQq) == 0){
		$(".check_qq").next("span").text("请输入正确的QQ！");
		return;
	}
	if( checkShop == '' || checkShop == '链接请以http://开头'){
		$(".check_shop").next("span").text("请输入店铺链接！");
		return;
	}
	var urlReg = /[a-zA-z]+:\/\/[^\s]*/;
	// var urlReg = new RegExp(reg);
	if( urlReg.test(checkShop) == 0){
		$(".check_shop").next("span").text("请输入正确的链接！");
		return;
	}
	$.ajax({
			url: '/aj/huodong/shop_join',
            type:"post",
            data:{
            	name : checkName,
            	phone : checkTel,
            	qq : checkQq,
            	shop_url : checkShop
            },
            dataType:"json",
            async : false,
            success:function( res ){
            	if( res.error_code == 0){
            		$('.close_apply').trigger('click');
            		a( res.message);
            	}else if( res.error_code == -3){
            		a( res.message );
            	}else{
            		a( res.message );
            	}
            },
            error:function(){
            	a('系统繁忙，请稍后再试');
            }
		});
}