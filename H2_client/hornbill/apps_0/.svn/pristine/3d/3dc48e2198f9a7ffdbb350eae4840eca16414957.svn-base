fml.define('app/checkLogin' , ['jquery','app/login','ui/alert'] , function(require , exports){
	var $ = require('jquery');
	var login = require('app/login');   
	return function (options){
		var opts = options || {};
		if(Meilishuo.config.user_id == 0){
			if(Meilishuo.config.login_state === 0) return false;

			login.showLoginWin(opts);
			return false;
		}
		if(Meilishuo.config.is_actived == 'taobao'){
			window.location.href = '/settings/personalUpdate';
			return false;
		}
		//值为6表示用户修改邮箱后，未激活邮箱
		if(Meilishuo.config.is_actived == 6){
			window.location.href = '/settings/emailSend';
			return false;
		}
		if(Meilishuo.config.is_actived == 2) { 
			window.location.href = Meilishuo.config.server_url + 'user/register/success';
			return false;
		}
		if(!Meilishuo.config.forSale &&  Meilishuo.config.level == 5 ){
//			alert("您违反了美丽说社区规定，故对您的账号进行禁言处理。\r\n为了您和其他用户更好的使用美丽说，请不要继续发布违规信息，谢谢您的配合！");
			var alert = require('ui/alert');
			var day = Meilishuo.config.block_remain;
			var shupT = day > 0 ? '处理，'+day+'天后自动解禁' : '处理';
			var h =  '<p class="l20_f"><span style="margin-left: 24px;">您发的内容包含违规信息（涉及垃圾广告、政治、色情、病毒等内容），违反了<a class="red_f" target="_blank" href="/aboutus/direct">美丽说社区指导原则</a>，故对您的账号进行禁言'+shupT+'。为了您和其他用户更好的使用美丽说，请不要继续发布违规信息。谢谢您的配合！如有任何问题，欢迎<a class="red_f" target="_blank" href="/help/feedback?feedTag=2">反馈给我们</a>。</span></p>';
			var alertTip = new alert({
				width: 400,
				content: h,
				isOverflow: false,
				discover: true,
				title: '禁言提示'
			});
			return false;
		}
		return true; 
	}
});
