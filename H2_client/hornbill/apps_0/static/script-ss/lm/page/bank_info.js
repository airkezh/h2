
fml.define('lm/page/bank_info',['component/serializeObject','component/shareTmp','jquery'],function(require){
	var $ = require('jquery')
		, shareTmp = require('component/shareTmp')
		, f_pid = $('[name=pid]')
		, f_cid = $('[name=cid]')
		, cid = f_cid.attr('data-cid');

	if($.trim($('input[name=account_type]:checked').next('span').text())=='公司账号'){
        $('input[name=id_cards]').attr('value','').parents('tr').hide();
    }
		
	f_pid.on('change', function(forceSetCity){
		$.get('/aj/doota/address_select', {pid : f_pid.val()}, function(res){
			if(f_pid.val() == '0')
				f_cid.html(shareTmp('address_select'))
			else
				f_cid.html(shareTmp('address_select_city' , res.data))

			if(cid){
				f_cid.val(cid).change()
				cid = null
			}
		}, 'json')
	});

	Number(f_pid.val()) && f_pid.trigger('change');

	$('#confirm').on('click',function(){
		var self = $(this);
		if (self.hasClass('gray')) return;
		self.addClass('gray');
		var data = $('form').serializeObject();
		data.pname = $('select[name=pid] option:selected').text();
		data.cname = $('select[name=cid] option:selected').text();
		$.ajax({
			url:'/aj/finace/bank_add',
			data:data,
			dataType:'json',
			type:'post',
			success: function(data){
				if (data.code == 0) {
					alert('保存成功');
					location.href="/finace/withdraw/";
				}else{
					alert(data.msg);
					self.removeClass('gray');
				}
			},
			error: function(){
				alert('系统错误');
				self.removeClass('gray');
			}
		});
	});
	$('.altinfo').click(function(){
		$('#altfrom').show();
		$('#altbox').hide();
	})

	$('#mobile').click(function(){
		$(this).parent().empty().append('绑定成功后请刷新本页面');
	})

	$('input[name=account_type]').click(function(){
        if($.trim($(this).next('span').text())=='公司账号'){
            $('input[name=id_cards]').attr('value','').parents('tr').hide();
        }else{
            $('input[name=id_cards]').attr('value','').parents('tr').show();
        }
    });

});


