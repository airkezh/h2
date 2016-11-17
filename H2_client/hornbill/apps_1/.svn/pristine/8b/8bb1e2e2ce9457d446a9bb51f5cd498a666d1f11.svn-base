/*common*/
var shareTmp = require('component/shareTmp')
	, info = require('app/im/info')

var blackObj = [
	['create', '添加']	
	, ['remove', '移除']
]
var changeStatus = function( status, uid){
	userListObj[uid].mainBox.find('.im_user_tools')
		.children('ul').hide()

		.find('.im_black')
		.data('status', status)
		.children('a').html('<span class="i_black">&nbsp;</span>' + blackObj[status][1] + '黑名单')

	userListObj[uid].black = status + '' 
}
var init = function($mainBox){
	$mainBox
		.on('mouseenter','.im_user_tools', function(){
			$(this).children('ul').show()
		})
		.on('mouseleave','.im_user_tools', function(){
			$(this).children('ul').hide()
		})
		.on('click', '.im_user_tools .im_black', function(){

			var status = $(this).data('status') | 0
				, uid = $(this).parents('.im_user_tools').attr('uid')

			if(!userListObj[uid].black || status == -1) return;

			var data = {
				to : uid
				, type: blackObj[status][0]
			}
			info.info(userListObj[uid].mainBox, '正在'+ blackObj[status][1] +'黑名单...')
			$(this).data('status', -1)

			$.get('/www/aj/blacklist', data, function(res){
				info.info(userListObj[uid].mainBox, blackObj[status][1] + '黑名单' + (res.successful == '1' ? '成功' : '失败'))
				changeStatus( (!status)|0, uid)

			}, 'json')
			.fail(function(){
				info.info(userListObj[uid].mainBox, '添加黑名单失败！')
			})
		})
}

var set = function(status, uid){
	
	if(!userListObj[uid]) return;

	if(status == userListObj[uid].black) return;

	if(status == 1)
		info.info(userListObj[uid].mainBox, '该用户已被添加黑名单')

	changeStatus( status, uid)
}

exports.init = init
exports.set = set
