fml.define('wap/app/shareTo3', ['wap/zepto'], function(require, exports) {
	var share_ico = $('#share_ico');
	share_ico.on('click', 'a', function() {
		share_url = $(this).attr('share_url')
		window.location.href = share_url;
	})
	share_ico.on('click', '#shareBtn', function() {
		$('#masking').hide();
		$('.starBox').hide();
	})
	$('#masking').click(function() {
		$(this).hide();
		$('.starBox').hide();
	});
});