/*common*/
var $ = require('jquery')
	, shareTmp = require('component/shareTmp')

$('[name="goods_act"]').prop('checked',true) //表单cbx默认值初始化

$('#combo_list').on('change', '[name=goods_act]', function(event) {
	var isCheck = $(this).is(':checked')
	if(isCheck)
		$(this).parent().removeClass('noact')
	else
		$(this).parent().addClass('noact')
	reloadCreateInfo()
}).on('click', '.sku_item', function(event) {
	if($(this).hasClass('out_stock')) return;
	if($(this).hasClass('act')){
		// $(this).removeClass('act')
		return;
	} else {
		$(this).addClass('act').siblings('.sku_item').removeClass('act')
	}
	skuChange($(this).parents('.combo_item'))
	reloadCreateInfo()
});

var $createOrderWrapper = $('.create_order_info')
	,$comboList = $('#combo_list')
$(window,document).on('scroll', function(event) {
	var listBottom = $comboList.offset().top + $comboList.outerHeight()
	var scrollTop = $(this).scrollTop()
	var startTop = document.documentElement.clientTop
	var winHeight = $(window).height()
	var isCrossBottom = (scrollTop+winHeight+startTop-80)>listBottom
	if(isCrossBottom){
		$createOrderWrapper.removeClass('at_bottom')
	} else {
		$createOrderWrapper.addClass('at_bottom')
	}
}).trigger('scroll')

$('#create_order_btn').on('click', function(event) {
	event.preventDefault();
	var result = reloadCreateInfo(true)
	if(!result.canBuy) return;

	var collocation_id = $('[name="collocation_id"]').val()
	var shop_id = $('[name="shop_id"]').val()
	var sendData = {
		dress_id : collocation_id
		,shop_id : shop_id
		,sku_id : result.skuIdArr.join('|')
		,color : result.colorArr.join('|')
		,size : result.sizeArr.join('|')
		,goods_id : result.goodsIdArr.join('|')
		,goods_pid : result.pidArr.join('|')
		,twitter_id : result.twitteridArr.join('|')
		,type:$('[name=type]').val()
	}

	location.href = '/order/init/?'+$.param(sendData)

});

/*
	sku发生改变
*/
function skuChange($comboItem){
	var $skuItems = $comboItem.find('.sku_item_wrapper')
		,$skuTitles = $comboItem.find('.sku_tle')
		,selectAll = true //sku是否选择完全
		,metaIds = []
		,titles = []
		,imgsrc = ''
		,unselectSkuTitles = [] //未选择的sku标题
	for (var i = 0; i < $skuItems.length; i++) {
		var $act = $skuItems.eq(i).find('.sku_item.act')
		if($act.length===0){
			selectAll = false;
			unselectSkuTitles.push($skuTitles.eq(i).data('sku_tle'))
			continue;
		}
		metaIds.push($act.data('meta_id'))
		titles.push($act.attr('title'))
		if($act.data('imgsrc')){
			imgsrc = $act.data('imgsrc')
		}
	};
	if(metaIds.length===1) metaIds.push(''); //sb结构
	var selected_sku_info = ''
	for (var i = 0; i < titles.length; i++) {
		selected_sku_info += shareTmp('selected_sku_info_item_tmp', {txt:titles[i]}) 
	};
	if(selectAll){
		$comboItem.removeClass('warning')
		$comboItem.find('.selected_sku_wrapper').html('已选择：<span class="red_f">'+selected_sku_info+'</span>')
	} else {
		$comboItem.find('.selected_sku_wrapper').html('<span class="red_f">请选择'+unselectSkuTitles.join('和')+'</span>')
	}
	var stock //库存
		,oPirce //原价
		,sPirce //现价
	if(metaIds.length===0){
		stock = $comboItem.data('repertory')
		oPirce = $comboItem.data('oprice')
		sPirce = $comboItem.data('sprice')
	} else {
		var meta_id = metaIds.join('_')
		stock = $comboItem.data('sku_repertory_'+meta_id)
		oPirce = $comboItem.data('sku_oprice_'+meta_id)
		sPirce = $comboItem.data('sku_sprice_'+meta_id)
	}
	if(!selectAll) checkStock($comboItem);
	$comboItem.find('.repertory').html(stock)
	$comboItem.find('.o_price').html(oPirce)
	$comboItem.find('.s_price').html(sPirce)
	if(imgsrc){
		$comboItem.find('.thumbnail_img').attr('src', imgsrc)
	}
}
/*
	检查库存
*/
function checkStock($comboItem){
	var $skuActItems = $comboItem.find('.sku_item.act')
	$.each($skuActItems, function(index, item) {
		item = $(item)
		var colorStockStr = item.data('color_stock')
		if(!colorStockStr) return;
		var colorStocks = colorStockStr.split(',')
		var $selfWrapper = item.parents('.sku_item_wrapper')
		var $otherWrapper = $comboItem.find('.sku_item_wrapper').not($selfWrapper)
		$otherWrapper.find('.sku_item').each(function(index, el) {
			el = $(el)
			if(colorStocks[index]==0){
				el.addClass('out_stock')
			} else {
				el.removeClass('out_stock')
			}
		});
	});
}
/*
	更新购买栏
*/
function reloadCreateInfo(needWarning){
	var isCheckAll = true
		, canBuy = true
	var $comboItems = $('#combo_list').find('.combo_item')
		, $createOrderInfo = $('.create_order_info')
	var sPrice = 0 //合计现价
		,disPrice = 0 //合计节省
		,oPrice = 0 //合计总价
		,skuIdArr = []
		,goodsIdArr = []
		,colorArr = []
		,sizeArr = []
		,pidArr = []
		,twitteridArr = []
	$.each($comboItems, function(index, comboItem) {
		comboItem = $(comboItem)
		var isCheck = comboItem.find('[name="goods_act"]').is(':checked')
		if(!isCheck){
			isCheckAll = false;
			return;
		} 
		var selectSku = true
			,metaIds = []
		$.each(comboItem.find('.sku_item_wrapper'), function(index, skuItemWrapper) {
			skuItemWrapper = $(skuItemWrapper)
			var $actSkuItem = skuItemWrapper.find('.sku_item.act')
			if($actSkuItem.length===0){
				canBuy = false;
				selectSku = false;
			} else {
				metaIds.push($actSkuItem.data('meta_id'))
			}
		});
		if(metaIds.length===1) metaIds.push(''); //sb结构
		if(needWarning){
			if(!selectSku)
				comboItem.addClass('warning')
			else
				comboItem.removeClass('warning')
		}
		if(selectSku){
			var metaId = metaIds.join('_')
			var op = Number(comboItem.data('sku_oprice_'+metaId)) || 0
				,sp = Number(comboItem.data('sku_sprice_'+metaId)) || 0
				,dp = op - sp
			sPrice += sp
			disPrice += dp
			oPrice += op
		} else {
			var op = Number(comboItem.data('oprice')) || 0
				,sp = Number(comboItem.data('sprice')) || 0
				,dp = op - sp
			sPrice += sp
			disPrice += dp
			oPrice += op
		}
		skuIdArr.push(comboItem.data('sku_id_'+metaId))
		colorArr.push(comboItem.find('.sku_item.act:first').attr('title'))
		var _size = comboItem.find('.sku_item.act:eq(1)').attr('title') || ''
		sizeArr.push(_size);
		pidArr.push(comboItem.data('pid'))
		goodsIdArr.push(comboItem.data('goods_id'))
		twitteridArr.push(comboItem.data('twitter_id'))
	});
	
	//如果全部选择则使用套餐价格
	if(isCheckAll){
		sPrice = $('#combo_list').data('collocation_price')
		disPrice = oPrice - sPrice
	}
	$('.save_price').html((Math.round(disPrice*100)/100).toFixed(2) || '')
	$('.combo_price').html((Math.round(sPrice*100)/100).toFixed(2) || '')

	if(canBuy){
		$createOrderInfo.addClass('canbuy')
	} else {
		$createOrderInfo.removeClass('canbuy')
	}
	return {
		isCheckAll : isCheckAll
		, canBuy : canBuy
		, skuIdArr : skuIdArr
		, colorArr : colorArr
		, sizeArr : sizeArr
		, pidArr : pidArr
		, goodsIdArr : goodsIdArr
		, twitteridArr : twitteridArr
	};
}
//初始化sku选择状态
$('#combo_list').find('.combo_item').each(function(index, el) {
	skuChange($(el))	
});
//初始化按钮状态
reloadCreateInfo() 