function test(){
	return this;
}
var controlFns = {
	'referrer' : function(){
		var php ={}
		this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			this.render('test/referrer.html',data)
		})
		},
	'test' : function(){
		var php ={'test' : 'jungle::/moas/api/57'}
        this.bridgeMuch(php)

        this.listenOver(function(data){
            this.res.end(JSON.stringify(data.test))
        })
		return
		var http = require('http')
		var self = this.res
		http.get('http://home.baidu.com/about/jp.html',function(res){
			self.writeHead( 200, {'Content-Type': 'text/html;charset=gbk','Cache-Control': 'no-cache,no-store'})
			//self.write('<html><head> <meta http-equiv="content-type" content="text/html; charset=gbk" /></head><body>')
			var ret = ''
		  	res.on('data', function (chunk) {
				// console.log(chunk)
				ret += chunk
				self.write(chunk)
				})
			res.on('end' , function(){
			//	self.write('</body></html>')
				self.end()
			})
			}).end()
		return
		var options = {
			hostname: 'phpdev.meilishuo.com'
			,port : 80
			,path :'/html/jp.html'
			,method: 'GET'
		}
		var self = this.res
		var req = http.request(options, function(res) {
			self.writeHead( 200, {'Content-Type': 'text/html;charset=gbk','Cache-Control': 'no-cache,no-store'})
			//self.write('<html><head> <meta http-equiv="content-type" content="text/html; charset=gbk" /></head><body>')
			var ret = ''
		  	res.on('data', function (chunk) {
				// console.log(chunk)
				ret += chunk
				self.write(chunk)
				})
			res.on('end' , function(){
			//	self.write('</body></html>')
				self.end()
			  });
		});
		req.end()

		return
		var ua = this.req.headers['user-agent']
		var data = {
			'isWebkit' : /webkit/i.test(ua)
			,'link' :'http://detail.tmall.com/item.htm?spm=a2151.6734197.10.9.cJX7da&id=20907615142&u_channel=channelDiscount'
			}
		this.render('test/ie.html',data)
		return
		var http = require('http')
			,url = require('url')
		var res = this.res
		var p = this.req.__get.p
		p = url.parse(p)
		// console.log(p)
		var options = {
			  host: p.hostname,
			    path: p.pathname
		};
		function callback(response) {
		  response.on('data', function (chunk) {
				res.write(chunk);
	  		});
		  response.on('end', function () {
				res.end()
			})
		}
		http.request(options, callback).end();

		},
	'testRefer': function(){
		data = {
			'link':'http://mlab2.meilishuo.com/test/testRefer/'
			,'refer' : this.req.headers.referer
			}
		this.render('test/lookrefer.html',data)
		},
	'test2' : function(){
		this.render('test/svg2.html')
		},
	'index' : function(){
		var php = {
			'essential' : '/welcome/cms/essential',
			'titlebar' : '/welcome/cms/titlebar'
		};
		var frm = this.readData('frm',this.req.__get, '');
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// console.log(data.accessToken)
			data._CSSLinks = ['welcome'];
			data.headTag = 'welcome';
			mSelf.render('welcome/welcome.html' , data);
		});
	},
	'iscroll' : function(){
		var php = {
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['iscroll'];
			mSelf.render('test/iscroll.html' , data);
		});
	},
	'windowfit' : function(){
		var php = {
			'essential' : '/welcome/cms/essential',
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['welcome'];
			data.headTag = 'test_windowfit';
			mSelf.render('test/windowfit.html' , data);
		});
	},
	'fix_nav' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['test/fix_nav'];
			mSelf.render('test/fix_nav.html' , data);
		});
	},
	'fix_nav_top' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['test/fix_nav_top'];
			mSelf.render('test/fix_nav_top.html' , data);
		});
	},
	'mz_donghua' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['test/mz_donghua'];
			mSelf.render('test/mz_donghua.html' , data);
		});
	},
	'sticky' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = '640_mate';
			data._CSSLinks = ['test/sticky'];
			mSelf.render('test/sticky.html' , data);
		});
	},
	'mls_scheme' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = '640_mate';
			mSelf.render('test/scheme.html' , data);
		});
	}
}
exports.__create = controller.__create(test , controlFns);
