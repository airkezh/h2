fml.define('lm/page/autoPromote' , ['jquery'] , function(require, exports){
	var $ = require('jquery');
	 $('.Question').hover(function() {
		$(this).next('p').show();
	}, function() {
       $(this).next('p').hide();
	});

	/*显示与select对应*/
	$('.catalog_goods').change(function(){
		if($(this).val() == 1){
			$(this).parents('dl').next('dl').hide();
			return false;
		}
		if($(this).val() == 2){
			$(this).parents('dl').next('dl').show().find('[urltype=image]').show().siblings('[urlType=text]').hide();
			return false;
		}
		if($(this).val() == 3){
			$(this).parents('dl').next('dl').show().find('[urltype=text]').show().siblings('[urlType=image]').hide();
			return false;
		}
	});

   
	$('.autoSub').click(function(){
		var _this=$(this) 
			,_val=$('.catalog_goods').val()
			,_form=$(this).parents('form')
			,data=_form.find('dd:visible input[name=target_url] ,dd:visible select , dd:visible input[name=label]').serialize();
			data=data+"&content="+encodeURIComponent(_form.find('dd:visible input.aimUrl , dd:visible input.fburl').eq(1).val());

		$.ajax({
			type: 'POST'
			,url:'/aj/creatLink/link'
			,dataType:'json'
			,data:data
			,success:function(param){
				if(param.code){
					alert(param.msg);
				}else{
					_this.parents('dl').find('textarea').val(param.pageData);
					$('textarea').val(param.pageData).select().focus();
					$('.preview').html(param.pageData);
				}
			},
			error: function(){
				alert('系统错误');
			}
		})
		
	})
	
	// $('.spread').click(function(){
	// 	$(this).parents('dl').find('textarea').select();
	// 	document.execCommand("Copy",false,null);
		
	// })

});