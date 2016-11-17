function act(){
	return this;	
}
var controlFns = {
	'lucky' : function(args){
		var tpl = {
			'winners131115' : 'winners131115.html'
			}

		tpl = args && tpl[args]
		if (!tpl) return this.errorPage() 
		var php = {}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			this.req.__get['access_token'] = data.accessToken
			var string = require('querystring')
			data.tokeninfo =  string.stringify(this.req.__get) 
			this.render('act/picshow/'+tpl,data)
		})
		},
	'picshow' : function(args){
		var params = args || 'upload'
			, options = []
			, access_token = this.readData('access_token', this.req.__get, '')
			, app_version = this.readData('app_version', this.req.__get, '')
			, access_user = this.readData('access_user', this.req.__get, '')
			, banner_id = this.readData('banner_id', this.req.__get, '')
			, mac = this.readData('mac', this.req.__get, '') || this.readData('app_mac', this.req.__get, '') || this.readData('app_imei', this.req.__get, '')
			, php = {
				'title' : '/customactivity/CustomActivity_wap_share_photo_title'	
			}
			, mSelf = this

		options.push('banner_id='+banner_id);
		options.push('app_version='+app_version);
		if(access_token) options.push('access_token='+access_token);
		if(mac) options.push('mac='+mac);
		if(access_user) {
			if ('object' == typeof access_user) access_user = access_user[0]
			options.push('access_user='+access_user);
		}

		if(params == 'show'){
			php['uinfo'] = '/customactivity/CustomActivity_wap_share_photo_user_info';
			php['upload'] = '/customactivity/CustomActivity_wap_share_photo_upload_info';
			php['poster0'] = '/customactivity/CustomActivity_wap_share_photo_rank';
		}else if(params == 'vote') {
			php['uinfo'] = '/customactivity/CustomActivity_wap_share_photo_user_info';
		}else if(params == 'invite' || params == 'success') {
			php['uinfo'] = '/customactivity/CustomActivity_wap_share_photo_user_info';
			php['share'] = '/customactivity/CustomActivity_wap_share_photo_share_info';
		}else if(params != 'meitukiss'){
			php['intro'] = '/customactivity/CustomActivity_wap_share_photo_info';
		}
		 if(params == 'invite'){	
			var surl =  'http://'+ this.req.headers.host+'/goto/open/?appUrl='+encodeURIComponent('/act/picshow/vote?banner_id='+banner_id+'&access_user='+ access_user) + '&apk='+encodeURIComponent('/u/EJFMVd') +'&frm=ZX_SSHJP130911'
			php['shortURL'] = '/url/shorturl?url='+encodeURIComponent(surl)
		 }
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
	//		base.var_dump(data.title, false, 8);
	//		console.log(data.uinfo)
			data.banner_id = banner_id;
			data.access_token = access_token;
			data.app_version = app_version;
			data.mac = mac;
			data.tokeninfo = options.join('&');
			if(params == 'invite' && data.share && data.uinfo){
				 var wapMod = base.loadModel('wap/tools.js');
                 var share_params = {
					'title' : {
                         'default' : data.title && data.title.title
                         },
                     'text' : {
                         }
					, 'pic' : {
						'weixin' : data.uinfo.data.pic_url_200 
						,'weixin_timeline' : data.uinfo.data.pic_url_200 
                        ,'default' : data.uinfo.data.pic_url
                        }
                    ,'url': data.shortURL.url 
                     }
                var channels = []

                 data.share.forEach(function(item){
					 if (!item.type) return
                    share_params.title[item.type] = item.title
                    share_params.text[item.type] = item.desc
                    channels.push(item.type)
                    })
                data.share = wapMod.shareTo(mSelf.req , share_params , channels)
				}

			data.headTag = params;
			data.pageTitle = data.title.title + ' - 美丽说';
			if(params == 'meitukiss'){
				data.pageTitle = 'MeituKiss智能手机介绍' + ' - 美丽说';
			}
			data._CSSLinks = ['act/picshow'];

			if(params == 'vote') data.install = true;
			else if(params == 'down') params = 'vote';

			mSelf.render('act/picshow/' + params + '.html' , data);
		});
	}
	, bdapp : function(params){
		var wapMod = base.loadModel('wap/tools.js');
		var mSelf = this
			, os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res))
			, mlsApp = os.mlsApp

		var pageShareURL = encodeURIComponent('/act/bdapp/?banner_id='+ this.req.__get.banner_id)
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {}

		var app_version = this.readData('app_version',this.req.__get, '')
			, app_mac = this.readData('app_mac',this.req.__get, '') 

		if(params == 'winners'){
			php = {'winners' : '/customactivity/CustomActivity_wap_privilege_user_award'}
		}else{
			php = {
				'award' : '/customactivity/CustomActivity_wap_privilege_info'
				, 'shareInfo' : '/customactivity/CustomActivity_common_tool_single?id=bdapp_share'
			}	
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mlsApp = mlsApp;
			/*share*/
			var shareList = data.shareInfo.share_list;
			var shareparams = {
					'title' : shareList.share_title,
					'text' : shareList.share_text,
					'pic' : {
						"weixin" : shareList.weixin_pic,
						"weixin_timeline" : shareList.weixin_pic,
						"default" : shareList.qzone_pic
					},
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , shareparams);

			data.app_mac = app_mac;
			data.pageTitle = '美丽说';

			data._CSSLinks = ['act/bdapp'];
			if(params == 'fail'){
				data.fail = 1;
				params = 'success'
			}else if(params == 'winners'){
				data.winners = data.winners[0];
			}else if(params == 'userinfo'){

			}else if(params != 'success'){
				params = 'award'	
			}

			mSelf.render('act/bdapp/' + params + '.html' , data);
		});
	}
}
exports.__create = controller.__create(act , controlFns);
