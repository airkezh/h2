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
    'colNumMin' : 4,
	'autoResize' : null,
	'offset' : {x : 0 ,y : 10},
    resizeCallback : function(){}
});
//根据后台传图尺寸的宽高比在 1:1.3~1:1.6
fml.vars.poster.posWidth = pin.getSettings('colWidth');
fml.vars.poster.posHeight = 1.6 * fml.vars.poster.posWidth;
var opts = jquery.extend({}, urlData, query);
var _url = '/aj/xuanguan/middle?';
posterWalls(opts, _url, {'Infinite':1});