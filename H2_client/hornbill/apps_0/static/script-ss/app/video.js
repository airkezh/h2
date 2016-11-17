fml.define('app/video' , ['jquery' , 'component/jplayer'] , function(require , exports){
	var $ = require('jquery'),
		jplayer = require('jplayer');

	function video (videoData, num){
		var videoType = '';
		var source = videoData.source;
		var videoWrap = $('#jquery_jplayer_' + num);
		for(sourceAttr in source){
			if(sourceAttr !== 'poster'){
				videoType += sourceAttr + ',';
			}
		}
		videoType = videoType.slice(0, -1);
		videoWrap.jPlayer({
	        ready: function () {
	            $(this).jPlayer('setMedia', source);
	            if(videoData.autoplay){
	            	$(this).jPlayer('play');
	            }
	        },
	        play: function() {	// To avoid multiple jPlayers playing together.
	        	$(this).jPlayer("pauseOthers");
	        },
	        swfPath: 'http://i.meilishuo.net/css/images/activity/video',
	        supplied: videoType,
	        cssSelectorAncestor: "#jp_container_" + num
	    }).jPlayer(videoData.otherSettings);

		$('#jp_container_' + num).find('.jp-first-title').html(videoData.title);

	    var videoDom = videoWrap.jPlayer().data().jPlayer;

	    $('#jp_video_' + (num-1)).click(function() {
    		if(videoDom.status.paused) {
    			videoWrap.jPlayer('play');
    		} else {
    			videoWrap.jPlayer('pause');
    		}
    	});
	        
	}

	function videoBuild(){
		var videonum = arguments.length;
		for(var i = 0; i<videonum; i++){
			var newvideo = new video(arguments[i], i+1);
		}
	}
	return videoBuild;
});