fml.define('m/app/doota/confirm' , ['m/component/shareTmp','m/zepto/touch', 'm/ui/form','m/component/callApi'] , function(require){
	var form = require('m/ui/form');
	var shareTmp = require('m/component/shareTmp')
	,callApi = require('m/component/callApi');
	
	return function(){
		var params = location.search.substr(1);
		params = params.split('&');
		var p = {};
		$(params).each(function(i,item){
			var index = item.indexOf('=');
			var key = item.substr(0,index);
			var value = item.substr(index+1);
			p[key] = decodeURIComponent(value);
		});

		callApi.read({'url':'/address/addr_list'},{},function(data){
			$('.address_add').html(shareTmp("addressInfo" , data));
		});
		callApi.read({'url':'/order/init'},p,function(data1){
			$('.order_add').html(shareTmp("orderInfo" , data1));
			$('.order_confirm').html(shareTmp("order_confirmInfo" , data1));
			
			$('#charge').on('tap', function(){
				var fromCart = location.search.indexOf('goods_id') === -1;
				var addr_id = $('.addrShow .adrl_list').attr('addr_id');
				var bankItem = $('[name=pay_type]:checked').next('select')
				var bank_id = bankItem.val();
				var bank_name = bankItem.children().filter('[value=' + bank_id + ']').attr('data-name');
				var price = [];
				var comments = [];
				var map_id = '' 

				if (!addr_id) {
					alert('请告诉我们您的收货地址');
					return ;
				};
				if (!bank_id) {
					alert('请告诉我们您的购买方式');
					return ;
				};
				$('.comment').each(function(i,comment){
					var val = $(comment).val();
					if (val.replace(/\s\|/g,'') === '') return;
					
					var id= comment.id.split('_')[1],
					val = val.replace(/\|/g,'');
					fromCart ? comments.push(id+'_'+val) : comments.push(val);
				});
				$('.order_goods_list li').each(function(i,goods){
					var p = $(goods).find('.u_price').text();
					if (!p) return;
					
					var id = this.id.split('_')[1];
					fromCart ? price.push([id,p].join('_')) : price.push(p);
				});
				data = {
					source: '5-0.0.1',
					pay_channel: bank_id,
					addr_id: addr_id,
					comment: comments.join('|'),
					price: price.join('|'),
					express_company: 1,
					map_id: map_id,
					bank_name: bank_name
				};
				var params = location.search.substr(1).split('&');
				for (var i=0; i < params.length; i++) {
					var pair = params[i],
					index = pair.indexOf('='),
					key = pair.substr(0,index),
					val = pair.substr(index+1);
					data[key] = decodeURIComponent(val);
				};
				var form = $('#confirm_form').empty();
				
				for(var i in data){
					form.append('<input type="hidden" name="'+i+'" value="'+data[i]+'"/>');
				}
				form.submit();
				window['__callOnFail'] = function(){
					window.location.reload()
				}
			});
		});
		callApi.read({'url':'/bank/bank_list'},p,function(data2){
			$('.order_bank').html(shareTmp("order_bankInfo" , data2));
			form.setSelect()
		});
	}
});
