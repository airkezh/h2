fml.define('app/tracking',['jquery' , 'component/iStorage'] , function(require , exports){
	var $ = require('jquery'),
		storage = require('component/iStorage')
	var logSendTo = '//sense.meilishuo.com/',
		try_get_id = 10
	var device_id,
		pageid = (new Date).getTime(),
		seqid = 0
	if ('newlab.meilishuo.com' ==  window.location.host) logSendTo = '//senselab.meilishuo.com/'


	storage.get('device' , function(id){
		if ('undefined' == id) id = null
		device_id = id || storage.set('device' ,  genId() )
		})
	function getUid(size){
		var chars = "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ"
		var id = '',id_pre = size 
		while (id_pre --)
			id += chars.substr( Math.floor(Math.random() * 62) , 1 )
		return id
		}
	function genId(){
		device_id  = getUid(10) + '-' + ((new Date).getTime() - (new Date(2012,6,1)).getTime())
		deviceData()
		return device_id
		}
	function build_query(data){
		var q = []
		for (var key in data){
			q.push(key + '=' + encodeURIComponent(data[key]))
			}
		return q.join('&')
		}
	function deviceData(){
		var user_id = 'unknown'
		if (Meilishuo && Meilishuo.config)
			user_id = Meilishuo.config.user_id
		mkLog('device' , {
						'refer' : document.referrer ,
						'userid' : user_id,
						'w_w' : window.screen.width,
						'w_h' : window.screen.height 
					})	
		
		}
	function onLeaving(fnc){
		var _before = window.onbeforeunload
		window.onbeforeunload = function(e){
			fnc()
			_before && _before()
			}
		}
	function perDay(){
		// location
		/*
		navigator.geolocation.getCurrentPosition(function(){
			})
		*/
		}
	function perVisit(){
		//site_refer site_userid 
		var doc = document.documentElement || document.body
		var wname = window.name
		if (!wname) wname = window.name = getUid(6) 
		mkLog('pv/in' , {'refer' : document.referrer ,
						'url' : window.location.href,
						'win' : wname ,
						'userid' : Meilishuo.config.user_id,
						'b_w' : doc.clientWidth,
						'b_h' : doc.clientHeight 
					})	
		
		onLeaving(function(){
			mkLog('pv/out' ,{'pgout':  (new Date).getTime() })
			})	
		}
		
	function mkLog(type ,data){
		//device_id pgid seqid
		if (!device_id ){
			if (try_get_id--)
				return window.setTimeout(function(){
					mkLog(type ,data)
					} , 25)
			device_id = 'unknown'
			}
		type = type ? type + '/' :  ''
		type += '?'
		var logMaxLen = 2000

		var paramCount = 0,
			pLeftLen,
			postUrl
		
			
		for (var key in data){
			var v = data[key]
			if (!v) {continue;}
			if ('function' == typeof v)  v = v()
			else if ('object' == typeof v &&  v.length)  v = v.join('+')
			else v = encodeURIComponent(v)
			data[key] = v
			paramCount++
			}			

		seqid++
		
		while (paramCount>=0){
			postUrl = build_query({'device_id': device_id , 'pgid' : pageid , 'seqid':seqid})

			for (var key in data) {
				var postv = data[key]
				if (undefined === postv) continue
				pLeftLen = logMaxLen - postUrl.length
				if (pLeftLen <=0 ) break
				if (key.length + postv.length > pLeftLen){
					var tmpv = postv.substr(0 ,pLeftLen)
					var tmpi = tmpv.lastIndexOf('+')
					if (tmpi >-1) {
						data[key] = postv.substr(tmpi + 1)
						postv = postv.substr(0 ,tmpi)
					}else{
						data[key] = postv.substr(pLeftLen)
						postv = tmpv 
						} 
						
						
				} else {
					delete data[key]	
					paramCount--
					}
				postUrl += '&' + key + '=' + postv;
					
				}
				paramCount--;
				 var logWorker = new Image;
				 logWorker.src = logSendTo + type +  postUrl;
				 //console.log(logWorker.src)
			}
		}

	exports.logIt = function(type , data){
		mkLog(type , data||{} )
		}
	exports.cr = function(param , data){
		mkLog('cr/' + param , data||{} )
		}

	exports.logClick = function(elepr , attr ,logtype){
		var clicks = []
			,logtype = logtype || 'click'

		function sendClickLog(){
			mkLog(logtype , {'click' : clicks})
			clicks = []
			}
		function mkClickLog(evt){
			evt = evt || window.event
			var ld = [evt.pageX , evt.pageY]
			ld.push((elepr ? this : evt.target).getAttribute(attr || 'frm') || '' 	 )
			clicks.push(ld.join(',') )
			delete ld
			if (clicks.length > 5 || elepr)  sendClickLog() 
			}	
		if (elepr){
			$(document).on('click',elepr , mkClickLog)
		}else{
			$(document).click(mkClickLog)
			onLeaving(sendClickLog)	
		}
		return this
		
		}

	 exports.logPoster = function(){

		function getPosterId(data){
				if (!data || !data.tInfo)  return
				var ids = []
				try{

					for (var i=0,j = data.tInfo.length ; i <j ; i++)
							ids.push(data.tInfo[i].twitter_id )

					mkLog('poster' , {'site_userid': Meilishuo.config.user_id ,
									  'site_refer': window.location.pathname,
									  'site_tid' : ids})
				}catch(err){}

			}
		fml.eventProxy('logPoster' , getPosterId)
		return this

		}	
		
	perVisit()
	});
