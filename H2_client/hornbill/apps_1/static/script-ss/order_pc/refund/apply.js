fml.define('order_pc/refund/apply', ['jquery', 'ui/alert', 'ui/confirm', 'ui/uploadBtn', 'component/shareTmp', 'order_pc/common/scrollFloat'], function(require) {
    var $ = require('jquery');
    var Alert = require('ui/alert');
    var Confirm = require('ui/confirm');
    var shareTmp = require('component/shareTmp');
    var uploadBtn = require('ui/uploadBtn');
    var scrollFloat = require('order_pc/common/scrollFloat');

    var reasonData = CONSTANT.refundReason,
        currSelected = CONSTANT.curSelectedReason,
        hiddenData = CONSTANT.hiddenData,
        curType = CONSTANT.curType,
        formData = $.extend({
            order_id: '', //order_id
            mid: '', //mid
            refund_id: '', //refund_id
            with_goods: '', //是否退货
            select_reason: '', //currSelect
            select_reason_id: '', //currSelect的id
            reason: '', //描述
            refund_price_apply: '', //退款金额
            refund_evidence: '' //凭据
        }, hiddenData);

    function init() {
        if (currSelected == '' && $.trim($('#refund_reason_text').val()) != '') {
            $("#refund_reason").val('其它');
            $('#refund_reason_text').show();
            currSelected = $('#refund_reason option:selected').data('id');
            formData.select_reason = $.trim($('#refund_reason_text').val())
            formData.select_reason_id = currSelected;
        }

        updateView(); //初始化状态
        bindUpdatebtn();
        bindEvent();
        updateData();
    }

    //校验库方法
    var validateItem = function(item, callbacks) {
        var callbacks = callbacks || {};
        callbacks.success = callbacks.success || function() {};
        callbacks.failed = callbacks.failed || function() {};

        var validateField = validateRules[item],
            validateFunction, validateResult,
            curValue, code;

        if (validateField && validateField.rules && validateField.rules.length > 0) {
            curValue = formData[item];

            for (var i = 0; i < validateField.rules.length; i++) {
                validateFunction = validateFuncs[validateField.rules[i]];
                if (validateFunction) {
                    validateResult = validateFunction(curValue, validateField.data);
                    code = validateResult.errno;
                    if (code != 0) {
                        if (validateField.msg[code]) {
                            validateResult.msg = validateField.msg[code];
                        }
                        callbacks.failed(validateResult);
                        break;
                    }
                }
            }
        }

        if (!validateResult || validateResult.errno == 0) {
            callbacks.success();
        }

        return validateResult || {};
    }
    var validateAll = function(callbacks) {
        var callbacks = callbacks || {};
        callbacks.success = callbacks.success || function() {};
        callbacks.failed = callbacks.failed || function() {};

        var validateItemResult;
        if(CONSTANT.sendGoods == 1){
            if(!getAllData['with_goods']()){
                new Alert({
                    width: 380,
                    content: "请先选择退款类型"
                });
                $('#refund_goods_reason').val("");
                $withMoney = $('#refund_reason').val("");
                return;
            }else{
                $("#maskforFirst").hide();
            }
        }

        for (var field in formData) {
            var validateItemResult = validateItem(field, {
                failed: function(err) {
                    new Alert({
                        width: 380,
                        content: err.msg
                    })
                }
            })

            if (validateItemResult.errno && validateItemResult.errno != 0) {
                callbacks.failed(validateItemResult)
                return;
            }
        }

        callbacks.success();
        return;
    }
    var validateFuncs = {
        required: function(value) {
            var err = {
                errno: 0,
                msg: ''
            };
            if (value == '') {
                return {
                    errno: 1,
                    msg: '参数错误，请稍后再试'
                };
            }
            return err;
        },
        number: function(value) {
            var err = {
                errno: 0,
                msg: ''
            };
            if (value && !$.isNumeric(value)) {
                err.errno = 4;
            }
            return err;
        },
        refundReason: function(value) {
            var err = {
                errno: 0,
                msg: ''
            };
            var currSelectedReason = reasonData[curType][currSelected],
                value = $.trim(value);
            if (value == '' || !value) {
                if (currSelectedReason && currSelectedReason.val == 100) { //当选择的时其他的时候
                    err.errno = 2;
                } else {
                    err.errno = 1;
                }
            }
            return err;
        },
        maxLength: function(value, data) {
            var err = {
                errno: 0,
                msg: ''
            };
            if (data && data.maxLength) {
                if (value.length > data.maxLength) {
                    err.errno = 3;
                }
            }
            return err;
        },
        needFreight: function(value) {
            var err = {
                errno: 0,
                msg: ''
            };
            var currSelectedReason = reasonData[curType][currSelected],
                maxPrice = Number(CONSTANT.goodsPrice);
            if (currSelectedReason && currSelectedReason.freight != 0) {
                maxPrice = Number(CONSTANT.maxRefundPrice);
            }
            if (Number(value) < 0.01) {
                err.errno = 5;
            } else if (Number(value) > maxPrice) {
                err.errno = 6;
                err.msg = '您输入的退款金额有误，不能超过' + maxPrice.toFixed(2) + '元哦。'
            }

            return err;
        },
        needEvidence: function(value) {
            var err = {
                errno: 0,
                msg: ''
            };

            var currSelectedReason = reasonData[curType][currSelected],
                isNeed = false;

            if (currSelectedReason && currSelectedReason.e == 1) {
                isNeed = true;
            }

            if ((value == '' || !value) && isNeed) {
                err.errno = 7
            }

            return err;
        }
    };
    var validateRules = {
        select_reason: {
            rules: ['maxLength', 'refundReason'],
            data: {
                'maxLength': 60
            },
            msg: {
                1: '请选择退货原因。',
                2: '请填写退货原因。',
                3: '退货原因不能超过60个字符哦。'
            }
        },
        reason: {
            rules: ['maxLength'],
            data: {
                'maxLength': 140
            },
            msg: {
                3: '您填写的退货说明过长，不超过140个字符。'
            }
        },
        refund_price_apply: {
            rules: ['required', 'number', 'needFreight'],
            msg: {
                1: '请填写有效条款金额。',
                4: '请填写有效退款金额。',
                5: '退款金额不能小于0.01元哦。'
            }
        },
        refund_evidence: {
            rules: ['needEvidence'],
            msg: {
                7: '请上传凭证哦。'
            }
        }
    };


    //绑定事件
    var bindEvent = function() {
        $("#maskforFirst").on("click",function(){
            hasChooseType();
        });
        $('#refund_reason').on('change', function(evt) {
            hasChooseType();
            var $selected = $('#refund_reason').find('option:selected');

            currSelected = $selected.data('id')

            updateView();
        })
        $('#refund_goods_reason').on('change', function(evt) {

            hasChooseType();
            var $selected = $('#refund_goods_reason').find('option:selected');

            currSelected = $selected.data('id')

            updateView();
        })
        $('#refund_reason_text').on('blur', function(evt) {
            var thisValue = $(this).val(),
                thisSelected = getIdByReson(thisValue);

            currSelected = (thisSelected > -1) ? thisSelected : currSelected;

            updateView(['freight', 'evidence', 'tip']);
        });
        $('#submit').on('click', function(evt) {
            updateData();

            validateAll({
                success: function() {
                    submitForm();
                }
            })
        });

        $('input[name="is_refund_goods"]').on('change', function(evt) {

            var $withGoods = $('#refund_goods_reason'),
                $withMoney = $('#refund_reason');

            if(getAllData['with_goods']()==1){
                curType = 'goods'; //当前选择的类型
                $withGoods.show().val('');
                $withMoney.hide().val('');
            }else{
                curType = 'cash';
                $withGoods.hide().val('');
                $withMoney.show().val('');
            }

            $("#maskforFirst").hide();

            currSelected = -1;

            resetSt();
            updateData();
            changeBottonTips();
        })
    }

    //通用方法，通过reason获取field
    var getIdByReson = function(reason) {
        if (reason) {
            for (var i = 0; i < reasonData.length; i++) {
                if (reason == reasonData[i].option) {
                    return i;
                }
            }
        }
        return -1;
    }

    //提交表单
    var submitForm = function() {
        var submitUrl = '/aj/doota/refund_apply';

        if (hiddenData.refund_id) {
            submitUrl = '/aj/doota/refund_edit'
        }

        $.ajax({
            url: submitUrl,
            type: 'post',
            dataType: 'json',
            data: formData,
            success: function(data) {
                if (data.code != 0) {
                    new Alert({
                        width: 380,
                        content: data.msg
                    });
                } else {
                    location.href = "/refund/?refund_id=" + data.refund_id;
                }
            },
            error: function(data) {
                new Alert({
                    width: 380,
                    content: '系统错误，请重新提交'
                });
            }
        })
    }

    //更新数据
    var updateData = function() {
        var currField = reasonData[curType][currSelected],
            getDataFun;

        if (!currField) {
            return;
        }

        for (var item in formData) {
            getDataFun = getAllData[item]
            if (getDataFun) {
                formData[item] = getDataFun();
            }
        }
    }

    //获取不同类型的数据
    var getAllData = {
        select_reason: function() {
            var currField = reasonData[curType][currSelected],
                thisVal = currField.option;

            if (currField.val == 100) { //如果选择了其他
                thisVal = $('#refund_reason_text').val();
            }

            return thisVal;
        },
        select_reason_id: function() {
            var currField = reasonData[curType][currSelected],
                thisVal = currField.val;
            return thisVal;
        },

        reason: function() {
            return $('#description').val();
        },
        refund_price_apply: function() {
            var currField = reasonData[curType][currSelected],
                thisVal;

            if (currField.freight != 0) {
                thisVal = $('#refund_price_apply').val();
            } else {
                thisVal = $('#refund_price_apply_no_freight').val();
            }

            return thisVal;
        },
        refund_evidence: function() {
            return $('.upload-wrap img').map(function(i, img) {
                return $(img).attr('src');
            }).toArray().join(',')
        },
        with_goods:function(){
            return $('input[name="is_refund_goods"]:checked').val();
        }
    };

    //更新样式展现
    var updateView = function(fields) {
        var currField = reasonData[curType][currSelected],
            curFun;

        if (!currField) {
            return;
        }

        if (!fields) {
            for (var item in getAllView) {
                curFun = getAllView[item];
                curFun(currField);
            }
        } else if ((typeof fields).toLowerCase() == 'object' && fields.length > 0) {
            for (var i = 0; i < fields.length; i++) {
                curFun = getAllView[fields[i]];
                curFun(currField);
            }
        }
    }

    //获取所有样式方法
    var getAllView = {
        freight: function(currField) {
            //退款金额中是否提示运费
            if (currField && currField.freight != 0) {
                $('#max_refund_money').show();
                $('#goods_freight_total_money').show();
                $('#max_refund_except_fretight').hide();
                //默认金额显示
                $('#refund_price_apply_no_freight').hide();
                $('#refund_price_apply').show();
            } else {
                $('#max_refund_money').hide();
                $('#goods_freight_total_money').hide();
                $('#max_refund_except_fretight').show();
                //默认金额显示
                $('#refund_price_apply_no_freight').show();
                $('#refund_price_apply').hide();
            }
        },
        evidence: function(currField) {
            //是否需要退货凭证
            var $star = $('#evidenceStar');
            if (currField && currField.e == 1) {
                $star.show();
            } else {
                $star.hide();
            }
        },
        reason: function(currField) {
            //退货原因 如果是“其他”的话，需要输入其他理由
            var $reasonText = $('#refund_reason_text');

            if (currField.option == '其它') {
                $reasonText.show();
            } else {
                $reasonText.hide();
            }
        },
        tip: function(currField) {
            //根据不同的退货原因展示不同的tip提示
            var $reasonTipText = $('#reasonTipText');

            if (currField && currField.tip) {
                $reasonTipText.html(currField.tip).show();
            } else {
                $reasonTipText.hide();
                return
            }
        },
        bottomTip:function(currField){
            //是否要展示底部文案
            var $reasonBottom = currField.bottom_tips,
                $bottomTip = $('#bottom-tip');
            if($reasonBottom){
                $bottomTip.show();
            }else{
                $bottomTip.hide();
            }
            changeBottonTips();
        }
    };

    //预设上传功能
    function bindUpdatebtn() {
        var bindUploadParam = {
//            'crossDomain':true,
            'behind': '/imageupload/pic_upload?big=1',
//             backuri : Meilishuo.config.domain.order + '/aw/proxy/',
            'success': function(data, obj) {
                if (typeof data.code != 'number') {
                    var obj = $(obj),
                        img = obj.find('img');

                    if (img.length > 0) {
                        img.attr({
                            src: data.o_pic_url,
                            asrc: data.H_pic_url
                        })
                    } else {
                        obj.append(shareTmp('img_upload', data))
                            .removeClass('addBtn')
                        if ($('.upload-wrap img').length < 5) {
                            var newObj = obj.clone().empty().addClass('addBtn');
                            obj.parent().after(newObj);
                            uploadBtn.bind(newObj, bindUploadParam);
                        }
                    }
                } else {
                    new Alert({
                        content: data.msg,
                        width:370
                    });
                }
            },
            'error': function(p) {
                new Alert({
                    content: p.description,
                    width:370
                });
            }
        }
        uploadBtn.bind($('.pic'), bindUploadParam);
    };

    //判断是否已经选择退款类型：
    var hasChooseType = function(){
        if(CONSTANT.sendGoods == 1){
            if(!getAllData['with_goods']()){
                new Alert({
                    width: 380,
                    content: "请先选择退款类型"
                });
                $('#refund_goods_reason').val("");
                $withMoney = $('#refund_reason').val("");
                return false;
            }else{
                $("#maskforFirst").hide();
            }
        }
    }

    //重新控制底部的提示部分显示
    var changeBottonTips = function(){
        var refundTypes = getAllData['with_goods']();
        var $bottomTip = $('#bottom-tip'),
            $bottomTipSec = $("#bottom-tips-sec"),
            $compensate = $('.compensate');

        if(refundTypes == 1){
            //退款且退货
            if($bottomTip.css('display') == 'block'){
                $bottomTipSec.show();
                $compensate.hide();
            }else{
                $bottomTipSec.hide();
                $compensate.show();
            }
        }else{
            //仅退款
            $bottomTipSec.hide();
            $compensate.hide();

        }
    }

    var resetSt = function(){
        var $reasonTipText = $("#reasonTipText"),
            $bottomTip = $('#bottom-tip'),
            $bottomTipSec = $("#bottom-tips-sec"),
            $compensate = $('.compensate');

        $reasonTipText.hide();
        $bottomTip.hide();
        $bottomTipSec.hide();
        $compensate.hide();
    }

    new scrollFloat({
        ele: '.good_detail_wrap',
        scrTop: 30,
        bottomEle:'.main'
    })

    init();
});