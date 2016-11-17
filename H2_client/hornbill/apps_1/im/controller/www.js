/**
 * pc web版im
 *  商家客户端
 *  用户客户端
 * @type {{index: Function, test: Function, check: Function, simple: Function, www: Function, login: Function, aw: Function, aj: Function}}
 */
var controlFns = {
	'index' : function(){
		this.www()
	},
	'test' : function(){
		console.log(this.req.headers['user-agent'])
		this.render('test.html' , {});
	},
	'check' : function(v){
        this.res.writeHead(200 , {'Content-Type' : 'text/plain'})
        if (false )
            this.res.write(JSON.stringify({'verb': .3 ,
                    'release_note' : '更新测试' ,
					'updatedFile': '',
                    'down_url':'http://i.meilishuo.net/css/images/im/mls_im0603.zip'}))
        else
            this.res.write(JSON.stringify({'verb':v}))
        this.res.end()
	},
    //买家->商家im
	'simple' : function(){
		var toid = this.req.__get.toid | 0
		var php = {
			'recently' : 'im::/im/open_recently?source=web&limit=50'
			, 'historyUser' : 'im::/im/detaillist'
		}
		var mSelf = this
        this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.userInfo.user_id == 0)
				return mSelf.redirectTo('/www/login/' ,true);	

			if(data.recently && data.recently.data)
				data.recently = data.recently.data

			var host = data.MAIN_SITE_DOMAIN || ''
			host && (data.host = host.slice(0,host.length-1)) 
			data.isH5 = true
			data.toid = toid

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/simple'];

			data.headTag = 'im';

			mSelf.render('simple/im.html' , data);

		})
	},
    //买家->平台 im
    'buyer_platform_im' : function() {
        var toid = this.req.__get.toid | 0
        var php = {
            // 'recently' : 'im::/im/open_recently?source=web&limit=50'
            'historyUser' : 'im::/im/detaillist'
            //, 'recent_order' : 'im::/im/orders?to='+toid
            , 'order_status_list' :'im::/im/open_order_status_list'
            , 'shopping' : '/robot/knowledge_search?cate_id=217&sub_cate_id=221'
            , 'express' : '/robot/knowledge_search?cate_id=217&sub_cate_id=225'
        }
        var mSelf = this
        this.bindDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.qa = [];
			console.log("www.js ", data);
            if(data.shopping && data.shopping.data && data.shopping.data.length > 0){
                data.qa = data.qa.concat(data.shopping.data.slice(0,5));
            };
            if(data.express && data.express.data && data.express.data.length > 0){
                data.qa = data.qa.concat(data.express.data.slice(0,6));
            };

            if(data.userInfo.user_id == 0)
                return mSelf.redirectTo('/www/login/?morf=buyer_platform' ,true);

            // if(data.recently && data.recently.data)
            data.recently = { 
			    "datas": [{'uid':0}], 
			}

            var host = data.MAIN_SITE_DOMAIN || ''
            host && (data.host = host.slice(0,host.length-1))
            data.isH5 = true
            data.toid = toid

            data.pageTitle = '美丽说客服'
            data._CSSLinks = ['im/buyer_platform'];

            data.headTag = 'im';

            mSelf.render('www/buyer_platform/index.html' , data);

        })
    },
    //商家->买家 im
	'www' : function(){
		var toid = this.req.__get.toid | 0

		var php = {
			// 'recently' : 'im::/im/recently?source=web&to=' + toid
			'recently' : 'im::/im/open_recently?source=web&limit=50'
			, 'udr' : 'im::/im/udr_get'
			, 'transfer' : 'im::/im/transfer_list'
			, 'historyUser' : 'im::/im/detaillist'
			, 'publicUser' : 'im::/im/public_detaillist'
		}
		var mSelf = this

        this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(/MLS-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-IMclient'

			}else if(/MLS-PC-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-PC-IMclient'
			}

			if(data.userInfo.user_id == 0)
				return mSelf.redirectTo('/www/login/' ,true);	

			if(data.recently && data.recently.data)
				data.recently = data.recently.data

			if(data.transfer && data.transfer.data)
				data.transfer = data.transfer.data

			if(data.udr && data.udr.data)
				data.udr = data.udr.data

			var host = data.MAIN_SITE_DOMAIN || ''
			host && (data.host = host.slice(0,host.length-1)) 
			//data.host = 'http://' + mSelf.req.headers.host

			data.isH5 = true
			data.toid = toid

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];

			data.headTag = 'im';

			mSelf.render('www/im.html' , data);
		});
	},
	//higo 商家->买家
	'higo_shoper' : function(){
		var toid = this.req.__get.toid | 0

		var php = {
			// 'recently' : 'im::/im/recently?source=web&to=' + toid
			'recently' : 'im::/im/open_recently?source=web&limit=50&channel_id=2'
			, 'udr' : 'im::/im/udr_get?channel_id=2'
			, 'transfer' : 'im::/im/transfer_list?channel_id=2'
			, 'historyUser' : 'im::/im/detaillist?channel_id=2'
			, 'publicUser' : 'im::/im/public_detaillist?channel_id=2'
			//, 'GoodsList':'http://b.higo.meilishuo.com/index.php/im/AjaxGetGoodsList?shop_id=177183898507916994&type=1&size=10&p=1'
		}
		var mSelf = this

		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			console.log('higo_shoper', data);
			if(/MLS-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-IMclient'

			}else if(/MLS-PC-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-PC-IMclient'
			}

			if(data.userInfo.user_id == 0)
				return mSelf.redirectTo('/www/login/' ,true);

			if(data.recently && data.recently.data)
				data.recently = data.recently.data

			if(data.transfer && data.transfer.data)
				data.transfer = data.transfer.data

			if(data.udr && data.udr.data)
				data.udr = data.udr.data

			var host = data.MAIN_SITE_DOMAIN || ''
			host && (data.host = host.slice(0,host.length-1))
			//data.host = 'http://' + mSelf.req.headers.host

			data.isH5 = true
			data.toid = toid

			data.pageTitle = '美丽说客服'
			data._CSSLinks = ['im/higo_im'];

			data.headTag = 'im';

			mSelf.render('www/higo_im.html' , data);
		});
	},
    //客户端登陆
	'login' : function(){
//		this.debugSnake({target : 'devlab3'});
		var toid = this.req.__get.toid || 0
		var mSelf = this
		var php = {
			'Captcha_session' : 'im::/im/Captcha_session'
		}
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//console.log(mSelf.req.headers['user-agent'])
			if(/MLS-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-IMclient'

			}else if(/MLS-PC-IMclient/.test(mSelf.req.headers['user-agent'])){
				data.ua = 'MLS-PC-IMclient'
			}
			//console.log(data.ua)

			data.toid = toid
			data.userInfo = {}

			data.pageTitle = '登录 － 美丽说';
			data._CSSLinks = ['im/login'];
			data.headTag = 'login';

			mSelf.render('login.html' , data);
		});
	},
	aw : function(params){
		var php = {
			 'logon' : '/user/user_log_on'
            ,'logout' : '/user/log_out'
		}
        php.userInfo = '/user/headinfo';

		this.ajaxTo(php[params])
	},
	aj : function(params){
		// this.debugSnake({target : 'devlab5'});
		var php = {
			'historyUser' : 'im::/im/detaillist'
			, 'transfer' : 'im::/im/transfer'//不需要返回nick
			, 'udrUpdate' : 'im::/im/udr_update'
			, 'udrAdd' : 'im::/im/udr_add'
			, 'udrDelete' : 'im::/im/udr_delete'
			, 'searchUser' : 'im::/im/query_nick'
			, 'closeUser' : 'im::/im/unsubscribe'
			, 'publish' : 'im::/im/publish'
			, 'history' : 'im::/im/history'
			, 'openHistory' : 'im::/im/open_history'
			, 'open_history_new' : 'im::/im/open_history_new'
			, 'publicHistory' : 'im::/im/public_history'
			, 'openChatGoods' : 'im::/im/open_chatgoods'
			, 'status' : 'im::/im/status'
			, 'talkList' : 'im::/im/subscribe'
			, 'publicTalkList' : 'im::/im/public_subscribe'
			, 'recently' : 'im::/im/recently'
			, 'recently_new' : 'im::/im/open_recently'
            , 'blacklist' : 'im::/im/blacklist'
			, 'connect' : 'im::/im/connect'
			, 'recent_order' : 'im::/im/orders'
			, 'init' : 'im::/im/init'
			, 'user_info' : 'im::/im/user_info'
            , 'platform' : 'im::/im/open_init?from=123&tid=2327&depart_id=3'
            , 'feedback' : 'im::/im/open_feedback'
            , 'user_info_by_id' : "im::/im/open_userinfo"
            , 'evaluate_servicer' : 'im::/im/open_online_ticket_update'
            , 'del_queuing' : 'im::/im/open_del_queuing'
            , 'open_get_num_service' : 'im::/im/open_get_num_service'
			, 'group_list' : 'im::/im/open_group_list'
		}
		this.ajaxTo(php[params])
	}

	, testpage: function(){
		var toid = this.req.__get.toid | 0
		var php = {

		}
		var mSelf = this
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.pageTitle = '美丽说客服'
			data._CSSLinks = ['im/buyer_platform'];

			data.headTag = 'im';

			mSelf.render('www/buyer_platform/testpage.html' , data);

		})
	}
};
exports.__create = controller.__create(new Function(), controlFns);
