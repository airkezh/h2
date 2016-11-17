fml.define('app/exo/video',['jquery'],function(require,exports){
	var $ = require('jquery');
	exports.play = function(src,width,height,platform){
		if($('#video iframe').length == 0){
			$('#video').append('<iframe frameborder="0"></iframe>');
		}
		src = src.indexOf('http:\/\/') == -1 ? 'http://'+src : src;
		$('#video iframe').attr('src',src);
		$('#video,#video iframe').css({
			width:width+'px',
			height:height+'px',
			left:($(window).width() - width)/2 + 'px'
		});
		$('#video,#masker').show();
		$(document).on('keyup',function(e){
			if(e.keyCode == 27){	//esc
				stop();
			}
		});
		function stop(){
			$('#video,#masker').hide();
			$('#video iframe').remove();
		}
		$('#video #close').click(function(){
			stop();
		});
	};
});
