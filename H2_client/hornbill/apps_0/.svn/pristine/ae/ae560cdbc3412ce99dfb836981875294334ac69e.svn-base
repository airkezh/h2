/*common*/
var shareTmp = require('component/shareTmp')
	, key = require('app/im/key')
	, dialog = require('ui/dialog')
	, userList = require('app/im/userList')
	, urlHandle = require('component/urlHandle')

var init = function(socket){

	socket.on('connectFailPush', function (data) {
		backLogin()
	})

	socket.on('kickoutPush', function (data) {
		var d = new dialog({
			content: $(shareTmp('im_info_offline', data))
			, width : 370
			, hasTitle : true 
			, hasClose : false
			, title : data['title']
			, notKeyClose : true
			, onStart : function(){
				this.content
					.on('click', '.reloadIM', function(){
					//	reloadUser()
						socket.io.connect()
						d.drive.destroyModel()
					})
					.on('click', '.closeIM', function(){
						backLogin()

						if(!fml.vars.im.imClient)
							window.close()
					})

			}
			, onClose : function(){
				
			}
	//		, notFrame : true
		//	, transparent : true
		});
	})

	init_key()

	socket.on('syncChangeUserPush', function (data) {
		console.log('syncChangeUserPush', data);
		var toid = data.toid
		if(!userListObj[toid]){
			$.get('/www/aj/user_info', {user_ids:toid}, function(res){
				// console.log('user_info',res)
				userList.prepend(res.data)
			},'json');
		}
		if(fml.vars.im.toid!=toid)
			changeUser(toid,{sync:true})
	})

}

function init_key(){
	//enter key for message submit
	key.bindKeyPress({
		keyCode : 13
		,parent : '.im_inputbox_input'
		,cb000 : function($target){
			$target.parents('form').submit()
		}
		,cb100 : function(){
			//禁用ctrl+enter
		}
	})

}

window.reloadUser = function(){
	fml.vars.im.mustleave = 1
	window.location.href = fml.vars.im.toid ? ('/www/?toid=' + fml.vars.im.toid) : '/www/'
}
var backLogin = function(from){
	var imParam = {}
	if(from){
		imParam.morf = from
	}
	if(fml.vars.im.toid){
		imParam.toid = fml.vars.im.toid
	}
	var imParamStr = urlHandle.http_build_query(imParam)
	fml.vars.im.mustleave = 1
	console.log(fml.vars.im.toid)
	window.location.href ='/www/login/' + (imParamStr?'?'+imParamStr:imParamStr)
}

exports.init = init
exports.reloadUser = reloadUser
exports.backLogin = backLogin

