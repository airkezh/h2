/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');
var a = require('wap/app/alert');


$(".form_li input").focus( function(){
    if( this.value == '' || this.value == '请填写11位手机号码' || this.value == '请以http://开头'){
        this.value = '';
    }
});
$(".form_li input").bind( "blur" ,function(){
    if( this.value == '' || this.value == '请填写11位手机号码' || this.value == '请以http://开头'){
        $(this).next('span').text('信息有误');
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
function check_form( checkName , checkTel , checkQq , checkShop){
    $(".form_li").find("span").empty();
    if( checkName == '' ){
        $(".check_name").next("span").text("姓名有误！");
        return;
    }
    var userName = /^[a-zA-Z\u4e00-\u9fa5]+$/;
    if( userName.test( checkName ) == 0 ){
        $(".check_name").next("span").text("姓名有误！");
        return;
    }
    if( checkTel == '' || checkTel == '请填写11位手机号码'){
        $(".check_tel").next("span").text("电话有误！");
        return;
    }
    var phoneReg = /^1[3|5|4|7|8|][0-9]{9}$/;
    if( phoneReg.test( checkTel ) == 0 ){
        $(".check_tel").next("span").text("手机号有误！");
        return;
    }

    if( checkQq == ''){
        $(".check_qq").next("span").text("QQ有误！");
        return;
    }
    var qqReg = /^\d{5,12}$/;
    if( qqReg.test(checkQq) == 0){
        $(".check_qq").next("span").text("QQ有误！");
        return;
    }
    if( checkShop == '' || checkShop == '链接请以http://开头'){
        $(".check_shop").next("span").text("店铺链接有误！");
        return;
    }
    var urlReg = /[a-zA-z]+:\/\/[^\s]*/;
    if( urlReg.test(checkShop) == 0){
        $(".check_shop").next("span").text("店铺链接有误！");
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
                a({dialogContent : res.message});
            }else if( res.error_code == -3){
                a({dialogContent : res.message});
            }else{
                a({dialogContent : res.message});
            }
        },
        error:function(){
            a({dialogContent : '系统繁忙，请稍后再试'});
        }
    });
}

