function sem() {
	return this;
}

var controlFns = {
	index: function() {
		// this.debugSnake({'target': 'weijiliao.rdlab'});
		var wapMod = base.loadModel('wap/tools.js'),
			channel = wapMod.getChnlMark(this.req, this.res);
		var cata_id = this.req.__get.cata_id || '';
		var nid = this.req.__get.nid || '';
		var refer = this.req.headers.referer;
		var php = {
			'sem': '/customactivity/CustomActivity_sem_landpage?id=SemAttrWord&cid=10619&cata_id=' + cata_id + '&nid=' + nid,
			'apks': '/url/Package_get'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (data.os.iphone || data.os.ipad) {
				data.appUrl = 'https://itunes.apple.com/cn/app/id431023686?mt=8';
			} else {
				if (!channel || (data.apks && !data.apks[channel])) {
					channel = 'web';
				}
				if (data.apks && data.apks[channel] && data.apks[channel].src) {
					data.appUrl = data.apks[channel].src;
				} else {
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Android6.4.0/Meilishuo_10008.apk';
				}
			}
			data.channel = channel;
			data.refer = refer;
			data.pageTitle = '美丽说-女神穿衣必备APP';
			data._CSSLinks = ['sem/index'];
			this.render('sem/index.html', data);
		});
	}
};

exports.__create = controller.__create(sem, controlFns);