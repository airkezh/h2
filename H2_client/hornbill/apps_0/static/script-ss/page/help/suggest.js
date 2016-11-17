fml.define('page/help/suggest', ['jquery', 'ui/dialog', 'component/shareTmp', 'component/dialog'], function (require, exports) {
    var $ = require('jquery')
    	, Dialog = require('ui/dialog')
    	, ShareTmp = require('component/shareTmp')
    	, componentDialog = require('component/dialog');

   function validateEmail(itemObj){
		var re = /\S+@\S+\.\S+/;
		return re.test(itemObj.value);
	}

	function checkmail(obj){
		//console.log(Meilishuo.config.user_id);
		if (Meilishuo.config.user_id > 0) return true;
		if(!validateEmail(obj)){
			$('.advice-mail-area span').show();
			return false;
		}else{
			$('.advice-mail-area span').hide();
			return true;
		}
	}
	$('#consult').on('click', function(){
		window.open('http://im.meilishuo.com/www/buyer_platform_im/');
	});
   $('.suggest-btn').on('click', function(){
    	var html = ShareTmp('adviceDialog');
    	var close = new Dialog({
    		title : '',
    		width : 460,
    		content : html
    	})

    	$('.advice-mail , .advice-cont').focus(function(){
			if($(this).val() == this.defaultValue){
				$(this).val("");
			}
		}).blur(function(){
			if($(this).val() == ""){
				$(this).val(this.defaultValue);
			}
		})

		$('.advice-mail').blur(function(){
			if($(this).val() == '美丽说绝对不会泄露您的隐私') return;
			checkmail(this);
		});

		$('.subAdvice-btn').on('click', function(){
			var fb_con_len = $('.advice-cont').val().length;
			var err = $('.advice-cont-area .error_msg');

			if (!checkmail($('.advice-mail')[0])) return;
			if ($.trim($('.advice-cont').val()) == '' || $.trim($('.advice-cont').val()) == '在这里，尽情的吐槽吧...'){
				err.html('意见内容不能为空哦！').show();
				return;
			}else if(fb_con_len < 5 || fb_con_len > 1000){
				err.html('请输入5~1000个字哦！').show();
				return;
			}else{
				err.hide();	
			}

			var aj_para = {
				'htype': $('[name = type]').val(),
				'content': $('.advice-cont').val(),
				'email': $('.advice-mail').val()
			};

			$.get('/aj/feedback/', aj_para ,function(res){
				if (res == '0') {
					var h = '<div style="padding:20px 40px 24px; text-align:center;"><p class="f16_f"><span class="ms_ico">成功</span></p><p style="font-size:14px; line-height:20px; text-align:center; margin-top:8px;">您的反馈我们会逐字细看，<br />并在最快的时间内给您答复！</p><div class="fb_btn"><span class="btn fb_sure" style="display:inline-block;">确定</span></div></div>';
					componentDialog.meiliDialog({dialogTitle : "" , dialogContent : $(h) , dialogWidth : 340 });			
					$('#dialogTitle').css('background-color', '#fff');
					$('.fb_sure').click(function(){
						$('#closeDialog').trigger('click');
					})
					$('#closeDialog').click(function(){
						$('.advice-cont').val('');	
					})
				}else if(res == 3){
					$('.advice-mail-area .error_msg').show();	
				}
			},'json');

		});
   });
})
