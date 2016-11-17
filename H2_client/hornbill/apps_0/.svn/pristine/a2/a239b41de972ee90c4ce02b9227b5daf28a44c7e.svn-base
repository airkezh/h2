/*common*/
require('wap/zepto')
require('wap/app/hackWeixin')

var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp')

var minHeight = 0,
	maxHeight = 0,
	colsHeight = [0, 0],
	$wall = $('.posterWall').find('.goods_wall'),
	colsWidth = 50,
	colNum = 2,
	lastFrameHeight = 0,
	goods_wall = $('.goods_wall')

var add = function(res) {

	var $frame = $('<div />', { 'class': 'goods_units' }).appendTo($wall)

	for (var i = 0; i < colNum; i++) {
		colsHeight[i] -= maxHeight
	}
	minHeight = Math.min.apply(Math, colsHeight)

	$.each(res, function(k, v) {
		for (var i = 0; i < colNum; i++) {
			if (colsHeight[i] <= minHeight) {

				var $tmp = $(shareTmp('goods_units', {v: v}))
					.attr('col', i)
					.css({
						'top': minHeight,
						'left': i * colsWidth + '%',
						'width': colsWidth + '%',
						'position': 'absolute'
					})
					.appendTo($frame)

				colsHeight[i] += $tmp.height()
				minHeight = Math.min.apply(Math, colsHeight)

				break;
			}
		}
	})
	maxHeight = Math.max.apply(Math, colsHeight)

	if (lastFrameHeight < 0) lastFrameHeight = 0
	$frame
		.height(maxHeight)
		.css({
			'position': 'relative',
			'width': '100%',
		})
		.data('frametop', lastFrameHeight)

	lastFrameHeight += maxHeight
	goods_wall.height(lastFrameHeight)
}

$.each(fml.vars.goods_data, function(index, goods_data){
	if(goods_data.group_words){
		var $title = $('<div class="unit_title"><div class="line"></div><span class="title_text"><i>'+ goods_data.group_words + '</i></span></div>')
		$wall.append($title)
		lastFrameHeight += $title.height()
	}

	maxHeight = 0
	colsHeight = [0, 0]
	add(goods_data.twitters)
})

var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll()
lazy_pic.load()

$('.load_all_show').show()

if(Meilishuo.config.os.mobileQQ){
	$('.goods_box a').on('click',function(e){

		e.preventDefault()
		
		var $t = $('title')
		var link = 'http://mapp.meilishuo.com/share/item/' + $(this).data('twitterid')
			
		$t.html('返回')
		mqq.ui.refreshTitle()
		mqq.ui.openUrl({
			url: link,
			target: 1,
			style: 0
		})

		setTimeout(function (){
			$t.html('美丽说')
		},0)
		
	});

}

