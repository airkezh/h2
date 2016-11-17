function go(){
	return this;	
}
var controlFns = {
	'taobao':function(){
		var url = require('url')
		var link = this.req.__get.link
        var ua = this.req.headers['user-agent']
		var refer = this.req.headers.referer
		var host = ''
		var rootDomain = 'meilishuo.com'
		if (refer){
			host = url.parse(refer)
			if (host) host =  host.hostname.slice(-rootDomain.length) 
			}
		if (ua.indexOf('MQQBrowser')> -1 ) host = rootDomain
		if (rootDomain != host || !link){
			base.accessLog(443 , this.req  )	
			this.res.writeHead(500 , {'Content-Type' : 'text/html','lnk':link ,'ref':refer})
			this.res.write('bad request.')
			this.res.end()
			return
			} 
        var data = {
            'isWebkit' : /webkit/i.test(ua)
            ,'link' : link
            }
        this.render('/com/without_refer.html',data)
		},
	'tbapp': function(){
		var link = this.req.__get.link
        var ua = this.req.headers['user-agent']
        var data = {
            'isWebkit' : /webkit/i.test(ua)
            ,'link' : link
            }
        this.render('/com/without_refer.html',data)
		},
	'index' : function(){
		var php = {
		}
		var mSelf = this;
		this.bridgeMuch(php);
		this.listenOver(function(data){
				var cookie = require(config.path.base + 'cookie.js').getHandler(mSelf.req , mSelf.res);
				var times = base.date('Y-m-d H:i:s');
				var datas = { 
					app_key : '12173575',
					timestamp : times
				}
				var strSign = '84939bdd86776f237d9dbdd49a2ace54';
				for(item in datas){
					strSign += item+datas[item];    
				}
				strSign += '84939bdd86776f237d9dbdd49a2ace54';
				var crypto = require('crypto');
				datas.sign = crypto.createHmac('md5' , '84939bdd86776f237d9dbdd49a2ace54').update(strSign).digest('hex').toUpperCase();
				cookie.set('sign' , datas.sign);
				cookie.set('timestamp' , times);
				data.sign = datas.sign;
				data.datas = datas;
				mSelf.render('twitter/tbapi.html' , data);
		});	
	}
};
exports.__create = controller.__create(go , controlFns);


