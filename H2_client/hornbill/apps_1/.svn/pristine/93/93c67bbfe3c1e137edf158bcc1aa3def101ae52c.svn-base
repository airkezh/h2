/*common*/
var  $ = require('jquery')
	,checkLogin = require('app/checkLogin')
	,urlHandle = require('component/urlHandle')
	
var im_url = Meilishuo.config.im_url
var popWinStatus = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=952, height=720'	
var isPadApp = window.isPadApp 


function callQQ(im_win , ele, qq){
	if (!qq) {
		try {
			im_win.close()
		}catch(err){
			console.log(err)
			}
		return
	}
	try{
		im_win.fml.vars.im.mustleave = 1
	}catch(err){
		console.log(err)
		}
	var lctn = 'http://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=qq&menu=yes'
	ele.href = lctn
	ele.setAttribute('target','_blank')
	im_win.name = '_qq_'
	im_win.location = lctn
	/*
	window.setTimeout(function(){
		im_win.close()
		}, 1000)
	*/
	} 


function callIMSimple(param){
	var imParam = {
		'fromid' :  param.from
		,'toid' : param.toid
		,'tid' : param.tid
	}
	$('<iframe allowtransparency="true" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"/>')
		.attr({
			src : Meilishuo.config.im_url + 'www/simple/?' + urlHandle.http_build_query(imParam)
		})
		.css({
			width:"600"
			, height:"420"
			, position:"fixed"
			, "z-index":1000
			, visibility:"visible"
			, opacity:1
			, right:"60px"
			, bottom:"40px"
		})
		.appendTo($('body'))

}

//callIMSimple({})

function callIM(im_win ,ele , param){
	try {
		ele.href = '###'+ [param.toid, '' ,param.shop_id , param.type , param.tid].join('-')
		console.log(ele.href)
		delete param.shop_id
		var imParam = {
			'fromid' :  param.from
			,'toid' : param.toid
			,'tid' : param.tid
			
			}

		var hrf = '/im/?'+ urlHandle.http_build_query(imParam) 
		//if (!im_win.location || 'about:blank' == im_win.location ||  im_win.location.href.indexOf(hrf) == -1 ) im_win.location = hrf
		if (isPadApp || !im_win.location || 'about:blank' == im_win.location  ) im_win.location = hrf
		else {
			im_win.changeUser(param.toid)
			}
		
	}catch(err){
		//打开过 qq  
		console.log(err)
		im_win.location = hrf
		//im_win.close()
		}
	}
exports.reCallImWin = function(){
	if(!checkLogin()) return
	var im_win = window.open('','_im_', popWinStatus)
	try {
		if (!im_win.location || 'about:blank' == im_win.location) {
			im_win.location = '/im/'
		}
	}catch (err){
		console.log(err)
		}
	im_win.focus()
	return false
	}
	

exports.bind = function(btn , opt){
	opt = opt || {}
	var popWin = opt.popWin || popWinStatus 

    $(btn).click(function(){
		
		if (!checkLogin()) return false
		var ele = this
		var info = ele.hash
		if ('###' != info.slice(0 , 3)) return true
		if (isPadApp){
			var im_win = window	
		}else{
			var im_win = window.open('','_im_', popWin)
		}
		if (!im_win) return false	

		info = info.slice(3).split('-')
		var im_id = info[0]
			,qq = info[1]
			,shop_id = info[2]
			,type = info[3]
			,tid = info[4]
		var user_id = Meilishuo.config.user_id


		var param = {'shop_id' : shop_id 
				,'tid' : tid 
				,'type' : type 
				,'from' :  user_id 
				,source : 'web'}

		function _cllQ(){
			callQQ(im_win , ele ,qq)
			}

		if (im_id < 0 ){
			if (qq){
				//call QQ
				_cllQ()
			}else{
				console.log('should close popup window')
				alert('用户没有绑定沟通工具')
				//fail close popup
			}
		}else {

			$.getJSON(im_url + 'im/init?callback=?' , param)
				.done(function(data){
						if (!data || 0 == data.successful || data.to <= 0) return _cllQ() 
						var to = data.to * 1

						param.toid = to	
						callIM( im_win, ele , param) 
					//	callIMSimple(param)

					} )
				.error(_cllQ)
			
			}
		im_win.focus()
        return false
        })

}
