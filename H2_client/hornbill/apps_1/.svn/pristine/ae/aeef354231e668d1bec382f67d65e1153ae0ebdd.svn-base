/*common*/
var shareTmp = require('component/shareTmp')
	, alert = require('ui/alert')
	, input = require('component/focus')
	, client = require('app/im/client')

	, orderUrl = 'https://shop.meilishuo.com/order/order_detail/'
	, orderReg = /^[0-9]{12}$/

var introData = {
	goods : ['商品', 'twitter_id', 'tid']
	, shop : ['店铺', 'shop_id', 'spid']
	, order : ['订单', 'order_id', 'oid']
}

var initOrder = function(){
	input.inputFocus('.order_box .order_input')
}

var searchOrder = function(fn){
	var orderId = $.trim($(this).find('.order_input').val())

	if(!orderId){
		new alert({content:'您还没输入订单号', width:370})

	}else{
		if(orderReg.test(orderId)){
			if(fml.vars.im.imClient){
				client.clientWin.openURI(orderUrl + orderId)
			}else{
				window.open(orderUrl + orderId)
			}
		}else{
			new alert({content:'订单号格式不正确', width:370})
		}
	}
}

var init = function(socket){
	socket.on('goodsPush', function(data){
		console.log('goodsPush', data)
		
		if(!userListObj[data.toid]) return;

		update(data.req.data, data.toid, 'goods')
	})
	socket.on('shopPush', function(data){
		console.log('shopPush', data)
		
		if(!userListObj[data.toid]) return;

		update(data.req.data, data.toid, 'shop')
	})
}

var update = function(data, toid, type){
	if(!data || data.length == 0) return;

	var $main = userListObj[toid].mainBox
		, $box = $main.find('.introBox')
		, $tab = $box.children('.intro_tab')
		, $list = $box.children('.intro_list')
		, $conBox = $list.find('.list_' + type)
		, intro_id = introData[type][2] + '_' + data[introData[type][1]]

	if($main.is('.rightHide'))
		$main.removeClass('rightHide')

	if($box.is('.none_f'))
		$box.removeClass('none_f')


	if(!$conBox[0]){
		var $tmpTab = $(shareTmp('im_intro_tab_item', {
			tag : type	
			, title : introData[type][0] 
		}))
		var $tmpList = $(shareTmp('im_intro_list_item',{
			tag : type
			, tpl : shareTmp('im_' + type + '_item', {data : data})
			, intro_id : intro_id 
		}))

		if(type == 'goods'){
			$tab.prepend($tmpTab)
			$list.prepend($tmpList)

			/*
			$tab.children().eq(0).after($tmpTab)
			$list.children().eq(0).after($tmpList)
			*/

		}else if(type == 'shop'){
			/*
			$tab.children().eq(-1).before($tmpTab)
			$list.children().eq(-1).before($tmpList)
			*/

			$tab.append($tmpTab)
			$list.append($tmpList)
		}

	}else{
		if($conBox.attr('intro_id') != intro_id)
			$conBox
				.attr('intro_id', intro_id)
				.html(shareTmp('im_' + type + '_item', {data:data}))

	}

	if(!fml.vars.im.isShop)
		deleteIntro(toid, 'order')
	else
		changeIntro(toid, 'goods')

	if(!userListObj[toid].hasgoods){

		if(type == 'goods' || (type == 'shop' && !userListObj[toid].hasshop)){
			userListObj[toid]['has' + type] = 1

			if(!fml.vars.im.isShop)
				changeIntro(toid, type)
		}
	}
}

var deleteIntro = function(toid, type){
	userListObj[toid].mainBox.find('.im_right .introBox').find('.tab_' + type + ',' + '.list_' + type)		 
		.remove()
}
window.changeIntro = function(toid, type){
	userListObj[toid].mainBox.find('.im_right .introBox .tab_' + type)		 
		.click()
		.addClass('act').siblings().removeClass('act')
}

exports.init = init
exports.update = update
exports.searchOrder = searchOrder

