/*common*/
require('wap/zepto/fastclick');
var Confirm = require('wap/ui/confirm')
	,Alert = require('wap/ui/alert')
	,shareTmp = require('component/shareTmp')
	,api = require('wap/component/callApi')
	,goWXPay = require('wap/app/wx/goWXPay')
	,tracking = require('wap/app/tracking')
	,$wx_loading = $('#wx_loading')
//msg and reload
var alert_msg = function(msg,is_reload){
	var a = new Alert({
		content : msg
		,onSure : function(){
			if (is_reload) {
				window.location.reload();
			}else{
				return;
			}
		}
	});
}

api.read({'url' : '/wx/detail_weixin'}, {'order_id' : fml.vars.order_id}, function(data){
	var order = data.info.order
	, order_info = data.info
	, address = data.info.address
	, goods = data.info.goods
	, step = order.step
	, msgObj = order.words
	, status = order.status
	, express = order.express_new
	, express_company = order.express_company
	, express_id = order.express_id

	var tmp = shareTmp('tmpAll', {'order_info' : order_info, 'order' : order,'address' : address,'goods' : goods,'step' : step,'msgObj' : msgObj,'status' : status,'express' : express,'express_company' : express_company,'express_id' :express_id})
	$('.wrap').append(tmp);

	/* loading 高度设置 */
	var load_top = ((window.innerHeight - 140)/2)|0 
	$wx_loading.css('top', load_top + 'px')
})

//确认收货
$('.wrap').on('click', '.recvOrder', function(){
	var btn = $(this)
		,mids = [];
	$('.goods_wrap').each(function(i,goods){
		mids.push($(goods).attr('mid'));
	})
	
	var data = {
		order_id : btn.attr('order_id')
		, mid : mids.join(',')
	}

	var confirm_recv = function(){
		api.write({'url' : '/wx/recv_confirm'}, data, function(res){
			if(res.code == '0'){
				alert_msg("确认收货成功！",true);
			}else{
				alert_msg(res.info.msg,true);
			}
		}, 'json')
	}

	var conf = new Confirm({
		content : '为了保证您的消费体验，请在收到商品后再确认收货。'
		,onSure : function(){
			 confirm_recv();
		}
		,onCancel : function(){
			return;
		}
	})

})

//取消订单
$('.wrap').on('click', '#cancel_order', function(){
	var btn = $(this)
		,t = null;
	var data = {
		order_id : btn.attr('order_id')
	}

	var cancel_ord = function(){
		api.write({'url' : '/wx/close'}, data, function(res){
			if(res.code == 0){
				alert_msg("订单取消成功！",true);
			}else{
				alert_msg(res.message);
			}
		}, 'json')
	}

	var conf = new Confirm({
		content : '您确定要取消本订单吗？'
		,onCancel : function(){
			return;
		}
	})
	
	$('#confirm .sureBtn').on('click', function(){
		clearTimeout(t);
		t = setTimeout(function(){
			cancel_ord();
			conf.drive.destroyModel();
		},500);
		return false;
	})
});

var pay_button_times = false
$('.wrap').on('click', '#pay_now',function(){
	if(pay_button_times){ return; }
	tracking.cr('wx/click_pay_button')
	pay_button_times = true;
	$wx_loading.show();

	var btn = $(this)
	var data = {
		order_id : btn.attr('order_id')
		, total_price : btn.attr('total_price')
	}

	api.write({'url' : '/wx/wechat_store_fetch'},data,function(res){
		pay_button_times = false
		$wx_loading.hide();

		if(res.code == '0'){
			goWXPay(res)
		}else{
			window.location.href = '/wx/fail?msg=' + (res.msg || '下单失败');
		}
			
	})
});
