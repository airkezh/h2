fml.define('order_pc/order/order_confirm_haitao', ['component/shareTmp'
    , 'jquery', 'order_pc/common/address'
    , 'ui/dialog', 'order_pc/common/idValidate'], function (require) {
    var $ = require('jquery');
    var address = require('order_pc/common/address');
    var shareTmp = require('component/shareTmp');
    var Alert = require('ui/alert');
    var Dialog = require('ui/dialog');
    var alert = function (msg) {
        new Alert({
            width: 398,
            content: msg,
            discover: true
        });
    };

    var idValidate = require('order_pc/common/idValidate');
    var CONSTANT = {
        isIdChange: 0
    };

    var updateAddress = function (data) {
        var template = $(shareTmp('address_template', data));
        if (data.is_default == '1') {
            $('[is_default=1]').attr('is_default', '0');
        }
        var id = data.addr_id;
        var addr = $("[addr_id='" + id + "']").remove();
        template.insertBefore($('.unit:first'));
        template.find('input[type=radio]').attr('checked', 'checked').trigger('change');
        resetForm();
    };
    var resetForm = function () {
        $('#addressPostcode,#addressStreet,#addressUser,#addressPhone').val('');
        $('#is_default').attr('checked', false).val('');
        $('#addressPid').val(0).change();
        _addressCom && _addressCom.formVa.resetForm()
    };

    var switchAddrForm = function () {
        if ($('#addr_new').attr('checked')) {
            resetForm();
            $('#addr_form').show();
            if ($('.container .addr ').find('.adrl_list').length == 10) {
                $('#addr_tip').show();
            }
        } else {
            $('#addr_form').hide();
            $('#addr_tip').hide();
        }
    };
    var formatShopCoupon = function () {
        return $('.shop_coupon').map(function (i, item) {
            var coupon_id = item.value;
            var shop_id = item.id.split('_')[1];
            return {
                "shop_id": shop_id,
                "coupon_id": coupon_id
            };
        }).toArray();
    };
    var resetPrice = function () {

        try {
            var credit = $(this).find('option:selected').attr('data-available');
            $(this).parent().next().find('.credit').text(credit);
        } catch (e) {

        }
        var map_id = $('#coupon').val(),
            saved = $('#coupon option:selected').attr('data-available');
        var data = {
            shop_coupon: formatShopCoupon(),
            pay_channel: $('[name=pay_id]:checked').val(),
            addr_id: $('input[name="addr"]:checked').val(),
            shop_id: idValidate.trim($('#shop-id-hidden').text())
        };
        // if (this.id == 'coupon') {
        data.map_id = map_id;
        // };
        var self = this;
        $.ajax({
            url: '/order/compute/?' + location.search.substr(1),
            data: data,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                if (map_id === '') {
                    $('#total_price').text(data.info.total_price_without_coupon);
                } else {
                    $('#total_price').text(data.info.total_price);
                }
                $('#coupon_save').text(saved);
                if (self.id != 'coupon') {
                    $('#coupon').empty();
                    if (data.info.plat_coupon_info.length) {
                        for (var i = 0; i < data.info.plat_coupon_info.length; i++) {
                            var coupon = data.info.plat_coupon_info[i]
                            $('#coupon').append('<option data-available="' + (coupon.available_credit || 0) + '" value="' + coupon.coupon_id + '" data-save="' + coupon.credit + '" ' + (coupon.is_check ? 'selected' : '') + '>' + coupon.title + '</option>');
                            if (coupon.is_check) {
                                $('#coupon_save').text(coupon.available_credit);
                            }
                            ;
                        }
                    } else {
                        $('#coupon').append('<option value="-1">没有可以使用的美丽券</option>');
                        $('#coupon_save').text('0');
                    }

                }
                ;
                var shops = data.info.goods;
                for (var i = 0; i < shops.length; i++) {
                    $('#shop_total_price_' + shops[i].shop_id).text(shops[i].total_price);
                    $('.freight_show_' + shops[i].shop_id).text(shops[i].freight);
                }
                $('#weixin_coupon').val(data.info.weixin_coupon_info.title ? '1' : '0');
                if (data.info.weixin_coupon_info.title) {
                    $('#weixin_info .weixin_tips').html(data.info.weixin_coupon_info.title);
                    $('#weixin_info .x-credit-pay').html(data.info.weixin_coupon_info.credit);
                    $('#weixin_info').show();
                } else {
                    $('#weixin_info').hide();
                }
                if (data.info.weixin_coupon_warn) {
                    $('#weixin_warn .weixin_tips').html(data.info.weixin_coupon_warn);
                    $('#weixin_warn').show();
                } else {
                    $('#weixin_warn').hide();
                }


            }//success end


        });//ajax end

    };

    //@is_id_card_ok 判断是否合法，默认合法
    //新手入坑总结
    // 关于数据的操作，
    // 1.确认要传入哪些值
    // 2.保证必须传入的值有默认值
    // 3.保证必须的操作下，对应的值都有对应的变化
    // 4.传入前，对每个值进行确认（如果确保变化下值都正确改变，可以忽略此步骤）
    var is_id_card_ok = 1;

    var cardId = function () {
        //alert(document.readyState);
        //身份证显示
        var a_id = '';//身份证保存
        var card_id = '';//检查该地址下是否又身份证
        var id_string = '';//错误原因
        var now_bind_id_card = '';//现在正在操作的收货地址的DOM中隐藏的id-card
        now_bind_id_card = $('.bind-id-card').parent().find('.hidden').find('.id-card');
        card_id = idValidate.trim($('.id-card-text').text());
        a_id = $('input[name=addr]:radio:checked').val();
        $('input[name=addr]:radio:checked').parent().css('height', '72px');
        //console.log(card_id);
        $('.bind-id-card').change(function (event) {
            if ($(this).attr('checked')) {
                now_bind_id_card = $(this).parent().find('.hidden').find('.id-card');
                a_id = $(this).val();
                card_id = $(this).parent().find('.hidden').find('.id-card').text();
                //console.log(card_id);
                $('.id-card .id-card-edit .aid-hidden').text(a_id);

                if (card_id && card_id != '') {
                    //换地址从身份证修改转化后身份证显示
                    $('.id-card .id-card-edit').hide();
                    $('.id-card .id-card-display').show();
                    $('.id-card #id-card-cancel').show();

                    $('.id-card-text').text(card_id);
                    $('.id-card .advice').hide();
                } else {
                    //换地址从身份证修改转化后身份证显示
                    $('.id-card .id-card-edit').show();
                    $('.id-card .id-card-display').hide();
                    $('.id-card .id-card-input').val(card_id);
                    $('.id-card #id-card-cancel').hide();

                    $('.id-card-text').text("请输入身份证");
                    $('.id-card .advice').show();
                }

            }

            //清除原因
            $('.bad-reasons').text('');

            //展示文案
            $('.addr .unit').css('height', '32px');
            if( -1 == $(this).val() ){

            }else{
                $(this).parent().css('height', '72px');
            }
            


        });
        //修改身份证
        $('.id-card .id-card-change').click(function (event) {
            CONSTANT.isIdChange = 0;
            is_id_card_ok = 0;
            $('.id-card .id-card-display').hide();
            $('.id-card .id-card-edit').show();

            $('.id-card .id-card-input').val(card_id);
            $('.id-card .advice').show();
        });
        // 取消修改
        var date1 = '', date2 = '';
        $('.id-card #id-card-cancel').click(function () {
            //如果改地址下没有身份证，不能取消
            if (!card_id || card_id == '') {
                $('.id-card-input').val('该地址下无身份证，不能取消');
                return;
            }
            CONSTANT.isIdChange = 1;
            is_id_card_ok = 1;
            $('.id-card .id-card-display').show();
            $('.id-card .id-card-edit').hide();
            $('.bad-reasons').text('');
            $('.id-card .advice').hide();
        });

        //验证身份证是否正确 @id_card_valide，用于判断
        var id_card_valide = 0;

        $('.id-card .id-card-edit .id-card-input').focus(function (e) {
            if (!/\w+/.test($(this).val())) {
                $(this).val('');
            }
        });

        $('.id-card .id-card-edit .id-card-input').blur(function (event) {
            if ($(this).val() == '') {
                return;
            }
            if (1 == CONSTANT.isIdChange) {
                return;
            }
            var me = this;
            setTimeout(function () {

                id_string = $(me).val();
                var reasons_id = idValidate.IdCardValidate(id_string);
                if (reasons_id == true) {
                    $('.bad-reasons').text(''); //返回true，无原因显示
                    id_card_valide = 1;
                    is_id_card_ok = 1;
                    $('.id-card .advice').hide();

                } else {
                    $('.id-card .advice').hide();

                    $('.bad-reasons').text(reasons_id);
                }
            }, 50);
        });

        //保存身份证修改
        $('.id-card #id-card-save').click(function (event) {
            var checkId = $('.id-card .id-card-edit .id-card-input').val();
            var reasons_id = idValidate.IdCardValidate(checkId);
            
            if(checkId == ''){
                $('.bad-reasons').text('请输入您的身份证号');
                $('.id-card .advice').hide();
                return ; 
            }

            if (reasons_id == true) {
                id_card_valide = 1;
            } else {
                id_card_valide = 0;
            }
            if (!id_card_valide) {
                var reasons_id = idValidate.IdCardValidate(id_string);
                $('.bad-reasons').text(reasons_id);
                $('.id-card .advice').hide();
                //alert('请输入正确的身份证号码');
                return;
            }

            id_string = checkId;

            var host = '' || '/aj/doota';
            $.post(host + '/update_card_number', {
                addr_id: a_id,
                card_number: id_string
            }, function (data, textStatus, xhr) {

                CONSTANT.isIdChange = 1;
                $('.id-card .id-card-edit').hide();
                $('.id-card .advice').show();
                $('.id-card .id-card-display').show();
                $('.id-card .id-card-text').text(id_string);//确认身份证中显示的身份证
                now_bind_id_card.text(id_string);//收货地址中隐藏的身份证
                card_id = idValidate.trim($('.id-card-text').text());

                is_id_card_ok = 1;
                resetPrice();
            });
        });
    }

    var addEvents = function () {
        $('.addr .unit').live('mouseover', function () {
            $(this).addClass('hover');
        }).live('mouseout', function () {
            $(this).removeClass('hover');
        });
        $('.bank img').click(function () {
            $(this).parent().prev().find('input').attr('checked', 'checked').trigger('change');
        });
        $('.bank').delegate('input[name="pay_id"]', 'change', resetPrice);
        $('.addr').delegate('input[name="addr"]', 'change', resetPrice);
        $('.bank .t').click(function () {
            $(this).next().toggle();
            $(this).toggleClass('extended');
        });
        $('.cancel').click(function () {
            $('#addr_form').hide();
            //$(document).scrollTop(0);
            if ($('.adrl_list').length === 0) {
                $('#addr_new').attr('checked', false);
            } else {
                $('[name="addr"]:first').attr('checked', 'checked').trigger('change');
            }
            $('.container')[0].scrollIntoView()
        });
        $('.adrl_edit').live('click', function () {
            $(this).prevAll('input').attr('checked', 'checked').trigger('change');
            $('#addr_form').show();
        });
        _addressCom = address(function (data) {
            resetForm();
            updateAddress(data);
        });
        $('#coupon,.shop_coupon').change(resetPrice);
        $('input[name=addr]:radio').live('change', switchAddrForm);
        $('input[name=addr]:radio:checked').trigger('change');
        if (Meilishuo.config.is_iPad && location.href.indexOf('#hdpay') > 0) {
            var dialog = new Dialog({
                title: '支付订单',
                width: 409,
                hasClose: false,
                content: '<p class="pay_dlg"><span class="icon">&nbsp;</span><span>订单提交成功，请在新弹出的窗口中完成付款</span></p><p class="pay_dlg_btn"><input type="button" name="" value="" id="pay_success" class="btn"/><input type="button" name="" id="pay_cancel" value="" class="cancel"/></p>'
            });
            $('#pay_cancel').click(function () {
                location.href = '/order/';
            });
            $('#pay_success').click(function () {
                location.href = '/order/';
            });
        }
        $('#charge').click(function () {
            var fromCart = location.search.indexOf('goods_id') === -1;
            var addr_id = $('[name=addr]:checked').val();
            var bank_id = $('[name=pay_id]:checked').val();
            var bank_name = $('[name=pay_id]:checked').attr('data-name');
            var price = [];
            var comments = [];
            var map_id = $('#coupon').val();
            if (!addr_id || addr_id == -1) {
                window.location.href = '#new_adder_wrapper'
                alert('请保存您的收货地址');
                return;
            }
            if (!bank_id) {
                alert('请告诉我们您的购买方式');
                return;
            }

            var checkId = $('.id-card .id-card-text').text();
            var reasons_id = idValidate.IdCardValidate(checkId);
            if (reasons_id != true) {

                alert('请填写身份证号码');
                return;

            }

            $('.comment').each(function (i, comment) {
                var val = $(comment).val();
                if (val.replace(/\s\|/g, '') === '') return;

                var id = comment.id.split('_')[1],
                    val = val.replace(/\|/g, '');
                fromCart ? comments.push(id + '_' + val) : comments.push(val);
            });
            $('.goods tr').each(function (i, goods) {
                var p = $(goods).find('.u_price').text();
                if (!p) return;

                var id = this.id.split('_')[1];
                fromCart ? price.push([id, p].join('_')) : price.push(p);
            });
            data = {
                pay_channel: bank_id,
                addr_id: addr_id,
                comment: comments.join('|'),
                price: price.join('|'),
                express_company: 1,
                map_id: map_id,
                bank_name: bank_name,
                total_price: $('#total_price').val(),
                weixin_coupon: $('#weixin_coupon').val()
            };
            var params = location.search.substr(1).split('&');
            for (var i = 0; i < params.length; i++) {
                var pair = params[i],
                    index = pair.indexOf('='),
                    key = pair.substr(0, index),
                    val = pair.substr(index + 1);
                data[key] = decodeURIComponent(val);
            }
            var shop_coupon_data = decodeURIComponent($.param({
                shop_coupon: formatShopCoupon()
            })).split('&');
            for (var i = 0; i < shop_coupon_data.length; i++) {
                var d = shop_coupon_data[i],
                    p = d.indexOf('='),
                    key = d.substr(0, p),
                    val = d.substr(p + 1);
                data[key] = val;
            }
            var form = $('#confirm_form').empty();

            for (var i in data) {
                form.append('<input type="hidden" name="' + i + '" value="' + data[i] + '"/>');
            }

            if (Meilishuo.config.is_iPad) {
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
                title: '支付订单',
                width: 409,
                hasClose: false,
                content: '<p class="pay_dlg"><span class="icon">&nbsp;</span><span>订单提交成功，请在新弹出的窗口中完成付款</span></p><p class="pay_dlg_btn"><input type="button" name="" value="" id="pay_success" class="btn"/><input type="button" name="" id="pay_cancel" value="" class="cancel"/></p>'
            });
            $('#pay_cancel').click(function () {
                location.href = '/order/';
            });
            $('#pay_success').click(function () {
                location.href = '/order/?is_popup=1';
            });
        });
        var timer = setInterval(function () {
            if (document.readyState == 'complete') {
                cardId();
                clearInterval(timer);
            }
        }, 500);

    }//addEvents end

    $(function () {
        addEvents();
    });
});
