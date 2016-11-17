fml.use(['order_pc/common/cart'], function(me) {
    var curTab = 'China';
    me['cart']({
        tab: curTab
    });
});

//倒计时
fml.use(['order_pc/common/timedown', 'jquery'], function(me) {
    var $ = me['jquery'];
    window.timedown = me['timedown'];
    $('.time').each(
        function($_this) {
            var _this = $(this);
            _this.removeClass('time');
            timedown.down(this, _this.attr('time'), 'd-0h-0i-0s', ['<b>%v</b>天', '<b>%v</b>小时', '<b>%v</b>分', '<b>%v</b>秒']).onTimeOver(function() {
                _this.parents('p').html('限时已结束');
            }).setHeartHum(100);
        })
})


fml.define('order_pc/cart/cart', ['jquery', 'order_pc/common/timedown', 'app/tracking',
    'ui/alert', 'order_pc/common/editOrderInfo', 'order_pc/common/scrollFloat',
    'component/shareTmp', 'ui/dialog', 'app/checkLogin'
], function(require) {
    var $ = require('jquery');
    var shareTmp = require('component/shareTmp'),
        dialog = require('ui/dialog'),
        Alert = require('ui/alert'),
        tracking = require('app/tracking'),
        editOrderInfo = require('order_pc/common/editOrderInfo'),
        scrollFloat = require('order_pc/common/scrollFloat'),
        timedown = require('order_pc/common/timedown'),
        check = require('app/checkLogin');

    var alert = function(msg) {
        return new Alert({
            content: msg,
            width: 370
        });
    }

    //  ,select_sid=$.trim($('#goods_select_list').val());
    // if(select_sid){
    //  $('input:checkbox').prop('checked',false);
    //  select_sid=select_sid.split('_');
    //  for(var i=0;i<select_sid.length;i++){
    //      $('input:checkbox[value="'+$.trim(select_sid[i])+'"]').click();
    //  }
    // }

    var readyDoit = function() {
        //指定商品满件打折区露出
        // var discountOuter=$('.discount_outer');
        // var blankTrH=$($('.blank_tr')[0]).outerHeight();
        // var shopTitleH=$($('.shop_title')[0]).outerHeight();
        // var discountList=$('tr.discount');
        // var discountH=0;
        // for (var i=0;i<discountList.length;i++){
        //     discountH+=$(discountList[i]).outerHeight();
        // }
        // discountOuter.css({top:blankTrH+shopTitleH+discountH/2-60});



        // 全删除的情况 + 删除一部分
        var allIds = $.trim($('#goods_select_list').val());
        var sels = '#goods_' + allIds.replace(/_/g, ' input:checkbox,#goods_') + ' input:checkbox';
        if ($(sels).length == 0) {
            $('input:checkbox').prop('checked', true);
        } else {
            $('input:checkbox').prop('checked', false);
            $(sels).trigger('click');
        }

        $("#removeInvalid").click(function() {
            $(this).css('visibility', 'hidden');
        })

        $('.get_btn').on('click', function() {
            if (!check()) return;
            else {
                var callback = function(r) {
                    window.location.reload();
                }
                $.get('/aj/get_exchange/get', {
                    type: 'pc'
                }, callback, 'json');
            }
        });

        //卖家降价
        $('.promo_sale').hover(function() {
            var _promo_sale = $(this);
            var spread = _promo_sale.children('input').val();
            //console.log(spread);
            var $div = $('<div></div>');
            _promo_sale.children('.promo_arrow').addClass('promo_arrow_active');

            $div.css({
                left: _promo_sale.offset().left,
                top: _promo_sale.offset().top + _promo_sale.outerHeight()
            }).addClass('promo_pupop').html('<a class="red_f">优惠：' + spread + '</a><br/><a class="gray_f">比放入购物车时，又优惠了' + spread + '元</a>');
            _promo_sale.data('popup_div', $div);
            $('body').append($div);
            $div.stop().animate({
                height: 43
            }, 130, function() {
                $(this).stop().animate({
                    height: 40
                }, 10);
            });
        }, function() {
            var _promo_sale = $(this);
            _promo_sale.children('.promo_arrow').removeClass('promo_arrow_active');
            _promo_sale.data('popup_div').stop().animate({
                height: 0
            }, 130, function() {
                $(this).remove();
            });

        });

        //显示倒计时
        $('.promo_num').hover(function() {
            var _promo_num = $(this);
            var _timeBox = _promo_num.next('.timeBox');
            if (_timeBox.length > 0) {
                _promo_num.children('.promo_arrow').addClass('promo_arrow_active');
            }
            _timeBox.css({
                left: _promo_num.offset().left,
                top: _promo_num.offset().top + _promo_num.outerHeight()
            });
            _timeBox.show();
            _timeBox.stop().animate({
                height: 43
            }, 130, function() {
                $(this).stop().animate({
                    height: 40
                }, 10);
            });

        }, function() {
            var _promo_num = $(this);
            var _timeBox = _promo_num.next('.timeBox');
            _promo_num.children('.promo_arrow').removeClass('promo_arrow_active');
            _timeBox.stop().animate({
                height: 0
            }, 130, function() {
                _timeBox.hide();
            });

        });


        $('.g-content img').hover(function() {
            var _this = $(this);
            var $div = $('<div id="big_pic_box"><i class="pic_arrow"></i><img src=""/></div>');
            $div.children('img').attr('src', _this.attr('asrc'));
            $('body').append($div);
            $div.css({
                left: _this.offset().left + _this.outerHeight() + 10,
                top: _this.offset().top
            }).show();
        }, function() {
            $('#big_pic_box').remove();
        })

        var setDiscountView = function(sid) {

        }

        // 通过ajax获取优惠券数据，并解析
        var buildCpList = function(shopId, elCouponList, that) {
            //console.log(shopId);
            $.post('/cart/shop_coupon/', {
                shop_id: shopId
            }, function(data) {
                //console.log(data);
                var html = [];
                var tpl_use = [
                    '<ul class="clearfix">',
                    '<li class="mr14_f">',
                    '<div class="coupon_bg mt4_f f14_f white_f">￥#credit#</div>',
                    '</li>',
                    '<li>',
                    '<div>#tips#</div>',
                    '<div class="coupon_time">#exp_date#</div>',
                    '</li>',
                    '<li class="ml40_f coupon_get_li">',
                    '<a class="coupon_got mt4_f">#can_apply_status#</a>',
                    '</li>',
                    '</ul>'
                ].join('');

                var tpl_apply = [
                    '<ul class="clearfix">',
                    '<li class="mr14_f">',
                    '<div class="coupon_bg mt4_f f14_f white_f">￥#credit#</div>',
                    '</li>',
                    '<li>',
                    '<div>#tips#</div>',
                    '<div class="coupon_time">#exp_date#</div>',
                    '</li>',
                    '<li class="ml40_f coupon_get_li">',
                    '<a class="coupon_get mt4_f" id="shopcoupon_#coupon_apply_code#" href="javascript:;">#can_apply_status#</a>',
                    '</li>',
                    '</ul>'
                ].join('');

                var cp;
                for (var a = 0; a < data.can_use.length; a++) {
                    cp = data.can_use[a];
                    html.push(tpl_use.replace('#credit#', cp.credit)
                        .replace('#exp_date#', cp.exp_date)
                        .replace('#tips#', cp.tips)
                        //.replace('#can_apply_status#',['可使用','已领完'][+cp.can_apply_status]));
                        .replace('#can_apply_status#', '可使用'));
                }
                for (var u = 0; u < data.can_apply.length; u++) {
                    cp = data.can_apply[u];
                    html.push(tpl_apply.replace('#credit#', cp.credit)
                        .replace('#exp_date#', cp.exp_date)
                        .replace('#tips#', cp.tips)
                        .replace('#coupon_apply_code#', cp.coupon_apply_code)
                        .replace('#can_apply_status#', '领取'));
                }
                elCouponList.children('.x-coupon-list').html(html.join(''));
                elCouponList.toggle();
                that.toggleClass('coupon_active');
                //$('.coupon_get',elCouponList).click(function(e){
                //  $.post();
                // });
                //优惠券领取
                $('.coupon_get').click(function() {
                    var _this = $(this);
                    var id = this.id.split('_')[1];
                    $.ajax({
                        url: '/aj/coupon/get',
                        data: {
                            coupon_apply_code: id
                        },
                        dataType: 'json',
                        type: 'post',
                        success: function(data) {
                            if (data.code) {
                                //alert(data.message);
                                _this.text('已领完');
                                _this.removeClass('coupon_get').addClass('coupon_got').off('click');
                            } else {
                                $('.suc_get').remove();
                                //alert('领取成功');
                                var $sp = $('<span class="suc_get">领取成功</span>');
                                $sp.css({
                                    left: _this.parents('.coupon_info').offset().left + _this.parents('.coupon_info').outerWidth(),
                                    top: _this.offset().top
                                });
                                $('body').append($sp);
                                _this.data('sucGet', $sp)
                                $sp.show().stop().animate({
                                    opacity: 1
                                }, 500, function() {
                                    setTimeout(function() {
                                        _this.data('sucGet').stop().animate({
                                            opacity: 0
                                        }, 1000);
                                        _this.data('sucGet').remove();
                                    }, 1000)
                                });

                                changeWords();
                                tracking.cr('cart_coupon_info', {
                                    bi_data: 'type:sure|shop_id:' + shopId
                                })
                            }
                        },
                        error: function() {
                            alert('系统错误，领取失败');
                        }
                    })
                });
                //领取结束
            }, 'json');
        };

        //隐藏浮窗
        var hideCoupon = function(id) {
            var $con, $btn, $arrow;
            if (id) {
                $con = $('#coupon_info_' + id);
                $btn = $('#coupon_' + id);
                $arrow = $('#coupon_' + id + ' .coupon_arrow');
            } else {
                $con = $('.coupon_info');
                $btn = $('.shop .coupon');
                $arrow = $('.shop .coupon_arrow');
            }
            $con.hide();
            $btn.removeClass('coupon_active');
            $arrow.removeClass('coupon_arrow_active');
        }

        // 空白处点击hide浮窗
        $(document).on('click', function() {
                hideCoupon();
            })
            //点击叉叉hide浮窗
        $('.coupon_info .coupon_close').click(function() {
                hideCoupon($(this).data('shopid'));
            })
            //防止事件冒泡
        $('.coupon_info').on('click', function(evt) {
            evt.stopPropagation();
        })

        //优惠券浮窗
        $('.coupon').on('click', function(evt) {
            evt.stopPropagation();
            if (!check()) return;

            var _coupon = $(this);
            if (!_coupon.hasClass('coupon_active')) {
                $('.coupon_info:visible .coupon_close').click();
            }
            var shopId = _coupon.parent('td').siblings().find('.select_shop').val();
            var _coupon_arrow = _coupon.children('.coupon_arrow');
            _coupon_arrow.toggleClass('coupon_arrow_active');

            var elCouponList = _coupon.next().next('.coupon_info');
            // 数据标识
            var hasDataFlag = elCouponList.attr('data-hasdata');
            elCouponList.css({
                left: _coupon.offset().left - elCouponList.outerWidth() + _coupon.outerWidth(),
                top: _coupon.offset().top - 1 + _coupon.outerHeight()
            });

            //有数据
            if (hasDataFlag == '1') {
                elCouponList.toggle();
                _coupon.toggleClass('coupon_active');
            } else {
                buildCpList(shopId, elCouponList, _coupon);
                elCouponList.attr('data-hasdata', '1');
            }
            // buildCpList(shopId,elCouponList,_coupon);
            // elCouponList.attr('data-hasdata','1');

            if (_coupon_arrow.hasClass('coupon_arrow_active')) {
                tracking.cr('cart_coupon_info', {
                    bi_data: 'type:show|shop_id:' + $(this).data('shopid')
                })
            }
            // 优惠券信息会随着窗口大小改变而改变
            $(window).resize(function() {
                elCouponList.css({
                    left: _coupon.offset().left - elCouponList.outerWidth() + _coupon.outerWidth(),
                    top: _coupon.offset().top - 1 + _coupon.outerHeight()
                });
            });
        })

        // $('.coupon_words').children('a').on('click',function(){
        //  $.post('/cart/coupon_remind/',{sid : '162_5|158_4|159_7'},function(data){
        //      console.log(data);
        //  },'json')
        // })
        var checkLoginById = $('#userInfo-user-id').text();

        function changeWords() {
            if ($('body').data('cb_timer')) {
                clearTimeout($('body').data('cb_timer'));
            }
            var _timer = setTimeout(function() {
                var arr = [];
                $('.select_goods:checked').each(function() {
                    arr.push($(this).val() + '_' + $(this).parents('tr').find('input.amount').val());
                })

                //console.log(arr);
                if (arr.length > 0 && checkLoginById != 0) {
                    $.post('/cart/coupon_remind/', {
                        sid: arr.join('|')
                    }, function(data) {
                        $('tbody.shop>tr').each(function() {
                                if ($(this).attr('id')) {
                                    var _data = data[this.id.split('_')[1]];
                                    if (_data) {
                                        $(this).find('.coupon_words a').text(_data.words);
                                    } else {
                                        $(this).find('.coupon_words a').text('');
                                    }
                                }
                            })
                            // for(v in data){
                            //  $('#shop_'+v).find('.coupon_words a').text(data[v].words);
                            // }
                    }, 'json')
                } else {
                    $('.coupon_words a').text('');
                }
            }, 50);
            $('body').data('cb_timer', _timer);
        }

        //点击复选框
        $(':checkbox').on('change', function() {
            changeWords();
            /*
             if($('body').data('cb_timer')){
             clearTimeout($('body').data('cb_timer'));
             }
             var _timer=setTimeout(function(){
             var arr=[];
             $('.select_goods:checked').each(function(){
             arr.push($(this).val()+'_'+$(this).parents('tr').find('input.amount').val());
             })

             if(arr.length > 0){
             $.post('/cart/coupon_remind/',{sid : arr.join('|')},function(data){

             $('tbody.shop>tr').each(function(){
             if($(this).attr('id')){
             var _data=data[this.id.split('_')[1]];
             if(_data){
             $(this).find('.coupon_words a').text(_data.words);
             }else{
             $(this).find('.coupon_words a').text('');
             }
             }
             })
             // for(v in data){
             //     $('#shop_'+v).find('.coupon_words a').text(data[v].words);
             // }
             },'json')
             }else{
             $('.coupon_words a').text('');
             }
             },50);

             $('body').data('cb_timer',_timer);
             */
        });

        //点击加减数量
        $('.amount').change(function() {
            changeWords();
        });

        $('.add').click(function(evt) {
            changeWords();
        })

        $('.minus').click(function(evt) {
            changeWords();
        })

        var setOrderEdit = function() {
            var curActiveorderinfo,
                shopid,
                twitterid,
                hideOrderInfo = function(id) {
                    var $ele;
                    if (id) {
                        $ele = $('#order_edit_' + id)
                    } else {
                        $ele = $('.order_edit')
                    }
                    $ele.removeClass('active');
                    $('.order_detail .order_info').removeClass('active');
                    curActiveorderinfo = '';
                },
                localToGoods = function(sid) {
                    var scrollTop = $(document).scrollTop(),
                        positionTop = $("#goods_" + sid).offset().top;
                    if ((positionTop + 86) < scrollTop) {
                        window.location.href = "#goods_" + sid
                    }
                }
            orderOrder = new editOrderInfo();

            orderOrder.on('render', function(api, info) {
                var wrapEle = $('#order_edit_' + info.cursid);
                setTimeout(function() {
                    if (wrapEle.height() > 300) {
                        new scrollFloat({
                            ele: $('#order_edit_' + info.cursid + ' .goods_info_preview_img'),
                            bottomEle: $('#order_edit_' + info.cursid),
                            scrTop: 0,
                            scrBottom: -20
                        })
                    }
                }, 300)
            })

            orderOrder.on('cancel', function(api, info) {
                hideOrderInfo();
                localToGoods(info.cursid)
            })

            orderOrder.on('submit', function(api, info) {
                hideOrderInfo();
                localToGoods(info.cursid)
            })

            orderOrder.on('submitNochange', function(api, info) {
                tracking.cr('cart_goodsinfo_change', {
                    bi_data: 'type:sure|change_info:unchange|shop_id:' + shopid + '|twitter_id:' + twitterid
                })
            })
            orderOrder.on('submitChange', function(api, info) {
                tracking.cr('cart_goodsinfo_change', {
                    bi_data: 'type:sure|change_info:change|shop_id:' + shopid + '|twitter_id:' + twitterid
                })
            })

            orderOrder.on('submitSuccess', function(api, info) {
                var $imgEle = $('#goods_' + info.cursid + ' .g-content img'),
                    $detailItemEle = $('#goods_' + info.cursid + ' .order_info_item_0'),
                    $detailTextEle = $('#goods_' + info.cursid + ' .order_info_item_1'),
                    $detailPriceEle = $('#goods_' + info.cursid + ' .price_discount .price'),
                    $detailPriceOriginalEle = $('#goods_' + info.cursid + ' .price_discount .price_origial'),
                    $detailDiscountEle = $('#goods_' + info.cursid + ' .price_discount .discount-txt'),
                    $detailAmount = $('#goods_' + info.cursid + ' .amount'),
                    $detailStockRemain = $('#goods_' + info.cursid + ' .stock_remain');

                //需要增加的【仅剩】结点
                var tRemain = '<div class="stock_remain"><p>仅剩' + info.curInfo.stock + '件</p></div>';

                var campaignPrice = info.curInfo.currentCampaignPrice,
                    originPrice = info.curInfo.currentOriginalPrice;

                var max = info.curInfo.stock; //能增加的最大数量

                //解决 编辑单个sku之后前端数量不同步的问题
                //@author hirra
                if (info.data.info.amount) {
                    $detailAmount
                        .val(info.data.info.amount || 1)
                        .attr('data-max', max);
                    if (info.curInfo.stock < 4 && info.curInfo.stock > 0) {
                        //如果本身有那个结点的话，就让他展示出来，并且修改最大值就好了
                        //如果没有那个结点，就新增那个结点。
                        if ($detailStockRemain[0]) {
                            $detailStockRemain.show();
                            $detailStockRemain.find('p')
                                .html('仅剩' + info.curInfo.stock + '件');
                        } else {
                            $detailAmount.parent().append(tRemain);
                        }
                    } else {
                        $detailStockRemain.hide();
                    }
                }

                if (info.imgUrl.smallImg) {
                    $imgEle.attr({
                        src: info.imgUrl.smallImg,
                        asrc: info.imgUrl.previewImg
                    })
                }

                $detailPriceEle.text(info.curInfo.currentPrice);
                if (info.curInfo.currentCampaignPrice) {
                    $detailPriceOriginalEle.html('<s>' + info.curInfo.currentOriginalPrice + '</s>');
                } else {
                    $detailPriceOriginalEle.hide();
                }
                if ($detailDiscountEle.length > 0) {
                    if (campaignPrice) {
                        $detailDiscountEle.text("限时" + (campaignPrice * 10 / originPrice).toFixed(1) + "折");
                    } else {
                        $detailDiscountEle.text("限时抢购");
                    }
                }
                if (info.formData[0]) {
                    $detailItemEle.text(info.formData[0].name + '：' + info.formData[0].value)
                }
                if (info.formData[1]) {
                    $detailTextEle.text(info.formData[1].name + '：' + info.formData[1].value)
                }
                if (info.curInfo && info.curInfo.currentPrice) {
                    changeWords()
                    $(document).trigger('goods_change');
                }
                //商品修改sku后，若在已有商品里有完全相同的商品，则删掉这个被修改的商品  
                if (info.data && info.data.info && info.data.info.act == 'delete') {
                    if ($('#goods_' + info.cursid).hasClass('first')) {
                        $('#goods_' + info.cursid).css('display', 'none');
                        $('#goods_' + info.cursid).next('.goods').addClass('first');
                    } else if ($('#goods_' + info.cursid).hasClass('last')) {
                        $('#goods_' + info.cursid).css('display', 'none');
                        $('#goods_' + info.cursid).prev('.goods').addClass('last');
                    } else {
                        $('#goods_' + info.cursid).css('display', 'none');
                    }
                }
            })

            orderOrder.on('submitError', function(api, info) {
                alert(info.data.info || info.data.message)
            })


            $('.order_edit').on('click', function(evt) {
                evt.stopPropagation();
            })

            // 空白处点击hide浮窗
            $(document).on('click', function() {
                hideOrderInfo();
            })

            $('.order_info').on('click', function(evt) {
                evt.stopPropagation();

                if ($(this).hasClass('order_info_useless')) {
                    return
                }

                var sid = $(this).data('sid');
                twitterid = $(this).data('twitterid');
                shopid = $(this).data('shopid');

                var $currEdit = $('#order_edit_' + curActiveorderinfo),
                    $edit = $('#order_edit_' + sid),
                    $orderInfoEle = $('.order_detail .active.order_info');

                $orderInfoEle.removeClass('active');
                $(this).toggleClass('active');
                $currEdit.toggleClass('active');

                if (curActiveorderinfo !== sid) {
                    $edit.toggleClass('active');
                    curActiveorderinfo = sid;

                    orderOrder.render('#order_edit_' + sid, sid);

                    tracking.cr('cart_goodsinfo_change', {
                        bi_data: 'type:show|change_info:null|shop_id:' + shopid + '|twitter_id:' + twitterid
                    })
                } else if (!$edit.hasClass('active')) {
                    curActiveorderinfo = '';
                } else {
                    curActiveorderinfo = sid;
                }
            })
        }
        setOrderEdit();
    }
    $(function() {
        readyDoit();
    });
});