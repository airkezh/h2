/*common*/

var varsIsPc = false , resultLink;
function isPc() {
    var system ={
        win : false,
        mac : false,
        xll : false
    };
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    if(system.win||system.mac||system.xll){
        varsIsPc = true;
        return isPc;
    }
}
function getAppLink(protocol, param , os , r ,extra){
    if (!protocol || !param) return false;
    if (r) param.r = r;
    var link = 'meilishuo';
    if (os && os.ipad) link = 'meilishuohd';
    link += '://'+ protocol +'.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param));
    if(extra) link += '&source=' + extra;
    return link;
}
isPc();
fml.vars.ua = navigator.userAgent;
exports.changePageUrl = function ( aid, uid , varsR ){
    if( varsIsPc ){     // pc
        resultLink = 'http://www.meilishuo.com/share/item/' + uid;
    }else if( fml.vars.mlsApp != '' && fml.vars.mlsApp != 'undefined' ){
        resultLink = getAppLink('twitter_single', {'twitter_info' : {'twitter_id' : uid , 'is_doota' : 1}}, Meilishuo.config.os.mlsApp, 'pwitem_' + aid );
    }else if( window.location.href.indexOf('isFromShare') != -1  ){  // share
        resultLink = 'http://m.meilishuo.com/share/item/' + uid + "?r=pwitem_" + aid;
    }else if( fml.vars.ua.indexOf('QQ/') != -1 ){
        resultLink = 'http://m.meilishuo.com/sq/detail?channel=shouq_pw_' + aid + '.pwitem&tid=' + uid ;
    }else if( fml.vars.ua.indexOf('MicroMessenger') != -1 ){
        resultLink = 'http://m.meilishuo.com/wx/detail?channel=weixin_pw_' + aid + '.pwitem&tid=' + uid ;
    }else{
        resultLink = 'http://m.meilishuo.com/share/item/' + uid + "?r=pwitem_" + aid;
    }
    return resultLink;
}

exports.changeShopUrl = function( id , shopId , r ){
    if( varsIsPc ){
        resShopLink = 'http://www.meilishuo.com/shop/' + shopId ;
    }else if( fml.vars.mlsApp != '' && fml.vars.mlsApp != 'undefined' ){
        var params = { 'shop_id' : shopId , 'r' : 'pwshop_'+ id };
        resShopLink = 'meilishuo://shop.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(params));
    }else if( window.location.href.indexOf('isFromShare') != -1 ){
        resShopLink = 'http://m.meilishuo.com/shop/' + shopId + '?r=pwshop_' + id ;
    }else if( fml.vars.ua.indexOf('QQ/') != -1 ){
        resShopLink = 'http://m.meilishuo.com/shop/' + shopId + '?r=pwshop_' + id ;
    }else if( fml.vars.ua.indexOf('MicroMessenger') != -1 ){
        resShopLink = 'http://m.meilishuo.com/wx/shop/index/?shop_id=' + shopId + '&r=pwshop_' + id ;
    }else{
        resShopLink = 'http://m.meilishuo.com/shop/' + shopId + '?r=pwshop_' + id ;
    }
    return resShopLink;
}
