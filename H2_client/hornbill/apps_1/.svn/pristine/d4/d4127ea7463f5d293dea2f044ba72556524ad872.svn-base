/*common*/
require('m/zepto/touch')
require('m/zepto/ajax')
require('m/zepto/fx')

require('m/component/scrollStop')
var shareTmp = require('wap/component/shareTmp')

var isLoad = false 
var $pullUp
	, $wall 

var append = function(opts){
	isLoad = false 

	$pullUp.attr('status', 'loading')

	$.ajax({
		type : 'GET'
		, url : opts.url
		, data : opts.data
		, dataType: 'json'
		, success : function(res){
			var data = opts.filter ? opts.filter(res) : res

			if(!data || data.length == 0){
				$pullUp.attr('status', 'stop')
				return;
			}
			if(opts.action){
				opts.action(data, opts)

			}else{
				$wall.append(shareTmp(opts.tmp, {data:data}))
			}

			opts.data[opts.frame || 'frame']++
			done()
		}
		, error : done
	})
}

var scroll = function(opts){
	$(window).on('scrollStop', function () {
		if($pullUp && ($pullUp[0].getBoundingClientRect().top - 200) <= window.innerHeight && isLoad)
			append(opts)

		opts.lazyLoad && opts.lazyLoad.load()
	})
}

var done = function(){
	$pullUp.attr('status', 'tap')
	isLoad = true
}

var init = function(opts){
	$pullUp = $(opts.box).find('.pullUp')
	$wall = $(opts.box).find('.wall')
	done();
}

exports.append = append
exports.scroll = scroll
exports.init = init

