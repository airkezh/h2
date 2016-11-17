/*common*/
var imClient = require('app/imClient')
	, savepass = require('app/im/savepass')

//imClient.send({'closeWin': {}})
var clientWin = {
	'hideMainBox' : function(){
		imClient.send({'reWin' :{
			"width" : 180 
			, "height": 600
		}})
	}	
	, 'showMainBox' : function(){
		imClient.send({'reWin' :{
			"width" : 950 
			, "height": 720
		}})
	}
	, 'openURI' : function(url){
		imClient.send({'openURI': url})
	}
}

var init = function(){
	if(!fml.vars.im.fromid){
		imClient.send({'reWin' :{
			"url" : '/www/login/'
		}})
	}else{

		savepass.avatar({
			avatar : Meilishuo.config.avatar_c 
		});

		clientWin.showMainBox()

		imClient.on('changeUser' , function(uid){
			console.log('changUser===' + uid)
			changeUser(uid)
		})
		imClient.on('paste' , function(){
			userListObj[fml.vars.im.toid].mainBox.find('.im_inputbox_input')[0].focus()
			document.execCommand('paste')
		})

		imClient.on('logout' , function(){
			$.get('/www/aw/logout', {}, function(){
				
			}, 'json')
		})

		//测试客户端截图
		$('body')
			.on('click', '.screenShot', function(){
				imClient.send({'screenShot':true})	
			})

		setLink()

	}
}
var setLink = function(){
	$('body')
		.on('click', 'a', function(e){
			e.preventDefault();	
			imClient.send({'openURI': $(this).attr('href')})
		})
}

var notify = function(opts){
	if(fml.vars.im.imClient){
        var defaults = {
			uid : 0
			, title : ''
			, text : ''
			, img : ''
        }
		imClient.send({'notify': $.extend({}, defaults, opts)})
	}
}

var screenShot = function(){
	imClient.send({'screenShot':true})
}

exports.init = init
exports.notify = notify
exports.clientWin = clientWin
exports.screenShot = screenShot
exports.setLink = setLink

