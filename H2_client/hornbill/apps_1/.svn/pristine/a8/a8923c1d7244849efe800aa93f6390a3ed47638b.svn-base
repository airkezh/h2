/*common*/
var shareTmp = require('component/shareTmp')
	, info = require('app/im/info')
	, pal = require('app/im/pal')

var init = function(parentObj , btn, data){
	if(!data || !data.length) return;

	var $pal = $(shareTmp("im_transfer_item" , {transfer : data}))
		, $parentObj = $(parentObj)

	var fn = function(hidePal){
		$pal
			.on('click', 'li', function(){
				if(!fml.vars.im.toid) return;

				var nickname = $(this).children('a').text()

				var data = {
					transto : $(this).attr('uid')
					, nick : nickname
					, to : fml.vars.im.toid 
				}
				$.get('/www/aj/transfer', data, function(res){
					console.log('transferPush', res)

					info.info(userListObj[data.to].mainBox, res.message)
					
				}, 'json')
				.fail(function(){
					info.info(userListObj[data.to].mainBox, '转接失败！' + '<span>' + nickname + '</span>')
				})

				info.info(userListObj[data.to].mainBox, '正在转接<span>' + nickname + '</span>...')

				$(this).parents('ul').stop().hide()
			})
	}

	pal.init($parentObj , btn , $pal, {
		fn : fn
		, bottom : true
		, right:true
	})
}

exports.init = init 

