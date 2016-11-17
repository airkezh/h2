/*common*/
require('m/zepto/touch')
require('m/zepto/ajax')
require('m/zepto/fx')

require('m/component/scrollStop')
var shareTmp = require('wap/component/shareTmp')

var isLoad = false
var $pullUp, $wall

var append = function(opts) {
    isLoad = false

    $pullUp.attr('status', 'loading')

    $.ajax({
        type: 'GET',
        url: opts.url,
        data: opts.data,
        dataType: 'json',
        success: function(res) {
            var data = opts.filter ? opts.filter(res) : res
            opts.xr = res.r || '';

            function ck() {
                var showBtnText = opts.showBtnText || '查看全部商品';
                $pullUp.attr('status', 'stop');
                if (opts.showBtn) {
                    $('.pullUp').remove();
                    $(".posterWall").append('<a class="btn-all" href="javascript:;" id="btnAll" data-xr="'+res.r+'">' + showBtnText + '</a>');
                } else {
                    $(".pullUp[status=stop]").css({
                        'width': '100%',
                        'text-align': 'center',
                        'background': 'none'
                    }).html('没有更多了');
                }
            }
            if (!data || data.length == 0) {
                ck();
                return;
            }
            if (opts.action) {
                // console.log(opts.newPage)
                //opts.newPage = false
                opts.action(data, opts)

            } else {
                $wall.append(shareTmp(opts.tmp, {
                    data: data
                }))
            }

            opts.data[opts.page || 'page']++;
            // 2015-08-04  xudeming
            //http://m.meilishuo.com/zulily/newPush?cid=12127
            //var limitNum = opts.limit || 10;
            //if (data.length < limitNum) {
            //    ck();
            //} else {
            //    done();
            //}
             done();
        },
        error: done
    })
}

var arrPosList = [],
    hashPosList = {}

var goods_wall = $('.goods_wall')

var scroll = function(opts) {
    $(window).unbind("scrollStop");
    $(window).on('scrollStop', function(evt) {
        var sclltop = document.body.scrollTop - opts.posterMargin || 0
            //根据滚动位置算


        for (var i = 0, j = arrPosList.length - 1; i < j; i++) {
            var k = arrPosList[i]
            if (!hashPosList[k]) continue

            var nxt = arrPosList[i + 1]
            if ((k < sclltop) && (nxt > (sclltop - opts.marginOffset))) {
                hashPosList[k].frame.show()
                nxt && hashPosList[nxt] && hashPosList[nxt].frame.show()
                i++
            } else if (i) {
                hashPosList[k].frame.hide()
            }
        }
        //console.log(cur , sclltop ,_totalH , arrPosList)

        if ($pullUp && ($pullUp[0].getBoundingClientRect().top - 200) <= window.innerHeight && isLoad) {
            // console.log(opts)
            append(opts)

            var frames = $('div.frame')
            frames.each(function(i, f) {
                f = $(f)
                var top = f.data('frametop') | 0


                if (!hashPosList[top]) {
                    hashPosList[top] = {
                        frame: f
                    }
                    arrPosList.push(top)
                }

            })
        }
        opts.lazyLoad && opts.lazyLoad.load()
    })
}

var done = function() {
    $pullUp.attr('status', 'tap')
    isLoad = true
}

var init = function(opts) {
    $pullUp = $(opts.box).find('.pullUp')
    $wall = $(opts.box).find('.wall')
    done();
}

exports.append = append
exports.scroll = scroll
exports.init = init