/*common*/

var $ = require('wap/zepto')

var canvas = document.getElementById('canvas_pnl')
	,ctx   = canvas.getContext("2d")

var pins = []
	,frame = 0
	,columns = [] 
	,column_count  = 2
	,cw
	,scroll_top = 0
	,scroll_to = 0
	,cur = []
	,column_height = []
	,max_scroll = 0
	,scrollloop = 0 
	,scroll_speed = 30 
	,direct = 0
var LoadImg = 'http://i.meilishuo.net/css/images/indicator_medium.gif'
	,PaddingBtom = 10 + 9 
	,PerNumScreen = 3

function init(){
	//Android设备：360*640      iphone5：320*568      iphone4：320*480   
	//retina *2
	canvas.width = 640 //320
	canvas.height = canvas.width / window.innerWidth * window.innerHeight
	canvas.style.cssText = 'width:' + window.innerWidth + 'px;height:' + window.innerHeight + 'px;'

	scroll_speed = 2 

	columns = [[],[]] 
	cur = [0 ,0] 
	column_height = [0, 0 ]
	cw = canvas.width / column_count 
}

var pt = 0
function pullData(cbk){
	/// aj/getGoods/new?frame=0
	var be = '/aj/getGoods/new'
	$.get(be  ,{frame :frame} , function(tinfo){
		if (!tinfo || !tinfo.tInfo) {
			pt++
			if (pt >= 3) alert('拉不到了')
			cbk && cbk(false)
			return
		}
		pt = 0
		tinfo.tInfo.forEach(function(t){
			var h = t.pic_height * (cw / t.pic_width )
			//h = Math.round(h)

			var item = t
			item.ch = h
			item.th = h + PaddingBtom 

			var colAt = columns[0]
			var lastItem = colAt[colAt.length - 1]
			if (!lastItem){
				item.top = 0
			}else{
				item.top = lastItem.top + lastItem.th
			}
			var index = colAt.push(item) - 1

			var i = new Image
			i.onload = function(){
				item.show_pic_url = i.src
				if (index >= cur[0] && (index < cur[0] + PerNumScreen)) {
					//console.log('load' , index ,cur[0])
					render()
				}
			}
			i.src = t.pic_url
			column_height[0] += item.th

		})
		///console.log(frame , frame ===1)
		max_scroll = Math.ceil( Math.max.apply(Math , column_height) - canvas.height )

		if ( max_scroll < 0 ) max_scroll = 0

		if (0 === frame ) start()
		cbk && cbk()


	}, 'json')

}

function render(){
	var start = cur[0]
	var colAt = columns[0]

	var mt = colAt[start].top - scroll_top 

	
	ctx.clearRect(0 , 0 , canvas.width , canvas.height)
	if (direct < 0){
		//向上滚动  cur－
		for (var i = start ; i>=0 ; i--){
			var item = colAt[i]
			if (item.top <= scroll_top) {
				cur[0] = i
				break
			} 
		}
	}

	for (var i = start; i < colAt.length ;i++){
		var item = colAt[i]
		var j = j + 1
		if (direct > 0 && colAt[j] && colAt[j].top  < scroll_top){
			cur[0] = j 
			continue
		}
		//console.log(i ,mt, item)
		var ti = new Image
		ti.src = item.show_pic_url  || LoadImg
		ctx.drawImage(ti , 0 , mt ,cw , item.ch )
		ctx.font = "12px serif"
		ctx.fillText(item.title, 0 , mt + item.ch + 9 ,cw)

		mt += item.th
		if (mt > canvas.height) break
	} 
	ctx.font = "36px serif"
	var log = [ 
		['top' , scroll_top]
		,['to' , scroll_to ]
		,['h' , max_scroll]
		,['f' , frame]
		]
	log.forEach(function(l,i){
		ctx.fillText(l[0] + ':' + l[1] ,cw ,  36 * (i + 3) , cw )
	})
	///TODO 判断到底
	//console.log( i , cur[0] , colAt.length)
		
}

var polling = false

function toPull(){
    if (polling) return
    polling = true
    frame++
    pullData(function(){
        polling = false

    })
}

var tt
function  animateRender(){
	var step = (scroll_to - scroll_top) / 60
	tt && window.clearTimeout(tt)
	function animate(){
		scroll_top += Math.ceil(step) 
		render()
		if (direct >0 &&  scroll_to <= scroll_top) return
		else if (direct < 0 && scroll_to >= scroll_top) return 
		tt = window.setTimeout(function(){
			animate()
		} , 1000 / 60)
		
	}
	animate()
}

function bindEve(){
	var start='mousedown',move='mousemove',end='mouseup'
	
	if(  document.createTouch){
		start = "touchstart"
		move = "touchmove"
		end = "touchend"
	}
	/*
	document.addEventListener(start, function(e){
		alert(e)
	} , false)
	return
	*/

	var x , y
	///TODO 算点的是哪个
	canvas.addEventListener('click', function(e){
		var x = e.layerX || e.offsetX
			,y= e.layerY || e.offsetY
		//console.log(x , y)
	},false)

	function wrapE(e){
		e.preventDefault()
		if (e.changedTouches){
			e = e.changedTouches[e.changedTouches.length-1];
		}
		return {x : e.pageX , y: e.pageY}
	}
	canvas.addEventListener(start, function(e){
		direct = 0 
		var pos = wrapE(e)
		y = pos.y
		/*
		var x
		function t(){
			x && window.clearTimeout(x)
			scroll_top += scroll_speed
			render()
			if ( scroll_top > max_scroll - 200){
				toPull()
			}
			x = window.setTimeout(t , 1000/60)
		}
		t()
		canvas.addEventListener(end, function(){
			x && window.clearTimeout(x)
		} , false)
		return
		*/
		canvas.addEventListener(move, touchMove,false)
		canvas.addEventListener(end, touchEnd , false)
	},false)

	function touchMove(e){
		var pos = wrapE(e)

		direct = y - pos.y	
		scroll_to += (y - pos.y ) * scroll_speed
		y = pos.y
		if ( scroll_to >= max_scroll) scroll_to = max_scroll
		else if (scroll_to < 0) scroll_to = 0

		if (direct > 0 && scroll_to > max_scroll - 200){
			toPull()
		}

		scroll_to = scroll_to | 0 
		animateRender()
	}
	function touchEnd(e){
		canvas.removeEventListener(move, touchMove)
		canvas.removeEventListener(end, touchEnd )

	}

}

function start(){
	render()	
	bindEve()
}

function main(){
	init()
	pullData()
}

main()
