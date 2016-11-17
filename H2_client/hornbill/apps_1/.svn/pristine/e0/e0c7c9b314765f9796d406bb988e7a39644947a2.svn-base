/*common*/
var userStatus = [
	['offline', '离线']
	, ['online', '在线']
	, ['leave', '离开']
]
var init = function(socket, $imTab, $mainBox){
	socket.on('disconnect', function (data) {
		console.log('用户离线')
		change($imTab, 0, 'big')
		change($mainBox, 0, 'sl', true)
	})

	socket.on('connectPush', function (data) {
		fml.vars.im.reconnect = 1
		change($imTab, data.req.data.status, 'big')
	})

	socket.on('userStatusPush', function (data) {
		console.log('userStatusPush', data)

		if(!data.req || !data.req.data) return;
		update(data.req.data, data.toid)
	})

	$imTab
		.on('mouseenter', '.status', function(){
			$(this).children('.all_status').show()
		})
		.on('mouseleave', '.status', function(){
			$(this).children('.all_status').hide()
		})
		.on('click', '.all_status a', function(){
			var $btn = $(this)

			$.get('/www/aj/status', {
				user_id : fml.vars.im.fromid
				, status : $btn.attr('status')
				, type : 'set'

			}, function(res){
				if(res.code != 0) return;

				var status = res.data.status

				$btn.parents('.all_status').hide()

				if(status == 0){
					fml.vars.im.reconnect = 0
					socket.io.disconnect()

				}else{
					fml.vars.im.reconnect = 1
					socket.io.connect()
					if(socket.connected){
						change($imTab, status, 'big')
					}
				}

			}, 'json')
		})
}

var update = function(data, toid){
	var statusNew = data.status || 0
		, is_mobile = data.is_mobile || 0
		, statusOld = userListObj[toid].status || 0
		, $box = userListObj[toid].mainBox.find('.im_top .user_info')
		, $userList = userListObj[toid].userList || $('.user_list:visible')
	if(is_mobile){
		userListObj[toid].mainBox.find('.im_top .mobile_online').show()
	} else {
		userListObj[toid].mainBox.find('.im_top .mobile_online').hide()
	}

	$box
		.removeClass(userStatus[statusOld][0])
		.addClass(userStatus[statusNew][0])
	$userList
		.removeClass(userStatus[statusOld][0])
		.addClass(userStatus[statusNew][0])

	userListObj[toid].status = statusNew

	change($box, statusNew, 'sl', true)
	change($userList, statusNew, 'simple')
}

var change = function($box, status, type, ta){
	//var tpl = '<span class="' + type + '_' + userStatus[status][0] + '">&nbsp;</span>'
	status = 1;
	var tpl = '<span class="' + type + '_' + userStatus[status][0] + '">&nbsp;</span>'

	ta && (tpl += 'TA')

	if(type != 'simple')
		tpl += userStatus[status][1]

	$box.find('.user_status').html(tpl)
}

exports.init = init
exports.change = change
exports.update = update
