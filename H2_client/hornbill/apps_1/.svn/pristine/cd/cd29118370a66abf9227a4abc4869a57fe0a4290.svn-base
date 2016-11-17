fml.define('wap/page/sq/address_edit', ['wap/zepto/touch', 'component/regString', 'wap/ui/alert', 'wap/component/urlHandle'], function(require){
	var regString = require('component/regString')
		, Alert = require('wap/ui/alert')
		, urlHandle = require('wap/component/urlHandle')
	var pid = ''
		,cid = ''
		,did = ''
	if(fml.vars.addr_info.type != 'edit'){
		$('.pid option').first().attr('selected','selected')
		$('.did').html('<option value ="select"></option>').attr('disabled', true)
		$('.cid').html('<option value ="select"></option>').attr('disabled', true)
	}
	pid = $('.pid').val()
	cid = $('.cid').val()
	did = $('.did').val()
	$('#hidden').focus()
	$('.pid').live('change', function(){
		pid = $(this).val()
		if(pid == 'select'){
			$('.did').html('<option value ="select"></option>').attr('disabled', true)
			$('.cid').html('<option value ="select"></option>').attr('disabled', true)
			return
		}
		$('.did').html('<option value ="select"></option>').attr('disabled', true)
		$('.cid').html('<option value ="select"></option>').attr('disabled', true)
		$.get('/aj/sq/address_list', { pid : pid}, function(data){
			var city_list = data.data.city
			var html = '<option value ="select">请选择城市</option>'
			city_list.map(function(data){
				html += "<option value=" + data.cid + ">" + data.city + "</option>"
			})
			$('.cid').html(html).removeAttr('disabled')
		}, 'json')
	})
	$('.cid').live('change', function(){
		cid = $(this).val()
		if(cid == 'select'){
			$('.did').html('<option value ="select"></option>').attr('disabled', true)
			return
		}
		$('.did').html('<option value ="select"></option>').attr('disabled', true)
		$.get('/aj/sq/address_list', {pid : pid , cid : cid}, function(data){
			var district_list = data.data.district
			var html = '<option value ="select">请选择地区</option>'
			district_list.map(function(data){
				html += "<option value=" + data.did + ">" + data.district + "</option>"
			})
			$('.did').html(html).removeAttr('disabled')
		}, 'json')
	})
	$('.did').live('change', function(){
		did= $(this).val()
	})

	var tap_times = false;

	$('.save_text').on('tap', function(){
		if(tap_times){
			return;
		}
		tap_times = true;

		var a = document.activeElement
		a.blur()
		
		var name = $('.user_name').val()
			,phone = $('.user_tel').val()
			,street = $('.user_add').val()
			,set_default = 1
		if(street){
			if(!regString.WidthCheck(street, 140)){
				var a = new Alert({
					content : '街道地址超过了140字'
					, onSure : function(){
					}
				});
				tap_times = false;
				return ;
			}
		}
		var parms = {
			'name' : name
			,'phone' : phone
			,'street' : street
			,'set_default' : set_default
			,'pid' : pid
			,'cid' : cid
			,'did' : did
			,'type' : 'add'
		}
		if(fml.vars.addr_info.id){
			parms['addr_id'] = fml.vars.addr_info.id
		}
		if(fml.vars.addr_info.type){
			parms['type'] = fml.vars.addr_info.type
		}
		$.post('/aj/sq/address_add', parms, function(data){
			if(data.code != 0){
				var a = new Alert({
					content : data.msg
					, onSure : function(){
					}
				});
				tap_times = false;
				return ;
			}else if(data.code == 0){
				fml.vars.parms['addr_id'] = data.addr_id
				var query = urlHandle.http_build_query(fml.vars.parms)
				var b = new Alert({
					content : '地址保存成功'
					, onSure : function(){
						window.location.href = '/sq/orderconfirm?' + query
					}
				});
			}
		}, 'json')

	})
})