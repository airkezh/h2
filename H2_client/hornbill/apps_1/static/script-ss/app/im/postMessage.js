/*common*/

var cbs = {}

exports.on = function(event,cb){
	cbs[event] = cb
}

window.onmessage= function(e){
	var data = e.data
	if(!data || !cbs[data]) return
	cbs[data]()
}

exports.postMessage = function(win,msg,domain){
	domain = domain || '*'
	if(win && win.postMessage){
		win.postMessage(msg,domain)
	}
}
