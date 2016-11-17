/*common*/
var touch = require('wap/zepto/touch')
var goWXAddress = require('wap/app/wx/goWXAddress')
var goWXPay = require('wap/app/wx/goWXPay')
var shareTmp = require('component/shareTmp')
var Alert = require('wap/ui/alert')
var storage = require('component/wxstorage')

var $addrArea = $('.receiver_info')
	, address = {
		nickname : fml.vars.orderInfo.order_express.receiver_name
		, phone : fml.vars.orderInfo.order_express.receiver_mobile
		, street : fml.vars.orderInfo.order_express.receiver_address
	}

var setAddress = function(res){
	address = {
		nickname : res.userName
		, phone : res.telNumber
		, street : res.proviceFirstStageName + res.addressCitySecondStageName + res.addressCountiesThirdStageName + res.addressDetailInfo
	}
	$addrArea.html(shareTmp('addressTmp' , {address : address}))
}
var setAddressDirectly = function(add) {
	address = add
	$addrArea.html(shareTmp('addressTmp' , {address : address}))
}
window.MLS = {
	'onPickAddress' : function(res){
		address = {
			nickname : res.userName
			, phone : res.telNumber
			, street : res.proviceFirstStageName + res.addressCitySecondStageName + res.addressCountiesThirdStageName + res.addressDetailInfo
		}
		$addrArea.html(shareTmp('addressTmp' , {address : address}))
	}
}

$addrArea
	.on('touchstart touchend', function(event){
		event.preventDefault();
	})
	.on('tap', function(){
		if(storage.getCookie('mls_in_app') == 1){
			location.href = 'meilishuo://pick_address.meilishuo'
		}
		else if(storage.getCookie('md_in_app') == 1) {
			showAddressPopup()
		}else{
			goWXAddress(setAddress)
		}

	});
var plat_form = $('.plat_form>dl')
for(var i = 0; i < plat_form.length ; i++){
  (function(index){
  	var platarr = plat_form[index]
  	$(platarr).on('tap',function(){
	    $('.checked').removeClass('checked');
	    $(platarr).addClass('checked');
})
  }(i))
}


$('#charge').on('tap', function(){
	// event.stopPropagation()
	var check = $('.checked');
	var fromCart = location.search.indexOf('goods_id') === -1;
	var price = [];
	if (!address.nickname) {
		var a = new Alert({
			content : '请告诉我们您的收货地址'
			, onSure : function(){

				if(storage.getCookie('mls_in_app') == 1){
					location.href = 'meilishuo://pick_address.meilishuo'
				}
				else if (storage.getCookie('md_in_app') == 1) {
					showAddressPopup()
				}
				else {
					goWXAddress(setAddress)
				}
			}
		});
		return ;
	};
	// $goodsList.each(function(i,goods){
	// 	var p = $(goods).find('.u_price').text();
	// 	if (!p) return;
		
	// 	var id = this.id.split('_')[1];
	// 	fromCart ? price.push([id,p].join('_')) : price.push(p);
	// });


	//alert(JSON.stringify(data))
	// var params = location.search.substr(1).split('&');
	// for (var i=0; i < params.length; i++) {
	// 	var pair = params[i],
	// 	index = pair.indexOf('='),
	// 	key = pair.substr(0,index),
	// 	val = pair.substr(index+1);
	// 	data[key] = decodeURIComponent(val);
	// };

	//修改数量
	// var amount = parseInt($('#amount').val());
	// if(data['amount'] != amount) data['amount'] = amount;
	isPost(check);
});
function isPost(check){
	var paytype = check.attr('pay_type')
	data = {
		"pay_type": paytype
		,"order_id" : fml.vars.orderInfo.order_id
		, "receiver_name" : address.nickname
		, "receiver_mobile" : address.phone
		, "receiver_address" : address.street
		, "order_remark" : $(".leavemsg").val()
	};
	//$('.buy_wrap').addClass('eventnone');
	if($('.buy_wrap').hasClass('requesting')) return
	$('.buy_wrap').addClass('requesting')	
	$('.buy_wrap .buy_btn').addClass('gray')
	$('.buy_wrap .buy_btn').text('正在请求支付...')

	$.post('/aj/order/create', data, function(res){
		$('.buy_wrap').removeClass('requesting')
		if(res.code == '0'){
			if(paytype != "weixin"){
				location.href = res.data.pay_url
			}else{
				//alert(JSON.stringify(res))
				goWXPay(res.data)
				// $.post('/aj/order/test_pay', {"order_id" : fml.vars.orderInfo.order_id}, function(res){
				// 	alert(res.message)
				// 	WeixinJSBridge.invoke("closeWindow");
				// }, 'json');
				//$('.buy_wrap').removeClass('eventnone');
				$('.buy_wrap .buy_btn').removeClass('gray')
				$('.buy_wrap .buy_btn').text('立即支付')
			}
		}else{
			var a = new Alert({
				content : '创建订单失败：' + res.code
			});
			//$('.buy_wrap').removeClass('eventnone');
			$('.buy_wrap .buy_btn').removeClass('gray')
			$('.buy_wrap .buy_btn').text('立即支付')
		}					
	}, 'json');
}

function showAddressPopup()
{
	$('#address_popup').show();

	$('#address_save_btn').bind('tap', function() {
		var name = $.trim( $('#address_name').val() );
		var mobile = $.trim( $('#address_mobile').val() );
		var address = $.trim( $('#address_address').val() );
		if (name.length == 0 || mobile.length == 0 || address.length == 0) {
			new Alert({content : '姓名、手机、地址不能为空'});
			return;
		}

		address = {
			nickname : name
			, phone : mobile
			, street : address
		};
		setAddressDirectly(address)
		$('#address_popup').hide();
	});
	$('#address_cancel_btn').bind('tap', function() {
		$('#address_popup').hide();
	});
}