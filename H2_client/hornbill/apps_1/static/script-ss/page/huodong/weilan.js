fml.use('app/countdown', function(){
    this();
});
fml.use('app/welfare_apply' , function(){});
fml.define('page/huodong/weilan' , ['jquery' , 'app/checkLogin' , 'component/shareTmp' , 'ui/dialog'] , function(require , exports){
	$ = require('jquery');
    var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var dialogUI = require('ui/dialog');

	$('.top li').on('click' , function(){
		if(!check()) return false;
		var index = $('.top li').index($(this));
		if(index == 0){
			var html = $(shareTmp('right'))
			html.find('#goDown').click(function(){
				$(this).parent().find('.close_btn').trigger('click')
				$('#wlf_bg')[0].scrollIntoView()
				return false
				})
			var pop1 = new dialogUI({
				'content':html , 
                'width': '475px' , 
				'onClose' :function(){
					},
				'onChange' : function(){
					$('#dialogTitle').hide();  
					$('#dialogLayer').css({'background' : 'none' , 'padding' : '0' , 'top' : ($(window).height() - $('#dialogContent').height())/2 });
					$('#dialogContent').css({'background' : 'none'});
				}
			});
			//发推
			$.get('/aj/huodong/cus_create_twitter' , {'pid' : '872989819' , 'actUrl' : '/biz/huodong/wlha/?frm=weilan99' , 'actTitle' : '冬季保湿，此处“无水”胜“有水”' , 'actContent' : '了解了蔚蓝海岸“无水”的秘密了哦！' , 'shareType' : 0} , function(){} , 'json');
		}else{
			var html = shareTmp('wrong');
			var pop1 = new dialogUI({
				'content':html , 
                'width': '354px' , 
				'onChange' : function(){
					$('#dialogTitle').hide();  
					$('#dialogLayer').css({'background' : 'none' , 'padding' : '0' , 'top' : ($(window).height() - $('#dialogContent').height())/2 });
					$('#dialogContent').css({'background' : 'none'});
				}
			});
		}
		$('.close').on('click' , function(){
			pop1.drive.destroyModel();
		});
	});
});
