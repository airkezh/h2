fml.define('app/dialogSuccess' , ['jquery' , 'component/urlHandle' , 'app/closeFrame' , 'component/regString' , 'component/shareTmp' , 'ui/dialog' , 'app/closeWindow'] , function(require , exports){
    var $ = require('jquery');
    var shareTmp = require('component/shareTmp');
    var dialog = require('ui/dialog');
	var closeIframe = require('app/closeFrame');
	var closeWindow = require('app/closeWindow');
	var regString = require('component/regString');
	var query = require('component/urlHandle').getUrl(window.location.href)
    var shareSuccess = function(magaName,magaId,magaTitle , isType){
        var data = {};
        data.magaName = regString.cutstr(regString.escapeString(magaName) , 20);
        data.magaId = magaId;
		data.magaTitle = magaTitle;
        //console.log(magaName)
        //console.log(magaId)
        var tpl = isType == '分享按钮' ? shareTmp("shareMagaSucTpl") : shareTmp("magaSucTpl",data);
		var width = isType == '分享按钮' ? 520 : 370;
		if (isType == '分享按钮') magaTitle = '提示';
        var close = new dialog({title : magaTitle , content : $(tpl) , width : width ,
        onStart : function(){
			$(".smileysbox").hide();
        } , onClose : function(){
			if(isType) {
				if (isType == '分享按钮') {
					closeWindow();
				} else {
					closeIframe();
				}
			}
			if (document.referrer.indexOf('meilishuo_share') > -1) window.close();  //for share api
        }});
		if (isType == '分享按钮') {
			close.drive.overlay.destroy();
			$('#dialogLayer').css({'top':'60px','margin-left':'auto','margin-right':'auto','position':'static'}).find('#closeDialog').hide();
		}
	    window.setTimeout(function(){
			close.drive.destroyModel();	

		},2000);
		if((isType == 3 || isType == 'pickup') && parent == self && !query.mlsshare){
				history.go(-1);
		}
    }
    exports.shareSuccess = shareSuccess;
});
