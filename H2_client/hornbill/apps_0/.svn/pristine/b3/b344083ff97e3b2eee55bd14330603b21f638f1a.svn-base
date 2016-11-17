fml.define('wap/page/sq/address_normal', ['wap/zepto/touch', 'wap/component/urlHandle', 'wap/ui/alert', 'wap/component/shareTmp', 'component/callApi'], function(require){

	var urlHandle = require('wap/component/urlHandle')
		,Alert = require('wap/ui/alert')
		,shareTmp = require('component/shareTmp')
		,api = require('component/callApi')
	
	var readyDo = function(){
		var normal_num = $('.address_list_normal').length
		if(normal_num == 0){
			$('.normal_add').next().addClass('address_list_normal')
		}
		var list_length = $('.del').length
		if(list_length == 0){
			var url_parms = fml.vars.parms || ''
			url_parms['edit_type'] = 'add';
			var query = urlHandle.http_build_query(url_parms)
			var a = new Alert({
				content : '您还没有收货地址～快来加一个吧！'
				, onSure : function(){
					window.location.href = '/sq/address_edit?' + query
				}
			});
			return ;
		}
	}

	api.read({'url':'/address/addr_list'},{}, function(data){
		var tmp = shareTmp('addrInfoTmp', {'addrInfo' : data.addrInfo});
		$('#textAreaList').append(tmp);
		readyDo();
	})
	$('body').on('tap', '.normal_now' , function(){
		var addr_id = $(this).attr('id')
		var $ele = $(this)
		api.read({'url':'/address/addr_default'},{'addr_id' : addr_id}, function(data){
			if(data.code == 0){
				$('.normal_add').addClass('normal_now').removeClass('normal_add').html('设为默认')
				$ele.addClass('normal_add').removeClass('normal_now').html('默认地址')
			}
		})
	})
	$('body').on('tap', '.user_info' , function(){
		var url_parms = fml.vars.parms
		var select_addr_id = $(this).prev().attr('id')
		url_parms['addr_id'] = select_addr_id
		var query = urlHandle.http_build_query(url_parms)
		$('.address_list_normal').removeClass('address_list_normal')
		$(this).addClass('address_list_normal')
		window.location.href = '/sq/orderconfirm?' + query
	})
	$('body').on('tap', '.save_text' , function(){
		var url_parms = fml.vars.parms
		url_parms['edit_type'] = 'add'
		var query = urlHandle.http_build_query(url_parms)
		window.location.href = '/sq/address_edit?' + query
	})
	$('body').on('tap', '.del' , function(){
		var addr_id = $(this).attr('da')
		api.write({'url':'/address/addr_delete'},{'addr_id' : addr_id}, function(data){
			var a = new Alert({
				content : '您的收货地址删除成功'
				, onSure : function(){
					window.location.reload(true)
				}
			});
		})
	})
	$('body').on('tap', '.edit' , function(){
		var user_add_info = fml.vars.parms
		user_add_info['addr_id'] = $(this).attr('da')
		user_add_info['user_name'] = $(this).prev().find('.user_name').text()
		user_add_info['user_tel'] = $(this).prev().find('.user_tel').text()
		user_add_info['user_add'] = $(this).prev().find('.user_add').text()
		user_add_info['user_str'] = $(this).attr('str')
		user_add_info['_pid'] = $(this).attr('pid')
		user_add_info['_cid'] = $(this).attr('cid')
		user_add_info['_did'] = $(this).attr('did')
		user_add_info['edit_type'] = 'edit'
		var query = urlHandle.http_build_query(user_add_info)
		window.location.href = '/sq/address_edit/?' + query
	})
})