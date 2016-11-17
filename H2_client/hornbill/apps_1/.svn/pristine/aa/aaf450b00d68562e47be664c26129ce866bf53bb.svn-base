fml.define('order_pc/order/order_confirm', ['component/shareTmp', 'jquery', 'order_pc/common/address', 'ui/dialog'], function(require) {
	var $ = require('jquery');
	var address = require('order_pc/common/address');
	var shareTmp = require('component/shareTmp');
	var Alert = require('ui/alert');
	var Dialog = require('ui/dialog');
	var alert = function(msg) {
		new Alert({
			width: 398,
			content: msg,
			discover: true
		});
	};
	var _addressCom = new address(function(data) {
		// resetForm();
		// updateAddress(data);

		location.href = location.href+'&the_addr_id='+data.addr_id;
	}, '', $.noop, '', 'order_confirm');
	var updateAddress = function(data) {
		var template = $(shareTmp('address_template', data));
		if (data.is_default == '1') {
			$('[is_default=1]').attr('is_default', '0');
		};
		var id = data.addr_id;
		var addr = $("[addr_id='" + id + "']").remove();
		template.insertBefore($('.unit:first'));
		template.find('input[type=radio]').attr('checked', 'checked').trigger('change');
		resetForm();
	};
	var resetForm = function() {
		$('#addressPostcode,#addressStreet,#addressUser,#addressPhone').val('');
		$('#is_default').attr('checked', false).val('');
		$('#addressPid').val(0).change();
		_addressCom && _addressCom.formVa.resetForm()
	};

	var switchAddrForm = function() {
		if ($('#addr_new').attr('checked')) {
			resetForm();
			$('#addr_form').show();
			if ($('.container .addr ').find('.adrl_list').length == 10) {
				$('#addr_tip').show();
			}
		} else {
			$('#addr_form').hide();
			$('#addr_tip').hide();
			$('.addr .unit').each(function(index, item) {
				var $item = $(item),
					$orginEdit = $(item).find(".orign_edit"),	//原始的修改
					$updateEdit = $(item).find(".update_edit"),	//需要更新的修改
					$input = $item.find('input[type=radio]');	//每个框里的input

				//如果发现需要update而且被选中
				if ($item.hasClass('adrl_update_list') && $input.prop('checked')) {
					$item.addClass('active');
					$orginEdit.hide();
					$updateEdit.show();
				} else {
					$item.removeClass('active');
					$orginEdit.show();
					$updateEdit.hide();
				}
			})
		}
	};
	var formatShopCoupon = function() {
		return $('.shop_coupon').map(function(i, item) {
			var coupon_id = item.value;
			var shop_id = item.id.split('_')[1];
			return {
				"shop_id": shop_id,
				"coupon_id": coupon_id
			};
		}).toArray();
	};
	var formatShopCampaign = function() {
		return $('.shop_campaign').map(function(i, item) {
			var item_id = item.value;
			var shop_id = item.id.split('_')[1];
			return {
				"shop_id": shop_id,
				"item_id": item_id
			};
		}).toArray();
	}
	var resetPrice = function(event) {

		//解决首次依然进来的问题
		if(event && !event.bubbles){
			return false;
		}

		try {
			var credit = $(this).find('option:selected').attr('data-available');
			$(this).parent().next().find('.credit').text(credit);
		} catch (e) {
			console.log("123");
		}
		var plat_coupon = $('#coupon').val(),
			saved = $('#coupon option:selected').attr('data-available');
		var data = {
			shop_coupon: formatShopCoupon(),
			shop_campaign: formatShopCampaign(),
			pay_channel: $('[name=pay_id]:checked').val(),
			addr_id: $('input[name="addr"]:checked').val()
		};
		// if (this.id == 'coupon') {
		data.plat_coupon = plat_coupon;
		// };
		var self = this;
		$.ajax({
			url: '/order/compute/?' + location.search.substr(1),
			data: data,
			type: 'get',
			dataType: 'json',
			success: function(data) {
				if (plat_coupon === '') {
					$('#total_price').text(data.info.total_price_without_coupon);
				} else {
					$('#total_price').text(data.info.total_price);
				}

				$('#coupon_save').text(saved);

				//平台优惠券reset price
				if (self.id != 'coupon') {
					$('#coupon').empty();
					if (data.info.plat_coupon_info.length) {
						$('#plat_coupon_info').css('display', '');
						for (var i = 0; i < data.info.plat_coupon_info.length; i++) {
							var coupon = data.info.plat_coupon_info[i]
							$('#coupon').append('<option data-available="' + (coupon.available_credit || 0) + '" value="' + coupon.coupon_id + '" data-save="' + coupon.credit + '" ' + (coupon.is_check ? 'selected' : '') + '>' + coupon.title + '</option>');
							if (coupon.is_check) {
								$('#coupon_save').text(coupon.available_credit);
							};
						}
					} else {
						$('#plat_coupon_info').css('display', 'none');
						$('#coupon').append('<option value="-1">没有可以使用的美丽券</option>');
						$('#coupon_save').text('0');
					}
				};

				//店铺促销、优惠券reset price
				for (var i = 0; i < data.info.goods.length; i++) {
					if (self.id == "campaign_" + data.info.goods[i].shop_id) {

						var campaign_discount_info = data.info.goods[i].campaign_discount_info;
						$('#campaign_' + data.info.goods[i].shop_id).empty();
						if (campaign_discount_info && campaign_discount_info.length > 0) {
							for (var j = 0; j < campaign_discount_info.length; j++) {
								var campaign = campaign_discount_info[j]
								$('#campaign_' + data.info.goods[i].shop_id).append('<option data-available="' + (campaign.available_credit || 0) + '" value="' + campaign.item_id + '" data-save="' + campaign.credit + '" ' + (campaign.is_check ? 'selected' : '') + '>' + campaign.title + '</option>');
								/*								console.log(campaign.is_check);
								console.log(campaign.available_credit);
								console.log(data.info.goods[i].shop_id);*/
								if (campaign.is_check) {
									$('#campaignSave_' + data.info.goods[i].shop_id).text(campaign.available_credit);
								};
							}
						}

						var couponInfo = data.info.goods[i].coupon_info,
							couponEle = $('#coupon_' + data.info.goods[i].shop_id),
							couponListEle = $('#coupon_list_' + data.info.goods[i].shop_id),
							couponCreditEle = couponEle.parent().next().find('.credit'),
							couponVal = couponEle.val(),
							couponHtml = '',
							curCouponAvai, curCouponSelected;

						if (couponInfo && couponEle && couponEle.html && couponCreditEle && couponCreditEle.html && couponInfo.length > 0) {
							couponVal = couponVal || couponInfo[0].coupon_id;
							couponListEle.show();

							for (var l = 0; l < couponInfo.length; l++) {
								curCouponSelected = '';

								if (couponInfo[l].coupon_id == couponVal) {
									curCouponAvai = couponInfo[l].available_credit;
									curCouponSelected = 'selected'
								}
								couponHtml += '<option data-save="' + couponInfo[l].credit + '" ' + curCouponSelected + ' data-available="' + couponInfo[l].available_credit + '" value="' + couponInfo[l].coupon_id + '">' + couponInfo[l].title + '</option>'

							}

							couponEle.html(couponHtml)
							couponCreditEle.html(curCouponAvai)
						} else {
							couponListEle.hide();
						}

					}
				}

				var shops = data.info.goods;
				for (var i = 0; i < shops.length; i++) {
					$('#shop_total_price_' + shops[i].shop_id).text(shops[i].total_price);
					$('.freight_show_' + shops[i].shop_id).children(".freight_info").text(shops[i].freight_show); //运费信息更新
					$('.freight_show_' + shops[i].shop_id).next(".price").children("span").text(shops[i].freight); //运费信息更新
					//$('.freight_show_' + shops[i].shop_id).children("select").value(shops[i].freight);
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
			}
		});
	};
	var addEvents = function() {
		$('.addr .unit').live('mouseover', function() {
			$(this).addClass('hover');
		}).live('mouseout', function() {
			$(this).removeClass('hover');
		});

		$('.cancel').click(function() {
			$('#addr_form').hide();
			//$(document).scrollTop(0);
			if ($('.adrl_list').length === 0) {
				$('#addr_new').attr('checked', false);
			} else {
				$('[name="addr"]:first').attr('checked', 'checked').trigger('change');
			}
			$('.container')[0].scrollIntoView()
		});
		$('.adrl_edit').live('click', function() {
			$(this).prevAll('input').attr('checked', 'checked').trigger('change');
			$('#addr_form').show();
		});
		$('#coupon,.shop_coupon,.shop_campaign,input[name="addr"]').change(resetPrice); //美丽说优惠券、店铺优惠券、店铺促销改变则重置价格
		$('input[name=addr]:radio').live('change', switchAddrForm);
		$('input[name=addr]:radio:checked').trigger('change');
		// .trigger('change');
		if (Meilishuo.config.is_iPad && location.href.indexOf('#hdpay') > 0) {
			var dialog = new Dialog({
				title: '支付订单',
				width: 409,
				hasClose: false,
				content: '<p class="pay_dlg"><span class="icon">&nbsp;</span><span>订单提交成功，请在新弹出的窗口中完成付款</span></p><p class="pay_dlg_btn"><input type="button" name="" value="" id="pay_success" class="btn"/><input type="button" name="" id="pay_cancel" value="" class="cancel"/></p>'
			});
			$('#pay_cancel').click(function() {
				location.href = '/order/';
				//11.15
				//history.back()
				///改成后退 11.12 yuanyuan
				// location.href = location.href;
			});
			$('#pay_success').click(function() {
				location.href = '/order/';
				//alert('1111');
			});
		}
		$('#charge').click(function() {
			var fromCart = location.search.indexOf('goods_id') === -1;
			var addr_id = $('[name=addr]:checked').val();
			var price = [];
			var comments = [];
			var plat_coupon = $('#coupon').val();
			if (!addr_id || addr_id == -1) {
				window.location.href = '#new_adder_wrapper'
				alert('请保存您的收货地址');
				return;
			};
			$('.comment').each(function(i, comment) {
				var val = $(comment).val();
				if (val.replace(/\s\|/g, '') === '') return;

				var id = comment.id.split('_')[1],
					val = val.replace(/\|/g, '');
				fromCart ? comments.push(id + '_' + val) : comments.push(val);
			});
			$('.goods tr').each(function(i, goods) {
				var p = $(goods).find('.u_price').text();
				if (!p) return;

				var id = this.id.split('_')[1];
				fromCart ? price.push([id, p].join('_')) : price.push(p);
			});
			data = {
				addr_id: addr_id,
				comment: comments.join('|'),
				price: price.join('|'),
				express_company: 1,
				plat_coupon: plat_coupon,
				total_price: $('#total_price').text(),
				weixin_coupon: $('#weixin_coupon').val(),
				source: "4-0.0.1"
			};
			var params = location.search.substr(1).split('&');
			for (var i = 0; i < params.length; i++) {
				var pair = params[i],
					index = pair.indexOf('='),
					key = pair.substr(0, index),
					val = pair.substr(index + 1);
				data[key] = decodeURIComponent(val);
			};
			var shop_coupon_data = decodeURIComponent($.param({
				shop_coupon: formatShopCoupon()
			})).split('&');
			for (var i = 0; i < shop_coupon_data.length; i++) {
				var d = shop_coupon_data[i],
					p = d.indexOf('='),
					key = d.substr(0, p),
					val = d.substr(p + 1);
				data[key] = val;
			};

			var shop_campaign_data = decodeURIComponent($.param({
				shop_campaign: formatShopCampaign()
			})).split('&');
			for (var i = 0; i < shop_campaign_data.length; i++) {
				var d = shop_campaign_data[i];
				p = d.indexOf('='),
				key = d.substr(0, p),
				val = d.substr(p + 1);
				data[key] = val;
			};

			var form = $('#confirm_form').empty();

			for (var i in data) {
				form.append('<input type="hidden" name="' + i + '" value="' + data[i] + '"/>');
			}

			if (Meilishuo.config.is_iPad) {
				form.append('<input type="hidden" name="ipad" value="1"/>');
				window.location.href += '#hdpay';
			}
			form.submit();

			var errorCode = 0,
				errorMsg = '订单提交失败';
			window['__callOnFail'] = function(code, msg) {
				errorCode = code;

				dialog.destory();
				dialog = new Alert({
					title: '提交订单',
					width: 370,
					hasClose: false,
					content: '<span>' + errorMsg + '</span>'
				}).onSure(function() {
					if (errorCode == '400004') {
						window.location.href = "/order"
					} else {
						history.back()
					}
				})
			}
		});

	} //addEvents end
	addEvents();
});