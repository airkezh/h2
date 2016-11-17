/*common*/
var openAppCustom =  require('wap/app/openAppCustom')
var urlHandle = require('wap/component/urlHandle')

var query = urlHandle.getParams(location.href.toString())
var userId = query.user_id
var scheme = 'meilishuo://open.meilishuo/'

openAppCustom.check(function (hasApp){
	if(hasApp){
		if(userId){
			scheme ='meilishuo://person.meilishuo/?json_params=' + encodeURIComponent(JSON.stringify({
				'user_id' : userId
			}))
		}
		location.href = scheme
		setTimeout(function (){
			location.href = '/download/'
		}, 1000)
	}else{
		location.href = '/download/'
	}
})