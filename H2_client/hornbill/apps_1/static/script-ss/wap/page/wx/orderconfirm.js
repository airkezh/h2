fml.define('wap/page/wx/orderconfirm' , ['wap/app/wx/goWXAddress', 'wap/app/wx/goWXPay', 'component/shareTmp','wap/zepto/touch', 'wap/ui/alert','wap/app/dialog','wap/app/select'] , function(require){
	var shareTmp = require('component/shareTmp')
		, goWXPay = require('wap/app/wx/goWXPay')
		, goWXAddress = require('wap/app/wx/goWXAddress')
		, Alert = require('wap/ui/alert')
		, select = require('wap/app/select')


	var $addrArea = $('.receiver_info')
		, address = {
			addr_id : $addrArea.children('p').eq(0).attr('addr_id') || ''
		}

	var setAddress = function(res){
		address = {
			nickname : res.userName
			, phone : res.telNumber
			, street : res.proviceFirstStageName + res.addressCitySecondStageName + res.addressCountiesThirdStageName + res.addressDetailInfo
		}
		$addrArea.html(shareTmp('addressTmp' , {address : address}))
	}

	$addrArea
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(){
			goWXAddress(setAddress)
		});

	var $goodsList = $('.order_goods_list li')
		, platCouponId = $('.plat').find('.pay_list')
		, goods_id = $('.order_goods_list li').attr('goods_id')

	//show_coupon
	if (fml.vars.platCoupon.length == 0) {

	} else {
		$('.show_coupon').on('tap',function(event){
			var  payList = $(this).find('.pay_list') 
				, checkedCouponId = payList.attr('coupon_id')
				, a = $(this).hasClass('plat') ? fml.vars.platCoupon : fml.vars.shopCoupon
				, couponArr = []
			if(!checkedCouponId) return;
			for(var i=0; i<a.length; i++){
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
					changePrice();
				}
			});
		});
	}

	var changePrice = function(){
		var data = getData();
		$.get('/aj/wx/coupon_change',data,function(res){
			// console.log(res);
			$('.total_price').text(res.info.total_price);
		}, 'json');
	}

	var getData = function(){
		var amount = $('.amount').text()
		  , data = {
				"plat_coupon" : platCouponId.attr('coupon_id')
				, "amount" : amount
				, "goods_id" : goods_id 
				, "color" : fml.vars.color
				, "size" : fml.vars.size
				, "module" : 'weixin'
			}
		return data;
	}
	//tap微信支付
	$('#charge').on('tap', function(){
		var fromCart = location.search.indexOf('goods_id') === -1;
		var price = [];
		if (!address.nickname && !address.addr_id) {
			var a = new Alert({
				content : '请告诉我们您的收货地址'
				, onSure : function(){
					goWXAddress(setAddress)
				}
			});
			//alert('请告诉我们您的收货地址');
			return ;
		};
		$goodsList.each(function(i,goods){
			var p = $(goods).find('.u_price').text();
			if (!p) return;
			
			var id = this.id.split('_')[1];
			fromCart ? price.push([id,p].join('_')) : price.push(p);
		});

		data = {
			"price": price.join('|')
			, "total_price" : price.join('|')
			, "plat_coupon" : platCouponId.attr('coupon_id')
			, "amount" : $('.amount').text()
		};

		if(address.addr_id)
			data.addr_id = address.addr_id
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

		// alert(JSON.stringify(data))
		$.post('/aj/wx/ordercreate', data, function(res){
			// alert(JSON.stringify(res))
			if(res.code == '0'){
				goWXPay(res)
			}else{
				// window.location.href = '/wx/fail/?&msg=' + encodeURIComponent(res.msg) + '&tid=' + data.twitter_id
				window.location.href = '/wx/fail/?&msg='
			}
			
		}, 'json');

	});
});
