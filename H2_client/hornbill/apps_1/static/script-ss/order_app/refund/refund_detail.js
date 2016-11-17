fml.define('order_app/appeal/appeal', ['order_app/common/zepto', 'order_app/common/zepto/touch', 'order_app/common/component/callQQ',
    'order_app/common/component/uploadBtn', 'order_app/common/app/alert', 'order_app/common/client/common',
    'order_app/common/app/loading', 'order_app/common/client/clientUse', 'order_app/common/app/confirm',"order_app/common/autoCountDown"], function (require, exports) {
    var callQQ = require('order_app/common/component/callQQ')
        , uploadBtn = require('order_app/common/component/uploadBtn')
        , m_alert = require('order_app/common/app/alert')
        , common = require('order_app/common/client/common')
        , loading = require('order_app/common/app/loading')
        , Confirm = require('order_app/common/app/confirm')
        , clientUse = require('order_app/common/client/clientUse')
        , autoCountDown = require("order_app/common/autoCountDown");
//倒计时
    $('.autoCountDown').each(function(index,item){
//        var str  = $(this).text();
//        var reg =  new RegExp("s%");
//        if(reg.test(str)){
//            var finishTime = $(item).attr("data-finishTime");
//            var id = (new Date()).getTime()+"-"+index+"-"+Math.floor(Math.random()*1000);
//            var newstr  = str.replace(reg,"<span id='"+id+"'></span>");
//            $(item).html(newstr);
//            autoCountDown(id,CONSTANT.serverTime,finishTime,["天","时","分","秒"]);
//        }
        var finishTime = $(item).attr("data-finishTime");
        autoCountDown(item,CONSTANT.serverTime,finishTime,["天","时","分","秒"]);

    });

    callQQ($('.qq'));

    var uploadButton = $('.pic_upload');
    if (!CONSTANT.flow) {
        $(".status h3").css('margin-top','0px');
    };

    function newLayer() {
        var elMask = $('<div></div>').css({
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            'z-index': 10000,
            background: '#000',
            opacity: 0
        }).appendTo('body');
        window.setTimeout(function () {
            elMask.remove();
        }, 2000);
    }

    $("#scanner").on("touchend",function(e){
        e.preventDefault();
    }).on("tap",function(){
        location.href = 'meilishuo://scanner.meilishuo?json_params=' + encodeURI('{"is_default_action":"0"}');
    });

    window.MLS =window.MLS || {};

    window.MLS.onScan = function(result){

        $("#express_id").val(result.content);
    }    // result为object: {"content":"扫描的结果字符串")




    $('#express_company').on('change', function () {
        var val = $(this).val()
        if (val == -1) {
            $('.express_company_other').show();
        } else {
            $('.express_company_other').hide();
        }
    })

    $('#send_goods').on('tap', function () {
        var express_id = $('#express_id').val()
            ,refund_id = $('#refund_id').val()
            , express_company = $('#express_company').val();

        //快递公司
        if (express_company == "0") {
            m_alert({
                dialogContent: '请选择快递公司'
            });
            return;
        } else {
            if (express_company == -1) {
                express_company = $('#express_company_other').val()
                if (!express_company) {
                    m_alert({
                        dialogContent: '请填写自定义快递公司'
                    });
                    return;
                }
            }
        }

        //快递单号
        if (!express_id) {
            m_alert({
                dialogContent: '请填写快递单号'
            });
            return;
        }

        if (!/^(\w|\d)+$/.test(express_id)) {
            m_alert({
                dialogContent: '快递编号只能为字母和数字'
            });
            return;
        }
        if (express_id.length > 25) {
            m_alert({
                dialogContent: '物流单号的长度不能超过25位数字'
            });
            return;
        }
        $.ajax({
            url: '/bizaj/doota/express',
            type: 'post',
            dataType: 'json',
            data: {
                express_id: express_id,
                express_company: express_company,
                refund_id: $('#refund_id').val()
                //,
                // access_token : Meilishuo.config.access_token
                // alipay_account:alipay_account,
                // real_name:real_name,
                // abort:$('#abort:checked').length
            },
            success: function (data) {
                // data = data.data;
                if (!data.code) {
                    m_alert({
                        dialogContent: '提交成功',
                        onClose: function () {
                            //window.location.reload();
                            window.location.href = '/app/refund/detail/?refund_id=' + refund_id;
                        }
                    });

                } else {
                    m_alert({
                        dialogContent: data.msg
                    });
                }
            },
            error: function (data) {
                m_alert({
                    dialogContent: '系统错误，请重新提交一下试试'
                });
            }
        });
    })


    $('#refund_cancel').on('touchend', function (e) {
        e.preventDefault();
    }).on('tap', function () {
        var refund_id = $('#refund_id').val();
        //console.log(refund_id);
        var c = new Confirm({
            content: '<h3>美丽说温馨提示</h3></br>你确定要取消退款吗？如果有运费，此订单将不能退运费！', onSure: function () {
                newLayer();

                $.get('/bizaj/doota/refund_cancel?refund_id=' + refund_id, function (data) {
                    if (data.code == 0) {
                        window.location.href = '/app/refund/detail/?refund_id=' + refund_id;
                    } else {
                        m_alert({
                            dialogContent: data.msg
                        });
                    }
                }, 'json');

            }, onCancel: function () {
                return;
            }
        });
    })

    $('#refund_reapply').on('touchend', function (e) {
        e.preventDefault();
    }).on('tap', function () {
        var refund_id = $('#refund_id').val();
        //console.log(refund_id);
        var c = new Confirm({
            content: '<h3>美丽说温馨提示</h3></br>你确认要恢复退款申请吗？此商品还能申请'+window.appealTimes+'次！', onSure: function () {

                newLayer();
                $.get('/bizaj/doota/refund_reapply?refund_id=' + refund_id, function (data) {

                    if (data.code == 0) {
                        // window.location.href = '/app/refund/detail/?refund_id='+ refund_id;
                        location.reload(true);
                    } else {
                        m_alert({
                            dialogContent: data.msg
                        });
                    }
                }, 'json');
            }, onCancel: function () {
                return;
            }
        });
    })

    var operationBtns = $('.operations_wrap').find("a");
    if(!operationBtns.size()){
        $('.operations_wrap').css("display","none");
        $(".steps-wrap").css({"marginTop":"0"});
    }



});
