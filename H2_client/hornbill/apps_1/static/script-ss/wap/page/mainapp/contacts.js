/*common*/
var $ = require( 'wap/zepto/touch' )
var followUser = require('wap/app/followUser')

var isIos = Meilishuo.config.os.ios
var $friendList = $('.is-aimeilier')
var $friend = $friendList.find('.a-friend')
var $noOnePic = $('.no-one')

if($friend.length > 0){
	var configSingle = {
		el: '.js-focus',
        followClass: 'done',
        unfollowClass: 'ready',
        follow: '关注',
        unfollow: '取消关注',
        events: {}
	}
	
	followUser.follow( configSingle )
}else{ 
	$friendList.hide() 
	$noOnePic.show() 
}

//用户关闭授权的回调
MLS.onUploadContactsDenied = function (){
	if(isIos){
		location.replace('/mainapp/contacts/?status=denied')
	}
}

//上传完通讯录的回调
MLS.onUploadContactsComplete = function (){
	location.replace('/mainapp/contacts/?status=authorized')
}
