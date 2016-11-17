/*common*/
var $ = require('wap/zepto'),
	wood2 = require('wap/page/lark/wood2'),
	ddl = wood2.ddl;

var $window = $(window),
	screenWidth = $window.width(),
	screenHeight = $window.height();
function countFn(count){
	$('#count').html(count);
}
function endFn(count){
	alert(count +'game over')
};

$('#start').click(function() {



	ddl.into({
		gameBox:{ //游戏盒子的属性
			className : 'ddl_box',
			id : 'ddl_box',
			w : screenWidth,
			h : screenHeight
		},
		actor:{
			faller:{//下落的物体
				w:200, 
				h:26,
				style:[
					'http://d05.res.meilishuo.net/pic/_o/67/1a/0dc67d1c9bd7bff5c61c12e5acc5_487_65.ch.png',
					'http://d03.res.meilishuo.net/pic/_o/82/39/a917985840f6d73c2cb984cc5c63_491_65.cg.png',
					'http://d02.res.meilishuo.net/pic/_o/67/1a/0dc67d1c9bd7bff5c61c12e5acc5_487_65.ch.png',
					'http://d02.res.meilishuo.net/pic/_o/82/39/a917985840f6d73c2cb984cc5c63_491_65.cg.png',
					'http://d01.res.meilishuo.net/pic/_o/99/af/9707f878f4304baca4df3e431dd6_492_65.cg.png'
				]
			},
			tray:{//接下落物体的盘子
				w: screenWidth ,
				h: screenWidth*130/640,
				style:'http://d05.res.meilishuo.net/pic/_o/7c/80/e409cbf40061fcd6442db49b28e5_640_131.cf.png'
			}
		}
	});

	ddl.start(countFn,endFn);

});

$('#restart').click(function() {
	ddl.restart();
});

