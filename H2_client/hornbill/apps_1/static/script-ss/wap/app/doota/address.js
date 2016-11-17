fml.define('wap/app/doota/address' , ['wap/zepto/touch', 'wap/ui/filterSelecter', 'component/validate', 'component/shareTmp'] , function(require , exports){
	var validate = require('component/validate');
	var shareTmp = require('component/shareTmp');
	var filterSelect = require('wap/ui/filterSelecter');

	var host = '';
	var formName = 'addressForm'
		, form = $('#' + formName)
		, f_nickname = form.find('[name=nickname]')
		, f_phone = form.find('[name=phone]')
		, f_pid = form.find('[name=pid]')
		, f_cid = form.find('[name=cid]')
		, f_did = form.find('[name=did]')
		, f_street = form.find('[name=street]')
		, f_postcode = form.find('[name=postcode]')
		, f_is_default = form.find('[name=is_default]')
		, cid = null
		, did = null
		, list
		, is_default
		, addressErrorMessage = $('.addressErrorMessage')
	var formVa

	var formFn = function(cb){
		cb = cb || function(){
			window.location.reload();
		}
		//表单提交
		var submitAddress = function(){
			var $pid = $('[name=pid]')
				, $cid = $('[name=cid]')
				, $did = $('[name=did]')
			var data = {
				name : $('[name=nickname]').val()
				, phone : $('[name=phone]').val()
				, pid : $pid.val()
				, cid : $cid.val()
				, did : $did.val()
				, street : $('[name=street]').val()
				, postcode : $('[name=postcode]').val()
				, type : 'add'
				, set_default : f_is_default.prop('checked')?1:0
				, pname: filterSelect($('[name=pid]')).html()
				, dname: filterSelect($('[name=did]')).html()
				, cname: filterSelect($('[name=cid]')).html()
			}
			, addr_id = f_is_default.val()

			if(data.pid == '0'){
				addressErrorMessage.html('你还没有选择省份哦。')
				return;
			}
				
			if($cid.children().length > 1 && data.cid == '0'){
				addressErrorMessage.html('你还没有选择城市哦。')
				return;
			}

			if($did.children().length > 1 && data.did == '0'){
				addressErrorMessage.html('你还没有选择地区哦。')
				return;
			}
				

			if(addr_id){
				data.addr_id = addr_id
				data.type = 'edit'
			}

			$.post(host+'/address_add', data, function(res){
				if(res.code == '0'){
					cb(res.detail);
				}else{
					alert(res.msg)
				}
			} ,'json').error(function() {
				/* Act on the event */
			});
		};		
		//表单操作
		var validateRules = {
			'nickname' : { 'req=收货人姓名' : '你还没有填写收货人姓名哦。' }
			, 'phone' : { 'req=联系电话' : '你还没有填写联系电话哦。', 'mobile' : '联系电话格式不正确。'}
			, 'street' : {'req=街道地址' : '你还没有填写街道地址哦。'}
			, 'postcode' : {'req=邮政编码' : '你还没有填写邮政编码哦。', 'postcode' : '邮政编码格式不正确。'}
		},
		showStyle = {
			'showmsgbyone=addressBtn.addressErrorMessage' : submitAddress
		},
		opts = {
			'success' : 'strong=good',
			'error' : 'strong=bad',
			'isExist' : {
				'nickname' : function(cbk){
					var data = {
						type : 'name',
						data : f_nickname.val()
					};
					$.get(host+'/address_validate' , data , function(res){
						if(res.code != '0') cbk(res.msg);
						else cbk('');
					} ,'json');
				},
				'phone' : function(cbk){
					var data = {
						type : 'phone',
						data : f_phone.val()
					};
					$.get(host+'/address_validate' , data , function(res){
						if(res.code != '0') cbk(res.msg);
						else cbk('');
					} ,'json');
				},
				'postcode' : function(cbk){
					var data = {
						type : 'postcode',
						data : f_postcode.val()
					};
					$.get(host+'/address_validate' , data , function(res){
						if(res.code != '0') cbk(res.msg);
						else cbk('');
					} ,'json');
				}
			}
		};
		formVa = validate.validate(formName, validateRules, showStyle, opts);
	}
	var selectFn = function(){
		f_pid.on('change', function(){
			$.get(host+'/address_select', {pid : f_pid.val()}, function(res){
				if(f_pid.val() == '0')
					f_cid.html(shareTmp('address_select'))
				else
					f_cid.html(shareTmp('address_select_city' , res.data))

				f_did.html(shareTmp('address_select'))

				if(res.data.district[0].did == '0')
					f_did.hide().prev().hide()

				if(cid){
					f_cid.val(list.attr('cid')).change()
					cid = null
				}

						
			}, 'json')
		})
		f_cid.on('change', function(){
			$.get(host+'/address_select', {pid : f_pid.val(), cid : f_cid.val()}, function(res){
				f_did.html(shareTmp('address_select'))

				if(res.data.district[0].did == '0')
					f_did.hide().prev().hide()
				else
					f_did.append(shareTmp('address_select_district' , res.data)).show().prev().show()
				
				if(did){
					f_did.val(list.attr('did')).change()
					did = null
				}

			}, 'json')
		})
	}
	return function (cb,h){
		host = h || '/aj/doota';
		formFn(cb);
		selectFn();
		return {"formVa":formVa}
	}
});
