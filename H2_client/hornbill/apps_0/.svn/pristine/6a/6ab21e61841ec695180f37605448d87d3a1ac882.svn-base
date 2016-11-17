fml.define('order_app/common/app/loading' , ['order_app/common/zepto','order_app/common/zepto/touch'] , function(require,exports){
	/*
		样式dootablock.import的.loading
	*/
	var dialogId = 'progressLoading'
		, maskId = 'progressLayer'
		, noscroll = function(event){event.preventDefault();}
	exports.start = function(){
		if(document.querySelector(':focus')){
			document.querySelector(':focus').blur();
		} 
		if($('#'+maskId).length) return;

		$(window).off('touchmove' , noscroll);
		$('body').append($('<div id="'+maskId+'"></div>'));
		$('body').append($('<div id="'+dialogId+'"></div>'));

		var $dialog = $('#'+dialogId)
			, $mask = $('#'+maskId)
		$mask.css({
			width : $(window).width() > $(document).width() ? $(window).width() : $(document).width(),
			height : $(document).height() > $(window).height() ? $(document).height() : $(window).height()
		});
		$dialog.html('<div class="upload_loading"><div><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div><div class="upload_txt">图片上传中</div>')
			.css({
				left : ($(window).width() - $dialog.width())/2,
				top : $(window).scrollTop() + ($(window).height() - $dialog.height())*0.5
			});

		$(window).on('resize',function(){
			$dialog.css({
				left : ($(window).width() - $dialog.width())/2,
				top : $(window).scrollTop() + ($(window).height() - $dialog.height())*0.5
			});
		})
	}
	exports.stop = function(){
		$('#'+maskId).remove();
		$('#'+dialogId).remove();
		$(window).off('touchmove' , noscroll);
	}
});