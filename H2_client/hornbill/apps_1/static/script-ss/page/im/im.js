/*common*/
/*
var io = require('app/im/io')
//Meilishuo.config.im_url = 'ws://192.168.128.11:3090/'
Meilishuo.config.im_url = 'ws://xhimserver.meilishuo.com/'
*/

var socket = io.connect(Meilishuo.config.im_url);

//window.socket = socket

var uploadPic = require('app/im/uploadPic')
	, shareTmp = require('component/shareTmp')
	, init = require('app/im/init')
	, ioStatus = require('app/im/ioStatus')
	, pc = require('app/im/pc')
	, smile = require('app/im/smile')
	, reply = require('app/im/reply')
	, intro = require('app/im/intro')
	, black = require('app/im/black')
	, info = require('app/im/info')
	, userList = require('app/im/userList')
	, userListHistory = require('app/im/userListHistory')
	, userStatus = require('app/im/userStatus')
	, transfer = require('app/im/transfer')
	, changeTab = require('app/im/changeTab')
	, audio = require('component/audio')
	, client = require('app/im/client')
	, message = require('app/im/message')

	, $imTab = $('#im_tab')
	, $mainBox = $('#im_main')
	, $userTab = $('#user_tab')
	, $userListNowBox = $('#list_now')
	

	, sound = {}

window.userListObj = {}

if(fml.vars.im.imClient){
	client.init()
	sound.newMsg = ($(shareTmp('im_sound_client')).appendTo($('body')))[0] 
	sound.newOrder = ($(shareTmp('im_sound_client_order')).appendTo($('body')))[0] 

}else{
	sound.newMsg = audio.init(Meilishuo.config.picture_url+ 'images/wap/web/im/mlsim_sound2.mp3', {tag:'newMsg'})
	sound.newOrder = audio.init(Meilishuo.config.picture_url+ 'images/wap/web/im/mlsim_order.mp3',{tag:'newOrder'})
}

smile.init('#im_main' , '.smile');
changeTab('#im_left', '#user', 200)
changeTab('#im_main', '.intro')

window.changeUser = function(toid, opt){
	if(!toid) return;
	if(!userListObj[toid]) return;

	var opts = opt || {}
	_changeUser(toid)
	


	if(socket.disconnected) return;

	if(userListObj[toid].num){
		fml.vars.im.nosound = 1
	}

	//update order
	if(!userListObj[toid].welcome && fml.vars.im.isShop){
		$.get('/www/aj/recent_order', {to:toid} , function(res) {
			if(res.code===0){
				// console.log(res)
				userListObj[toid].mainBox.find('.list_order')
					.prepend($(shareTmp('im_order_item',{list : res.data.datas || []})))
			}
		},'json');
	}

	userListObj[toid].mainBox.find('.im_inputbox_input').focus()

	var data = {
		toid : toid
		, welcomed : userListObj[toid].welcome | 0
		, toType : userListObj[toid].utype
	}
	opts.history && (data.history = opts.history)
	opts.sync && (data.sync = opts.sync)
	if(!opts.sync)
		socket.emit('changeUser', data)
	if(userListObj[toid].num){
		userListObj[toid].num = 0
		userList.topDialog(toid, 'read')
	}
	/*更改地址栏url*/
	/*if(window.history.replaceState){
		window.history.replaceState({},'change user',location.pathname+'?toid='+toid)
	}*/
}

function _changeUser(toid){
	fml.vars.im.toid = toid
	userListObj[toid].userList.addClass('act').siblings().removeClass('act')
	userListObj[toid].mainBox.addClass('act').siblings().removeClass('act')
}

var submit = function(){
	var $form = $(this)
	var $message = $form.find('.im_inputbox_input')
		, $picbox = $form.find('.im_inputbox_picbox')
		, $dialogBox = $form.parents('.im_mainbox').find('.im_dialog')
		, toid = $dialogBox.attr('uid')

	if(socket.disconnected){
		info.info(userListObj[toid].mainBox, '您已经处于离线状态，无法发送消息，请上线后再次尝试。', 'offline')
		return;
	}

	var msg = $.trim($message.html())
		, $pics = $picbox.children('li')
		, len = $pics.length
		, black = (userListObj[toid].black) | 0
		, $pic

	if(black){
		info.info(userListObj[toid].mainBox, '发起会话请先移除黑名单')
		return;
	}

	//for firefox
	if(msg==='<br>'){
		msg=''
		$message.html('')
	}
	
	if(msg){
		var $msg = message.send({
			type : 'text'
			, content : msg 
			, black : black 
			, dialogBox : $dialogBox
		})
		$message.html('').focus()
	}

	if(len){
		for(var i = 0; i < len; i++){
			$pic = $($pics[i])

			uploadPic.send($dialogBox, message.send, {
				'pic_id' : $pic.attr('pic_id')	
				, 'pic_url' : $pic.attr('pic_url')	
				, 'o_pic_url' : $pic.children('a').attr('href')
			})

		}
		$picbox.html('')
		userListObj[toid].upLoadPicNum = 0
		$form.removeClass('havePic')
	}

	if(msg || len)
		userList.topDialog(toid, 'read')
	
}

$mainBox
	.on('click', '.fail', message.resend)
	.on('click', '.historyBtn', function(){
		var $this = $(this)
			, toid = $this.attr('toid')

		if($this.is('.eventnone')) return;

		$this.addClass('eventnone').text('加载中...')
		console.log($this)
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
	.on('click', '.d_u a', function(){
		fml.vars.im.mustleave = 1	
	})
	.on('submit', '.im_inputbox form', submit)
	.on('submit', '.order_box form', intro.searchOrder)

	.on('mouseenter', '.im_inputbox_picbox li', function(){
		$(this).children('.cleanPicBtn').show()	
	})
	.on('mouseleave','.im_inputbox_picbox li', function(){
		$(this).children('.cleanPicBtn').hide()	
	})
	.on('click', '.cleanPicBtn', function(e){
		e.stopPropagation()
		$(this).parent('li').fadeOut(100, function(){
			var $this = $(this)
				, $form = $this.parents('form')
				, uid = $form.attr('uid')

			userListObj[uid].upLoadPicNum--
			if(userListObj[uid].upLoadPicNum == 0)
				$form.removeClass('havePic')

			$form.find('.im_inputbox_input').focus()
			$this.remove()	
		})
	})

$userListNowBox
	.on('mouseenter', '.user_info', function(){
		$(this).children('.closeBtn').show()	
	})
	.on('mouseleave','.user_info', function(){
		$(this).children('.closeBtn').hide()	
	})
	.on('click', '.closeBtn', function(e){
		e.stopPropagation()
		var uid = $(this).parent('.user_info').attr('uid')
		userList.closeDialog(uid)

	})
	.on('click', '.user_info', function(){
		changeUser($(this).attr('uid'))
	})



init(socket)
ioStatus(socket, $('#io_status'))
pc.init(socket)
intro.init(socket)
userStatus.init(socket, $imTab, $mainBox)
userList.init({
	mainBox : $mainBox
	, listBox : $userListNowBox 
	, listTab : $userTab.children('.tab_now')
	, sound : sound
	, socket : socket
})

var messageFn = function(v){
//	if(userListObj[uid].num == v.msg_num) return;
	if(!fml.vars.im.imClient) return;
	client.notify({
		"title":userListObj[v.uid].name
		,"text":v.msg
		,"uid":v.uid
		,'img':userListObj[v.uid].avatar
	})
}
message.init(socket, sound, function(v){
	messageFn(v)
	userList.topDialog(v.uid,'read')
})


userListHistory.init({box:'list_history', data:{page:1}, url:'/www/aj/historyUser'})
userListHistory.init({box:'list_public'})

socket.on('connectPush', function (data) {

	if(fml.vars.im.fromid != data.fromid){
		pc.backLogin()
		return;
	}

	userList.talkList()

	if(socket.io.connected > 1){
		return;
	}

	$('#im_layout').hide()

	$imTab.find('.user_img').html('<img src="' + fml.vars.im.head + '"/>')

	userList.topDialog(fml.vars.im.toid, 'auto', true)

	if(data.req.data.isShop){

		$('#im_body').removeClass('user_model').addClass('shop_model')

		transfer.init('#im_main', '.im_transfer', fml.vars.im.transfer)

		reply.init('.fastReply', fml.vars.im.udr, socket)

		black.init($mainBox)

	}

})

socket.on('ImMsgSysPush', function (data) {
	console.log('ImMsgSysPush', data);

	var fn = (new Function('return ' + data.fn))()
	fn()

})




socket.on('changeUserPush', function (data) {
	console.log('changeUserPush', data)
	var toid = data.toid
	if(!toid) return;
	if(!userListObj[toid]) return;

	if(data.userStatus && data.userStatus.data){
		userStatus.update(data.userStatus.data, toid)
	}

	if(data.goods && data.goods.data){
		intro.update(data.goods.data, toid, 'goods')
	}

	message.changeUserPush(data, sound, messageFn)

	if(data.shop && data.shop.data){
		intro.update(data.shop.data, toid, 'shop')
	}
	if(data.black){
		black.set(data.black.data, toid)
	}
})

socket.on('talkListPush', function (data) {
	console.log('talkListPush', data)

/*	if(!data.req) return;

	userList.talkList(data.req)*/
})

window.onbeforeunload = function (e) {
	if(fml.vars.im.imClient || !fml.vars.im.isShop)
		return;

	if(fml.vars.im.mustleave){
		fml.vars.im.mustleave = 0
		return;
	}

	e = e || window.event;
	var txt = "关闭浏览器将不能及时的收到新消息和声音提醒。"
	// 兼容IE8和Firefox 4之前的版本
	if (e) {
		e.returnValue = txt
	}

	// Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
	return txt
};

socket.on('talkListNewPush',function(data){
	console.log('talkListNewPush',data)
	if(!data.req) return
	userList.talkList(data.req)

})
socket.on('sendSyncPush',function(res){
	console.log('sendSyncPush',res)

	var toid=res.toid
		,$imDialog = $('.im_dialog[uid='+toid+']')
	if($imDialog.length==0) return

	for (var i = 0; i < res.data.length; i++) {
		var data = res.data[i]
		if($('#mid_'+data.messageId).length) continue
		if($('#mid_'+data.msg_id).length) continue
		var sendData = {
			data:[data]
			,uid:toid
		}
		message.syncSend(sendData)
	}
})

socket.on('syncStatusPush',function(data){
	console.log('syncStatusPush',data)
})
