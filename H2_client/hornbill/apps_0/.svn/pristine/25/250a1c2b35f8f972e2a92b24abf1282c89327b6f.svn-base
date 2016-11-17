fml.define('circle/app/openAppLink', ['circle/zepto'], function(require, exports){
	var os = Meilishuo.config.os,
		r = Meilishuo.config.r;

	exports.getAppLink = function(appLink){
		if(r) appLink.param.r = r;
		var link = 'meilishuo';
		if(os && os.ipad) link = 'meilishuohd';
		link += '://'+ appLink.protocol + '.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(appLink.param));
		return link;
	}
	var appLinkType = function(old_link){
		var schema = {
			'twitter_single' : {
				reg : /\/share\/item\/(\d+)\b/
				,param : {"twitter_info" : {"twitter_id":null, "is_doota":1}}
				,k : 'twitter_info.twitter_id'
			},
			'group' : {
				reg : /\/group\/(\d+)\b/
				,param : {'group_id' : null}
				,k : 'group_id'
			}
		};
		for (var schm in schema){
			var p = schema[schm].reg.exec(old_link);
			if(!p) continue;

			p = p[1];
			var appLink = {};
			appLink.protocol = schm;
			appLink.param = schema[schm].param;

			var k = schema[schm].k.split('.')
				,kl = k.pop()
				,tv = appLink.param;
			k.forEach(function(kf){
				tv = tv[kf];
			})
			tv[kl] = p;
			return getAppLink(appLink)
		}
		return false
	}
	var makeAppLink = function(e){
		if(!os || !os.mlsApp) return;
		if(this.href.indexOf('meilishuo://') > 0 || this.href.indexOf('meilishuohd://') > 0) return $(this).die('click', makeAppLink);

		var appLink = appLinkType(this.href);
		if(appLink) return this.href = appLink;

		$(this).die('click', makeAppLink);
	}
	//$('a').length && $('a').live('click', makeAppLink);
});
