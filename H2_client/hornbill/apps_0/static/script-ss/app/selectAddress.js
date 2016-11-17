fml.define('app/selectAddress' , ['jquery', 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');

	var selectFn = function(formName){
		var form = $('#' + formName)
			, f_pid = form.find('[name=pid]')
			, f_cid = form.find('[name=cid]')
			, f_did = form.find('[name=did]')
			, cid = null
			, did = null

		f_pid.on('change', function(){
			$.get('/aj/settings/address_select', {pid : f_pid.val()}, function(res){
				f_cid.html(shareTmp('address_select_city' , res.data))
				f_did.html(shareTmp('address_select'))

				if(res.data.district[0].did == '0')
					f_did.hide()

				if(cid){
					f_cid.val(list.attr('cid')).change()
					cid = null
				}

						
			}, 'json')
		})
		f_cid.on('change', function(){
			$.get('/aj/settings/address_select', {pid : f_pid.val(), cid : f_cid.val()}, function(res){
				f_did.html(shareTmp('address_select'))

				if(res.data.district[0].did == '0')
					f_did.hide()
				else
					f_did.append(shareTmp('address_select_district' , res.data)).show()
				
				if(did){
					f_did.val(list.attr('did')).change()
					did = null
				}

			}, 'json')
		})
	}
	return selectFn;
});
