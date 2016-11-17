fml.use('app/adPoster', function(){
	this.carousel('.banner',{'width':896,'gap':4000,'type':2, 'left':'.pre', 'right':'.next'});
})
fml.define('page/huodong/meizhuang' , ['app/checkLogin'] , function(require, exports){
	var check = require('app/checkLogin');
	$('.vote_box .tab span').bind('click', function(){
		var tab = $(this).attr('tab');
		$(this).parent().parent().attr('class','curtab' + tab);	
	});
	$('.vote_box .vote .voteBtn').bind('click', function(){
		if(!check()) return;
		var btn = $(this),
			tab = btn.attr('tab'),
			checked = btn.parents('.vote_box').find('.tab' + tab).find('input:checked'),
			num = checked.parent().find('span'),
			brand_id = checked.val();
		if(!brand_id) alert('请选择投票对象');
		var data = {
			'brand_id' : brand_id
		};
		var url = '/huodong/meizhuangvote/';  
		$.get(url , data , function(res){
			if(res.status == 1){
				num.html(num.html() - 0 + 1);
				btn.removeClass('voteBtn').addClass('votedBtn').text('已投票').unbind();
			}else if(res.status == 0){
				alert('请不要重复投票');
			}
		},'json'); 
	});
});

