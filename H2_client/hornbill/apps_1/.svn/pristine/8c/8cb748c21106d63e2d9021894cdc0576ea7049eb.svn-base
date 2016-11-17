fml.define('page/demo/myvideo' , ['jquery' , 'app/checkLogin', 'app/video' ] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
    var video = require('app/video');

    var videoData = {
        title : '舒洁超厚倍柔湿巾',
        source : {
            flv : 'http://i.meilishuo.net/css/images/activity/video/sj30s.flv',
            m4v : 'http://i.meilishuo.net/css/images/activity/video/sj30s.m4v',
            poster : 'http://i.meilishuo.net/css/images/demo/demovideo.jpg'
        },
        autoplay: false,
        otherSettings : {
            smoothPlayBar: true,
            keyEnabled: true,
            size: {
                width: '640px',
                height: '360px',
                cssClass: 'jp-video-360p'
            }
        }
    };

    var videoData2 = {
        title : 'Big_Buck_Bunny_Trailer',
        source : {
            m4v: "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
            ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
            webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
            poster: "http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
        },
        autoplay: false,
        otherSettings : {
            smoothPlayBar: true,
            keyEnabled: true,
            size: {
                width: '640px',
                height: '360px',
                cssClass: 'jp-video-720p'
            }
        }
    };
    
    video(videoData, videoData2);
});