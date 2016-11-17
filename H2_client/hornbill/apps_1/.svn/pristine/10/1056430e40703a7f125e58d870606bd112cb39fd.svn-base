fml.define('wap/client/page/refund_detail' , ['wap/zepto','wap/zepto/touch','wap/component/callQQ','wap/app/alert','wap/ui/confirm'] , function(require,exports){
	var callQQ = require('wap/component/callQQ')
		,m_alert = require('wap/app/alert')
		,Confirm = require('wap/ui/confirm');
	
	callQQ($('.qq'));
	$('#express_company').on('change',function(){
		var val = $(this).val()
		if(val == -1){
			$('#express_company_other').show();
		} else {
			$('#express_company_other').hide();
		}
	})

	$('#abort').on('change',function(){
		if($(this).is(':checked')){
			$('.abort_content').hide();
		} else {
			$('.abort_content').show();
		}
	})

	function newLayer(){
		var elMask = $('<div></div>').css({
				position:'fixed',
				left:0,
				right:0,
				top:0,
				bottom:0,
				'z-index':100,
				background:'#000',
				opacity:0
			}).appendTo('body');
			window.setTimeout(function(){
				elMask.remove();
			},2000);
	}

	$('#send_goods').on('tap',function(){
		var express_id = $('#express_id').val()
			, express_company = $('#express_company').val()
			// , alipay_account = $('#alipay_account').val()
			// , real_name = $('#real_name').val()

		//快递公司
		if(!express_company){
			m_alert({
					dialogContent : '请选择快递公司'
				});
			return;
		} else {
			if(express_company == -1){
				express_company = $('#express_company_other').val()
				if(!express_company){
					m_alert({
						dialogContent : '请填写自定义快递公司'
					});
					return;
				}
			}
		}
		
		//快递单号
		if(!express_id){
			m_alert({
					dialogContent : '请填写快递单号'
				});
			return;
		}
	/*
		//支付宝账号
		if(!alipay_account){
			m_alert({
					dialogContent : '请填写支付宝账号'
				});
			return;
		}

		//支付宝姓名
		if(!real_name){
			m_alert({
					dialogContent : '请填写支付宝姓名'
				});
			return;
		}*/

		$.ajax({
				url:'/aj/doota/express',
				type:'post',
				dataType:'json',
				data:{
					express_id:express_id,
					express_company:express_company,
					refund_id:$('#refund_id').val(),
					// access_token : Meilishuo.config.access_token
					// alipay_account:alipay_account,
					// real_name:real_name,
					// abort:$('#abort:checked').length
				},
				success: function(data){
					// data = data.data;
					if (!data.code) {
						m_alert({
							dialogContent : '提交成功',
							onClose : function(){
								window.location.reload();
							}
						});
						
					}else{
						m_alert({
							dialogContent : data.msg
						});
					}
				},
				error: function(data){
					m_alert({
							dialogContent : '系统错误，请重新提交一下试试'
						});
				}
			});
	})
	

	$('#refund_cancel').on('touchend',function(e){
		e.preventDefault();
	}).on('tap',function(){
		var refund_id = $('#refund_id').val();
		//console.log(refund_id);
		var c = new Confirm({
			content:'<h3>美丽说温馨提示</h3></br>你确定要取消退款申请吗？取消后此商品将不能再次申请退款！'
			, onSure : function(){
				newLayer();
				
				$.get('/aj/doota/refund_cancel?refund_id='+refund_id , function(data) {
					if( data.code == 0){
						window.location.href = '/app/refund/detail/?refund_id='+ refund_id;
					}else{
						m_alert({
							dialogContent : data.msg
						});
					}
				},'json');

			}
			, onCancel : function(){
				return;
			}
		});
	})

	$('#refund_reapply').on('touchend',function(e){
		e.preventDefault();
	}).on('tap',function(){
		var refund_id = $('#refund_id').val();
		//console.log(refund_id);
		var c = new Confirm({
			content:'<h3>美丽说温馨提示</h3></br>你确认要恢复退款申请吗？恢复后卖家将重新审核您的退款！'
			, onSure : function(){

				newLayer();
				$.get('/aj/doota/refund_reapply?refund_id='+refund_id , function(data) {

					if( data.code == 0){
						// window.location.href = '/app/refund/detail/?refund_id='+ refund_id;
						location.reload(true);
					}else{
						m_alert({
							dialogContent : data.msg
						});
					}
				},'json');
			}
			, onCancel : function(){
				return;
			}
		});
	})



});
