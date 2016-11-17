var url = require('url')
function api(){
	return this
}
function getRootHost(host){
	if (!host) return false 
	var rpre = /\.(com|cn|net|org|gov|edu)$/
	var h = host.substr(0 , host.lastIndexOf('.'))
	
	h = h.replace(rpre , '')
	h = h.substr(h.lastIndexOf('.') + 1)
	host = host.split('.')
	var ret = []
	for (var i = host.length -1 ;i >=0 ; i --){
		ret.unshift(host[i])
		if (h == host[i]) break
		}
	return ret.join('.')
	}

var controlFns = {
	index:function(f){
		//r =='jump' or r == 'redirect'
		this.redirect()
		}
	,jump : function(){
		this.redirect()
        }
	,redirect : function(){
		return this.errorPage()
		//4.28 庞鹤邮件 
		var mSelf = this
		var r = this.readData('r' , this.req.__get)
		var urlHost = url.parse(r)
		if (!r) 
			return this.errorPage()
		urlHost = getRootHost(urlHost.hostname) || (urlHost.href ?  'meilishuo.com' : null)

		//this.listenOn(this.bridge('/spam/white_site'), 'list')();
		this.bridgeMuch({'list' : '/spam/white_site'})
		this.listenOver(function(data){
			if ('tmall.com' == urlHost || 'taobao.com' == urlHost){
				return mSelf.redirectTo('/gooo/taobao/?link='+ encodeURIComponent(r) , false)
				}
			if (
				'meilishuo.com' == urlHost ||
				 (urlHost && data.list && data.list.indexOf(urlHost) > -1)
				 )
				return mSelf.redirectTo(r , false)
			data.r = r 
			mSelf.render('api/redirect.html' , data)	
			} , true)
		
	},
	adm : function() {
		var mSelf = this
		this.bridgeMuch({'click' : '/adm/ad_Click'})
		this.listenOver(function(data){
			if (!data.click) 
				return mSelf.errorPage();
			mSelf.render('api/adm.html', data);
		}, true)
	}
}
exports.__create = controller.__create(api , controlFns);
