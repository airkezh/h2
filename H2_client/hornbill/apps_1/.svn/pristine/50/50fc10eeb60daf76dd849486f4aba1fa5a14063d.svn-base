fml.define('order_pc/order/alter_pay',['jquery','ui/alert','ui/dialog'],function(require){
    var $ = require('jquery');
    var Alert = require('ui/alert');
    var Dialog = require('ui/dialog');
    var alert = function(msg){
        new Alert({
            width:398,
            content:msg,
            discover:true
        });
    };

    $('.bank img').click(function(){
        $(this).parent().prev().find('input').attr('checked','checked').trigger('change');
    });

    $('.bank .t').click(function(){
        $(this).next().toggle();
        $(this).toggleClass('extended');
    });

    $('#charge').click(function(){
        var bank_name = $('[name=pay_id]:checked').attr('data-name');
        data = {
            order_id:fml.vars.order_id,
            bank_name: bank_name,
            total_price:fml.vars.total_price,
            pay_channel:$('[name=pay_id]:checked').val()
        };


        var params = location.search.substr(1).split('&');
        for (var i=0; i < params.length; i++) {
            var pair = params[i],
                index = pair.indexOf('='),
                key = pair.substr(0,index),
                val = pair.substr(index+1);
            data[key] = decodeURIComponent(val);
        };
        var form = $('#confirm_form').empty();
        for(var i in data){
            form.append('<input type="hidden" name="'+i+'" value="'+data[i]+'"/>');
        }

        if(Meilishuo.config.is_iPad){
            form.append('<input type="hidden" name="ipad" value="1"/>');
            window.location.href += '#hdpay';
        }
        form.submit();

        var errorCode = 0,errorMsg = '订单提交失败';
        window['__callOnFail'] = function(code,msg){
            errorCode = code;

            dialog.destory();
            dialog = new Alert({
                title:'提交订单',
                width: 370,
                hasClose:false,
                content:'<span>'+errorMsg+'</span>'
            }).onSure( function(){
                if(errorCode == '400004'){
                    window.location.href = "/order"
                }else{
                    history.back()  
                }
            })
        }

        var dialog = new Dialog({
            title:'支付订单',
            width:409,
            hasClose:false,
            content:'<p class="pay_dlg"><span class="icon">&nbsp;</span><span>订单提交成功，请在新弹出的窗口中完成付款</span></p><p class="pay_dlg_btn"><input type="button" name="" value="" id="pay_success" class="btn"/><input type="button" name="" id="pay_cancel" value="" class="cancel"/></p>'
        });
        $('#pay_cancel').click(function(){
            location.href = '/order/';
        });
        $('#pay_success').click(function(){
            location.href = '/order/?is_popup=1';
        });

    });
});
