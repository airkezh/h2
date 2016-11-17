//#3205 在海报页加入分享入口需求
fml.define('app/sharePortal', ['jquery', 'app/shareTo'], function(require, exports){
	var $ = require('jquery');
	var share = require('app/shareTo');
	var $share = $('.share_group');

	var url = location.href;
	var type = 'guang';
	if (url.indexOf('/catalog/') > -1) {
		type = 'catalog';
	} else if (url.indexOf('/attr/') > -1) {
		type = 'attr';
	}
	var frm = 'frm=huiliu_' + type;
	if (url.indexOf('?') > -1) {
		url += '&' + frm;
	} else {
		url += '?' + frm;
	}
	var reply_wb = '@美丽说 的' + Meilishuo.config.curWord + '推荐也太赞了吧，个个都是心头好！统统收进我在美丽说的杂志，想买就买！快去看看有没有你喜欢的>>>'; 
	var reply = '美丽说的' + Meilishuo.config.curWord + '推荐也太赞了吧，个个都是心头好！统统收进我在美丽说的杂志，想买就买！快去看看有没有你喜欢的';
	var desc = '美丽说杂志是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说杂志，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~';
	var pic_url = Meilishuo.config.sharePic;
	var title = document.title;
	
	$share.find('.i_sina').click(function(){
		share.shareToWeibo(url+'sina', reply_wb, pic_url);
	});
	$share.find('.i_qzone').click(function(){
		share.shareToQzone(url+'qzone', reply, desc, title, pic_url);
	});
	$share.find('.i_tx').click(function(){
		share.shareToQQ(url+'qqwb', reply, pic_url);
	});
});
