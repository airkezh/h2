fml.use('app/adPoster', function(){
	this.carousel('.boxLi',{'height':22,'gap':1000,'type':1});
});
fml.use(['jquery', 'component/shareTmp', 'ui/dialog', 'app/checkLogin'], function(){
	var $ = this.jquery;
	var shareTmp = this.shareTmp;
	var dialog = this.dialog;
	var check = this.checkLogin;
	$('.findBag').click(function(){
		if (!check()) return false;
		$('html, body').animate({scrollTop:$('.prompt').show().offset().top});
	});	
	$('.look').click(function(){
		if (!check()) return false;
		var tpl = shareTmp('lookAllBagTpl');
		var allBag = new dialog({'width':407, content: tpl});
		$('#dialogTitle').remove();
		$('.close_z, .btn').click(function(){ allBag.drive.destroyModel();});
	});
});
fml.define('page/huodong/chunjie', [], function(){});
