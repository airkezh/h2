/*common*/
var $ = require('wap/zepto')
	,openAppLink = require('wap/app/openAppLink')

/*获取店铺链接*/
function getShopUrl(ele,link) {
	var url = Meilishuo.config.os.mlsApp ? openAppLink.getAppLink({
		'protocol': 'shop',
		'param': {
			'shop_id': ele
		}
	}) : '/shop/shop/' + ele;
	window.location.href = window.__get_r(url , link) ;
}
$('.goods a').on('click',function(){
	var shop_id = $(this).data('shop');
	var link = $(this).data('xr');
	if(shop_id){
		getShopUrl(shop_id,link);
	}else{
		return false;
	}
});