fml.define('wap/app/shareTo4', [] , function(require , exports){
	var shareToWeibo = function(data) {
		var url = 'http://weibo.cn/ext/share?appkey=463778370&st=' + (new Date()).valueOf()
		url += ('&ru=' + encodeURIComponent(data.ru))
		url += ('&rt=' + encodeURIComponent(data.rt))
		if(data.tp)
			url += ('&tp=' + encodeURIComponent(data.tp))
		if(data.ntitle)
			url += ('&ntitle=' + data.ntitle)
		if(data.backurl)
			url += ('&backurl=' + encodeURIComponent(data.backurl))
//		if(data.skipshow)
//			url += '&skipshow=1'
			
		location.href = url;
	};

    var shareToQzone = function (param) {
        var r = buildShareData(param, ['qzone']),
            reqUrl = r[0].share_url

        window.location.href = reqUrl;
    };

    var shareToPengYouQuan = function (param) {
        var r = buildShareData(param, ['weixin_timeline']);
        var reqUrl = r[0].share_url
        window.location.href = reqUrl;
    };

    var shareToPengYou = function(param) {
        var r = buildShareData(param, ['weixin']);
        var reqUrl = r[0].share_url
        window.location.href = reqUrl;
    }

    var buildShareData = function(param, channels, host, defaultChannel) {
        if (!channels) channels = ['weixin_timeline','weixin' ,'qzone','weibo','txweibo']
        var ret = []

        var host = host || 'm.meilishuo.com'

        if (param.url && -1 == param.url.indexOf('//')) param.url = 'http://'+ host + (param.url[0] == '/' ?'':'/') + param.url
        var pars = ['title','text']
        var isIPhone = Meilishuo.config.os.iphone || Meilishuo.config.os.ipad
            ,isPad = Meilishuo.config.os.ipad
        channels.forEach(function(chan){
            var unit_param = {
                "type" : chan ,
                "r" : param.r || '',
                "url" : param.url || ''
            }
            for (var i= pars.length-1;i>=0;i--){
                var parv = param[pars[i]]
                if (parv)
                    unit_param[pars[i]] = parv[chan] || parv.default || parv || ''
            }

            if (param.pic)
                var pic = param.pic[chan] || param.pic.default || param.pic
            switch (chan){
                case 'weixin_timeline':
                case 'qzone':
                case 'weixin':
                    //unit_param['url'] = 'http://m.meilishuo.com/appWelcome'
                    if (!pic) return
                    unit_param['thumb_url'] =  pic
                    if (isIPhone) unit_param.message_type = 'webpage' 

                    break
                default:
                    if (param.pic)
                        unit_param['pic_url'] =  pic
                    break
            }

            if ( pic && param.image ) {
                var img = param.image
                unit_param.message_type = 'image'
                unit_param.thumb_url = unit_param.pic_url = pic
            }

            ret.push({"type": chan
                ,"isDefault" : chan == defaultChannel
                , "share_url" : "meilishuo"+(isPad?"hd":"")+"://share.meilishuo/?json_params="+ encodeURIComponent(JSON.stringify(unit_param))} )
        })
        return ret
    };
	exports.shareToWeibo = shareToWeibo;
    exports.shareToQzone = shareToQzone;
    exports.shareToPengYouQuan = shareToPengYouQuan;
    exports.shareToPengYou = shareToPengYou;
});
