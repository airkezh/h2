fml.define('sum/tab' , ['component/pin' , 'component/urlHandle'  ,'component/shareTmp' , 'sum/posterWall'] , function(require , exports){
	var $ = require('component/pin');
	var shareTmp = require('component/shareTmp');
	var posterWall = require('sum/posterWall');
	var query = require('component/urlHandle');
	return function(obj){
		$('.back, .book_tab').addClass('undo');
		var $t = $(obj).find('.book_tab');
		var $tab = $t.find('li');
		fml.vars.openBookOuter = true;
		$tab.bind('click', function(){
			fml.vars.isPosterLoad = false;
			$('.book_tab').addClass('undo');
			var x = $(this).attr('x');
			var name = $(this).text();
			var $t = $tab.not('[x=' + x + ']');
			for(var i = 0; i < $t.length; i++){
				$t.eq(i).attr('x',i + 2);
			}
			$(this).attr('x',1);
		    var urlData = {  
				frame : 0,
				name : name
			};   
			posterWall(urlData , '/app/getPoster/', '.goods_wall2');
		});
		$('.goods_wall1').masonry({
			itemSelector : '.poster_wall',
			columnWidth : 0
		});
		$('.goods_wall2').masonry({
			itemSelector : '.poster_wall',
			columnWidth : 0
		});
		$tab.eq(0).click();
	};
});
