fml.define('order_pc/order/confirm_receive',['jquery','ui/confirm','ui/alert'],function(require){
    var $ = require('jquery');
    var Confirm = require('ui/confirm');
    var Alert = require('ui/alert');
    $('.order_goods_list input[type=checkbox]').change(function(){
        if (this.checked) {
            var self = this;
            var confirmPanel = new Confirm({
                width : 380,
                content : '该商品正在退款/退货处理中，如果确认收货将关闭退款退货处理，并且将相应的钱款打入商家支付账号。您确定要继续本操作？',
                discover : true
            });
            confirmPanel.onCancel(function(){
                self.checked = false;
            });
        };
    });
    $('#confirm').click(function(){
        var confirmPanel = new Confirm({
            width : 380,
            content : '您是否要对当前选中商品确认收货？',
            discover : true
        });
        confirmPanel.onSure(function(){
            var mid = $('.order_goods_list input[type=checkbox]:checked,.order_goods_list input[type=checkbox]:disabled').map(function(i,el){
                return el.id.split('_')[1];
            }).toArray().join(',');
            var data = {
                order_id:$('#order_id').val(),
                mid:mid
            };
            if ($.trim(mid) == '') {
                return new Alert({
                    width : 380,
                    content : '您没有选择任何商品'
                });
            };
            $.ajax({
                type:'post',
                data:data,
                url:'/aj/doota/order_recv',
                dataType:'json',
                success: function(data){
                    /*var msg = data.code == 0 ? '确认收货成功，请点击确定关闭本页面。' : data.info.msg;
                     var alert = new Alert({
                     width : 380,
                     content : msg
                     }).onSure(function(){
                     location.href="/order/detail/?order_id="+$('#order_id').val();
                     });*/
                    if(data.code == 0){
                        clubConfirm();
                    } else {
                        new Alert({
                            width : 380,
                            content : data.info.msg
                        }).onSure(function(){
                                location.href="/order/detail/?order_id="+$('#order_id').val();
                            });
                    }

                    function clubConfirm(){
                        var c = new Confirm({
                            width : 380,
                            content : data.info.show_tips,
                            discover : true,
                            confirmTxt : '立即晒单',
                            cancelTxt : '下次再说'
                        })
                        c.onSure(function(){
                            location.href= Meilishuo.config.domain.www + "/club/newShoppingTopic?tid="+$('#tid').val()+"&order_id="+$('#order_id').val();
                        })
                        c.onCancel(function(){
                            location.href="/order/detail/?order_id="+$('#order_id').val();
                        });
                    }
                },
                error:function(){
                    var alert = new Alert({
                        width : 380,
                        content : '很抱歉，提交失败，请重试。'
                    });
                }
            });
        });
    });
});
