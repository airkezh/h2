/*common*/

/**
 * @description WAP调用客户端方法，采用jsBridge方式
 * @desc MeilishuoJSBridge{@link http://redmine.meilishuo.com/projects/meilishuo-mob/wiki/MeilishuoJSBridge}
 * @author yunqian
 */

var OLD_SCHEME = ['open', 'close', 'close_and_open', 'person', 'group', 'twitter_list', 'twitter_single', 'editor', 'private_message', 'openURL', 'invite_weibo', 'invite_contacts', 'login', 'register', 'scanner', 'volume', 'navigation_poster', 'share', 'jump', 'subject_list', 'club_article', 'order_detail', 'shop', 'coupons', 'notification', 'upload', 'qq', 'open_img', 'set_title', 'order_list_with_coupon', 'password_set', 'pick_address', 'clock_home', 'clock_select_god', 'clock_settings', 'onekeyregister', 'changetab', 'dress_tag', 'dress_daren_tag', 'dress', 'navigation_tree', 'signin_encry', 'calendar_event', 'followed_shop_list', 'im_chat', 'club_activity', 'dress', 'collocation_root', 'purse', 'circle', 'circle_list', 'rich_message', 'coupons_expired', 'circle_apply', 'cashier', 'into_circle', 'publish_post', 'repin_circle_list', 'goods_edit', 'post_share', 'common_notice', 'order_list', 'circle_new_member', 'send_sms', 'stamp_store', 'search_goods_result', 'manage_order_list', 'seller_order_details', 'add_address', 'update_address', 'menu', 'treasure_detail', 'shop_subject', 'shop_search', 'shop_goods_all', 'shop_all', 'shop_category', 'shop_new', 'im_shop_chat', 'customer_service', 'create_circle', 'app_notification_enabled', 'open_app_settings_enabled', 'open_app_settings', 'feedback', 'order_express_info', 'search', 'message_info', 'password_modify', 'entire_stock', 'like_goods', 'set_alarm', 'cancel_alarm', 'pop_share', 'close_web_refresh']
	, _mlsReady = []
	, is_bridge = false
	, MLSBridge = ''
	, MLS_SCEHEME = {
		'login' : 'didLogin'
		, 'logout' : 'didLogout'
		, 'pick_address' : 'onPickAddress'
		, 'add_address' : 'onAddAddress'
		, 'update_address' : 'onUpdateAddress'
		, 'app_notification_enabled' : 'onAppNotificationEnabled'
		, 'open_app_settings_enabled' : 'onAppOpenSettingsEnabled'
		, 'scanner' : 'onScan'
		, 'upload' : 'onUploadComplete'
		, 'calendar_event' : 'onCalendarEventActionEnd'
		, 'share' : 'onShareComplete'
		, 'signin_encry' : 'onSigninEncry'
	}

/**
 * 检查是否在客户端内
 * @return {Boolean} true or false
 */
function inMlsApp(){
	return Meilishuo && Meilishuo.config.os.mlsApp
}

function mlsReady(){
	var k = _mlsReady.length
		, i = 0

	for(; i < k; i++){
		var readyFn = _mlsReady.shift()
		readyFn()
	}
}

function schemeSplice(type, params){
	params = params || {}
	return 'meilishuo://' + type + '.meilishuo/?json_params=' + encodeURIComponent(JSON.stringify(params))
}

function launchScheme(type, params){
	if(params && params.success){
		var succFn = params.success
		delete params.success

		launchCallback(type, succFn)
	}

	window.location.href = schemeSplice(type, params)
}

function addSchemeAttr(obj, attrs){
	attrs.map(function(attr){
		obj[attr] = function(params){
			return launchScheme(attr, params)
		}
	})
}

function launchBridge(type, params){
	params = params || {}
	var cbk = function(res){ return true }

	if(params.success){
		cbk = params.success
		delete params.success

		if(type == 'login'){
			MeilishuoJSBridge.on('login', cbk)
			cbk = ''
		}
	}
	MeilishuoJSBridge.invoke(type, params, cbk)
}

function addBridgeAttr(obj, attrs){
	attrs.map(function(attr){
		obj[attr] = function(params){
			return launchBridge(attr, params)
		}
	})
}

function loadBridge(){
	addBridgeAttr(MLSBridge, MeilishuoJSBridge.apiList)
	delete window.MLS

	mlsReady()
}

function launchCallback(type, cbk){
	if(typeof cbk != 'function') return

	window.MLS = window.MLS || {}
	window.MLS[MLS_SCEHEME[type]] = cbk
}

function mlsBridgeInit(){
	if(window.MeilishuoJSBridge){
		loadBridge()
		is_bridge = true
	} else {
		window.document.addEventListener("MeilishuoJSBridgeReady", function(){
			loadBridge()
			is_bridge = true
			clear(schemetime)
		}, false);

		// 延迟ready事件，防止页面load就执行客户端调起，同时也为等待bridge注入
		var schemetime = setTimeout(function(){
			// 老版本scheme构成
			addSchemeAttr(MLSBridge, OLD_SCHEME)

			mlsReady()
		}, 500)
	}
}

MLSBridge = {
	ready: function(cbk){
		if(typeof cbk == 'function'){
			_mlsReady.push(cbk)

			if(is_bridge){
				mlsReady()
			}
		}
	}
}

mlsBridgeInit()

return MLSBridge
