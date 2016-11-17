/*common*/

require('wap/zepto')

var Waterfall   = require('circle/component/waterfall')
var Lazy        = require('m/component/lazyLoad')
var UrlHandle   = require('wap/component/urlHandle')
var Alert       = require('wap/ui/alert')

var LazyLoad    = Lazy.init({ xpath: '.g-entrance' })
var shopId      = UrlHandle.getParams( location.href ).shop_id
var paramPool   = ['goods_ctime','goods_on_shelf','sale_num',['price_high','price_lower']]
var sortBy      = paramPool[0]

var GOODS_SHELF = '.js-goods-shelf'
var $w          = $(window)
var $gShelf     = $(GOODS_SHELF)
var $coupon     = $('.coupon')
var $currCoupon = null
var $sortItem   = $('.s_item')
var $price      = $sortItem.eq(3)  // 这里的3是表示价格 sort item
var flag       = false
var Wf          = null
var cashe       = {}

/** main */

/* 预先绑定懒加载事件 */
LazyLoad.scroll()

/* 初始时手动出发一次瀑布流 */
switchWaterfall( sortBy )

/* 绑定事件 */
$coupon.on('click', function (){
	// 防止多次点击
	if(flag) return

	flag = true
	setTimeout(function (){
		flag = false
	}, 1500)

	$currCoupon = $(this)

	if( $currCoupon.hasClass('got') ) return

	var url = '/aj/sq/interfaces/shop_coupon'
	var data = {
		applyCode : $currCoupon.attr('data-id')
	}
	$.get(url, data, couponAjaxCbk, 'json')
})

$sortItem.on('click', function (){
	var $me = $(this)
	var id = $me.data('id')
	var isActive = $me.hasClass('active')

	switch (id){
		case 3:
			var status = $me.data('status')

			if(status == 'down'){
				$me.data('status','up')
				sortBy = paramPool[id][0]
			}else{
				$me.data('status', 'down')
				sortBy = paramPool[id][1]
			}
			break;
		default:
			if(isActive) return
			
			if( $price.data('status') ){
				$price.data('status', '')
			}

			sortBy = paramPool[id]
	}
	
	// 避免点击过快创建多个瀑布流对象
	if(flag) return

	flag = true

	// @hack 切换内容时手动触发scroll事件，for(机型：lenovo)
	$w.scrollTop(0)
	$sortItem.removeClass('active')
	$me.addClass('active')
	switchWaterfall()
})

$('.js-follow-btn').on('click', function (){
	var $target = $(this)
	var data = {
		shop_id : shopId
	}
	if(flag) return

	flag = true

	if($target.hasClass('follow-yes')){
		$.get('/aj/sq/interfaces/shop_unfollow', data, function (res){
			if(res.code === 0){
				myAlert('已取消关注')
				$target.removeClass('follow-yes').addClass('follow-no')
			}else{
				myAlert(res.msg)
			}

			flag = false
		}, 'json')
	}

	if($target.hasClass('follow-no')){
		$.get('/aj/sq/interfaces/shop_follow', data, function (res){
			if(res.code === 0){
				myAlert('关注成功，可在个人中心查看')
				$target.removeClass('follow-no').addClass('follow-yes')
			}else{
				myAlert(res.msg)
			}

			flag = false
		}, 'json')
	}
})

/* tabbar 置顶 */
fixedOnTheTop($('.js-goods-was-sort-by'))

/* 返回定位 */
$('body').on('click','.g-entrance',function (e){
	e.preventDefault()
	
	var $t = $('title')
	var title = $t.html()
	var link =  'http://' + location.host + $(this).attr('href') + '&_wv=5123'
		
	$t.html('返回')
	mqq.ui.refreshTitle()
	mqq.ui.openUrl({
		url: link,
		target: 1,
		style: 0
	})

	setTimeout(function (){
		$t.html(title)
		mqq.ui.refreshTitle()
	},0)
})

function switchWaterfall(){
	if(Wf){
		Wf.destroy()
		Wf = null
	}

	resetLayout()

	Wf = Waterfall.init({
		el: GOODS_SHELF,
		tmpl: 'goods_tpl',
		url: '/aj/sq/interfaces/shop_waterfall',
		data: { shop_id: shopId, _orderby: sortBy, limit: 15 },
		dataName: 'gInfo',
		colNum: 2,
		colGap : "10 0",
		dataFilter: wfDataFilter,
		onFetchSuccess: wfOnFetchSuccess,
		onFetchFinished: wfOnFetchFinished
	})

	Wf.start(cashe[sortBy])
}

function wfDataFilter(data){
	var wfConfig = this._config
	var gd       = wfConfig.dataName

	if(data.frame == 0){
		cashe[sortBy] = data
	}

	return data[gd]
}

function wfOnFetchSuccess(data){
	if(data.length === 0){
		$('.js-pull-up').data('status','stop')
		this.destroy()
		Wf = null
	}
}

function wfOnFetchFinished(data, textStatus){

	if(textStatus == 'timeout'){
		myAlert('抱歉~网络不给力，数据拉不出 o(╯□╰)o')
	}

	LazyLoad.load()
	flag = false
	console.log(flag)
}

function resetLayout(){
	$('.js-pull-up').data('status','loading')
	$gShelf.empty().height(0)
}

function couponAjaxCbk(data){
	if(data.ret === 0){
		$currCoupon.removeClass('get')
		$currCoupon.addClass('got')
		$currCoupon.find('.status').html('已领')
		myAlert('<h3>领取成功</h3><br><p>可在个人中心“我的优惠券”页面查看</p>')
	}else{
		myAlert(data.msg)
	}
}

function myAlert(ct, cbk){
	return new Alert({ 
		content: ct,
		onSure : cbk
	})
}

function fixedOnTheTop($target){
	if($target.css('position').match('sticky')) return

	var offsetTop = $target.offset().top 
	var h = $target.height()
	var w = $target.width()

	var $placeholder = $('<div class="placeholder"></div>').css({
		width: w,
		height: h
	})

	var isAdded = false

	$w.on('scroll', function (){
		if(offsetTop <= $w.scrollTop() && !isAdded){
			$target.next().before($placeholder)
			$target.css({
				position: 'fixed',
				top: 0
			})
			isAdded = true
		}else if(offsetTop > $w.scrollTop() && isAdded){
			$placeholder.remove()
			$target.css({
				position: 'static'
			})
			isAdded = false
		}
	})
}