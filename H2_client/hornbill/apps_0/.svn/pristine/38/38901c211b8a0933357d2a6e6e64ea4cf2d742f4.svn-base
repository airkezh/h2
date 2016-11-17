/*common*/
require('m/zepto/touch')

var shareTmp = require('wap/component/shareTmp')
    , minHeight = 0
    , maxHeight = 0
    , colsHeight = []
    , $wall
    , colsWidth
    , colNum


var lastFrameHeight = 0
    ,goods_wall = $('.goods_wall');
goods_wall.css({'position':'relative',"margin-top":"8px"})
var add = function(res, opts){
    var $frame = $('<div />', {
            'class' : 'frame'
            , 'frame' : opts.data.frame

        }).appendTo($wall)

    for(var i = 0;i < colNum; i++){
        colsHeight[i] -= maxHeight
    }
    minHeight = Math.min.apply(Math , colsHeight)

    $.each(res , function(k , v){
        // if(v.poster_small_img){
            for(var i = 0;i < colNum; i++){
                if(colsHeight[i] <= minHeight){

                    var $tmp = $(shareTmp('posterWall', {v: v, lazyLoad : !!(opts.lazyLoad)}))
                        .attr('col', i)
                        .css({
                            'top': minHeight
                            , 'left' : i * colsWidth + '%'
                            , 'width' : colsWidth + '%'
                        })
                        .appendTo($frame)

                    colsHeight[i] += $tmp.height()
                    minHeight = Math.min.apply(Math , colsHeight)

                    break;
                }
            }
        // }
    })
    maxHeight = Math.max.apply(Math , colsHeight)
    // $frame.height(maxHeight)

    $frame
    .height(maxHeight)
    .css({'position':'absolute','width' : '100%' ,'top' : lastFrameHeight || 0})
    .data('frametop' , lastFrameHeight)

    lastFrameHeight += maxHeight

    goods_wall.height(lastFrameHeight);

    opts.lazyLoad && opts.lazyLoad.load()
}

var set = function(opts){
    $wall = $(opts.box || '.posterWall').find('.goods_wall')

    colNum = opts.colNum ? opts.colNum : Math.ceil($wall.width() / 200)
    colsWidth = (1 / colNum) * 100

    for(var i = 0;i < colNum; i++){
        colsHeight[i] = 0
    }
}

exports.set = set
exports.add = add