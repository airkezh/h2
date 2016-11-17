fml.define('wap/app/shareTo2' , ['wap/zepto'], function(require , exports){
	var shareTo2 = function() {
		var share_url = $('#share_ico .active').attr('share_url')
		var os = Meilishuo.config.os

		$('#share_ico a').bind('click', function(){
			$('#share_ico a.active').removeClass('active')
			$(this).addClass('active')
			share_url = $(this).attr('share_url')
		});
		$('#shareBtn').on('click', function(){
			//console.log(share_url)
			window.location.href =  share_url  
			//window.location.href = ( os.iphone || os.android ||os.ipad) ? share_url  : 'http://www.meilishuo.com/biz/welfare/daily/?banner_id=06ebef12b536e10c1c6843ef8a40c26e'
		})
	};
	exports.shareTo2 = shareTo2;
});
