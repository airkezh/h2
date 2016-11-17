fml.define('app/lunbo',['jquery'],function(require, exports){ 
	var $ = require('jquery')

	return function(anparam){
		/*轮播动画 参数
			轮播图片的html格式为<ul><li></li><li></li></ul>
			{
				iWidth:216,	每张图片宽度，包括边框及内外边距, 不填写则为默认值216
				snum:4,	每次跳转几张照片, 不填写则为默认值4
				pnum:4, 每页照片数量，不填写会根据自动计算(*建议别写)
				dtime:1000,	动画持续时间, 不填写则为默认值1000
				ptable:'photos-table', 放照片的面板ID, 不填写则为默认值
				toright:'btn-right', 向右按钮ID, 不填写则为默认值
				toleft:'btn-left' 向左按钮ID, 不填写则为默认值
				tween:function(){} tween函数，默认为Quad.easeOut
				auto:true || {direction:'left',time:3000} 自动轮播，参数为true，自动每3秒向右移动，或着传自定义参数
				nav: $nav||true 导航条，参数为true时自动添加在轮播图片中央下方，或直接传元素选择器或jq对象，html结构为<ul><li></li><li></li></ul> 其中li为可点击的按钮
				navcss : {scla : 'scla', ucla : 'ucla'} 导航按钮样式：
					如果nav参数为true，可选择填写
						{
							sColor:'选择后的颜色',
							uColor:'未选择时的颜色',
							width: 10,//'按钮默认宽度'
							margin: 5,//'按钮之间距离'
							alterWidth: 3//'选择后增加的宽度'
						}；
					如果nav参数为ID或对象，此参数为必须，其中scla为按钮选中时类名，ucla为未选中时类名
				skipbtn : 'id' 跳过当前正在执行动画按钮id，没有默认值
				readystep : //允许提前操作的步数，默认为1
			}
		*/

		if(!anparam) anparam={};
		if(!anparam.iWidth) anparam.iWidth = 216;
		if(!anparam.snum) anparam.snum = 4;
		if(!anparam.dtime) anparam.dtime = 1000;
		anparam.ptable=anparam.ptable? '#'+anparam.ptable : '#photos-table';
		anparam.toright=anparam.toright? '#'+anparam.toright : '#btn-right';
		anparam.toleft=anparam.toleft? '#'+anparam.toleft : '#btn-left';

		var photoTable = $(anparam.ptable);
		var showWidth = photoTable.parent().width(); //显示范围
		anparam.iCount = photoTable.children().length; //照片数量
		anparam.pnum = anparam.pnum? anparam.pnum : Math.ceil(showWidth/anparam.iWidth);//每页照片数量
		anparam.maxW = anparam.iWidth*anparam.iCount; //全部照片宽度总和
		anparam.totalPage = Math.ceil(anparam.iCount/anparam.pnum); //总共页数
		anparam.totalPage2 = anparam.iCount/anparam.pnum; //精确页数，包含小数
		anparam.moveLength = anparam.iWidth*anparam.snum; //每次移动范围
		anparam.pageLength = anparam.iWidth*anparam.pnum; //每页移动范围
		anparam.currPage = 0; //当前页码
		anparam.firstPage = 0;
		anparam.lastPage = anparam.totalPage - 1;
		anparam.tween = anparam.tween || function(t, b, c, d) {return -c *(t /= d)*(t-2) + b;}
		anparam.readystep = anparam.readystep || 1; //允许提前操作的步数，默认为1


		//复制一页图片，实现连贯轮播
		if(anparam.totalPage>1){
			photoTable.append(photoTable.children(':lt('+anparam.pnum+')').clone())
		}

		$(anparam.toright).on('click',toRight);
		$(anparam.toleft).on('click',toLeft);

		var animateQueue =[]
			,animateSwitch =false
			,animateId =null //当前正在运行的动画id
			,autoAnimateId =null //自动运行的动画id

		function addAnimate(a){
			excuteAnimate();
			if(animateQueue.length<anparam.readystep || animateId ==null)
				animateQueue.unshift(a);
			function excuteAnimate(){
				if(animateSwitch == false){
					animateSwitch =true;
					clearAutoRun();
					var excuteId =setInterval(function(){
						if(animateId==null){
							if(animateQueue.length>0){
								(animateQueue.pop())();
							}else{
								clearInterval(excuteId);
								animateSwitch =false;
								if(anparam.auto) autoRun();
							}
						}
					},10);
				}
			}
		}

		//导航条
		if(anparam.nav){
			anparam.nav = (function(){
				var unselectFn, selectFn, lastIndex=null, nav, navBtns
				if(anparam.nav===true){
					var navStr =(function(){
						var navArr = ['<div>']
						for (var i = 0; i < anparam.totalPage; i++) {
							navArr.push('<div></div>');
						};
						navArr.push(['</div>']);
						return navArr.join('');
					}());
					photoTable.after(navStr);
					nav = photoTable.next()
					var defaultNavcss = {
							sColor:'#ffdd33',
							uColor:'#fff1a9',
							width: 14,
							margin: 6,
							alterWidth: 0
						}
					if(anparam.navcss){
						$.extend(defaultNavcss, anparam.navcss);
					}
					var	nw = defaultNavcss.width
						,nmr = defaultNavcss.margin
						,selectColor = defaultNavcss.sColor
						,unSelectColor = defaultNavcss.uColor
						,alterWidth = defaultNavcss.alterWidth
					navBtns = nav.children()
					nav.css({
						position : 'absolute',
						width : (nw+nmr)*anparam.totalPage-nmr + 'px',
						height : nw+'px',
						bottom : '20px',
						left : (showWidth-((nw+nmr)*anparam.totalPage-nmr))/2
					});
					var nchildl = 0;
					navBtns.css({
						position : 'absolute',
						width : nw+'px',
						height : nw+'px',
						'background-color' : unSelectColor,
						'-webkit-border-radius': '50%',
						'border-radius' : '50%'
					})
					.each(function(i,e){
						$(this).css({
							left : nchildl+'px',
							top : '0px'
						})
						nchildl = nchildl + nw + nmr;
					});
					unselectFn = function(o){
						o.css('left',function(i,v){
							v = parseInt(v);
							return (v+alterWidth/2)+'px';
						}).css('top',function(i,v){
							v = parseInt(v);
							return (v+alterWidth/2)+'px';
						}).css({
							width : nw+'px',
							height : nw+'px',
							'background-color' : unSelectColor,
							//'border' : 'none'
						})
					}
					selectFn = function(o){
						o.css('left',function(i,v){
							v = parseInt(v);
							return (v-alterWidth/2)+'px';
						}).css('top',function(i,v){
							v = parseInt(v);
							return (v-alterWidth/2)+'px';
						}).css({
							width : (nw+alterWidth)+'px',
							height : (nw+alterWidth)+'px',
							'background-color' : selectColor,
							//'border' : '1px solid #888'
						})
					}
				} else {
					nav = $(anparam.nav)
					navBtns = nav.children()
					unselectFn = function(o){
						if(anparam.navcss)
							o.removeClass(anparam.navcss.scla).addClass(anparam.navcss.ucla)
					}
					selectFn = function(o){
						if(anparam.navcss)
							o.removeClass(anparam.navcss.ucla).addClass(anparam.navcss.scla)
					}
				}

				anparam.freshNav = function(sindex){
					if(sindex==lastIndex){
						//animateId =null;
					} else {
						if(lastIndex!==null){
							unselectFn(navBtns.eq(lastIndex));
						}
						selectFn(navBtns.eq(sindex))
						lastIndex = sindex;
					}
				}

				navBtns.on('click',function(){
					var sindex = $(this).index();
					addAnimate(function(){
						moveToPage(sindex);
					});
				});
				return navBtns;
			}())
		}

		//状态初始化
		moveToPage(anparam.currPage)

		//跳过按钮初始化
		if(anparam.skipbtn) $('#'+anparam.skipbtn).on('click',anparam.stopToEnd);

		//自动轮播
		if(anparam.auto){
			autoRun();
		}

		function autoRun(){
			var autoFn = (anparam.auto.direction=='left')? toLeft : toRight
				,autoTm = anparam.auto.time || 3000
			autoAnimateId = window.setTimeout(autoFn, autoTm);
		}
		function clearAutoRun(){
			clearTimeout(autoAnimateId)
			autoAnimateId = null;
		}

		function moveToPage(pagenum){
			if(anparam.nav) anparam.freshNav(Math.floor(pagenum)%anparam.totalPage);
			if(pagenum == anparam.currPage) return;
			var mpage = anparam.currPage - pagenum
				,b = (- anparam.currPage * anparam.pageLength)
				,c = mpage * anparam.pageLength
				,t = 0
			if(pagenum<0){
				pagenum += anparam.totalPage2;
			} else if(pagenum>anparam.totalPage2){
				pagenum -= anparam.totalPage2;
			}
			anparam.currPage = pagenum;
			animateId=setInterval(function(){
				var m = anparam.tween(t, b, c, anparam.dtime);
				if(-m>anparam.maxW){
					b += anparam.maxW;
					m = anparam.tween(t, b, c, anparam.dtime);
				}else if(m>0){
					b -= anparam.maxW;
					m = anparam.tween(t, b, c, anparam.dtime);
				}
				t +=10;
				move(m);
				if(t>=anparam.dtime)
					anparam.stopToEnd();
			},10);
			function move(m){photoTable.css('left',m+'px');}
			anparam.stopToEnd =function(){
				if(animateId!=null){
					clear();
					var e = b+c;
					if(-e>anparam.maxW)
						e += anparam.maxW;
					else if(e>0) 
						e -= anparam.maxW;
					photoTable.css('left', parseInt(e)+'px');
				}
			}
			function clear(){clearInterval(animateId);animateId =null;}
		}
		
		function toRight(){
			addAnimate(function(){
				moveToPage(anparam.currPage + anparam.snum/anparam.pnum);		
			})
		}

		function toLeft(){
			addAnimate(function(){
				moveToPage(anparam.currPage - anparam.snum/anparam.pnum);
			})
		}
	}
}); 
