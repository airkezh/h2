fml.define('page/app/qqsale' , ['app/countdown', 'app/shareTo' , 'component/windowScroll' , 'jquery'] , function(require,exports){
	var $ = require('jquery');
	var share = require('app/shareTo');
	var countdown = require('app/countdown');
	var scroll = require('component/windowScroll');
	Meilishuo.togo = function(qqurl){
		fusion2.nav.open({
			url : qqurl
		});
	}
	$(document).ready(function(){
		var flag = 0;
		$('.sale_top li').each(function(index){
			$(this).click(function(){
				if ($(this).attr('class') == 'current') return;
				$('li.current').removeClass('current');
				$(this).addClass('current');
				if (index == '1') {
					flag = 1;
					if($('.list_link').length == 0){
						$.get("/app/trunk_sale/",{'type':1},function(res){
							$('#con_sale').append(res);
							$('.sale_content').hide();
							//$('.qqshare').hide();
							$('#con_sale').delegate('.inner_box', 'mouseover',function(){
								$(this).css('border-color','#FF6699');
							}).delegate('.inner_box' , 'mouseout',function(){
								$(this).css('border-color','#ccc');	
							});
							/*倒计时*/
							countdown();
						});
					}else{
						$('.limit').show();
						$('.sale_content').hide();
						//$('.qqshare').hide();
					}


				}else if (index == '0'){
					flag = 0;
					$('.sale_content').show();
					//$('.qqshare').show();
					$('.limit').hide();
				}
			});	
		});
		/*share to qzone*/
		$('.i_qzone').on('click',function(){
			var des = $(this).parents('.describe');
			var pics = des.siblings('.sale_pic').find('img').attr('src');
			var url = location.href;
			var desc = des.children('.recom').find('em').html();
			var title = $(this).parents('.sale_content').children('h3').find('em').html();
			share.shareToQzone(url , desc, '', title , pics);
		});
		

		/*var _sc = $('.sale_container');
		var _cs = $('#con_sale');
		var isLoad = true;
		var frame = 1;
		_sc.scroll(function(){
			if (flag == 0 || !isLoad || frame >=3) return;
			var pos = _sc.scrollTop();
			if (pos >= _cs.height()/2) {
				isLoad = false;
				$.get('/app/trunk_sale/' , {'type':'1','frame':frame} , function(res){
					$('.limit').append(res);
					frame++;
					isLoad=true;
				});
			}   
		});*/ 
		

	});
});
