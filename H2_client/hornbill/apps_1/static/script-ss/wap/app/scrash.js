fml.define('wap/app/scrash' , ['wap/zepto/touch','wap/app/dialog'] , function(require,exports){
	/*
	* 为指定的图片生成刮刮卡图层
	* @param $dom $dom
	* @param condition 刮开比例 作为触发callback的条件 即 刮开百分之XX之后触发callback 默认为90%
	* @param isOnce callback是否只调用1次 默认为否
	*/
	exports.createScratchCard = function(dom,condition,callback,isOnce){
		var $dom = $(dom)
		generate()
        function generate(){
			//img.onload = null
            var cvs=document.createElement('canvas');
            cvs.style.position='absolute';
            cvs.style.left=$dom[0].offsetLeft+'px';
            console.log($dom[0].offsetLeft)
            cvs.style.top=$dom[0].offsetTop+'px';
            console.log($dom[0].offsetTop)
            cvs.width=$dom.width();
            cvs.height=$dom.height();
            cvs.style.zIndex = '100'
			//cvs.id = ID++
			console.log($dom.width)
            $dom.parent().append(cvs);
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
                //console.log('刮开面积:'+f.toFixed(2)+'% 检测耗时'+ t+'ms ');
                data=null;
            }
        }
    }

});