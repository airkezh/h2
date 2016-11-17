var controlFns = {
	'vote': function(){
		var php = {
			'barrage_get':'/customactivity/customActivity_barrage_get'
			,'runner_index':'/customactivity/customActivity_runner_index'
			,'connect_weixin':'/connect/weixin?type=0'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var shareInfo = data.runner_index.share || ''
			if(data.os && data.os.mlsApp && shareInfo){
				var wapMod = base.loadModel('wap/tools.js');
				var params = {
				    'title': {
				        'weixin':shareInfo.title,
				        'weixin_timeline':shareInfo.title
				    },
				    'text': shareInfo.content,
				    'pic': shareInfo.img,
				    'url': "http://"+this.req.headers.host+this.req.url
				};
				//分享类型
				if (wapMod.isNewest(this.req, '6.6.0')) {
				    data.appShare = true;
				    data.params = params;
				} else {
				    data.appShare = false;
				    data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
				}
			}

			if(data.os && data.os.weixinBrowser){
				connectWX(this, data)
			}
			data.pageTitle = '跑男第三季拉票'
			data._CSSLinks = ['running_man/vote'];
			data.use_rem_screen = true;
			this.render('running_man/vote.html', data);
		});
	}
	,'shake_vote':function(){
		var nowTimestamp = (new Date()).getTime()
		if(nowTimestamp>1446822000000){
			return this.redirectTo('/running_man/shake_vote_red_packet/', true)
		}
		var php = {
			'runner_shake_init':'/customactivity/customActivity_runner_shake',
			'connect_weixin':'/connect/weixin?type=1'
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.os && data.os.weixinBrowser){
				connectWX(this, data)
			}
			data.pageTitle = '猜猜本期跑男最强者'
			data._CSSLinks = ['running_man/shake_vote'];
			data.use_rem_screen = true;
			this.render('running_man/shake_vote.html', data);
		});
	}
	,'shake_vote_red_packet':function(){
		var php = {
			'runner_shake_init':'/customactivity/customActivity_runner_shake',
			'gift_init':'/weixin/weixin_running_gift',
			'connect_weixin':'/connect/weixin?type=1'
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.os && data.os.weixinBrowser){
				connectWX(this, data)
			}
			data.pageTitle = '猜猜本期跑男最强者'
			data._CSSLinks = ['running_man/shake_vote_red_packet'];
			data.use_rem_screen = true;
			this.render('running_man/shake_vote_red_packet.html', data);
		});
	}
};

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true) || true;
}

exports.__create = controller.__create(new Function(), controlFns);
