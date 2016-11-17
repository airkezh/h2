var countDown = document.getElementById('countDown')
var ID = 0
var imgStack = []
function showDown(s){
	countDown.className = ''
	countDown.innerHTML = s
	countDown.className = 'down'
	if (s)
		window.setTimeout(function(){
		showDown(s-1)
		} , 1200)
	else
		reNew()
	}
function debug(err){
	var d = document.getElementById('d')
	var txt = ''
	for (var x in err){
		txt += x + ':'+ err.x +'<br/>'
	}
	d.innerHTML = txt
}
function detectShake(){
	   window.addEventListener("devicemotion", function(event) {
          // 处理event.acceleration、event.accelerationIncludingGravity、
          // event.rotationRate和event.interval
			if (event.acceleration && event.acceleration.x> 30){
				window.location.reload()
				}
      }, true);	
	}
detectShake()
function reNew(){
     var img=document.getElementById('photo');

	 var newSrc = imgStack.pop()
	 if (newSrc){
		 img.src = newSrc
		 init()
		 preLoad()
	 }else
		preLoad(reNew)
	 
}
function preLoad(cbk){
	if (imgStack.length > 1) return
	ajax('?newImg=1' , function(res){
		 if (imgStack.indexOf(res) == -1){
			 var pimg = new Image
			 pimg.onload = function(){
				console.log(imgStack)
				 imgStack.push(res)
				 cbk && cbk()
			 }
			 pimg.onerror = function(){
				 console.log('err')
				 window.setTimeout(function(){
					 preLoad(cbk)
				 },800)
				 }
			 pimg.src = res
		 }else{
			  preLoad(cbk)
			 }
		 })
	
	}
function ajax(url , cbk ,opt){
	var method = opt && opt.method || 'GET'
	var xhr = new window.XMLHttpRequest()
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200) {
			cbk(xhr.responseText)
		}
	}
	 xhr.open(method, url, true)
	 xhr.send(null)
	
	}
/*
* 为指定的图片生成刮刮卡图层
* @param imgId img标签ID
* @param condition 刮开比例 作为触发callback的条件 即 刮开百分之XX之后触发callback 默认为90%
* @param isOnce callback是否只调用1次 默认为否
*/
function createScratchCard(imgId,condition,callback,isOnce){

        var img=document.getElementById(imgId);
        if(img.complete || img.readyState == 'loading' || img.readyState == 'complete'){
            generate();
        }else {
			img.onload = generate;
		}


        function generate(){
			img.onload = null

			
            var cvs=document.createElement('canvas');
            cvs.style.position='absolute';
            cvs.style.left=img.offsetLeft+'px';
            cvs.style.top=img.offsetTop+'px';
            cvs.width=img.width;
            cvs.height=img.height;
			cvs.id = ID++
            img.parentNode.insertBefore(cvs,img);
            var context=cvs.getContext('2d');
            context.fillStyle='#bbb';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            context.globalCompositeOperation = 'destination-out';
            context.strokeStyle="fff";
            context.lineJoin = "round";
            context.lineWidth = 55;
            var offsetParent=cvs,offsetLeft=0,offsetTop=0;
            while(offsetParent){
                offsetLeft+=offsetParent.offsetLeft;
                offsetTop+=offsetParent.offsetTop;
                offsetParent=offsetParent.offsetParent;
            }
            var pathPoints=[];
            var x,y;
            var start='mousedown',move='mousemove',end='mouseup';
            if(document.createTouch){
                start="touchstart";
                move="touchmove";
                end="touchend";
            }
            cvs.addEventListener(start,onTouchStart);
            

            function onTouchStart(e){
                e.preventDefault();
                if(e.changedTouches){
                    e=e.changedTouches[e.changedTouches.length-1];
                }
                console.log(e.pageX,offsetLeft);
                x=e.pageX - offsetLeft;
                y=e.pageY - offsetTop;
                context.beginPath();
                context.arc(x, y, 35/2, 0, Math.PI*2, true);
                context.closePath();
                context.fill();
				document.addEventListener(end,onTouchEnd);
                cvs.addEventListener(move,onTouch)

            }

            function onTouch(e){
                if(e.changedTouches){
                    e=e.changedTouches[e.changedTouches.length-1];
                }
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(e.pageX - offsetLeft, e.pageY- offsetTop);
                x=e.pageX - offsetLeft;y=e.pageY - offsetTop;
                context.closePath();
                context.stroke();
                var n=(Math.random()*10000000)|0;
                context.canvas.style.color='#'+ n.toString(16);//fix android 4.2 bug force repaint

            }

            function onTouchEnd(){
				document.removeEventListener(end,onTouchEnd);
                cvs.removeEventListener(move,onTouch);
                pathPoints=[];
                check();
            }
            function check(){
                var st=+new Date();
                data=context.getImageData(0,0,cvs.width,cvs.height).data;
                var length=data.length,k=0;
                for(var i=0;i<length-3;i+=4){
                    if(data[i]==0&&data[i+1]==0&&data[i+2]==0&&data[i+3]==0){
                        k++;
                    }
                }
                var f=k*100/(cvs.width*cvs.height);
                if(f>(condition||90)){
					if( callback){
						callback(f,t ,cvs);
						if(isOnce){
							callback=null;
							}

					}

                }
                var t=+new Date()-st;
                console.log('刮开面积:'+f.toFixed(2)+'% 检测耗时'+ t+'ms ');
                data=null;
            }
        }
    }
function init(){
	countDown.style.display='none'
	createScratchCard('photo', 70 ,function (f,t ,cvs){
		//document.getElementById('lcd').value='刮开面积:'+f.toFixed(2)+'%';
		if (cvs){
			cvs.parentNode && cvs.parentNode.removeChild(cvs)
		}
		window.setTimeout(function(){
			countDown.style.display='block'
			preLoad()
			showDown(3)
		},700)

	}, true )
}
if(document.documentElement.scrollHeight <= document.documentElement.clientHeight) {  
    document.body.style.height = document.documentElement.clientWidth / screen.width * screen.height + 'px';  
}  
window.setTimeout(function(){
	window.scrollTo(0, 0)
},1)
reNew()
preLoad()
	
