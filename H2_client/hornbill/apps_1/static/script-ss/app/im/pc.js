/*common*/
var shareTmp = require('component/shareTmp')
	, key = require('app/im/key')
	, dialog = require('ui/dialog')
	, userList = require('app/im/userList')
	, userSearch = require('app/im/userSearch')
	, pc_simple = require('app/im/pc_simple')

	, $userSearch = $('#im_search')

var init = function(socket){
	pc_simple.init(socket)
	init_key();
}

var init_key = function(){
	// ctrl+up/down for switch user
	key.bindKeyPress({
		cb100:userList.toPrevUser
		,keyCode:38
	});
	key.bindKeyPress({
		cb100:userList.toNextUser
		,keyCode:40
	});

	//enter key for search user
	userSearch.init($userSearch)
	key.bindKeyPress({
		keyCode : 13
		,parent : '#mlsSearchId'
		,cb000 : function($target){
			$target.parents('form').submit()
		}
	})

	//esc key for close current user dialog
	key.bindKeyPress({
		keyCode : 27
		,cb000 : function(){
			if(!userListObj[fml.vars.im.toid]) return;
			if(userListObj[fml.vars.im.toid].closeStatus) return;
			userList.closeDialog(fml.vars.im.toid)
		}
	})
}


exports.init = init
exports.reloadUser = pc_simple.reloadUser
exports.backLogin = pc_simple.backLogin

