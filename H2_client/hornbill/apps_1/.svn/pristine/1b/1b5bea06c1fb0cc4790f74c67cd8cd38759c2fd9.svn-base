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

			opts.data[opts.page || 'page']++
			done()
		}
		, error : done
	})
}

var arrPosList = []
    ,hashPosList = {}

var goods_wall = $('.goods_wall')

var scroll = function(opts){
    $(window).on('scrollStop', function (evt) {
        var sclltop = document.body.scrollTop
        //根据滚动位置算



        for (var i = 0 , j = arrPosList.length - 1 ; i < j ; i++){
            var k = arrPosList[i]
            if (!hashPosList[k]) continue

            var nxt = arrPosList[i+1]
            if ((k < sclltop) && (nxt > sclltop)) {
                hashPosList[k].frame.show()
                nxt && hashPosList[nxt] && hashPosList[nxt].frame.show()
                i++
            }else if(i){
                hashPosList[k].frame.hide()
            }
        }
            //console.log(cur , sclltop ,_totalH , arrPosList)

        if($pullUp && ($pullUp[0].getBoundingClientRect().top - 200) <= window.innerHeight && isLoad) {
            append(opts)

            var frames = $('div.frame')
            frames.each(function(i ,f){
                f = $(f)
                var top = f.data('frametop') | 0


                if (!hashPosList[top]){
                    hashPosList[top] = { frame : f }
                    arrPosList.push(top)
                }

            })
        }
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

