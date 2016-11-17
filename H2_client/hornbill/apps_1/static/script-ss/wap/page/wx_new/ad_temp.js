/*common*/
var posterWall = require('m/app/posterWall')
	,poster = require('m/app/posterPa')
	,lazyLoad = require('m/component/lazyLoad')
	,urlHandle = require('wap/component/urlHandle')
	// ,historyState = require('wap/app/historyState')

var data = {
	url : '/aj/wx_new/normal_goods?page_name=ad_temp'
	, poster : poster
	, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
	, colNum : 2
}
var _o = urlHandle.getParams(window.location.search)['cate_id']
if (_o) {
	data.url += '&cate_id=' + _o;
};
posterWall.scroll(data);

/*
签名
 */

if(fml.vars.signDate){
	var signWX = require('wx/sign'),
		shareWX = require('wx/share'),
		_opt = fml.vars.signDate;
	signWX();
	fml.vars.shareData = {
		'desc' : _opt.text,
		'imgUrl' : _opt.src,
		'title' : _opt.title
	};
	shareWX.bind(fml.vars.shareData);
}

