/*common*/
var append = require('m/component/append');

var scroll = function(opts, add){
	opts.poster.set(opts)

	opts.box = '.posterWall'
	opts.data = {
		frame : opts.frame || 0 
	}
	opts.filter = function(res){
		return res['tInfo']	
	}
	opts.action = opts.poster.add

	append.init(opts)
	append.append(opts)

	if(add){
		opts.data.frame++
		append.append(opts)
		opts.data.frame--
	}
	append.scroll(opts)
}

exports.scroll = scroll

