fml.define('wap/app/alert' , ['wap/app/dialog'] , function(require,exports){
	return function(opts){
		if(document.querySelector(':focus')){
			document.querySelector(':focus').blur();
		} 
		var defaults = {
			dialogContent : '',
			dialogTitle : '',
			maskId : "maskLayer",
			dialogId : 'dialogAlert',
			onClose : function(){}
		}
		var opts = $.extend({}, defaults, opts);
		var maskHeight = ($(document).height() > $(window).height() ? $(document).height() : $(window).height());
		$.fn.dialog(opts);
		$('#dialogContent').after($('.closeDialog'));
		$('#dialogContent').css({'text-align' : 'center'});
		$('#'+opts.maskId).css({
			position : 'absolute',
			top : 0,
			left : 0,
			backgroundColor : 'black',
			opacity : '0.7',
			zIndex : 10,
			height : maskHeight
		});
		$('.dialogTitle').css({
			marginBottom: '10px',
			fontWeight: '900'
		});
		$('#'+opts.dialogId).css({
			position: 'absolute',
			zIndex : 11,
			padding : '20px 10px',
			backgroundColor : 'white',
			'border-radius' : '3px',
			'-webkit-border-radius' : '3px'
		});
		$('.closeDialog')
			.css({
				marginLeft : 'auto',
				marginRight : 'auto',
				textAlign : 'center',
				display : 'block',
				marginTop : '30px',
				padding : '10px',
				backgroundColor : '#f69',
				color : 'white',
				width : '60px',
				paddingLeft : '25px',
				paddingRight : '25px',
				borderRadius : '4px'
			})
			.html('确 定')


		$('#'+opts.dialogId).css({
			left : ($(window).width() - $('#'+opts.dialogId).width())/2,
			top : $(window).scrollTop() + ($(window).height() - $('#'+opts.dialogId).height())/2
		});

		$(window).on('resize',function(){
			$('#'+opts.dialogId).css({
				left : ($(window).width() - $('#'+opts.dialogId).width())/2,
				top : $(window).scrollTop() + ($(window).height() - $('#'+opts.dialogId).height())/2
			});
		})


	}
});
