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
    'limit': 20,
    'tid' : fml.vars.tid,
    'user_id' : fml.vars.user_id
};
//console.log(fml.vars.tid);
pin.init({
    containerId : '.goods_wall',
	autoResize : null,
    resizeCallback : function(){}
});
var opts = jquery.extend({}, urlData, query);
var _url = '/aj/wangmeng/alliance?';
posterWalls(opts, _url, {'Infinite':1});