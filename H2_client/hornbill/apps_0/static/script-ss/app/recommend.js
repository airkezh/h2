/*
 for home page recommend magazine&daren in right bar
*/
fml.define('app/recommend', ['jquery' , 'component/waterfall'] , function(require, exports){
	var $ = require('jquery');
	var pin = require('component/waterfall');
	
	return function(url, $rec, $rep, rep_rec){
		var data_rec = [];
		function getRecDt() {
			$.post(url, function(res){
				if (!res) {
					if (url.indexOf('/recommend/daren_home') > -1) {
						$('.cmn_title').hide();
						$('.interest').hide();
					} else {
						$rec.parent().css('height','auto');
					}
					return;
				}
				data_rec = res;
				var dt = data_rec.splice(0, 3);
				$rec.fadeOut(400, function(){if($.browser.msie) this.style.removeAttribute('filter');});
				setTimeout(function(){ 
					rep_rec(dt); 
					$rec.fadeIn(400, function(){if($.browser.msie) this.style.removeAttribute('filter');}); 
					$con_stamp = $('.corner_stamp');
					$con_stamp.data('height', $con_stamp.height());			//hack for waterfall, update height
					pin.reload();
				}, 400);
			}, 'json');
		}
		getRecDt();
		$rep.click(function(){
			if (data_rec.length < 3) {
				getRecDt();
				return false;
			}
			var dt = data_rec.splice(0, 3);
			$rec.fadeOut(400, function(){if($.browser.msie) this.style.removeAttribute('filter');});
			setTimeout(function(){ 
				rep_rec(dt); 
				$rec.fadeIn(400, function(){if($.browser.msie) this.style.removeAttribute('filter');}); 
			}, 400);
			return false;
		});
	};
});
