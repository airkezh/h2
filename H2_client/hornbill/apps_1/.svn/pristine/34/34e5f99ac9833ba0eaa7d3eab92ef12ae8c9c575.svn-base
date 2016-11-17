fml.define('page/demo/ga' , ['jquery' , 'app/video', 'app/twitterApi'] , function(require , exports){
	$ = require('jquery');
    var video = require('app/video');
    var trackHead = Meilishuo.config.pageName;

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
    video(videoData);

    $('#gaimg').click(function (e){
        e.preventDefault();
        $('#jp_video_0').click();
        if(Meilishuo.config.isTrackImg != false){
            _gaq.push(['_trackPageview', trackHead + 'imgClick']);
        }
    });

    var twitterApi = require('app/twitterApi').twitterApi;
    $('#gaGo').on('click' , function(){
        var data = {
                'type' : 2,
                'pid' : 681980635,
                'actUrl': '/u/ELIL7l',
                'actTitle' : 'ga活动',
                'actContent' : '嘎嘎嘎嘎嘎ga你也快来参加吧！'
            };
        var url = '/aj/huodong/cus_create_twitter';
        var callback = function(res){
            var res = JSON.parse(res);
            if(res.code == 0){
                alert('分享成功');
            } else {
                alert(res.msg);
            }
        }
        $.post(url, data, callback);
    })  
});