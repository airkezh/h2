/*common*/
var connect = function(url, opts){
	var socket = new WebSocket(url)

	socket.on = function(event, fn){
		if(event == 'message' || event == 'open' || event == 'close' || event == 'error')
			socket.addEventListener(event, fn)
		else
			socket.addEventListener(event, function(e){fn(e.detail);})
	}

	socket.emit = function(event, data){
		socket.send(JSON.stringify({'event':event, 'data':data}))
	}

	socket.on('message', function(data){
		var data = JSON.parse(data.data)
		socket.dispatchEvent(new CustomEvent(data['event'], {'detail':data['data']}))
	})

	return socket
}

exports.connect = connect
