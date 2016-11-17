/*common*/
exports.fadeIn = function(dir, type, y){
	var translate = {
		'curr' : [0, 0, 1]
		, 'prev' : [0, 0, 0]
		, 'next' : [0, 0, 0]
	}
	return {
		'transform':'translate3d(' + translate[type][0] + '%, ' + translate[type][1] + '%, 0)'
		, 'opacity':translate[type][2]
	}
}

exports.translate = function(dir, type, y){
	var translate = {
		'curr' : [dir[0]*y, dir[1]*y]
		, 'prev' : [dir[0] * (-100+y), dir[1] * (-100+y)]
		, 'next' : [dir[0] * (100+y), dir[1] * (100+y)]
	}
	return {
		'transform':'translate3d(' + translate[type][0] + '%, ' + translate[type][1] + '%, 0)'
		, 'opacity':1
	}
}

exports.translateY = function(dir, type, y){
	var translate = {
		'curr' : [0, y]
		, 'prev' : [0, -100+y]
		, 'next' : [0, 100+y]
	}
	return {
		'transform':'translate3d(' + translate[type][0] + '%, ' + translate[type][1] + '%, 0)'
		, 'opacity':1
	}
}

exports.translateX = function(dir, type, y){

	var translate = {
		'curr' : [dir[0]*y, dir[1]*y]
		, 'prev' : [dir[0] * (-100+y), dir[1] * (-100+y)]
		, 'next' : [dir[0] * (100+y), dir[1] * (100+y)]
	}
	return {
		'transform':'translate3d(' + translate[type][0] + '%, ' + translate[type][1] + '%, 0)'
		, 'opacity':1
	}
}


