fml.define('page/huodong/yuxi' , ['jquery' , 'app/checkLogin'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	$('.yuxi_guan').css({'left' : Math.floor(($('.yuxi_bg').width()-'275')/2) + 'px'});
	if(check()){
		$('.yuxi_one span').on('click' , function(){
			$('.yuxi_one').hide();
			$('.yuxi_two').show();
			$('.yuxi_two span').on('click' , function(){
				var yuxi_input = $('.yuxi_two input').val();
				var yuxi_se = $('.yuxi_two select').val();
				if(yuxi_input == '' || yuxi_se == '请选择'){
					alert('选项不能为空哦~');	
				}else{
					$('.yuxi_two').hide();
					$('.yuxi_three').show();
					$.post('/wbapp/ajax_app_noimg?actName=yuxi' , { pid:443786647 , ptype:0 , stid:0 , suid:0 , type:2 , yuxi_iam:yuxi_input , yuxi_se:yuxi_se });
				}
			});
		});
	}


});
