fml.define('page/feedback' , ['jquery', 'component/dialog'] , function(require,exports){
	var $ = require('jquery');
	var dialog = require('component/dialog');

	function validateEmail(itemObj){
		var re = /\S+@\S+\.\S+/;
		return re.test(itemObj.value);
	}

	var $mymail = $('#mymail');
	var $fb_mail = $('.fb_mail span');

	function checkmail(obj){
		if (Meilishuo.config.user_id > 0) return true;
		if(!validateEmail(obj)){
			$fb_mail.show();
			return false;
		}else{
			$fb_mail.hide();
			return true;
		}
	}


	$('#fb_content , .fb_mail input').focus(function(){
		if($(this).val() == this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val() == ""){
			$(this).val(this.defaultValue);
		}
	})

	$mymail.blur(function(){
		if($(this).val() == '美丽说绝对不会泄露您的隐私') return;
		checkmail(this);
	});

	$('#fb_sub').click(function(){
		var fb_con_len = $('#fb_content').val().length;
		var err = $('.fb_con .error_msg');
		if (!checkmail($mymail[0])) return;
		if ($('#fb_content').val() == ''){
			err.html('意见内容不能为空哦！').show();
			return;
		}else if(fb_con_len < 5 || fb_con_len > 1000){
			err.html('请输入5~1000个字哦！').show();
			return;
		}else{
			err.hide();	
		}
		var aj_para = {
			'htype':$('#htype').val(),
			'content':$('#fb_content').val(),
			'email':$mymail.val()
		};
	
		if (location.href.indexOf('feed_id') > -1){
			var a = location.href.split('?');
			var b = a[1].split('&');
			
				for(var i=0;i<b.length;i++){
					if(b[i].indexOf('feed_id') > -1){
						var feed_id = b[i].split('=')[1];
						aj_para['parent'] = feed_id;
						break;
					}	
				}	
		}
		$.get('/aj/feedback/', aj_para ,function(res){
			if (res == '0') {
				var h = '<div style="padding:20px 40px 24px; text-align:center;"><p class="f16_f"><span class="ms_ico">成功</span></p><p style="font-size:14px; line-height:20px; text-align:center; margin-top:8px;">您的反馈我们会逐字细看，<br />并在最快的时间内给您答复！</p><div class="fb_btn"><span class="btn fb_sure" style="display:inline-block;">确定</span></div></div>';
				dialog.meiliDialog({dialogTitle : "美丽提示" , dialogContent : $(h) , dialogWidth : 340 });			
				$('.fb_sure').click(function(){
					$('#closeDialog').trigger('click');
					$('#fb_content').val('');
				})
				$('#closeDialog').click(function(){
					$('#fb_content').val('');	
				})
			}else if(res == 3){
				$fb_mail.show();	
			}
		},'json');	
	})


    function toggleAnswer(el) {
        var $el = el.find('a');
        if($el.hasClass('m2')) {
            $el.html('﹀').removeClass('m2').end().next('.que').hide();
        } else {
            $el.html('︿').addClass('m2').end().next('.que').show();
        }
    }

    /**
     * url 携带 hash
     * 『支付帮助』中会有锚点
     */
    var hash  = location.hash,
        match,
        rhash = /#(.+)/;

    if(hash && (match = hash.match(rhash))) {
        var el = $('[name=' + match[1] + ']').parents('li').find('.ask');
        el.length && toggleAnswer(el);
    }

    $('#question-list').on('click', '.ask', function() {
        toggleAnswer($(this));
    })
});
