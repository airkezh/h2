/*common*/
var jquery = require('jquery'),
	shareTmp = require('component/shareTmp'),
	pin = require('component/waterfall'),
	posterWalls = require('app/posterWalls'),
	urlHandle = require('component/urlHandle');
var query = urlHandle.getParams(window.location.href.toString());
var urlData = {
	'frame' : query.frame || 0,
	'page' : query.page || 0,
    'limit': 20
};
pin.init({
    'containerId' : '.goods_wall',
    'colWidth' : 240,
    'colNumMin' : 5,
	'offset' : {x : 0 ,y : 10}
});
if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0){
		pin.append(shareTmp('posterWall' , Meilishuo.config.poster0));
}
var opts = jquery.extend({}, urlData, query);
var _url = '/aj/mlslm/poster?';
posterWalls(opts, _url, {'Infinite':1});