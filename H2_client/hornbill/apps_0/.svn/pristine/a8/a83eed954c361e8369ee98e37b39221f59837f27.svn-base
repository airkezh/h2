fml.define('order_pc/shop/shop_comment_append', ['jquery', 'ui/alert'], function(require , exports){
    var alert = require('ui/alert');
    $('.com_btn').click(function(){
        var t = $(this), id = t.attr('data-id'), text = $('#comment-text').val();
        if($.trim(text).length == 0) {
            new alert({
                content: '评论的内容不能为空',
                width: 370
            });
            return;
        }
        if($.trim(text).length > 500) {
            new alert({
                content: '评论的内容不能超过500字',
                width: 370
            });
            return;
        }
        if(t.attr('data-rule') == -1) return;
        t.attr('data-rule', -1);

        var param = {
            mid : id
            ,appendContents : text
        };

        $.post('/aj/comment_new/append',param,function(msg){
            if (msg.error_code) {
                new alert({
                    content: msg.message,
                    width: 370
                });
                t.attr('data-rule', 1);
            }
            else{
                $('#comment-text').attr('disabled', true);
                $('.com_btn').val('评论成功');
                setTimeout(function(){
                    window.location.href = '/order/';
                },2000);
            }
        },'json');

    });
});

