fml.define('wap/page/sq/orderconfirm' , ['component/shareTmp','component/storage','wap/zepto/fastclick', 'wap/ui/alert','wap/app/dialog','wap/app/select','component/regString', 'wap/component/urlHandle', 'wap/app/tracking','component/callApi','wap/app/risk'] , function(require){
	var urlHandle = require('wap/component/urlHandle')
		,shareTmp = require('component/shareTmp')
		,Alert = require('wap/ui/alert')
		,select = require('wap/app/select')
		,regString = require('component/regString')
		,tracking = require('wap/app/tracking')
		,api = require('component/callApi')
		,risk = require('wap/app/risk')
		,platCoupon = []
		,shopCoupons = []
		,$addrArea
		,address = {}
		// ,first_bind = '0'
		,goods_id
		,$goodsList
		,platCouponId
		,shopCouponId

	var parms = fml.vars.parms
	// parms.module = 'qq';
	var query = urlHandle.http_build_query(parms)
	//判断是否从购物车支付订单
	var fromCart = location.search.indexOf('goods_id') === -1;

	var storage = require('component/storage');
	var channel_mark = storage.getCookie('channel_mark') || '';

	var readyDo = function(){
		// $addrArea = $('.receiver_info')
		// , address_type = $addrArea.attr("data-type")
		// , address = {
			// addr_id : $addrArea.children('p').eq(0).attr('addr_id') || ''
		// }
		// add_url = address_type == 'edit' ? '/sq/address_normal?' + query : '/sq/address_edit?' + query;

		// $.getJSON('http://open.show.qq.com/cgi-bin/sq_act_qualification_query?cmd=0&act_id=meilishuo&callback=?', function(data){
		// 	// 首次绑卡
		// 	if(data.code == 0 && data.data.act_flag == 0 && data.data.bind_flag == 0){
		// 		first_bind = '1'
		// 		$('.pay_btn span').text(' (首次绑卡返10元)')
		// 	}
		// })

		$goodsList = $('.order_goods_list li')
		platCouponId = $('.plat').find('.pay_list')
		shopCouponId = $('.shop').find('.pay_list')
		goods_id = $goodsList.attr('goods_id')

		//show_coupon platCoupon
		if((platCoupon && platCoupon.length != 0) || (shopCoupons && shopCoupons.length !=0)) {
			$('body').on('click', '.show_coupon', function(event){
				var  payList = $(this).find('.pay_list')
					, checkedCouponId = payList.attr('coupon_id')
					, a = shopCoupons
					, couponArr = []
					, coupon_type = 'shop';
				if($(this).hasClass('plat')){
					a = platCoupon;
					coupon_type = 'plat';
				}else{
					var index = $(this).parents('.order_goods').index();
					a = a[index];
				}

				if(!checkedCouponId) return;
				for(var i=0, b=a.length; i<b; i++){
					var coupon = {};
					coupon.id = a[i].coupon_id;
					coupon.value = a[i].title;
					couponArr.push(coupon);
				}

				var sel = new select({
					selectedId : checkedCouponId,
					store : couponArr,
					onClose : function (item) {
						payList.text($(item).text());
						payList.attr('coupon_id',$(item).attr('lid'));
						changePrice(coupon_type, 1);
					}
				});
			});
		}
	}

	address_info = {}
	$.get('/aj/sq/interfaces/address_info', {'normal' : 'false'} , function(data){
		if(data.ecode == 2007){
			address_info.has = false
		}else if(data.ecode == 0){
			var qq_info = data.data
			address.nickname = qq_info.name
			address.phone = qq_info.mobile
			address.city_code = qq_info.cityCode
			address.street = qq_info.address
			address.province = qq_info.prov
			address.city = qq_info.city
			address.district = qq_info.area
			address.postcode = qq_info.zipCode
			address_info.has = true
			address_info.info = data.data
			address_info.info.addressStr = data.data.prov + data.data.city + data.data.area + data.data.address
			
			parms.nickname = address.nickname;
			parms.city_code = address.city_code;
			parms.phone = address.phone;
			parms.street = address.street;
			parms.postcode = address.postcode || 0

		}else{
			address_info.has = false
		}

		//module=qq
		//weixin
		api.read({'url':'/order/qq_init'},parms, function(data){
			if(data.code == 0){
				if (data.info && data.info.addr_info && data.info.addr_info.addr_id) {
					address_info.info = address_info.info || {};
					address_info.info.addr_id = data.info.addr_info.addr_id;
					address_info.info.name = data.info.addr_info.nickname;
					address_info.info.mobile = data.info.addr_info.phone;
					address_info.info.addressStr = data.info.addr_info.address;
				}else{
					address_info.has = false;
				};

				fml.vars.sku_id = data.info.goods[0].goods[0].sku_id || '';

				var tmp = shareTmp('orderConfirmTmp', {'orderInfo' : data.info, 'addr_info' : address_info});
				$('#order_confirm').append(tmp);
				platCoupon = data.info.plat_coupon_info || [];
				shopCoupons = data.info.goods.map(function(item){
					return item.coupon_info;
				});
				readyDo();
			}else{
				var a = new Alert({
					content : data.msg || data.message
					, onSure : function(){
						window.location.href = "/sq/";
					}
				});
				return ;
			}
		});

	}, 'json')

	/* 调整订单价格 */
	var changePrice = function(msg_res, type, _data){
		/*
			getCouponData(): 从sid购物车购买 传coupon信息
		 	getData(): 从单宝页直接购买 传商品参数详情
		*/
		var data = fromCart ? getCouponData() : getData();
		if (type == 0) {
			var addr_res = msg_res;
			if(addr_res){
				data.nickname = addr_res.nickname;
				data.city_code = addr_res.city_code;
				data.phone = addr_res.phone;
				data.street = addr_res.proviceFirstStageName + addr_res.addressCitySecondStageName + addr_res.addressCountiesThirdStageName + addr_res.addressDetailInfo
				data.street = data.street || addr_res.street;
				data.postcode = addr_res.postcode || 0
			}else{
				data.addr_id = address.addr_id
			}
		}else if(type == 1){
			data.addr_id = $('.receiver_info p').eq(0).attr('addr_id');
			var coupon_type = msg_res;
		}

		api.read({'url':'/order/qq_init'},data, function(res){
		// $.get('/aj/sq/coupon_change',data,function(res){
			var $shop_total_price = $('.total_price');
			res.info.goods.map(function(item,i){
				$shop_total_price.eq(i).text(item.total_price);
			})
			$('.order_total').text(res.info.total_price); //订单合计
			var platinfo = res.info.plat_coupon_info;

			var shopChange = function(){
				var $plat_coupon = $('.plat_coupon_info');
				if (platinfo && (platinfo.length > 0)) {
					$plat_coupon.html(shareTmp('platcouponTmp',{plat_coupon_info : platinfo}))
					platCoupon = platinfo;
				}else{
					$plat_coupon.html(shareTmp('nocouponTmp'))
				}
			}
			if(coupon_type == 'shop'){
				shopChange();
			}else if(type == 0){
				var address_info = {}
				var data = _data;
				if(data.ecode == 0){
					var qq_info = data.data
					address_info.has = true
					address_info.info = data.data
					address_info.info.addr_id = res.info.addr_info.addr_id;
					address_info.info.addressStr = data.data.prov + data.data.city + data.data.area + data.data.address
				}else{
					address_info.has = false
				}
				var tmp = shareTmp('orderConfirmTmp', {'orderInfo' : res.info, 'addr_info' : address_info});
				$('#order_confirm').html('').append(tmp);
				shopChange();
			}
		}, 'json');
	}

	/* 从sid购物车购买 coupon信息 */
	var getCouponData = function(){
		var shop_coupon = [];
		$('.shop').each(function(i,item){
			var datas = {};
			datas.shop_id = $(item).attr('shop_id');
			datas.coupon_id = $(item).children('.pay_list').attr('coupon_id');
			shop_coupon[i] = datas;
		});

		var data = {
			"shop_coupon" : shop_coupon
			,"sid" : parms.sid
			,"shop_id" : parms.shop_id
			// ,"module" : "qq"
		}
		var plat_coupon = $('.plat').find('.pay_list').attr('coupon_id');
		if(plat_coupon){
			data.plat_coupon = plat_coupon;
		}
		return data;
	}

	/* 单宝页直接购买 */
	var getData = function(){
		var amount = $('.amount').text()
		  , platCouponId = $('.plat').find('.pay_list')
		  , shopCouponId = $('.shop').find('.pay_list')
		var data = {
				"plat_coupon" : platCouponId.attr('coupon_id')
				, "shop_coupon[0][shop_id]" : $('.shop').attr('shop_id')
				, "shop_coupon[0][coupon_id]" : (shopCouponId.attr('coupon_id') || '')
				, "amount" : amount
				, "goods_id" : goods_id
				, "color" : fml.vars.color
				, "size" : fml.vars.size
				, "sku_id" : fml.vars.sku_id || ''
				// , "module" : "qq"
			}
		return data;
	}

	/* 判断卖家留言字数 */
	// var user_comment_num = function(txt){
	// 	if(!regString.WidthCheck(txt, 140)){
	// 		var b = new Alert({
	// 			content : '卖家留言超过了140字'
	// 		});
	// 		return false;
	// 	}
	// }

	/* QQ钱包支付 */
	var pay_button_times = false
	$('body').on('click','#charge', function(){
		if(pay_button_times){
			return
		}
		// tracking.cr('sq/click_pay_button', {'status': '0'+first_bind})

		if(!$('.receiver_info p').length){
			var a = new Alert({
				content : '请告诉我们您的收货地址'
				, onSure : function(){
					$('.receiver_info').click()
				}
			});
			return ;
		}

		var price = [];

		$goodsList.each(function(i,goods){
			var p = $(goods).find('.u_price').text();
			if (!p) return;

			var id = this.id.split('_')[1];
			fromCart ? price.push([id,p].join('_')) : price.push(p);
		});

		/* 从购物车购买 */
		var $user_comment = $('.user_comment')
			,comments = []
			,post_url = "/order/add_qq_goods"
			,platCouponId = $('.plat').find('.pay_list')
			,shopCouponId = $('.shop').find('.pay_list')

	    // 单宝页直接购买: /order/add_qq  购物车购买:/order/add_qq_cart
		if (fromCart) {
			post_url = "/order/add_qq_cart";
			var comment_over = false
				,data = getCouponData() //shop_coupon,plat_coupon,shop_id,sid

			// if(data.map_id){
			// 	data.plat_coupon = data.map_id;
			// 	delete data.map_id;
			// }

			var shop_coupon = data.shop_coupon;
			delete data.shop_coupon;
			for (var i = 0 , len = shop_coupon.length; i < len; i++) {
				data["shop_coupon["+i+"][shop_id]"]= shop_coupon[i].shop_id;
				data["shop_coupon["+i+"][coupon_id]"] = shop_coupon[i].coupon_id;
			}
			data.price = price.join('|')
			data.source = '9-0.0.1'
			data.pay_channel = 'QWALLETPAY__WAPGWCARD'
			// data.express_company = 1
			data.bank_name = 'QQ钱包'
			data.total_price = $('.order_total').text();

			$user_comment.each(function(index, item) {
				var content = $(this).val();
				if(content){
					if(!regString.WidthCheck(content, 140)){
						comment_over = true;
					}
					//判断字数
					var shop_id = $(this).closest('.pay_info').children('.show_coupon').attr('shop_id');
					comments.push([shop_id,content].join('_'));
				 }
			});
			if (comment_over) {
				var b = new Alert({
					content : '卖家留言超过了140字'
				});
				return;
			};
			if(comments.length != 0){
				data.comment = comments.join('|');
			}
		}else{
			var data = {
				"price": price.join('|')
				, "plat_coupon" : platCouponId.attr('coupon_id') || ''
				, "shop_coupon[0][shop_id]" : $('.shop').attr('shop_id')
				, "shop_coupon[0][coupon_id]" : shopCouponId.attr('coupon_id') || ''
				, "amount" : $('.amount').text()
				, "sku_id" : fml.vars.sku_id || ''
				// , "module" : 'qq'
			};
			var content = $user_comment.val()
			if(content){
				if(!regString.WidthCheck(content, 140)){
					var b = new Alert({
						content : '卖家留言超过了140字'
					});
					return;
				}
				data.comment = content;
			}
		}

		pay_button_times = true

		var addrId = $('.receiver_info p').eq(0).attr('addr_id');
		if(address.addr_id)
			data.addr_id = address.addr_id
		else if(addrId)
			data.addr_id = addrId
		else
			data.address = address

		var params = location.search.substr(1).split('&');
		for (var i=0; i < params.length; i++) {
			var pair = params[i],
			index = pair.indexOf('='),
			key = pair.substr(0,index),
			val = pair.substr(index+1);
			data[key] = decodeURIComponent(val);
		};

		$('.pay_btn_wrap').addClass('eventnone wx_grey');

		// console.log(data);
		data.nickname = address.nickname
		data.phone = address.phone
		data.city_code = address.city_code
		data.street = address.street
		data.province = address.province
		data.city = address.city
		data.district = address.district
		data.postcode = address.postcode

		// console.log(data);return;
		channel_mark = channel_mark && ('-' + channel_mark)
		data.goods_pid = data.goods_pid ? (data.goods_pid + channel_mark) : 'sq-cart' + channel_mark;
		api.write({'url':post_url},data, function(res){
			// console.log(res);
			// return;

			// 风控逻辑
			if(res && res.code == -102){
				return risk.go(res.info.rule_id)
			}

			if(res.direct_type == 1){
				if(res.code == 0){
					window.location.href = '/sq/success/?order_id=' + res.info.order_id
				}else{
					window.location.href = '/sq/fail/?order_id=' + res.info.order_id
				}
			}else{
				if(res.code == 0){
					var appInfoSplit = res.info.appInfo
					var itemsOne = appInfoSplit.split('|')
					var itemTwo = itemsOne[0].split('#')
					itemTwo[1] = '2745697727'
					itemsOne[0] = itemTwo.join('#')
					appInfoSplit = itemsOne.join('|')
					qw.pay.tenpay({
						tokenId: res.info.tokenId
						, appInfo: appInfoSplit
						, pubAcc: 2745697727
						, pubAccHint: '您已关注美丽说购物服务号，查订单、查优惠尽在美丽说购物服务号。'
					}, function (data) {
						var urlPlus = '';
						if(data.data.bank_type != null && data.data.bank_type != undefined && data.data.bank_type != ''){
							urlPlus = '&bank_type=' + data.data.bank_type;
						}
						if(data.resultCode == 0){
							window.location.href = '/sq/success/?order_id=' + res.info.order_id + '&transaction_id=r' +data.data.transaction_id + urlPlus;
						}else{
							tracking.cr('sq/statistics_action', {'action': 'pop', 'value': 'payFailed'})
							tracking.cr('sq/pay_result', {'status': '3'})
							window.location.href = '/sq/fail/?order_id=' + res.info.order_id
						}
					})
				}
				else{
					tracking.cr('sq/pay_result', {'status': '4'})
					window.location.href = '/sq/fail/?msg=' + (res.msg || '下单失败')
				}
			}
		}, 'json');
	});
	function getCookie(c_name){
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
		    {
		    c_start=c_start + c_name.length+1
		    c_end=document.cookie.indexOf(";",c_start)
		    if (c_end==-1) c_end=document.cookie.length
		    return unescape(document.cookie.substring(c_start,c_end))
		    }
		  }
		return ""
	}
	var qqAddressCallback = function(){
		if (getCookie('mqaddr') == '1') {
			//TODO
			syncAddrList(1);
		}
	}
	var syncAddrList = function(isSelected){
		var data = {'isSelected' : isSelected}
		$.get('/path/to/file', data , function(data) {
			/*optional stuff to do after success */
		});
	}

	;(function(){
	var Page = {
        currid: 0,
        initEvents: function() {
			$('body').on('click', '.receiver_info', function() {
				var aid = $(this).data('aid');
                qw.address.call({appid: 210915, aid: aid});
            });
        },
        init: function () {
            this.initEvents();
        },
		updateAddr: function(choose){
			var self = this;
			if( !!choose && choose != '' && choose == '1'){
				$.get('/aj/sq/interfaces/address_info', {'normal' : 'true'} , function(data){
					var qq_info = data.data
					address.nickname = qq_info.name
					address.phone = qq_info.mobile
					address.city_code = qq_info.cityCode
					address.street = qq_info.address
					address.province = qq_info.prov
					address.city = qq_info.city
					address.district = qq_info.area
					address.postcode = qq_info.zipCode
					qw.address.loadAddrData(function(){
						self.currid = data.data.aid;	// 设置当前选中地址id
						if(!$('.receiver_info p').length){
							window.location.reload(true)
						}
						$('.receiver_info').data('aid', data.data.aid);
							var address = qw.address.getDistrict(data.data.cityCode) + data.data.address;
							$('.addr_addr').html(address)
							$('.addr_tel').html(data.data.mobile)
							$('.addr_name').html(data.data.name)
							changePrice(address, 0, data);
					});
				}, 'json')
			}
		}
    };

    Page.init();

	qw.address.addEventLister(function(data, source){
		switch(data.type){
		case 1: Page.updateAddr(data.choose);  break;
		case 2: Page.currid = data.addressid;
				$('.receiver_info').data('aid', data.addressid)
				$.get('/aj/sq/interfaces/address_info', {'normal' : 'true'} , function(data){
					var qq_info = data.data,
						address = {};
					address.nickname = qq_info.name
					address.phone = qq_info.mobile
					address.city_code = qq_info.cityCode
					address.street = qq_info.address
					address.province = qq_info.prov
					address.city = qq_info.city
					address.district = qq_info.area
					address.postcode = qq_info.zipCode
					qw.address.loadAddrData(function(){
						$('.receiver_info').data('aid', data.data.aid);
							var address = qw.address.getDistrict(data.data.cityCode) + data.data.address;
							$('.addr_addr').html(address)
							$('.addr_tel').html(data.data.mobile)
							$('.addr_name').html(data.data.name)
					});
					changePrice(address, 0, data);
				}, 'json')
				break;
		}
	});
})();
});