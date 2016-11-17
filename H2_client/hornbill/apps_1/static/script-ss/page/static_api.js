//头部用户信息拉取
fml.use(['jquery','component/shareTmp'],function(){
	var $ = this.jquery;
	var shareTmp = this.shareTmp;

	function genHtml(data){
		var cartnum = +$.trim($('.mycart .num_bgc').text()) || 0;
		data.cartnum = cartnum;
		
		return shareTmp("loginNav", data);
	}

	//静态化页面传页面参数，方便后端统计标示
	var url = '/aj/getUserInfo/' + location.search;
	
	var config = Meilishuo.config;

	$.get(url, function(data){
		if(data && data.user_id){
			$('.menu_leo').html(genHtml(data));
			config.user_id = data.user_id;
		}
		config.login_state = 1;
	},'json');
	
});

fml.define('page/static_api',[],function(require, exports){});
