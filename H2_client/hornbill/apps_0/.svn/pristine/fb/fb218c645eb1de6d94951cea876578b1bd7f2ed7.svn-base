/*common*/
var $ = require('jquery');
var changeR = {
    httpR : function( link , attr ){
        var infos = changeR.splitHref(link)
        if (infos === false) {
            return link;
        }
        var oldBury = '';
        if (infos.params[attr.name]) {
            oldBury = '.' + infos.params[attr.name];
        }
        infos.params[attr.name] = changeR.buildBury(attr) + oldBury;
        return changeR.buildHref(infos)
    },

    meilishuoR : function( link , attr ){
        var infos = changeR.splitHref(link);
        if (infos === false) {
            return link;
        }
        var jsonParam = infos.params['json_params']
        var jsonObj = {};
        var oldBury = '';
        if (jsonParam) {
            param = decodeURIComponent(jsonParam);
            jsonObj = JSON.parse(param);
        }
        if(jsonObj.r){
            oldBury = '.' + jsonObj.r;
        }

        jsonObj.r = encodeURIComponent(changeR.buildBury(attr)+oldBury);
        
        infos.params['json_params'] = JSON.stringify(jsonObj);

        return changeR.buildHref(infos)
    },

    splitHref : function(link) {
        // 按照 ? 号切分
        if (link === "") {
            return false;
        }
        var domain = '', query = '', anchor = '';
        var qPos = link.indexOf("?");
        var aPos = link.indexOf("#");
        if (qPos != -1 && aPos != -1) {
            if (qPos < aPos) {
                domain = link.substring(0, qPos);
                query = link.substring(qPos + 1, aPos);
            } else {
                domain = link.substring(0, aPos);
            }
            anchor = link.substring(aPos);
        } else if (qPos != -1 && aPos == -1) {
            domain = link.substring(0, qPos);
            query = link.substring(qPos + 1);
        } else if (qPos == -1 && aPos != -1) {
            domain = link.substring(0, aPos);
            anchor = link.substring(aPos);
        } else {
            domain = link
        }
        var params = {};
        if (query !== "") {
            var pairs = query.split("&")
            for (p in pairs) {
                var kv = pairs[p].split("=")
                params[kv[0]] = ""
                if (kv.length > 1) {
                    params[kv[0]] = kv[1]
                }
            }
        }

        return {
            domain : domain,
            params : params,
            anchor : anchor
        }
    },
    buildBury : function(attr) {
        var bury = "";
        if (attr.value) {
            bury = attr.value;
        } else {
            bury = 'other'
        }
        var prefix = '.pw_';
        if (attr.aid) {
            bury += prefix + attr.aid;
        }
        return bury;
    },
    buildHref : function(args) {
        var href = args.domain
        if (args.params !== {}) { 
            href += "?"
            for (p in args.params) {
                href += p + "=" + encodeURI(args.params[p]) + "&"
            }
            href = href.substr(0, href.length - 1);
        }
        href += args.anchor
        return href;
    }
}
function addR ( links , attr ){
    if(links.indexOf('javascript')==0 || links.indexOf('#')==0 || links.indexOf('http://higo.meilishuo.com') == 0) return links;
    var meilishuo = links.indexOf("meilishuo:") == 0 || links.indexOf("meilishuohd:") == 0;
    return meilishuo ? changeR.meilishuoR( links , attr ) : changeR.httpR( links , attr );
}
exports.editUrlParamR = addR;
