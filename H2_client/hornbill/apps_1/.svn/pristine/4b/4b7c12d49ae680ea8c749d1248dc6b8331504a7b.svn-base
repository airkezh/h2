fml.define('page/huodong/promotion/attr_sale' , [] , function(){});
fml.use('app/tracking' , function(){
	   this.logClick('.pins' , 'twitter_id' , 'cr/pin')
       this.logPoster()
	   fml.vars.toLogPoster = true
    });

fml.use(['jquery' , 'app/posterWalls11' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 1,
		'page' : query.page || 0,
		'view' : '1',
		// 'word' : query.word || fml.vars.word_id,
		'section' : query.section || 'hot',
		'hi' : query.hi || '',
		'price' : query.price || 'all'
	};
	var opts = this.jquery.extend({}, urlData, query);

	this.posterWalls11(opts , '/aj/getGoods/featured_list12',{'Infinite' : '1'});
});
fml.use('app/admClick', function(){
	this.monitor();
})
fml.use('app/deletePoster' , function(del){
	    del.deleteTrigger();
}); 
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('component/lazyLoad' , function(){
    this.load('.imgBox>span' ,'asrc');
});
fml.use(['jquery', 'component/shareTmp', 'ui/dialog', 'app/checkLogin'], function(){
	/*春节活动*/
	var $ = this.jquery;
	var shareTmp = this.shareTmp;
	var dialog = this.dialog;
	var check = this.checkLogin;
	var isLoad = false;
	$('.winBag').click(function(){
		if (!check()) return false;
		if (isLoad) return;
		isLoad = true;
		$.get('/aj/huodong/spring_init', {'from':Meilishuo.config.attrWord, 'attr_ids':fml.vars.word_id}, function(res){
			if (!res) return;
			$('.winBag').remove();
			if (res.status == -1) {
				alert('今天的福袋已经领过了，请明天再来哦！');
				$('.winBag').remove();
				return;
			} else {
				var tpl = shareTmp('luckBagPop', res);
				var winBag = new dialog({'width': 500, content:tpl});
				$('#dialogTitle').remove();
				$('.close_z, .goonBtn').click(function(){ winBag.drive.destroyModel();});
				var shareBagFun = function(){
					$('.fillInfo').hide();
					$('.shareLuck').show().find('.shareBgBtn').click(function(){
						$.get('/aj/huodong/is_share', {'from':Meilishuo.config.attrWord, 'attr_ids':fml.vars.word_id}, function(r){
							if (r.status == 0) {
								$('.luckBagPop').hide();
								$('.shareLuckPop').show().find('a').click(function(){
									$('.luckBagPop').show();
									$('.shareLuckPop').hide();
								});
								return;
							} else if(r.status == 1){
								$('.luckgirl').hide();
								$('.luckgirl2').css('display','inline');
								$('.new_num').html('幸运号码：'+r.luck_num);
								$('.shareLuck').hide();
								$('.luckInfo').show();
							} else if (r.status == -1){
								alert('今天的福袋已经领过了，请明天再来哦！');
								winBag.drive.destroyModel();	
							}
						}, 'json');
					});
				}
				if(res.status == 1) {
					$('.sureBgBtn').click(function(){
						var name = $.trim($('[name=name]').val()),
							email = $.trim($('[name=email]').val()),
							phone = $.trim($('[name=phone]').val()),
							addr = $.trim($('[name=address]').val());
						if (name == '' || email == '' || phone == '' || addr == '') {
							$('.bagHint').html('请完善个人信息').show();
							return;
						}
						var data = {name:name, email:email, phone:phone, addr:addr, from:Meilishuo.config.attrWord, luck_num:res.luck_num, attr_ids:fml.vars.word_id};
						$.get('/aj/huodong/spring_addr', data, function(ret){
							if(ret.status == -1) {
								alert('今天的福袋已经领过了，请明天再来哦！');
								winBag.drive.destroyModel();
							} else if (ret.status == 1) {
								shareBagFun();
							}
						}, 'json').error(function(){
							$('.bagHint').html('请不要乱填~~').show();
						});
					});
				} else if (res.status == 2) {
					shareBagFun();	
				}	
			}
		}, 'json');
	});
})

