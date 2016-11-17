fml.define('sum/goods' , ['jquery' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	return function(preobj, btn){
		var name = $('.book_tab li[x=1]').text();
		var frame = $(btn).attr('i'), index = $(btn).attr('j');
		var str = sessionStorage.getItem(name);
		var Data = JSON.parse(str);
		var Len = Data.length;
		var data = Data[frame], len = data.tInfo.length;
		var res = [];
//		console.log(Data)
//		console.log(data)
		for(var i = 0; i < 9; i++){
			var j = index - 0 + i;
			if(j < len){
				res.push((data.tInfo)[j]);	
			}else{
				var k = len - 1 - i;
				if(k >= 0){
					res.push((data.tInfo)[k]);
				}else{
					//if(frame = 0){return;}
					//else if(frame - 1 >= 0){res.push((Data[frame - 1].tInfo)[j - index]);}
					//else if(frame + 1 <= Len){res.push((Data[frame + 1].tInfo)[j - index]);}
					//else{return;}
				}
			}
		}
//		console.log(res);
		var $preobj = $('#' + preobj);
		var a = shareTmp('goods', {tInfo : res}), n = res.length;
		$preobj.after(a);
		var $obj = $preobj.next('div');
		var t = window.setTimeout(function(){
			$obj.addClass('load');
			var t = window.setTimeout(function(){
				$preobj.hide();
			},600);
		},10);

		var $figure = $obj.find('.goods_body figure');
		$figure.bind('click',function(){
			var index = $(this).attr('z');
			for(var i = 0; i < $figure.length; i++){
				var z = ($figure.eq(i).attr('z') - index + 9) % 9;
				$figure.eq(i).attr('z', z);
			}
		});
		$obj[0].onmousewheel = function scrollWheel(e) {
			var sl;
			e.preventDefault();
			if(e.wheelDelta){sl = e.wheelDelta;}
			else if(e.detail){sl = -e.detail;}
			if(sl > 0){$obj.find('.goods_body figure[z=8]').click();}
			else{$obj.find('.goods_body figure[z=1]').click();}
		};
	}
});
