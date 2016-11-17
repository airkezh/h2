var url = require('url')
function download(){
	return this;
}
var controlFns = {
	index : function(params){
		var ua = this.req.headers['user-agent']
		if(params == 'share') this.share()
		else if (/(iPhone|iPad|iPod|iOS)/i.test(ua)){
			this.iphone();
		}else  if( /(Android)/i.test(ua)){
			this.android();
		}else{
			this.redirectTo('http://meilishuo.com/client/iPhone')
		}
	},
	scancode : function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '发现 - 美丽说';
			data._CSSLinks = ['scancode'];
			mSelf.render('scancode.html', data);
		});
	},
    'apps' : function(app){
        app = app || 'main'
		// /m.meilishuo.com/download/apps/main?schema=
		var tryOpen = this.req.__get.schema
        var php = {}
        php.apks = '/customactivity/CustomActivity_common_tool_single?id=download_app'
        this.bindDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data){
            // {'main' : {'ios' : '','android' : '' ,'bg' : '' , 'txt' : ''}}
            var apks
            if (data.apks ) {
                for (var i = 0 , j = data.apks.length ; i < j ; i++){
                    if (data.apks[i].name == app) {
                        apks = data.apks[i]
                        break
                    }
                }
                data.apks =  apks
            }
			data._CSSLinks = ['download']
			data.tryOpen = tryOpen
			if (apks && apks.schema && !tryOpen) data.tryOpen = apks.schema 
            this.render('download/apps.html' , data)
        })

    },

	latest : function(param){
		var wapMod = base.loadModel('wap/tools.js')
		var channel = wapMod.getChnlMark(this.req ,this.res)
		var php = {}
		if ('true' != this.req.__get.comtool){
			param = channel || param 
		}
		this.req.__get.channel = param
		if ('ios' != param){
		//	php.apks = '/customactivity/CustomActivity_common_tool_single?id=download_apk'	
			php.apks = '/url/Package_get'	
			if ('true' == this.req.__get.comtool){
				php.apks = '/customactivity/CustomActivity_common_tool_single?id=download_apk'	
				}
			}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['download'];
			if (this.req.headers['user-agent']) data.weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger')>0
			if (data.os.iphone || data.os.ipad) param = 'ios'

			if ('ios' == param){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			}else{
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
					
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src
				else  data.appUrl = 'http://meilishuo.com/u/EM2DfR'
		//		else return this.errorPage()
				data.android = true
				}
			this.render('download/weixin_fallback.html' , data);
			
			})
		
		},
	ios : function(params){
		this.latest('ios')
		},
	android : function(params){
		var refer = this.req.__get.refer
			,plat = this.req.__get.plat
			,apk = this.req.__get.apk 	
		var php = {
			'topBnr' : '/customactivity/CustomActivity_common_tool_single?id=download_android'
		}
			, mSelf = this

		if (plat)
			refer = plat
		else if (refer)
			refer = url.parse(refer , true).query.frm

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.apk = apk
			data.frm = mSelf.readData('frm') || ''
			data.refer = refer ? refer.slice(0,2) : false
			data.pageTitle = '美丽说android版 - 美丽说'
			data._CSSLinks = ['download'];
			mSelf.render('download/android.html' , data);
		});
	},
	iphone : function(params){
		var php = {
			'topBnr' : '/customactivity/CustomActivity_common_tool_single?id=download_ios'
		}
			, mSelf = this
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说iPhone版 - 美丽说'
			data._CSSLinks = ['download'];
		mSelf.render('download/iphone.html' , data);
		});
	}
	, page : function(params){
		var php = {}
			, mSelf = this
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.appURl = params;
			mSelf.render('download/page.html' , data);
		});
	}
	, share : function(params){
		var wapMod = base.loadModel('wap/tools.js')
		var channel = wapMod.getChnlMark(this.req ,this.res)
		var mSelf = this
		var php = {}
		var param = channel || param 
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];

		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		} 
		
		php.topBnr = '/customactivity/CustomActivity_common_tool_single?id=download_share'
		
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (this.req.headers['user-agent']) data.weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger')>0
			if (data.weixinBrowser) { 
				data.appUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo&g_f=992263'
			} else if (data.os.iphone || data.os.ipad){
				data.appUrl =  'https://itunes.apple.com/cn/app/id431023686?mt=8'

			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src
				
				else 
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}
			data.pageTitle = '美丽说'
			data._CSSLinks = ['download'];
			mSelf.render('download/download_share.html' , data);
		});
	}

}
exports.__create = controller.__create(download , controlFns);
