fml.define('wap/client/page/refund_apply' , ['wap/zepto','wap/zepto/touch','wap/component/uploadBtn','wap/component/shareTmp','wap/app/alert','wap/client/component/common', 'wap/app/loading','wap/client/component/clientUse'] , function(require,exports){
	var uploadBtn = require('wap/component/uploadBtn')
		,shareTmp = require('wap/component/shareTmp')
		,m_alert = require('wap/app/alert')
		, common = require('wap/client/component/common')
		, loading = require('wap/app/loading')
		, clientUse = require('wap/client/component/clientUse')

	if(!Meilishuo.config.isNewest){
		var bindUploadParam = {
		    'behind' : '/imageupload/pic_upload'
		    ,'success' : function(data,obj){
		        if (typeof data.code != 'number') {
		        	var obj = $(obj)
		        		,img = obj.find('img');

		        	if(img.length>0){
		        		img.attr({
		        			src : data.o_pic_url,
		        			asrc : data.H_pic_url
		        		})
		        	} else {
		        		obj.append(shareTmp('img_upload',data))
		        			.removeClass('addBtn')
		        		if($('.img_list img').length <5){
		        			var newObj = obj.clone().empty().addClass('addBtn')
		        			obj.after(newObj)
		        			uploadBtn.bind(newObj, bindUploadParam);
						}
		        	}
			    } else {
			    	m_alert({
						dialogContent : data.msg
					});
			    }
		    }
		    ,'error' : function(p){m_alert({dialogContent : p.description});}
			,plusData:{'big': 1}
			,start : function(){loading.start();}
			,final : function(){loading.stop();}
	    	}
		uploadBtn.bind($('.pic') , bindUploadParam);
	} else {
		$('.pic').each(function(i,item){
			clientUse.callClient.bindUpload($(item),bindUploadParam);
		});
		function bindUploadParam(data,btn){
			var btn = $(btn)
				,img = btn.find('img');

				if(img.length>0){
					img.attr({
						src : data.o_pic_url,
						asrc : data.H_pic_url
					})
				} else {
					btn.append(shareTmp('img_upload',data))
						.removeClass('addBtn')
					if($('.img_list img').length <5){
						var newObj = btn.clone().empty().addClass('addBtn')
						btn.after(newObj)
						clientUse.callClient.bindUpload(newObj, bindUploadParam);
					}
				}
		}
	}

	$('#goods_refund_reason,#refund_reason').on('change',function(){
		//退款原因（退货页面）
		var val = $(this).val()
		if(val == -1){
			$('[name=refund_reason_other]').show();
		} else {
			$('[name=refund_reason_other]').hide();
		}
	})

	$('#refund_apply').on('tap',function(){
		var is_refund_goods = 0
			, select_reason = ''
			, reason = $('[name=reason]').val()
			, refund_price_apply = max_price
			,Url = '';
		//退款原因
		if(!$('#goods_refund_reason').val()){
			m_alert({
				dialogContent : '请选择退款原因'
			});
			return;
		} else {
			var otherObj = $('[name=refund_reason_other]')
				, is_other = (otherObj.css('display')!='none')
			select_reason = is_other ? otherObj.val() : $('#goods_refund_reason').val();
			if(!select_reason){
				m_alert({
					dialogContent : '退款原因不能为空'
				});
				return;
			}
		}
		//退款说明
		/*if(!reason){
			alert('请填写退款说明');
			return;
		}*/

		var data = {
			order_id:$('#order_id').val(),
			mid:$('#mid').val(),
			select_reason:select_reason,
			reason:reason,
			with_goods:is_refund_goods,
			refund_price_apply:refund_price_apply,
			refund_id:$('#refund_id').val()
			// access_token : Meilishuo.config.access_token
		}

		if(data.refund_id){
			Url = '/aj/doota/refund_edit';
		}else{
			Url = '/aj/doota/refund_apply';
		}

		$.post( Url , data , function(data, textStatus, xhr) {
			// data = data.data;
			if (data.code != 0) {
				m_alert({
					dialogContent : data.msg
				});
			}else{
				window.location.href = '/app/refund/detail/?refund_id='+data.refund_id;
			}
		},'json').error(function() {
			m_alert({
				dialogContent : '系统错误，请重新提交一下试试'
			});
		});

	})

	if(after_sale){
		function aferSaleReason(){
			var val = $('[name=is_refund_goods]').val()
			var showObj = $('#goods_refund_reason')
			if(val == 1){
				$('#refund_reason').hide()
				$('#goods_refund_reason').show()
			} else {
				$('#refund_reason').show()
				$('#goods_refund_reason').hide()
				showObj = $('#refund_reason')
			}
			if(showObj.val()==-1){
					$('[name=refund_reason_other]').show()
				} else {
					$('[name=refund_reason_other]').hide()
				}
		}
		aferSaleReason();
		
		$('[name=is_refund_goods]').on('change',function(){			
			aferSaleReason();
 		});
	}

	$('#refund_apply_goods').on('touchend',function(e){
		e.preventDefault();
	}).on('tap',function(){
		// 退款/退货申请
		var is_refund_goods = ($('[name=is_refund_goods]').val()) == 1 ? 1 : 0
			, select_reason = ''
			, reason = $('[name=reason]').val()
			, refund_price_apply = $('[name=refund_price_apply]').val()
			, refund_evidence = ''
			, Url = '';

		//退款原因
		var selectObj = $('#goods_refund_reason');
		if(selectObj.css('display')=='none'){
			selectObj = $('#refund_reason')
		}
		if(!selectObj.val()){
			m_alert({
				dialogContent : '请选择退款原因'
			});
			return;
		} else {
			var otherObj = $('[name=refund_reason_other]')
				, is_other = (otherObj.css('display')!='none')
			select_reason = is_other ? otherObj.val() : selectObj.val();
			if(!select_reason){
				m_alert({
					dialogContent : '退款原因不能为空'
				});
				return;
			}
		}

		//退款说明
		/*if(!reason){
			alert('请填写退款说明');
			return;
		}*/

		//退款金额
		if(!refund_price_apply){
			m_alert({
					dialogContent : '退款金额不能为空'
				});
			return;
		}
		refund_price_apply = parseFloat(refund_price_apply)
		if(refund_price_apply != refund_price_apply){
			m_alert({
					dialogContent : '退款金额必须填写为数字'
				});
			return;
		}
		if(refund_price_apply > max_price){
			m_alert({
					dialogContent : '退款金额不能大于'+ max_price +'元'
				});
			return;
		}
		if(refund_price_apply <= 0){
			m_alert({
					dialogContent : '退款金额不能等于0元'
				});
			return;
		}

		//上传凭证
		var imgs = $('.img_list img')
			,pics = []
			,selected_opt = selectObj.find('option').not(function(){ return !this.selected });

		//alert(selected_opt.val());

		if(selected_opt.attr('must') && imgs.length == 0 && !common.isLowVersion()){
			m_alert({
					dialogContent : '请上传凭证'
				});
			return;
		}

		for (var i = 0; i < imgs.length; i++) {
			pics.push(imgs.eq(i).attr('asrc'));
		}
		refund_evidence = pics.join(',')

		var data = {
			order_id:$('#order_id').val(),
			mid:$('#mid').val(),
			select_reason:select_reason,
			reason:reason,
			with_goods:is_refund_goods,
			refund_price_apply:refund_price_apply,
			refund_evidence:refund_evidence,
			refund_id:$('#refund_id').val()
			// access_token : Meilishuo.config.access_token
		}

		if(data.refund_id ){
			Url = '/aj/doota/refund_edit';
		}else{
			Url = '/aj/doota/refund_apply';
		}

		$.post( Url , data , function(data, textStatus, xhr) {
			// data = data.data;
			if (data.code != 0) {
				m_alert({
					dialogContent : data.msg
				});
			}else{
				window.location.href = '/app/refund/detail/?refund_id='+data.refund_id;
			}
		},'json').error(function() {
			m_alert({
					dialogContent : '系统错误，请重新提交一下试试'
				});
		});
	})
	if($('#goods_refund_reason').attr('isEdit')=='1'){//edit
		if($('#goods_refund_reason').val()==''){
			$('#goods_refund_reason option:last-child').prop('selected',true);
			$('#goods_refund_reason').next('.refund_other').val($.trim($('#goods_refund_reason option:last-child').attr('svalue'))).show();
		}else{
			$('#goods_refund_reason').next('.refund_other').hide();
		}
	}
	//another edit
	if($('#goods_refund_reason').attr('isEdit')=='2'){
		if($('#goods_refund_reason option[value="'+$('#goods_refund_reason').attr('selectVal')+'"]').length==0){
			$('#goods_refund_reason option[value="-1"]').prop('selected',true);
			$('#goods_refund_reason').next('.refund_other').val($('#goods_refund_reason').attr('selectVal')).show();
		}else{
			$('#goods_refund_reason option[value="'+$('#goods_refund_reason').attr('selectVal')+'"]').prop('selected',true);
			$('#goods_refund_reason').next('.refund_other').hide();		
		}
	}

	if($('#refund_reason').attr('isEdit')=='2'){
		if($('#refund_reason option[value="'+$('#refund_reason').attr('selectVal')+'"]').length==0){
			$('#refund_reason option[value="-1"]').prop('selected',true);
			$('#refund_reason').next('.refund_other').val($('#refund_reason').attr('selectVal')).show();
		}else{
			$('#refund_reason option[value="'+$('#refund_reason').attr('selectVal')+'"]').prop('selected',true);
			$('#refund_reason').next('.refund_other').hide();		
		}
	}

});
