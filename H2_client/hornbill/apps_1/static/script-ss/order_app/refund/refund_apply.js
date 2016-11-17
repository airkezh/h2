fml.define('order_app/refund/refund_apply', ['order_app/common/zepto', 'order_app/common/zepto/touch',
    'order_app/common/component/uploadBtn', 'order_app/common/component/shareTmp',
    'order_app/common/app/alert', 'order_app/common/client/common', 'order_app/common/app/loading',
    'order_app/common/client/clientUse'
], function(require, exports) {
    var uploadBtn = require('order_app/common/component/uploadBtn'),
        shareTmp = require('order_app/common/component/shareTmp'),
        m_alert = require('order_app/common/app/alert'),
        common = require('order_app/common/client/common'),
        loading = require('order_app/common/app/loading'),
        clientUse = require('order_app/common/client/clientUse');
    var originalUrl = window.location.href || "";
    var hasChooseType = 0;
    //读取参数callback
    var callbackFn = getUrlParam("callback") ||"defaultFn";
    var rdata = getUrlParam("rdata") ||"";

    var cb = {
        setPasswordCallback:function(){
            //设置支付密码之后的回调函数
            console.log("设置支付密码之后的回调函数");
            console.log(rdata,"获取参数rdata");
            var data = rdata;
            if(!data){return;}
            data = JSON.parse(data);
            console.log(data,"====");
            //$('.refund_apply_main_content').css("display","none");
            submitRefundFn(data);
        },
        defaultFn:function(){
            console.log("申请退款退货");
        }
    }
    cb[callbackFn]();


    // window.location.href = 'meilishuo://set_title.meilishuo?json_params=' + encodeURI('{"title" : "申请退款"}');

    //重置checked

    var $radios = $('input[name="is_refund_goods"]');
    if ($radios.length == 2) {
//        var $radioGoods = $($radios[0]),
//            $radioMoney = $($radios[1]);
//        $radioGoods.prop('checked', true);
//        $radioMoney.prop('checked', false);
    }
    if ($radios.length == 1) {
        $radios.prop('checked', true);
        hasChooseType = 1;
    }
    //通用方法，通过reason获取Id
    var getIdByReason = function(type, reason) {
        if (reason && CONSTANT && CONSTANT[type] && CONSTANT[type].length > 0) {
            for (var i = 0; i < CONSTANT[type].length; i++) {
                if (reason == CONSTANT[type][i].option) {
                    return i;
                }
                if (reason == -1) { //原因为其它时
                    return CONSTANT[type].length - 1;
                }
            }
        }
        return -1;
    }

    if (Meilishuo.config.isNewest || Meilishuo.config.isApad) {

        $('.pic').each(function(i, item) {
            clientUse.callClient.bindUpload($(item), bindUploadParam);
        });

        function bindUploadParam(data, btn) {

            var btn = $(btn),
                img = btn.find('img');

            if (img.length > 0) {
                img.attr({
                    src: data.o_pic_url,
                    asrc: data.H_pic_url
                })
            } else {
                btn.append(shareTmp('img_upload', data))
                    .removeClass('addBtn')
                if ($('.upload-wrap img').length < 5) {
                    var newObj = btn.clone().empty().addClass('addBtn')
                    btn.after(newObj)
                    clientUse.callClient.bindUpload(newObj, bindUploadParam);
                }
            }
        }

    } else {
        var bindUploadParam = {
            //'crossDomain':true,
            'behind':'/imageupload/pic_upload',
            //backuri : CONSTANT.order + '/aw/proxy/',
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
                            var newObj = obj.clone().empty().addClass('addBtn')
                            obj.after(newObj)
                            uploadBtn.bind(newObj, bindUploadParam);
                        }
                    }
                } else {
                    m_alert({
                        dialogContent: data.msg
                    });
                }
            },
            'error': function(p) {
                m_alert({
                    dialogContent: p.description
                });
            },
            plusData: {
                'big': 1
            },
            start: function() {
                loading.start();
            },
            final: function() {
                loading.stop();
            }
        }
        uploadBtn.bind($('.pic'), bindUploadParam);
    }

    $("#maskforReason").on("click",function(){
        hasChooseTypeFn();
    });

    $('#goods_refund_reason,#refund_reason').on('change', function() {
        //选择原因前先判断有没有选择退款类型
        if(isSendGoods){
            var refund_style = $('[name=is_refund_goods]:checked').val();
            if(!refund_style){
                m_alert({
                    dialogContent: '请先选择退款类型'
                });
                //原因恢复
                $(this).val("");
                return;
            }
        }
        //已经选择了退款类型，就可以
        hasChooseType = 1;
        //退款原因（退货页面）
        var val = $(this).val(),
            $selectedEle, type, id,
            $bottomTips = $('.bottom-tips');


        if ($(this).attr('id') == 'goods_refund_reason') {
            type = "goods"
        } else {
            type = "cash";
        }
        if (CONSTANT && CONSTANT[type] && CONSTANT[type].length > 0) {
            for (var i = 0; i < CONSTANT[type].length; i++) {
                if (val == CONSTANT[type][i].option) {
                    id = i;
                    break;
                }
            }
        }


        if(CONSTANT[type][id] && CONSTANT[type][id].bottom_tips){
            $bottomTips.show();
            changeBottomTips();
        }else{
            $bottomTips.hide();
            changeBottomTips();
        }
        if(CONSTANT[type][id] && CONSTANT[type][id].e){
            $('#certifyicon').show();
        }else{
            $('#certifyicon').hide();
        }
        if (val == -1) {
            $('[name=refund_reason_other]').show();
        } else {
            $('[name=refund_reason_other]').hide();
        }
        var freigth = $(this).find('option').not(function() {
            return !this.selected
        });

        //console.log(freigth.val());
        if (freigth.val().indexOf("7天无理由退货") > -1 || freigth.val() == "协商一致退差价" || freigth.val() == "商品已拒签" || !hasFreight) {
            if ($('.with_freight').length > 0) {
                $('.with_freight').hide();
                $('.no_freight').show();
            }
            $('.cash_info').hide();
            //如果没有refundApplyPrice，就自己设定值
            if (CONSTANT && !CONSTANT.refundApplyPrice) {
                $('[name=refund_price_apply]').val(parseFloat($.trim(parseFloat($('.no_freight').text()).toFixed(2))));
            } else {
                var value = $('[name=refund_price_apply]').val();
                var valueBottom = parseFloat($.trim(parseFloat($('.no_freight').text()).toFixed(2)));
                if(value > valueBottom){
                    $('[name=refund_price_apply]').val(valueBottom);
                }
            }
        } else {
            if ($('.with_freight').length > 0) {
                $('.with_freight').show();
                $('.no_freight').hide();
            }
            $('.cash_info').show();

            //如果没有refundApplyPrice，就自己设定值
            if (CONSTANT && !CONSTANT.refundApplyPrice) {
                $('[name=refund_price_apply]').val(parseFloat($.trim(parseFloat($('.with_freight').text()).toFixed(2))));
            } else {
                var value = parseFloat($.trim(parseFloat($('.with_freight').text()).toFixed(2)));
                if (value > CONSTANT.refundApplyPrice && CONSTANT.refund_freight) {
                    $('[name=refund_price_apply]').val(value);
                }
            }
        }
        // $('textarea[name="refund_reason_other"]').val('');

        setTip(id, type);
    })


    // 如果原因里填写的是：尺码不合时，则下面的退款金额需要改一下
    var changeCallback = function(e) {
        var theVal = $.trim(this.value);
        if (theVal.indexOf('7天无理由退货') > -1 || theVal == '协商一致退差价' || theVal == '商品已拒签') {
            var newMax = $('.max_sum.no_freight');
            if (newMax.length > 0) {
                newMax.show();
                $('.max_sum.with_freight').hide();
            }
            $('.cash_info').hide();
            $('input[name="refund_price_apply"]').val(newMax.text());
        } else {
            var newMax = $('.max_sum.with_freight');
            if (newMax.length > 0) {
                newMax.show()
                $('.max_sum.no_freight').hide();
            }
            $('.cash_info').show();
            $('input[name="refund_price_apply"]').val(newMax.text());
        }
    };
    $('textarea[name="refund_reason_other"]').change(changeCallback).blur(changeCallback).keyup(changeCallback);

    // 获取做大退款金额
    var getMaxPrice = function() {
        var showElem = '';
        $('.max_sum').each(function() {
            if ($(this).css('display') != 'none') {
                showElem = $(this);
            }
        });
        return Number($.trim(showElem.text()));
    };
    //判断有没有提示
    var setTip = function(id, type) {
        if (type && CONSTANT && CONSTANT[type] && CONSTANT[type][id] && CONSTANT[type][id].tip) {
            $('#refundTipText').html(CONSTANT[type][id].tip && CONSTANT[type][id].tip.replace(/p>/g, 'li>'));
            $('#refundTip').show();
        } else {
            $('#refundTip').hide();
        }
    }
    $('#refund_apply').on('tap', function() { //提交申请
        var max_price = getMaxPrice();
        var is_refund_goods = 0,
            select_reason = '',
            select_reason_id = '',
            reason = $('[name=reason]').val(),
            refund_price_apply = max_price,
            Url = '';

        //退款原因
        if (!$('#refund_reason').val()) {
            m_alert({
                dialogContent: '请选择退款原因'
            });
            return;
        } else {
            var otherObj = $('[name=refund_reason_other]'),
                is_other = (otherObj.css('display') != 'none')
            select_reason = is_other ? otherObj.val() : $('#refund_reason').val();
            var id = getIdByReason('cash', $('#refund_reason').val());
            select_reason_id = CONSTANT['cash'][id].val; //获取已选退款原因的val
            if (!select_reason) {
                m_alert({
                    dialogContent: '退款原因不能为空'
                });
                return;
            }
        }
        //退款说明
        /*if(!reason){
         alert('请填写退款说明');
         return;
         }*/

        var data = {
            order_id: $('#order_id').val(),
            mid: $('#mid').val(),
            select_reason: select_reason,
            select_reason_id: select_reason_id,
            reason: reason,
            with_goods: is_refund_goods,
            refund_price_apply: refund_price_apply,
            refund_id: $('#refund_id').val(),
            plat:plat
            // access_token : Meilishuo.config.access_token
        }

        //选择退款方式（是否退款到钱包）
        chooseRefundWay(data);
    })

    if (isSendGoods) {
        function aferSaleReason() {
            console.log("hasChooseType",hasChooseType);
            if(hasChooseType) {
                var val = $('[name=is_refund_goods]:checked').val();
                $("#maskforReason").hide();
            }else{
                val = 1;
            }
            var showObj = $('#goods_refund_reason');
            if (val == 1) {
                $('#refund_reason').hide()
                $('#goods_refund_reason').show()
            } else {
                $('#refund_reason').show()
                $('#goods_refund_reason').hide()
                showObj = $('#refund_reason')
            }
            if (showObj.val() == -1) {
                $('[name=refund_reason_other]').show()
            } else {
                $('[name=refund_reason_other]').hide()
            }

            $('#goods_refund_reason,#refund_reason').each(function() {
                if ($(this).css('display') != 'none') {
                    if(hasChooseType){
                        $(this).trigger('change');
                    }
                }
            });

        }

        aferSaleReason();

        $('[name=is_refund_goods]').on('change', function() {
            $("#maskforReason").hide();
            hasChooseType = 1;
            aferSaleReason();
            changeBottomTips();
        });
    }

    /**
     * 根据退款类型不同更改底部的tips
     *
     */
    function changeBottomTips(){
        var refund_style = $('[name=is_refund_goods]:checked').val();
//        console.log(refund_style,"refund_style");
        var  $compensate = $(".compensate"),
            $bottomTips = $('.bottom-tips');
        if(refund_style == 1){
            //如果根据原因选择后的发货补偿提示已经存在  则这个不能显示
            if($bottomTips.css('display') == 'block'){
                $compensate.hide();
            }else{
                $compensate.show();
            }
        }else{
            $compensate.hide();
        }
    }

    $('#refund_apply_goods').on('touchend', function(e) {
        // alert('haha');
        e.preventDefault();
    }).on('tap', function() {
        var max_price = getMaxPrice();
        // 退款/退货申请
        var is_refund_goods = ($('[name=is_refund_goods]:checked').val()) == 1 ? 1 : 0,
            select_reason = '',
            select_reason_id = '',
            reason = $('[name=reason]').val(),
            refund_price_apply = $('[name=refund_price_apply]').val(),
            refund_evidence = '',
            Url = '';
        var refund_style = $('[name=is_refund_goods]:checked').val();
        if(!refund_style){
            m_alert({
                dialogContent: '请先选择退款类型'
            });
            //原因恢复
            $(this).val("");
            return;
        }
        //退款原因
        var selectObj = $('#goods_refund_reason');
        var type = "goods";
        if (selectObj.css('display') == 'none') {
            selectObj = $('#refund_reason')
            type = "cash";
        }
        if (!selectObj.val()) {
            m_alert({
                dialogContent: '请选择退款原因'
            });
            return;
        } else {
            var otherObj = $('[name=refund_reason_other]'),
                is_other = (otherObj.css('display') != 'none')
            select_reason = is_other ? otherObj.val() : selectObj.val();

            var id = getIdByReason(type, selectObj.val());
            select_reason_id = CONSTANT[type][id].val; //获取已选退款原因的val
            if (!$.trim(select_reason)) {
                m_alert({
                    dialogContent: '退款原因不能为空'
                });
                return;
            }
        }

        //退款说明
        /*if(!reason){
         alert('请填写退款说明');
         return;
         }*/

        //退款金额
        if (!refund_price_apply) {
            m_alert({
                dialogContent: '退款金额不能为空'
            });
            return;
        }
        refund_price_apply = parseFloat(refund_price_apply)
        if (refund_price_apply != refund_price_apply) {
            m_alert({
                dialogContent: '退款金额必须填写为数字'
            });
            return;
        }
        if (refund_price_apply > max_price) {
            m_alert({
                dialogContent: '退款金额不能大于' + max_price + '元'
            });
            return;
        }
        if (refund_price_apply <= 0) {
            m_alert({
                dialogContent: '退款金额不能等于0元'
            });
            return;
        }

        //上传凭证
        var imgs = $('.upload-wrap img'),
            pics = [],
            selected_opt = selectObj.find('option').not(function() {
                return !this.selected
            });

        //alert(selected_opt.val());

        if (selected_opt.attr('must') == '1' && imgs.length == 0 && !common.isLowVersion()) {
            m_alert({
                dialogContent: '请上传凭证'
            });
            return;
        }

        for (var i = 0; i < imgs.length; i++) {
            pics.push(imgs.eq(i).attr('asrc'));
        }
        refund_evidence = pics.join(',')

        var data = {
            order_id: $('#order_id').val(),
            mid: $('#mid').val(),
            select_reason: select_reason,
            select_reason_id: select_reason_id,
            reason: reason,
            with_goods: is_refund_goods,
            refund_price_apply: refund_price_apply,
            refund_evidence: refund_evidence,
            refund_id: $('#refund_id').val()
            // access_token : Meilishuo.config.access_token
        }
        //选择退款方式（是否退款到钱包）
        chooseRefundWay(data);
    });

    if ($('#goods_refund_reason').attr('isEdit') == '1') { //edit
        if ($('#goods_refund_reason').val() == '') {
            $('#goods_refund_reason option:last-child').prop('selected', true);
            $('#goods_refund_reason').next('.refund_other').val($.trim($('#goods_refund_reason option:last-child').attr('svalue'))).show();
        } else {
            $('#goods_refund_reason').next('.refund_other').hide();
        }
    }

    //another edit
    if ($('#goods_refund_reason').attr('isEdit') == '2') {
        if ($('#goods_refund_reason option[value="' + $('#goods_refund_reason').attr('selectVal') + '"]').length == 0) {

            var other = $('#goods_refund_reason option[value="-1"]');
            if (other[0]) {
                other.prop('selected', true);
                $('#goods_refund_reason').next('.refund_other').val($('#goods_refund_reason').attr('selectVal')).show();
            }
        } else {
            $('#goods_refund_reason option[value="' + $('#goods_refund_reason').attr('selectVal') + '"]').prop('selected', true);
            $('#goods_refund_reason').next('.refund_other').hide();
        }
    }

    if ($('#refund_reason').attr('isEdit') == '2') {
        if ($('#refund_reason option[value="' + $('#refund_reason').attr('selectVal') + '"]').length == 0) {
            var other = $('#refund_reason option[value="-1"]');
            if (other[0]) {
                other.prop('selected', true);
                $('#refund_reason').next('.refund_other').val($('#refund_reason').attr('selectVal')).show();
            }
        } else {
            $('#refund_reason option[value="' + $('#refund_reason').attr('selectVal') + '"]').prop('selected', true);
            $('#refund_reason').next('.refund_other').hide();
        }
    }
    $('#goods_refund_reason,#refund_reason').each(function() {
        if ($(this).css('display') != 'none') {
//            $(this).trigger('change');
        }
    });

    //refund_ways,根据选择退款方式的不同，控制提示的展示与隐藏
    $('.refund_ways_radio').change(function(){
        var $selectedValue = $('input[name="refund_ways"]:checked').val();
        if($selectedValue=="0"){
            //退款到钱包
            $('.setpassword-tips').show();
        }else{
            $('.setpassword-tips').hide();
        }
    });


    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
    }

    function chooseRefundWay(data){
        //如果是手Q或者微信，那么没有选择退款途径，修改退款方式为1原路返回,并且立即提交
        if(isWxOrSq){
            data.cash_status=1;
            submitRefundFn(data);
        }
        //判断用户选择了哪种退款方式
        var refund_ways = $('input[name="refund_ways"]:checked').val();
        var cash_status = 1;//cash_status  1原路返回 30钱包
        if(refund_ways == "0"){
            cash_status = 30;
        }else if(refund_ways == "1"){
            cash_status = 1;
        }
        data.cash_status = cash_status;
        //data.refund_ways = refund_ways;
        // console.log(refund_ways,"======"); //cash_status  1原路返回 30钱包
        if(refund_ways=="0"){
            //退款到钱包
            //查询是否开通了钱包，进行相应的处理 is_setPayPsd=1表示开通 0未开通
            // console.log(is_setPayPsd,"退款到钱包is_setPayPsd");
            if(is_setPayPsd == "1"){
                //开通了钱包
                //alert();
                submitRefundFn(data);
            }else if(is_setPayPsd == "0"){
                //未开通钱包
                var referUrl = encodeURIComponent(originalUrl);
                var refund_datas = data;
                refund_datas = JSON.stringify(refund_datas);
                refund_datas = encodeURIComponent(refund_datas);
                // console.log(refund_datas,"=====refund_datas===");
                window.location.href= CONSTANT.zhifu+"/security#/setpassword/"+"?referrer="+referUrl+"&callback=setPasswordCallback&rdata="+refund_datas;
            }

        }else if(refund_ways == "1"){
            //提交退款退货信息
            submitRefundFn(data);
        }
        return;
    }

    //提交退款退货post相关操作
    function submitRefundFn(data){
        if (data.refund_id) {
            Url = '/bizaj/doota/refund_edit';
        } else {
            Url = '/bizaj/doota/refund_apply';
        }
        console.log(data,"最终的提交数据data");

        $.post(Url, data, function(data, textStatus, xhr) {
            // data = data.data;
            //console.log("得到返回数据，准备跳转！",data);
            if (data.code != 0) {
                m_alert({
                    dialogContent: data.msg
                });
            } else {

                window.location.href = '/app/refund/detail/?refund_id=' + data.refund_id;
            }
        }, 'json');
        //console.log(data,"最终的提交数据data");
        //window.location.href = '/app/refund/detail/?refund_id=1221';
    }

    function hasChooseTypeFn(){
        var refund_style = $('[name=is_refund_goods]:checked').val();
        if(!refund_style){
            m_alert({
                dialogContent: '请先选择退款类型'
            });
            //原因恢复
            $(this).val("");
            return;
        }
    }

});