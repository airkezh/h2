fml.define('page/meilishuo_share' , ['jquery', 'app/sharePicture', 'app/pickGoods', 'component/urlHandle'] , function(require, exports){
	var urlHandle = require('component/urlHandle');
	var $ = require('jquery');
	var query = urlHandle.getUrl(location.href);
	var siteurl = encodeURIComponent(decodeURIComponent(query.siteurl));
	var url = '/aj/twitter/verify';
	var data = {
		'url': siteurl,
	};
	$.get(url, data, function(res){
		if(res.code) {
			alert(res.msg || '对不起,请换其他页面尝试抓图');
			return;
		}
		if (res.data.message == 'goods') {
			urlHandle.redirect('/meilishuo_goods?' + 'mlsurl=' + siteurl + '&mlstype=goods&mlsshare=1');
		} else {
			require('app/sharePicture')();
		}
	}, 'json');
});
