/*common*/
require('page/im/huahua2.0hack')
var $ = require('jquery')
	, message = require('app/im/message')
	, uploadPic = require('app/im/uploadPic')
	, info = require('app/im/info')

//init
initUserlistobj()
initButton()
function initUserlistobj(){
	window.userListObj = {}
	window.userListObj[fml.vars.im.toid] = {
		mainBox : $('.im_main_item')
		,utype : fml.vars.im.to_utype
	}
}
function initButton(){
	$('.im_main_item')
		.on('click', '.fail', message.resend)
		.on('click', '.historyBtn', function(event) {
			var $this = $(this)
			, toid = fml.vars.im.toid

			if($this.is('.eventnone')) return;

			$this.addClass('eventnone').text('加载中...')
			var utype = userListObj[toid].utype
			var ajUrl = utype==='public' ? '/www/aj/publicHistory' : '/www/aj/history'
			$.get(ajUrl, {
				msg_id : userListObj[toid].history || 0
				, limit : 10
				, to : toid
				, source: fml.vars.im.source

			}, function(res){
				message.history(res, toid)
				$this.removeClass('eventnone').text('查看历史聊天记录')

			}, 'json')
			.fail(function(){
				$this.removeClass('eventnone').text('加载失败，请重试')
				
			})
		})
}

if(!window.MLS) window.MLS = {}
window.MLS.sendMessage = function(data){
	eval('data='+data)
	if(data.type === 'text'){
		sendText($('.im_dialog'),data.text)
	}
	if(data.type === 'img'){
		sendImg($('.im_dialog'),data.imgs)
	}
	if(data.type === 'mix'){
		sendText($('.im_dialog'),data.text)
		sendImg($('.im_dialog'),data.imgs)
	}
	function sendText($dialogBox,text){
		message.send({
			type : 'text'
			, content : text 
			, black : fml.vars.im.is_black 
			, dialogBox : $dialogBox
		})
	}
	function sendImg($dialogBox,imgs){
		for (var i = 0; i < imgs.length; i ++) {
			uploadPic.send($dialogBox, message.send, {
				'pic_id' : imgs[i].pic_id
				, 'pic_url' : imgs[i].pic_url
				, 'o_pic_url' : imgs[i].o_pic_url
			})
		}
	}
}

window.MLS.recieveMessage = function(p){
	eval('p='+p)
	var data = p.data
		,type = p.type
	if(type==='sys'){
		info.info($('.im_dialogbox'),data)
	} else if(type==='trans'){
		if(data[0].msg){
			info.info($('.im_dialogbox'),data[0].msg)
		}
		message.messageList({transdata:data}, fml.vars.im.toid)
	} else {
		message.messageList({data:data}, fml.vars.im.toid)
	}
}