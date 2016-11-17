/*common*/
return function(socket, $banner){
	socket.on('connect', function (data) {
		$banner.text('连接成功').hide()
	})
	socket.on('connecting', function(){
		$banner.text('正在连接...').show()
	})
	socket.on('disconnect', function (data) {
		$banner.text('连接已断开').show()
	})
	socket.on('connect_failed', function(){
		$banner.text('连接失败').show()
	})
	socket.on('reconnect_failed', function(){
		$banner.text('重连失败').show()
	})
	socket.on('reconnect', function(){
		$banner.text('成功重连').show()
	})
	socket.on('reconnecting', function(){
		$banner.text('正在重连...').show()
	})
}
