function jobs(){
	return this;
}

var controlFns = {
	'index' : function (){
		return this.jobs_welcome();
	},
	'jobs_welcome' : function (){
		var php ={
		};
		var wapMod = this.loadModel('tools.js');
		var params = {
			'title' : {
				'weixin' : "女神喊你来上班啦",
				'weixin_timeline' : "女神喊你来上班啦",
				'default' : "女神喊你来上班啦"
			},
			'text' : {
				'weixin' : "--美丽说技术专场招聘",
				'weixin_timeline' : "--美丽说技术专场招聘",
				'default' : "--美丽说技术专场招聘"
			},
			'pic' : {
				'weixin' : "http://i.meilishuo.net/css/images/jobs/share_logo.jpg",
				'weixin_timeline' : "http://i.meilishuo.net/css/images/jobs/share_logo.jpg",
				'default' : "http://i.meilishuo.net/css/images/jobs/share_logo.jpg"
			},
			'url' : 'http://m.meilishuo.com/jobs/jobs_welcome/'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data.share = wapMod.shareTo(mSelf.req , params);;
			data._CSSLinks = ['jobs/jobs_welcome'];
			mSelf.render('jobs/jobs_welcome.html',data);
		});
	},
	'jobs_detail' : function (){
		var php ={
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data._CSSLinks = ['jobs/jobs_detail'];
			mSelf.render('jobs/jobs_detail.html',data);
		});
	}
};

exports.__create = controller.__create(jobs, controlFns);