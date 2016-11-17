/*common*/
var append = require('wap/app/append2');

var scroll = function(opts, add){
	// opts.poster.set(opts)

	opts.box = '.posterWall'
	opts.data = {
		page: opts.page || 0
	}
	opts.filter = opts.filterFun || function(res) {
		return res.data.small
	}
	opts.action = opts.poster.add

	append.init(opts)
	append.append(opts)

	if (add) {
		opts.data.page++
			append.append(opts)
		opts.data.page--
	}
	append.scroll(opts)

	//自动滚动测试
	// $('body').append("<span id='test' style='position:fixed;right:0;top:0;font-size:30px;color:red;background:#fff;z-index:100'></span>")
	// setInterval(function() {
	// 	$('body')[0].scrollTop += 50;
	// 	$('#test').html('当前页码：'+opts.data.page);
	// }, 100)
}

exports.scroll = scroll