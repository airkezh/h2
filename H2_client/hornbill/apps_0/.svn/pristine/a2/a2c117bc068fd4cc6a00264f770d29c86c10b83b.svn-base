fml.define('wap/page/activity/video11' , ['wap/zepto/fastclick', 'wap/app/shareTo',] , function(require , exports){
	var shareTo = require('wap/app/shareTo');
	
	
	if( window.location.search.indexOf("appUrl") <= 0){

		$('.share_btn').on('click', function(){
			
			var params = {
		        'title' : {
		            'default' : '美丽说11.11金装装X指南'
		        },
		        'text' : {
		            'default' : '11.11金装装X指南，带你装X带你飞，快看，飞起来了。'
		        },
		        'pic' : {
		            'default' : 'http://i.meilishuo.net/css/images/wap/activity/may_sale/share11.jpg'
		        },
		        'url' : 'http://m.meilishuo.com/activity/sale/video11/?appUrl=share'
		    };
			shareTo.shareToPengYouQuan(params);
		});
	}else{
		$(".share_btn").on("click",function(){
			$(".wx_share").show();
		})
	}
});