function defaultAction(php){
		if (!php) {
			console.log('php not assign ' + this.req.url)
			return
			}
	    //this.debugSnake({'target':'devlab1'})
	  /*
        **针对淘宝互联，新增isTaobaoUser请求，同时在个人操作增加跳转。此动作优先级高于is_actived，设置is_actived为taobao进行判断判断
        **/
        php.userInfo = '/user/headinfo';
        ///lulin 11.4 php.isTaobaoUser ='/connect/is_taobao_connect_user';
        ///lulin 11.4 php.reg_feedback = '/note/coupon_float_tips'; /* 优惠劵投放活动，春季注册回馈，浮窗 */
        //php.topbanner = '/banner/homebannersetting';
        php.headerWelfare =  '/customactivity/CustomActivity_common_tool_notice?id=headerWelfare&cid=43';
        php.clubTest = '/club/access_auth';
        php.topbanner = '/welcome/banner_ads?key=web_welcome_top_banner'
        php.logo_act = '/activity/Activity_entrance_logo';
        php.word_recommend = '/welcome/Search_word_recommend';
        // php.apparel_alert = '/customactivity/CustomActivity_dialog_handler?time_type=1';
        php.top_bnr_close = '/customactivity/CustomActivity_user_mark?act_name=header_banner_global&time_type=1';
        //php.friendlink = '/friendlink/bottom';
        /** 大促接口数据 */
        php.promotionData = '/customactivity/CustomActivity_common_tool_bigpromotion';
        php.promotionTopNav = '/customactivity/CustomActivity_common_tool_single?id=promotion_top_nav&$';
        /*入口风控*/
        php.urlRiskControl = '/risk/risk_common_check_url'
        var mSelf = this;
        this.eventHandle.onOver = function(data){
            var isHTTPS = data.isHTTPS = !!mSelf.req.headers.encrypted

            if( isHTTPS || (data.userInfo && data.userInfo.need_active)){ /* 除去https的页面 & 需要再激活 */
                data.apparel_alert = false;
            }
            if(mSelf.req.headers.host == data.IPAD_SITE_DOMAIN){
                data.is_iPad = true;
            }
			if (mSelf.req.url.indexOf('/biz/') == 0 ){
				data.SVERSION = 'bizz.' + data.SVERSION
				}
            if ( isHTTPS ){
                //support https
                data.JCSTATIC_BASE = data.HTTPS_JCSTATIC_BASE || '/'
                data.PICTURE_URL = data.HTTPS_PICTURE_URL || '/'
				data.CAPTCHA_ULR = data.HTTPS_CAPTCHA_ULR || '/'
            }
            var url = mSelf.req.url;
            if(url.indexOf('?') != -1){
                url = url.substring( 0 , url.indexOf('?'));
            }
            if(data.isTaobaoUser == 1 && data.userInfo){
                data.userInfo.is_actived = 'taobao';
            }
            if(data.userInfo && (data.userInfo.level == 1 || data.userInfo.level == 2) && url != '/user/activateEmail/' && url != '/user/resetpw/' && url != '/settings/setPassword' && url != '/settings/emailPsSuccess'){
                return mSelf.redirectTo('/user/activateEmail/' , false);
            }
            data.staticize = mSelf.req.headers.staticize || mSelf.req.__get.__staticize;

            if(data.urlRiskControl && data.urlRiskControl.code){
                data.pageTitle = '账号异常';
                data.use_rem_screen = true;
                data._CSSLinks = ['secuity_code'];
                mSelf.render('SecurityCode.html',data)
                return;
            }
        }

		var appMod = base.loadModel('mls/application.js');
        var wapMod = base.loadModel('wap/tools.js');
        this.listenOn(function(evt){
            var isNewUser = appMod.isNewUser(mSelf.req, mSelf.res);
            return evt(isNewUser);
            },'isNewUser')();
        this.listenOn(function(evt){
            var isQQNewUser = appMod.isQQNewUser(mSelf.req, mSelf.res);
            return evt(isQQNewUser);
            },'isQQNewUser')();

        this.listenOn(function(evt){
            var app_token = wapMod.getMlsAppVersion(mSelf.req )
            var os = function(){
                return wapMod.uaos(mSelf.req, !!app_token);
                }
            return evt(os);
            },'os')();

		this.listenOn(function(evt){
            /*
            var isTest = appMod.isTest(mSelf.req, mSelf.res);
            var isFlowPercent = appMod.isPercent(mSelf.req , mSelf.res , 4);
            isTest = isTest || isFlowPercent
            return evt(isTest);
            */
            return evt(0);
            },'isTest')();
	     this.listenOn(function(evt){
             var access_token = wapMod.getMobToken(mSelf.req ,mSelf.res);
             return evt(access_token);
             },'accessToken')()

        this.listenOn(function(evt){
            appMod.getGlobalKey(mSelf.req ,mSelf.res);
            var token = appMod.genToken('this.req.headers.clientIp');
            return evt(token);
            },'nToken')();

        require(config.path.base + 'webSpam.js').init(this);


	}


exports.bind = defaultAction
exports.bindBiz = function(php){
    var mSelf = this;
	defaultAction.call(this , php)
	var onOver = this.eventHandle.onOver

	this.eventHandle.onOver = function(data){
		onOver( data)
		data.SVERSION = 'biz.' + data.SVERSION
		}
}
