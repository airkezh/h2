var puzzle_imgs = [
		'http://picm.bbzhi.com/qichebizhi/gaoqingqichebizhixinshang/gaoqingqichebizhixinshang_423950_m.jpg',
		'http://pic3.nipic.com/20090529/1201933_115423036_2.jpg',
		'http://pic3.nipic.com/20090707/2913182_111926041_2.jpg'
		,'http://www.cn357.com/upload/batchimg/org/L5/3451dp2.jpg'
		]
function $$(id){
	return document.getElementById(id)
	}
~function(){
	puzzle_imgs.sort(function(){
		return Math.random() > .5
		})
	~function(){
		var ballons = $$('ballons')
		var ballon = ballons.childNodes[1]
		var i = 20
			,w = window.innerWidth
		var colors = ['124,240,10' ,'255,94,72'  ,'23,50,7' , '36,169,225' , '220,87,18']
		while (i--){
			ballon= ballon.cloneNode(true)	
			
			ballon.childNodes[1].setAttribute('fill' , 'rgba(' + colors[Math.floor(Math.random() * colors.length)]+ ','+ ( + .15 * Math.random())+')')
			var cx = w * Math.random()
				cy = 50 + 100 * Math.random()
			ballon.childNodes[1].setAttribute('cx' , cx)
			ballon.childNodes[1].setAttribute('cy' , cy)
			var line = [[cx,cy + 45], [ cx,cy + 53], [cx + 5,cy + 90]]
			ballon.childNodes[3].setAttribute('points' , line.join(' '))
			ballons.appendChild(ballon)
			}
		}()
	var pW ,pH , pieces
	var pNum = 0
	function makePuzzle(){
		$$('animate').className = ''
		$$('animate').style.top = '-10000px'
		var dps = document.getElementsByClassName('dp')
		for (var i = dps.length-1; i>=0 ;i--){
			dps[i].parentNode.removeChild(dps[i])
			}
		var hPieces = 3, vPieces = 3
		pieces = {}
		pNum = hPieces * vPieces
		var oImg = this
		var boxW = Math.ceil(window.innerWidth * .75)
			,scale = boxW / oImg.width 
			,bScale = oImg.width / boxW 
		pW = Math.floor(boxW / vPieces)	
		pH = Math.floor(oImg.height * scale / hPieces)
		//console.log(scale , bScale , boxW , oImg.height * scale)
		var box = $$('box')
		box.style.cssText = 'width:' + boxW + 'px;height:' + (oImg.height * scale) + 'px;'
		var box2W = window.innerWidth - boxW
			,box2H = oImg.height * scale

		var boxPieces = [] 
			,playPieces = []


		for (var j = 0 ; j < vPieces ; j++ ){
			for (var i = 0 ; i < vPieces ; i++){
				boxPieces.push('<div class="piece bp" style="background:url(' + oImg.src + ')  ' + -i*pW + 'px ' + -j*pH + 'px;background-size:' + boxW + 'px;width:' + pW + 'px;height:' + pH + 'px;" > </div>')
				var angle = Math.random() * 60 * (Math.random() > .5 ?1 : -1)
					,left =  boxW + (box2W > pW ?  Math.random() * (box2W - pW) : 0)
					,top = (box2H > pH ? Math.random() * (box2H - pH) : 0 )
					,z = Math.floor(Math.random() * vPieces * vPieces)
				playPieces.push('<div class="dp" data-sec="' + i + ':' + j + '" style="z-index:' + z + '; -webkit-transform:rotate(' + angle + 'deg); left:' + left + 'px;top:' + top + 'px;background:url(' + oImg.src + ')  ' + -i*pW + 'px ' + -j*pH + 'px;background-size:' + boxW + 'px;width:' + pW + 'px;height:' + pH + 'px;" > </div>')
				pieces[i + ':' + j] = false
				}
			}

		box.innerHTML = boxPieces.join('')
		
		//document.body.innerHTML += '' //playPieces.join('')	
		box.innerHTML += playPieces.join('')
		}

	function check(){
		var ret = true 
		for (var k in pieces){
			if (! pieces[k]) { ret = false; break;}
			}	
		if (!ret ) return

		console.log('FINISH' ,pieces)
		var balls = $$('animate')
		var b_style = balls.style
		var j = window.innerHeight 
		b_style.top = j + 'px' 

		function animate(){
			j -= 20
			b_style.top = j + 'px' 
			if (j > -100)
				window.requestAnimationFrame(animate)
			else {
				loadNext()
				}
			}
		animate()	
		}
	function bindDrag(){
		var start = 'mousedown',move = 'mousemove',end = 'mouseup'
		if(document.createTouch){
			start = "touchstart"
			move = "touchmove"
			end = "touchend"
		}
		document.addEventListener(start , function(evt){
			var ele = evt.target
			if ('dp' != ele.className) return
			var dx = evt.pageX , dy = evt.pageY
			var style = ele.style
			style.zIndex =  ++pNum
			style['-webkit-transform'] = ''	
			var show_style = window.getComputedStyle(ele , null)
			var left = parseInt( show_style.getPropertyValue('left') , 10)
				,top = parseInt( show_style.getPropertyValue('top') , 10)	
			
			document.addEventListener(move , onMove, false)
			document.addEventListener(end, onEnd , false)
			var sec = ele.dataset.sec.split(':')
			var rightL = pW * sec[0]	
				,rightT = pH * sec[1]
			console.log(sec , rightL , rightT)
			pieces[sec[0] + ':' + sec[1]] = false

			function onEnd(){
				document.removeEventListener(move , onMove)
				document.removeEventListener(end , onEnd)
				check()
				}
			function onMove(evt){
				evt.stopPropagation()
				evt.preventDefault()
				var moveL = left + evt.pageX - dx 
				var moveT = top + evt.pageY - dy 
				if (Math.abs(moveL  -  rightL) < 20  && Math.abs(moveT  -  rightT) < 20) {
					pieces[sec[0] + ':' + sec[1]] = true 
					moveL  =  rightL
					moveT = rightT
					}  
					
				style.left = moveL + 'px'
				style.top = moveT + 'px'
				
				}
			

			}, false)

		
		}
	function loadPuzzle(oImg){
		var img = new Image
		img.onload = makePuzzle
		img.onerror = function(){
			alert('无法加载')
			loadNext()
			}
		img.src = oImg
		bindDrag()
		}	
	function loadNext(){
		var img = puzzle_imgs.shift()
		if (img)
			loadPuzzle(img)
		else
			alert(' 图片用完了')
		}
	loadNext()

	$$('file').addEventListener("change",function(evt){
		var files = event.target.files
		    ,file
		if (!files || !files.length) return
		file = files[0]
		var img = new Image
		var URL = window.URL || window.webkitURL;
		var imgURL = URL.createObjectURL(file)
		img.onload = makePuzzle
		img.src = imgURL


		},false );
}()
window.setTimeout(function(){
	    window.scrollTo(0, 0)
},1)




