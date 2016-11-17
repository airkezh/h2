/*common*/
require('wap/zepto')
require('wap/zepto/fastclick'); //wap/app/dialog
var shareTmp = require('component/shareTmp')
	,urlHandle = require('wap/component/urlHandle')
	,goWXPay = require('wap/app/wx/goWXPay')
	,goWXAddress = require('wap/app/wx/goWXAddress')
	,Alert = require('wap/ui/alert')
	,select = require('wap/app/select')
	,regString = require('component/regString')
	,tracking = require('wap/app/tracking')
	,api = require('component/callApi')
	,platCoupon = []
	,shopCoupons = []
	,$addrArea
	,address = {}
	,goods_id
	,$goodsList
	,platCouponId
	,shopCouponId
	,parms = fml.vars.parms
	,fromCart = location.search.indexOf('goods_id') === -1
	,$wx_card_info //微信卡包
	,$wx_loading = $('#wx_loading')

/**
 * [storage description]
 * 拼接d_r参数
 */
var storage = require('component/storage');
var channel_mark = storage.getCookie('channel_mark') || '';

var query = urlHandle.http_build_query(parms)
var readyDo = function(){
	$goodsList = $('.order_goods_list li')
	platCouponId = $('.plat').find('.pay_list')
	shopCouponId = $('.shop').find('.pay_list')
	goods_id = $goodsList.attr('goods_id')

	if((platCoupon && platCoupon.length != 0) || (shopCoupons && shopCoupons.length !=0)) {
		couponBind();
	}

	$addrArea = $('.receiver_info')
	address = {
		addr_id : $addrArea.children('p').eq(0).attr('addr_id') || ''
	}
	$addrArea.on('click',function(){
		goWXAddress(setAddress)
	})

	/* loading 高度设置 */
	var load_top = ((window.innerHeight - 140)/2)|0 
	$wx_loading.css('top', load_top + 'px')

}
	
	parms.dc_id = fml.vars.dc_id;
	parms.shop_id = fml.vars.shop_id;
// console.log('初始化：',parms)
api.read({'url':'/wx/weixin_init'},parms, function(data){
	// alert(JSON.stringify(data))
	if(data.code == 0){
		fml.vars.sku_id = data.info.goods[0].goods[0].sku_id || '';
		var tmp = shareTmp('orderConfirmTmp', {'orderInfo' : data.info, 'addr_info' : data.info.addr_info});
		$('#order_confirm').append(tmp);

		$wx_card_info = $('.wx_card_info');
 
		//判断用户是否有微信卡券 daiqin
		userWxCard();

		platCoupon = data.info.plat_coupon_info || [];
		shopCoupons = data.info.goods.map(function(item){
			return item.coupon_info;
		});

		readyDo();
	}else{
		var a = new Alert({
			content : data.msg || data.message
			, onSure : function(){
				window.location.href = "/wx/mall/daily";
			}
		});
		return ;
	}
});

/* 地址 */
var setAddress = function(res){
	changePrice('address',res)
}

/**
 * 判断用户是否有可用卡券
 */
var userWxCard = function(){
	var _data = {'money' : $('#order_total').html()}
	$.get('/aj/wx_new/card', _data, function(data){
		data = JSON.parse(data);
		if (data.code == 0) {
			wxCard(data);
		}else if(data.code == -4){
			$('.wx_card').off('click').on('click', function(event) {
				var alt = new Alert({
					content : "暂无可用微信卡券"
				});
			});
		}else{
			var data_blank = {
				'data' : {
					"card_sign": '',
					"card_type": '',
					"time_stamp": '',
					"nonce_str": ''
				}
			}
			wxCard(data_blank);
		}
	})
}


/**
 * 拉取微信卡券列表
 */
var wxCard = function(_data){
	var data = _data;
	var readyFunc = function onBridgeReady() {
		// 绑定关注事件 
		$('.wx_card').off('click').on('click', function(event) {
			WeixinJSBridge.invoke('chooseCard', {
				"app_id": "wx28b165b5a629bb11", 
				// "location_id ": 11111,
				"sign_type": "SHA1",
				"card_sign": data.data.card_sign,
				// "card_id": "pFS7Fjg8kV1IdDz01r4SQwMkuCKc", 
				"card_type": data.data.card_type,
				"time_stamp": data.data.time_stamp,
				"nonce_str": data.data.nonce_str
			},function(res) {
				if (/ok/g.test(res.err_msg)) {
					var _info = JSON.parse(res.choose_card_info)[0];

					$.get('/aj/wx_new/cardInfo',{'card_id' : _info.card_id},function(data){
						data = JSON.parse(data);
						if (data.code == 0) {
							//显示修改
							$wx_card_info.html(shareTmp('cardTmp',{
								'cardInfo':{
									'code_type':_info.encrypt_code
									,'title':data.data.coupon_info.title
								}
							}))
							//调整价格
							changePrice('wx_card');
						}
					});
				};
			});

		});
	}
	if (typeof WeixinJSBridge === "undefined") {
		document.addEventListener('WeixinJSBridgeReady', readyFunc, false); 
	} else {
		readyFunc(); 
	}

}

/* 选择优惠劵 */
var couponBind = function(){
	$('.show_coupon').on('click',function(event){
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
				//只要是点优惠劵，卡券清除
				//daiqin
				var wx_coupon = $wx_card_info.find('.pay_list')
				if(wx_coupon.length){
					// wx_coupon.data('code',0)
					// wx_coupon.html('')
					// $('.wx_card').css('background', 'blue');
					$wx_card_info.html(shareTmp('cardTmp',{'cardInfo' : '' }))			
				}
				
				changePrice(coupon_type);
			}
		});
	});
}

/* 调整订单价格 */
var changePrice = function(coupon_type,addr_res){
	/**
	 * getCouponData(): 从sid购物车购买 传coupon信息
	 * getData(): 从单宝页直接购买 传商品参数详情
	 */
	var data = fromCart ? getCouponData() : getData();

	if (fml.vars.parms.dress_id) {
		data = 	fml.vars.parms;
	};

	/**
	 * 添加地址切换信息
	 * nickname	否	String	用户昵称 - 收件人
	 * city_code	否	integer	省市区国标码210102
	 * phone	否	String	电话
	 * street	否	String	街道
	 * postcode 否	integer	邮编
	 *==========================================
	 * 微信地址库返回信息：
	 * err_msg : edit_address:ok 提示信息
	 * addressPostalCode 邮政编码
	 * nationlCode 省市区国标码
	 * telNumber 电话
	 * userName 收件人
	 * proviceFirstStageName 省
	 * addressCitySecondStageName 市
	 * addressCountiesThirdStage 区
	 * addressDetailInfo 详细地址信息-街道
	 */
	if(coupon_type == 'address' && addr_res){
		data.nickname = addr_res.userName
		data.city_code = addr_res.nationalCode
		data.phone = addr_res.telNumber
		data.street = addr_res.proviceFirstStageName + addr_res.addressCitySecondStageName + addr_res.addressCountiesThirdStageName + addr_res.addressDetailInfo
		data.postcode = addr_res.addressPostalCode || 0
	}else{
		data.addr_id = address.addr_id
	}

	data.dc_id = fml.vars.dc_id;
	data.shop_id = fml.vars.shop_id;

	api.read({'url': '/wx/weixin_init'},data, function(res){
		// if(res.code == -1){
		// 	new Alert({
		// 		content : '地址信息异常!'
		// 	})
		// 	return
		// }else if(res.code != 0){
		// 	new Alert({
		// 		content : '操作失败,请重试!'
		// 	})
		// 	return
		// }
		
		if(res.code != 0){
			new Alert({
				content : res.msg
			})
			return;
		}
		fml.vars.sku_id = res.info.goods[0].goods[0].sku_id || '';
		var $total_new = $('.total_new');
		res.info.goods.map(function(item,i){	
			var $now_total = $total_new.eq(i);
			/* 修改运费 */
			$now_total.children('.freight').html(item.freight_show); 
			/* 修改商品总价 */
			$now_total.find('.total_price').html(item.total_price);
		})
		$('#order_total').text(res.info.total_price); //订单合计
		var platinfo = res.info.plat_coupon_info;

		if(coupon_type == 'shop'){
			var $plat_coupon = $('.plat_coupon_info');
			if (platinfo && (platinfo.length > 0)) {
				$plat_coupon.html(shareTmp('platcouponTmp',{plat_coupon_info : platinfo}))
				platCoupon = platinfo;
			}else{
				$plat_coupon.html(shareTmp('nocouponTmp',{'info':'暂无可用优惠劵'}))
			}
		}else if(coupon_type == 'address'){
			var address_info = res.info.addr_info
			$addrArea.html(shareTmp('addressTmp' , {address : address_info}))
			address.addr_id = address_info.addr_id
		}

		if(res.info.wechat_card_coupon_info.code == 1){
			$wx_card_info.html(shareTmp('cardTmp',{'cardInfo' : '' }))
			var al = new Alert({
				content : '卡券使用失败'
			})
		}

		/* 等价格重新渲染后，判断用户可使用的卡券列表 */
		userWxCard()

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
		,"shop_id" : parms
		,'card_code' : $wx_card_info.find('.pay_list').data('code') || 0 
		//微信卡券card_code
	}
	var plat_coupon = $('.plat').find('.pay_list').attr('coupon_id');
	// data.card_code = $wx_card_info.find('.pay_list').data('code'); //
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
			, "shop_coupon[0][coupon_id]" : shopCouponId.attr('coupon_id')
			, "amount" : amount
			, "goods_id" : goods_id 
			, "color" : fml.vars.color
			, "size" : fml.vars.size
			, "card_code" : $wx_card_info.find('.pay_list').data('code') || 0
			, "sku_id" : fml.vars.sku_id
		}
	return data;
}

/**
 * 获取用户评论信息
 * @return 
 * 		false：用户字数超数判断
 * 		commonts：评论内容
 */
var getComments = function(){
	$user_comment = $('.user_comment')
	if($user_comment.length == 1){
		var content = $user_comment.val()
		if(content){
			if(!regString.WidthCheck(content, 140)){
				var b = new Alert({
					content : '卖家留言超过了140字'
				});
				return false;
			}
			return content
		}
	}else{
		var comment_over = false
			,comments = []
		$user_comment.each(function(index, item) {
			var content = $(this).val();
			if(content){
				//判断字数
				if(!regString.WidthCheck(content, 140)){
					comment_over = true
					return false
				}
				var shop_id = $(this).closest('.pay_info').children('.show_coupon').attr('shop_id');
				comments.push([shop_id,content].join('_'));
			 }
		});
		if (comment_over) {
			var b = new Alert({
				content : '卖家留言超过了140字'
			});
			return false;
		};

		if(comments.length != 0){
			return comments.join('|');
		}
	}

}

/* 微信支付 */
var pay_button_times = false
$('body').on('click','#charge', function(){
	if(pay_button_times){ return; }
	pay_button_times = true;

	$wx_loading.show();

	tracking.cr('wx/click_pay_button')

	if (!address.nickname && !address.addr_id) {
		var a = new Alert({
			content : '请告诉我们您的收货地址'
			, onSure : function(){
				goWXAddress(setAddress)
			}
		});

		pay_button_times = false;
		$wx_loading.hide()
		return;
	};

	var price = []
		,post_url = ''
		
	$goodsList.each(function(i,goods){
		var p = $(goods).find('.u_price').text();
		if (!p){
			$wx_loading.hide()
			return;
		} 
		
		var id = this.id.split('_')[1];
		fromCart ? price.push([id,p].join('_')) : price.push(p);
	});

	if(fromCart){
		post_url = '/wx/add_weixin_cart'
		var data = getCouponData() 
	
		var shop_coupon = data.shop_coupon;
		delete data.shop_coupon;
		for (var i = 0 , len = shop_coupon.length; i < len; i+=1) {
			data["shop_coupon["+i+"][shop_id]"]= shop_coupon[i].shop_id;
			data["shop_coupon["+i+"][coupon_id]"] = shop_coupon[i].coupon_id;
		}
	}else if (fml.vars.parms.dress_id) {
		post_url = '/wx/add_weixin_goods'
		var data = fml.vars.parms;
	}else{
		post_url = '/wx/add_weixin_goods'
		var data = getData();
		data.sku_id = fml.vars.sku_id || '';
	}
	data.dc_id = fml.vars.dc_id;
	data.shop_id = fml.vars.shop_id;

	/* 获取用户评论 */
	var u_comments = getComments()

	if(u_comments){
		data.comment = u_comments
	}else if(u_comments === false){
		pay_button_times = false;
		$wx_loading.hide()
		return
	}	

	if(address.addr_id){
		data.addr_id = address.addr_id
	}else{
		data["address[nickname]"] = address.nickname;
		data["address[phone]"] = address.phone;
		data["address[street]"] = address.street;
	}

	var params = location.search.substr(1).split('&');
	if (!fml.vars.parms.dress_id) {
		for (var i=0; i < params.length; i++) {
			var pair = params[i],
			index = pair.indexOf('='),
			key = pair.substr(0,index),
			val = pair.substr(index+1);
			data[key] = decodeURIComponent(val);
		};
	}else{
		if (typeof(data.amount) == "string") {
			data.amount = [data.amount];
			data.color = [data.color];
			data.goods_id = [data.goods_id];
			data.size = [data.size];
			data.sku_id = [data.sku_id];
		};
		data.amount.forEach(function(v, i){
			data['amount[' + i + ']'] = data.amount[i];
			data['color[' + i + ']'] = data.color[i];
			data['goods_id[' + i + ']'] = data.goods_id[i];
			data['size[' + i + ']'] = data.size[i];
			data['sku_id[' + i + ']'] = data.sku_id[i];
		});
	}
		
	data['price'] = price.join('|');
	data['total_price'] = $('#order_total').html();

	data.goods_pid = data.goods_pid ? (data.goods_pid + '-' + channel_mark) : 'weixin-cart-' + channel_mark;
	
	api.write({'url':post_url},data, function(res){
		
		$wx_loading.hide()

		if(res.code == '0'){
			goWXPay(res, function(){
				pay_button_times = false;
			});
		}else{
			tracking.cr('wx/statistics_action', {'action': 'pop', 'value': 'payFailed'})
			window.location.href = '/wx/fail?msg=' + (res.msg || '下单失败');
		}
	});
});

