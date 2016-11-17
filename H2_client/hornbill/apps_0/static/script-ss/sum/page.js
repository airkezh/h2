fml.define('sum/page' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	var minW = 874, minH = 662;
	var cenX = 432, cenY = minH / 2;
	var top = 80, bottom = 80, tt;
	var clear = function(o){
		var c = $(o)[0];
		var cxc = c.getContext('2d');
		cxc.clearRect(0, 0, minW, minH + top + bottom);
	}
	var draw = function(o, e, toDoOpen){
		clear(o);
		var x = e.x, y = e.y;
		var shadW = minW - x > 14 ? minW - x : 14;
		var a1 = 1;
		var df = Math.tan(a1 * Math.PI / 180) * cenY;
		var x1, x1T, x1B;
		y < minH / 3 ? (x1T = x - df, x1B = x + df) : ( y > (minH * 2 / 3) ? (x1T = x + df, x1B = x - df) : x1T = x1B = x);
		x1 = (x1T + x1B) / 2;
		var x2 = x > 10 ? ((minW + x) / 2) : ((minW + x) / 2) - 6;
		var a2 = (top - 40) / cenX; 
		var dt = x1 > cenX ? a2 * (minW - x1) : a2 * x1;
		var t2 = top - dt;
		var t1 = x1 > 10 ? (t2 - 10) : t2;
		var c = $(o)[0];
		var cxc = c.getContext('2d');
		var g1 = cxc.createLinearGradient(x, 0, x2, 0);
		g1.addColorStop(0, '#fff');
		g1.addColorStop(0.1, '#fff');
		g1.addColorStop(0.6, '#f2f0f0');
		g1.addColorStop(0.86, '#fff');
		g1.addColorStop(0.92, '#f2f0f0');
		g1.addColorStop(1, '#bbb');
		cxc.beginPath();
		cxc.shadowOffsetX = -8;
		cxc.shadowOffsetY = 4;
		cxc.shadowColor = 'rgba(0, 0, 0, 0.1)';
		cxc.shadowBlur = 4;
	//	cxc.shadowOffsetX = 10;
	//	cxc.shadowOffsetY = 0;
	//	cxc.shadowColor = 'rgba(0, 0, 0, 0.5)';
	//	cxc.shadowBlur = 60;
		cxc.fillStyle = g1;
		cxc.strokeStyle = 'rgba(0,0,0,0.06)';
		cxc.moveTo(x2, top);
		cxc.quadraticCurveTo(x2, t1, x1T, t2);
		cxc.lineTo(x1B, minH + top + bottom - t2);
		cxc.quadraticCurveTo(x2, minH + top + bottom - t1, x2, minH + top);
		cxc.lineTo(x2, top);
		cxc.closePath();
		cxc.fill();
		cxc.stroke();
		var p1 = $('.wall'), p2 = $('.wall2');
		var page = $('.page'), outer = $('.page_outer');
		if(toDoOpen){
			var p1X = x1 > 0 ? x1 : 0;
			var p2X = minW - x1 - 4 - 4 > 0 ? minW - x1 - 4 - 4 : 0;
			p1.css({width : p1X, 'overflow-y' : 'hidden'});
			p2.css({width : p2X});
		}else{
			var p1X = x1 > minW ? minW : minW - x1 - 4 - 4;
			p1.css({width : p1X, 'overflow-y' : 'hidden'});
		}
		if(fml.vars.openBookOuter){
			var pageX = x1 > 434 ? 468 : (x1 > 10 ? (932 - x1 - 36) : (932 - x1));
			var outerX = x1 > cenX ? x1 - cenX + 4 : 0
			page.css({width: pageX});
			outer.css({width: outerX});
		}
	};
	var autoPage = function(o, toDoOpen, callback){
		var $pi = $(o).find('.page_inner'),
			$pf = $(o).find('.pageflip');
	//	var p1 = $('.wall'), p2 = $('.wall2');
	//	p1.css({'overflow-y' : 'hidden'});
		$pf.show();
		clearInterval(tt)
		if(toDoOpen){
			var i = minW, s = 90;
			tt = window.setInterval(function(){
				if(i < s){
					i = 0;
					draw($pf, {x : i, y : cenY}, toDoOpen);
					clear($pf);
					callback();
					$pf.hide();
					$('.wall').css({'overflow-y' : 'auto'});
			//		$('.wall').scrollTop(0);
					fml.vars.openBookOuter = false;
					$('.book_tab, .back').removeClass('undo');	
					clearInterval(tt);
				}else{
					draw($pf, {x : i-=s, y : cenY}, toDoOpen);
				}
			},10);
		}else{
			var i = 0, s = 90;
			$('.wall').css({right : 0});
			$('.wall').find('.image_wall, .spinnerBig').css({right : 20, position : 'absolute'});
			tt = window.setInterval(function(){
				if(i > minW - s){
					i = minW;
					draw($pf, {x : i, y : cenY}, toDoOpen);
					clear($pf);
					$('.goods_wall1').html('');
					$pf.hide();
					$('.book_tab, .back').removeClass('undo');	
					clearInterval(tt);
				}else{
					draw($pf, {x : i+=s, y : cenY}, toDoOpen);
				}
			},10);
		}
	};
	var movePage = function(o, toDoOpen){
		var $pt = $(o).find('.book_tab'),
			$pi = $(o).find('.page_inner'),
			$pf = $(o).find('.pageflip');
		$pf.show();
		$pf.bind('mousedown', function(){
			$pf.bind('mousemove',function(e){
				var x = e.offsetX, y = e.offsetY;
				draw($pf, {x : x, y : y}, toDoOpen);
			});
		});
		$pf.bind('mouseleave',function(){$pf.unbind('mousemove');});
		$pf.bind('mouseup',function(){$pf.unbind('mousemove');});
	};
	exports.autoPage = autoPage;
	exports.movePage = movePage;
});
