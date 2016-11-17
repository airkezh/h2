/*common*/

require('wap/zepto/touch')

var Share = require('wap/app/shareTo4')
var openAppCustom = require('wap/app/openAppCustom')

var $contacts = $('.contacts')
var $wxFriends = $('.wx-friends')
var $wxCircle = $('.wx-circle')

var Config = Meilishuo.config
/*
 *@param  appContactsAuthorizationStatus
 *@value  not_determined：未授权
 *        authorized：已授权
 *        denied：已关闭
 */
var appContactsAuthorizationStatus = 'not_determined'

var SHARE_TEXT = '我在美丽说发现很多漂亮的衣服，遇到很多同好，你也快来玩儿吧！'
var SHARE_TITLE = '邀请你来美丽说'
var SHARE_PIC = 'http://d02.res.meilishuo.net/pic/_o/66/cc/8677209a088f37af5b79c3e64d7b_200_200.cf.jpg' 
var SHARE_URL = 'http://' + location.host + '/mainapp/springboard/'

var data = {
	'text': SHARE_TEXT,
	'title': SHARE_TITLE,
	'pic': SHARE_PIC,
	'url': SHARE_URL
}

if(Config.user_id){
	data.text = '我在美丽说发现很多漂亮的衣服，遇到很多同好！你也快来玩儿吧！在美丽说里搜“' + Config.nickname + '”，加我！'
	data.pic = fml.vars.avatar
	data.url += '?user_id=' + Config.user_id
}

$wxFriends.on('click', function (){
	Share.shareToPengYou(data)
})

$wxCircle.on('click', function (){
	Share.shareToPengYouQuan(data)
})

$contacts.on('click', function (){
	if(Config.user_id == 0){
		location.href = 'meilishuo://login.meilishuo/';
		return
	}
	var cookiesStr = document.cookie 
	var cookies = readCookie(cookiesStr)
	appContactsAuthorizationStatus = cookies['app_contacts_authorization_status']
	location.href = '/mainapp/contacts/?status=' + appContactsAuthorizationStatus

})

MLS.didLogin = function() {
	location.reload()
}

function readCookie(str){
	if(!str)return
	var cookies = {}
	var p1, p2, index
	var a = str.split(';')

	a.forEach(function (v, k){
		index = v.indexOf('=')
		p1 = v.slice(0, index)
		p2 = v.slice(index+1)
		cookies[p1.trim()] = (p2 || '').trim()
	})

	return cookies
}