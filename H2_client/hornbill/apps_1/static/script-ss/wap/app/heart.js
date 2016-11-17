/*common*/
require('wap/zepto')


var cvs,ctx,w

exports.animateShowHeart = function($dom, cbk){
	cvs=document.createElement('canvas');
    cvs.style.position='absolute';
    cvs.style.left=$('.main')[0].offsetLeft+'px';
    cvs.style.top=$('.main')[0].offsetTop+'px';
    w = $dom.width()
    cvs.width = w;
    cvs.height = w;
    cvs.style.zIndex = '100';
    $dom.append(cvs);
    ctx=cvs.getContext('2d');
	ctx.fillStyle = '#ff3300';
	ctx.translate(w/2, w/2 - 100);
	draw(ctx, w)
	var $cvs = $(cvs)
	setTimeout(function(){$cvs.addClass('heartAni')},1000)
	$cvs.on('transitionend', function(event) {
		$cvs.remove();
		cbk();
	});
}

// 画心
function draw(ctx, w) {
	var r = 0, a = 10, start = 0, end = 0;
	ctx.rotate(Math.PI);
	for (var q = 0; q < w; q++) {
		start += Math.PI * 2 / w;
		end = start + Math.PI * 2 / w;
		r = a * Math.sqrt(225 / (17 - 16 * Math.sin(start) * Math.sqrt(Math.cos(start) * Math.cos(start))))
		ctx.arc(0, 0, r, start, end, false);
	}
	ctx.fill();
}


