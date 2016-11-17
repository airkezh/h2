/*common*/
require('m/zepto/touch')

var shareTmp = require('wap/component/shareTmp'),
    minHeight = 0,
    maxHeight = 0,
    colsHeight = [],
    $wall, colsWidth, colNum


var lastFrameHeight = 0,
    goods_wall = $('.goods_wall');
var add = function(res, opts) {

    // console.log("lastFrameHeight:"+ lastFrameHeight)
    // console.log(opts.data.page)
    var $frame = $('<div />', {
        'class': 'frame',
        'frame': opts.data.frame

    }).appendTo($wall)
    if (opts.data.page == 0) {
        goods_wall.css({
            'position': 'relative',
            "margin-top": "8px"
        })
        lastFrameHeight = 0
        minHeight = 0
        maxHeight = 0

    } else {

    }

    // var $frame = $('<div />', {
    //         'class' : 'frame'
    //         , 'frame' : opts.data.frame

    //     }).appendTo($wall)

    for (var i = 0; i < colNum; i++) {
        colsHeight[i] -= maxHeight
    }
    minHeight = Math.min.apply(Math, colsHeight)

    $.each(res, function(k, v) {
        //if(minHeight < 0) minHeight = 0
        for (var i = 0; i < colNum; i++) {
            if (colsHeight[i] <= minHeight) {

                var $tmp = $(shareTmp(opts.tmp ? opts.tmp : 'posterWall', {
                        v: v,
                        xr:opts.xr,
                        lazyLoad: !!(opts.lazyLoad)
                    }))
                    .attr('col', i)
                    .css({
                        'top': minHeight,
                        'left': i * colsWidth + '%',
                        'width': colsWidth + '%'
                    })
                    .appendTo($frame)

                //打标start
                var markStr = '';
                if (v.horizontal_mark && v.horizontal_mark.length > 0) {
                    v.horizontal_mark.forEach(function(marks_data, index) {
                        markStr += '<div class="mark' + index + '"><img src="' + (marks_data && marks_data.img_url) + '" /></div>';
                    });
                }
                $tmp.append($(markStr));
                //打标end

                colsHeight[i] += $tmp.height()
                minHeight = Math.min.apply(Math, colsHeight)

                break;
            }
        }
    })
    maxHeight = Math.max.apply(Math, colsHeight)
        // $frame.height(maxHeight)
    if (lastFrameHeight < 0) lastFrameHeight = 0
    $frame
        .height(maxHeight)
        .css({
            'position': 'absolute',
            'width': '100%',
            'top': lastFrameHeight || 0
        })
        .data('frametop', lastFrameHeight).data('xr',opts.xr).data('index',opts.data[opts.page || 'page'])

    lastFrameHeight += maxHeight


    // console.log(lastFrameHeight)
    goods_wall.height(lastFrameHeight);

    opts.lazyLoad && opts.lazyLoad.load()
}

var set = function(opts) {
    colsHeight=[];  // 2015-07-09
    $wall = $(opts.box || '.posterWall').find('.goods_wall')

    colNum = opts.colNum ? opts.colNum : Math.ceil($wall.width() / 200)
    colsWidth = (1 / colNum) * 100

    for (var i = 0; i < colNum; i++) {
        colsHeight[i] = 0
    }
}

exports.set = set
exports.add = add