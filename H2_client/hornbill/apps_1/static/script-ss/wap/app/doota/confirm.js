/*common*/
var form = require('wap/ui/form');
var shareTmp = require('component/shareTmp');
var cookie = require('component/iStorage');
form.setSelect()

return function(){

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
			bank_name: bank_name,
			sku_id:$('#sku_id').val()
		};
		var params = location.search.substr(1).split('&');
		for (var i=0; i < params.length; i++) {
			var pair = params[i],
			index = pair.indexOf('='),
			key = pair.substr(0,index),
			val = pair.substr(index+1);
			data[key] = decodeURIComponent(val);
		};
		
		// var r_mark = cookie.getCookie('r_mark')
		// r_mark && (data['goods_pid'] += ('.' + r_mark));

		data.r = $('[name="order_init_r"]').val()

		var form = $('#confirm_form').empty();
		
		for(var i in data){
			form.append('<input type="hidden" name="'+i+'" value="'+data[i]+'"/>');
		}
		form.submit();
		window['__callOnFail'] = function(){
			window.location.reload()
		}
	});
}
