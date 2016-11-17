fml.define('app/audio' , ['plus/jplayer'] , function(require , exports){
	return function(_length){
		var $jps = $('.jp-jplayer')
		, len = $jps.length
		, i = 0
		for(i = 0;i<len;i++){
			setJPlayer($($jps[i]))
		}
		var stopAll = function(){
			$jps.jPlayer('stop');
		}
		$('.audio_box').click(function(evt){
			var start = $('.control_btn:visible span' ,this)
			start.trigger('click')
			evt.stopPropagation()
			})
		function setJPlayer($jp){
			var cssSelect = $jp.siblings('.audio_control').attr('id')
			, mp3 = $jp.attr('audio_url')
			$jp.jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						mp3: mp3
					});
				},
				play: function() { // To avoid multiple jPlayers playing together.
					$(this).jPlayer("pauseOthers");
				},
				swfPath: "http://www.jplayer.org/2.1.0/js",
				supplied: "mp3",
				wmode: "window",
				smoothPlayBar: true,
				cssSelectorAncestor: '#' + cssSelect,
				keyEnabled: true
			});
		};
		window.onbeforeunload = stopAll
		$('a').on('click', stopAll)

	}
});
