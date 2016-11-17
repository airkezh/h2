fml.define('order_pc/refund/refund_select',['jquery','ui/alert'],function(require){
    var $ = require('jquery');
    var Alert = require('ui/alert');
    var alert = function(content,cb){
        new Alert({
            width:370,
            content:content
        }).onSure(cb||function(){});
    }


    var x = 10;
    var y = 20; //设置提示框相对于偏移位置，防止遮挡鼠标 

    $(".select_btn").hover(function (e) {  //鼠标移上事件 
        var can_refund_money = parseInt($('#can_refund_money').val());
        var can_refund_goods = parseInt($('#can_refund_goods').val());
        //如果是退款
        if($(this).html() === '仅退款'){
            if(0 == can_refund_money){
                $(this).addClass('select_ntb'); //添加灰色样式
            }else{
                $(this).removeClass('select_ntb');
            }
            //如果是退货
        }else{
            if(0 == can_refund_goods){
                $(this).addClass('select_ntb'); //添加灰色样式
            }else{
                $(this).removeClass('select_ntb');
            }
        }

    }, function () {  //鼠标移出事件
        //移除弹出框
        $("#tooltip").remove();
        if(can_refund_money){
            $(this).attr('hint','仅退款只能申请一次，此订单您已经申请过仅退款，请选择退货退款或与客服联系仅退款问题。')
        }else if(can_refund_goods){
            $(this).attr('hint','退货退款只能申请一次，此订单您已经申请过退货退款，请选择仅退款或与客服联系退货退款问题。')
        }else{
            this.hint = this.myTitle;  //重新设置hint
        }
    });


    $('.select_btn').on('click',function(){
        var refundUrl = '/refund/service/?order_id=' + $('#order_id').val() + '&mid=' + $('#mid').val();
        var can_refund_money = parseInt($('#can_refund_money').val());
        var can_refund_goods = parseInt($('#can_refund_goods').val());
        if($(this).html() === '仅退款'){
            if(1 === can_refund_money){
                alert('<p>您确认选择“只退款不退货”选项吗？</p><p class="red_f">如果您已收到货，请确认与商家协商一致不退货仅退款！</p><p class="red_f">否则请选择“退货退款”选项。</p>',function(){
                    location.href = refundUrl
                });
            }else{
                return false;
            };
        }else{
            if(1 === can_refund_goods){
                alert('<p>您确认选择“退款且退货”选项吗？</p><p class="red_f">请确认是否已经收到货，否则该申请通过后会要求您退货！</p>',function(){
                    location.href = refundUrl + '&type=goods'
                });
            }
            //不能退货的时候，点击之后弹窗提示。
            else{
                return false;
            };
            /*
             else{
             return false;
             }
             */
        }
    })
});
