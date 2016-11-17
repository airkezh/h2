/*common*/	

var signWX = require('wx/sign'), 
	shareWX = require('wx/share');

	signWX();
	shareWX.bind({
		'desc':'快来发掘你的时尚基因，和鹿晗一起开启最时髦的热力summer吧！',
		'imgUrl':'http://d01.res.meilishuo.net/pic/_o/ed/d4/eaa1c2ec43ec14714f2ff6d9fac7_100_100.cg.jpg',
		'title': '暑假约男神 霸占时尚圈',
		'link': 'http://m.meilishuo.com/activity/summerFuide/home/'
	});

	/*登陆成功后的回掉函数*/
	window.MLS = {
	    didLogin : function() {
	        // 成功登录，跳转到下一步
	        window.location.reload();
	    }
	};

	if(fml.vars.isLogin == 0 && navigator.userAgent.indexOf('MicroMessenger') == -1) {
	    window.location.href = "meilishuo://login.meilishuo/";
	    return;
	}
	
	var $mask = $('.mask')
		, $rule = $('.rules-txt');
	
	$('.btn-rule').on('click', function(){
		$mask.show();
		$rule.show();
	});
	$mask.on('click', function(){
		$rule.hide();
		$(this).hide();
	});