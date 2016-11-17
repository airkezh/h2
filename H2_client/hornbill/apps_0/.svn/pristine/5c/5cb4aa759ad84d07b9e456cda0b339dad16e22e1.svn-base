/*common*/
var shareTmp = require('component/shareTmp')
	, intoView = require('app/im/intoView')

var introData = {
	goods : ['商品', 'twitter_id', 'tid']
}

var init = function(socket){
	socket.on('goodsPush', function(data){
		console.log('goodsPush', data)
		
		if(!userListObj[data.toid]) return;

		update(data.req.data, data.toid, 'goods')
	})
}

var update = function(data, toid, type){
	if(!data || data.length == 0) return;

	var $tmp = $(shareTmp('im_' + type + '_item', {data : data}))
		, $dialog = userListObj[toid].mainBox.find('.im_dialog')

	$tmp.appendTo($dialog)
	intoView($tmp, $dialog)
}

exports.init = init
exports.update = update

