/*common*/
require('jquery')

var urlHandle = require('component/urlHandle');
var io = require('app/im/io')
//Meilishuo.config.im_url = 'ws://192.168.128.11:3090/'
//Meilishuo.config.im_url = 'ws://xhimserver.meilishuo.com/'
//Meilishuo.config.im_url = 'ws://172.16.5.44:3090/'
//Meilishuo.config.im_url = 'ws://hua.devlab5.meilishuo.com/'
//Meilishuo.config.im_url = 'ws://push.devlab5.meilishuo.com/'
Meilishuo.config.im_url = 'ws://hualab.meilishuo.com/'
//Meilishuo.config.im_url = 'ws://10.0.0.13:3080/'

//Meilishuo.config.im_url = 'ws://172.16.10.93:3090/'
//Meilishuo.config.im_url = 'ws://172.16.10.103:3090/'
//Meilishuo.config.im_url = 'ws://pushlab.meilishuo.com/'
//Meilishuo.config.im_url = 'ws://huahuaapi.meilishuo.com/'
//Meilishuo.config.im_url = 'ws://pushapi.meilishuo.com:3080'
//Meilishuo.config.im_url = 'ws://pushuserapi.meilishuo.com:3080'
//Meilishuo.config.im_url = 'ws://xhtcl.meilishuo.com/'


var urlparam = urlHandle.getParams(location.search)
var list = ["app_access_token", "source"]
var data = {}
$.each(list, function(k,v){
	urlparam[v] && (data[v]	= urlparam[v])
})

var query = urlHandle.http_build_query(data)
console.log(data, query)

Meilishuo.config.im_url += ('?' + query)

var socket = io.connect(Meilishuo.config.im_url)

window.socket = socket


var $board = $('.board')
	, $toid = $('#toid')

var log = function(event,data){
	var $info = $('<p>' + event + ' ' + JSON.stringify(data) + '</p>')
	$board.append($info)	
	$info[0].scrollIntoView()
}
$('#changeUserSend').on('click', function(){
	socket.emit('changeUser', {toid:$toid.val()})
})
$('#clean').on('click', function(){
	$board.html('')	
})

socket.on('open', function(data){
	log('open', data)
})
socket.on('ping', function(){
	log('ping')
})
socket.on('pong', function(){
	log('pong')
})
socket.on('testPush', function(data){
	log('testPush', data)
})
socket.on('kickoutPush', function(data){
	log('kickoutPush', data)
})
socket.on('changeUserPush', function(data){
	log('changeUserPush', data)
})
socket.on('connectTestPush', function(data){
	log('connectTestPush', data)
})
socket.on('connectPush', function(data){
	log('connectPush', data)
	socket.emit('changeUser', {toid:$toid.val()})
})
socket.on('talkListPush', function(data){
	log('talkListPush', data)
})
socket.on('messageListPush', function(data){
	log('messageListPush', data)
})
socket.on('close', function(data){
	log('close', data)
})

socket.on('intervarTestPush', function(data){
	log('intervarTestPush', data)
})

window.onbeforeunload = function (e) {
	e = e || window.event;
	var txt = "关闭浏览器将不能及时的收到新消息和声音提醒。"
	// 兼容IE8和Firefox 4之前的版本
	if (e) {
		e.returnValue = txt
	}

	// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
	return txt
};
