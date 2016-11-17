/*common*/
var append = require('wap/app/append');

var scroll = function(opts, add){
	// opts.poster.set(opts)

	opts.box = '.posterWall'
	opts.data = {
		page : opts.page || 0 
	}
	opts.filter = function(res){
		return res.data.big
	}
	opts.action = opts.poster.add

	append.init(opts)
	append.append(opts)

	if(add){
		opts.data.page++
		append.append(opts)
		opts.data.page--
	}
	append.scroll(opts)

	//自动滚动测试
	// $('body').append("<span id='test' style='position:fixed;right:0;top:0;font-size:30px;color:red;background:#fff;'></span>")
	// setInterval(function() {
	// 	$('body')[0].scrollTop += 50;
	// 	$('#test').html('当前页码：'+opts.data.page);
	// }, 100)
}

exports.scroll = scroll

