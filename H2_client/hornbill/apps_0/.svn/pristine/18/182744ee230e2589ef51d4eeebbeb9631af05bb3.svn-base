function ws(){
	return this;
}
//var cookie = require(config.path.base + 'cookie.js')
var controlFns = {

	'ws-shake' :  function(args){
    	var php = {};
    	this.setMDefault(php);
    	this.bridgeMuch(php);
    	var mSelf = this;
    	this.listenOver(function(data){
    		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				// connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
    		data.pageTitle = '摇一摇'
			data._CSSLinks = ['ws/ws-shake']
			this.render('ws/ws-shake.html', data)
    	})
    },
    'ws-share' :  function(args){
        var php = {};
        this.setMDefault(php);
        this.bridgeMuch(php);
        var mSelf = this;
        this.listenOver(function(data){
            var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
            if(weixinBrowser){
                //connectWX(mSelf, data);
            }
            data.isWx = weixinBrowser;
            data.pageTitle = 'iPhone 0元抢'
            data._CSSLinks = ['ws/ws-share']
            this.render('ws/ws-share.html', data)
        })
    }
}

exports.__create = controller.__create(ws , controlFns);