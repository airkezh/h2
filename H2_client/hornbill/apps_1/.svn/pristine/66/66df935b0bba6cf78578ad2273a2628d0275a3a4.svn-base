/*common*/
require('wap/zepto/fastclick')
require('wap/zepto/scroll');

if (fml.vars.ret == -1) {
	alert('亲，您还没有登录哦')
	return;
};

$('.share_btn').on('click', function() {
	$('#mask').show();
	$('body').scrollTo({
		endY: 0,
		duration: 0,
		callback : function(){
			$('body,html').css({
				'height' : '100%'
				,'overflow' : 'hidden'
			})
		}
	})
});

