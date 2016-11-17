/*common*/
require('wap/zepto')
require('wap/zepto/fastclick')

function picCodeImgOnClick(event) {
	event.preventDefault();
	var _this = $(this)
	_this.off('click')
	setTimeout(function(){
		_this.on('click', picCodeImgOnClick)
	},1000)
	var src = Meilishuo.config.captcha_url + 'Captcha/Captcha?token=9adfc893s&session='+Math.random()+'&type='+_this.data('type')
	_this.attr('src',src)
}
$('#pic_code_img').on('click', picCodeImgOnClick).trigger('click')

$('.send_sms').on('click', sendSms);
function sendSms(event) {
	event.preventDefault();
	var _this = $(this)
	_this.off('click').addClass('on_reciprocal')

	var reciprocalNum = 60
	count()
	function count(){
		if(reciprocalNum>0){
			reciprocalNum--
			_this.html(reciprocalNum)
			setTimeout(function(){
				count()
			},1000)
		} else {
			_this.html('发送短信').on('click', sendSms).removeClass('on_reciprocal')
		}
	}
	var url = '/aj/risk_control/send_sms'
	$.get(url, {
		'smstype' : 'active_sm_captcha'
	}, function(data) {
		$('.error_tip').html(data.message || '')
	}, 'json')
}

$('#risk_form').on('submit', function(event) {
	event.preventDefault();
	$('.error_tip').html('')
	var valiSucc = true
	$(this).find('input').each(function(index, el) {
		if(!$(this).val().trim()){
			$(this).focus()
			return valiSucc = false
		}
	});
	if(!valiSucc) return;
	var url = $(this).attr('action')
	$.get(url, $(this).serialize(), function(data) {
		$('.error_tip').html(data.message || '')
		if(data.code==0){
			location.reload()
		}
	},'json');
});
