fml.define('page/huodong/loreal1' , ['jquery' , 'app/checkLogin' , 'component/shareTmp','ui/dialog'] , function(require , exports){
	var check = require('app/checkLogin'),
		shareTmp = require('component/shareTmp'),
		dialog = require('ui/dialog');
	$('.votewrap').on('click',function(){
		if(!check()) return;
		var votewrap=$(this);
		var goodsid=votewrap.find('.vote').attr('data-id');
		var data={
			'vote':goodsid
		};
		console.log(goodsid);
		$.post('/aj/huodong/loreal1',data,function(res){
			if(res.code==0){
				alert('投票成功');
				votewrap.find('.vote').addClass('voted');
			}
			else{
				alert('你已经投过该宝贝了');
			}
		},'json');

	})
});
