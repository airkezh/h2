function huodong() {
	return this;
}

function isMagFavor(mSelf) {
	var modApp = base.loadModel('mls/application.js');
	var isNew = modApp.isNewUser(mSelf.req, mSelf.res);
	var browser = modApp.getBrowser(mSelf.req);
	var notSafari = !(browser.safari || browser.chrome);
	return isNew && notSafari;
}
var controlFns = {
	index: function(p) {
		switch (p) {
			case 'larocheposay':
				this.larocheposay();
				break;
			case 'test':
				this.test();
				break;
			default:
				this.larocheposay();
		}
	},
	fuide: function() {
		var php = {
			'pageData': '/customactivity/CustomActivity_common_tool_single?id=pc_fuide'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data.apparel_alert = false;
			data._CSSLinks = ['huodong/fuide'];
			data.pageTitle = data.pageData.title || '美丽说';
			mSelf.render('huodong/fuide.html', data);
		});
	},
	sfuide: function(params) {
		var php = {
			'pageData': '/activity/activity_fuide?id=' + params
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data.pageTitle = data.pageData.title || '美丽说';
			mSelf.render('huodong/sfuide.html', data);
		});
	},
	glmfl: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.apparel_alert = false
			data._CSSLinks = ['huodong/glmfl'];
			data.pageTitle = '我和阳光玩游戏  我有防晒连环计';
			mSelf.render('huodong/glmfl.html', data);
		});
	},
	glamourflage: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/glmfl2'];
			data.pageTitle = '格兰玛弗兰 换季大“干”扰';
			mSelf.render('huodong/glmfl2.html', data);
		});
	},
	lingcui: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/lingcui'];
			data.pageTitle = '领萃 刹那芳华';
			mSelf.render('huodong/lingcui.html', data);
		});
	},
	wenbiquan2: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/wenbiquan2'];
			data.pageTitle = '温碧泉 双十一来了';
			mSelf.render('huodong/wenbiquan.html', data);
		});
	},
	shes: function() {
		var php = {
			'shesVoteNum': '/customactivity/CustomActivity_shes_vote_num'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/shes'];
			data.pageTitle = 'shes 双面女神 双11驾临';
			mSelf.render('huodong/shes.html', data);
		});
	},
	larocheposay: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '理肤泉痘痘清K+M战“痘”绝配';
			mSelf.render('huodong/larocheposay.html', data);
		});
	},
	test: function() {
		var php = {
			'poster0': '/goods/attribute_poster'
		};
		var word_name = 'hot';
		this.req.__get.word_name = word_name;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['page_guang', 'huodong/comm_activity'];
			//活动相关
			data.actTpl = 'biz/huodong/lancome-vsn.html';
			data.bgStyle = 'lanvbg';
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '美丽说';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('biz/huodong/basic.html', data);
		});
	},
	lenovo: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'len_group': '/customactivity/CustomActivity_group_infos?group_ids=38829041,38613666,38884543',
			'len_editor': '/group/Add_editor?group_id=38823957'
		};
		var page = this.readData('page', this.req.__get, 0) | 0;
		var actName = this.readData('actName', this.req.__get, 'lenovo');
		var type = this.readData('type', this.req.__get, 0) | 0;
		this.req.__get.actName = actName;
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.haibaoBox = 'len_fixheight';
			data.poster0 = data.poster0.data || '';
			data.type = type;
			data._CSSLinks = ['page_guang', 'huodong/lenovo'];
			//海报窄屏
			data.notFluidPoster = 1;
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '秀我的出色';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('biz/huodong/lenovo.html', data);
		});
	},
	songxia: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'len_group': '/customactivity/CustomActivity_group_infos?group_ids=76533548,73051635,15129578',
			'top_pics': '/customactivity/CustomActivity_common_tool_multi?id=songxia_toppics',
			'bottom_pics': '/customactivity/CustomActivity_common_tool_multi?id=songxia_bottompics'
		};
		var page = this.readData('page', this.req.__get, 0) | 0;
		var actName = this.readData('actName', this.req.__get, 'songxia');
		var type = this.readData('type', this.req.__get, 0) | 0;
		this.req.__get.actName = actName;
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.haibaoBox = 'len_fixheight';
			data.poster0 = data.poster0.data || '';
			data.type = type;
			data._CSSLinks = ['page_guang', 'huodong/panasonic'];
			//海报窄屏
			data.notFluidPoster = 1;
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '松下我要Change，焕美新生';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.topbanner = false
			mSelf.render('biz/huodong/panasonic.html', data);
		});
	},
	heiren: function() {
		var php = {
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=273',
			'wl_info': '/welfare/welfare_activity_head?activity_id=273',
			'wf_girl': '/person/user_info?user_id=34143831'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host;
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/heiren', 'welfare'];
			data.pageTitle = '黑人牙膏专研亮白';
			mSelf.render('huodong/heiren.html', data);
		});
	},
	disney: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall'
		};
		var actName = this.readData('actName', this.req.__get, 'disney');
		var type = this.readData('type', this.req.__get, 0) | 0;
		this.req.__get.actName = actName;

		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) | 0;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data.notFluidPoster = 1;
			data._CSSLinks = ['huodong/disney', 'page_guang'];
			data.pageTitle = '公主驾到 随手晒身边的小公主';

			data.poster0 = data.poster0.data || '';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('biz/huodong/disney.html', data);
		});
	},
	sale_vote: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/comm_activity'];
			data.pageTitle = '美丽说闺蜜月五折特卖活动'
			mSelf.render('huodong/sale_vote.html', data);
		});
	},
	nmnfs5: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall'
		};
		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var type = this.readData('type', this.req.__get, 0) | 0;
		var actName = this.readData('actName', this.req.__get, 'nmnfs5');
		this.req.__get.actName = actName;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.haibaoBox = 'len_fixheight';
			data.poster0 = data.poster0.data || '';
			data.type = type;
			//海报窄屏
			data.notFluidPoster = 1;
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['page_guang', 'huodong/mbl_makeup'];
			data.pageTitle = '学化妆 来美宝莲潮妆学院'
				//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('biz/huodong/mbl_makeup.html', data);
		});
	},
	kc: function() {
		var php = {
			'kc_vote': '/customactivity/CustomActivity_huodong_vote',
			'kc_twitter': '/customactivity/CustomActivity_create_twitter',
			'kc_goods': '/customactivity/CustomActivity_common_tool_multi?id=biz_xy_kiss',
			'kk_goods': '/customactivity/CustomActivity_common_tool_multi?id=biz_xy_kitty'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/kisscat'];
			data.pageTitle = 'kc'
			mSelf.render('huodong/kisscat.html', data);
		});
	},
	canon: function() {
		var php = {
			//'ca_group' : '/customactivity/CustomActivity_group_infos?group_ids=37157,36593,37459' ,
			'ca_group': '/customactivity/CustomActivity_group_infos?group_ids=43286893,43285733,44515037',
			//'wl_info' : '/welfare/welfare_activity_head?activity_id=82',
			//'wl_info' : '/welfare/welfare_activity_head?activity_id=289',
			//'wf_girl' : '/person/user_info?user_id=34143831'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/canon', 'page_guang', 'welfare'];
			data.pageTitle = 'Canon 一场色彩革命';
			mSelf.render('huodong/canon.html', data);
		});
	},
	beautyBox: function(id) {
		var page = this.readData('page', this.res.__get, 0);
		var php = {
			'magicBoxMain': '/wapbiz/magicbox_main?id=' + id + '&type=pc',
			'wf_girl': '/person/user_info?user_id=34143831',
			'topic_list': '/wapbiz/magicbox_topiclist?id=' + id
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.boxPage = data.magicBoxMain.boxPage;
			data.beauty_id = id;
			data.beautyTag = 'beautybox';
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/beautyBox'];
			data.pageTitle = '花样美盒限量首发  超值惊喜等你秒杀'
				//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.topic_list.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('huodong/beautyBox.html', data);
		});
	},
	specialActivity: function() {
		var banner_id = this.readData('banner_id', this.res.__get, '');
		var php = {
			'magicBoxMain': '/customactivity/CustomActivity_common_box?id=' + banner_id + '&type=pc'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.boxPage = data.magicBoxMain.boxPage;
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/beautyBox'];
			if (data.magicBoxMain && data.magicBoxMain.boxInfo && data.magicBoxMain.boxInfo.page_title) {
				data.pageTitle = data.magicBoxMain.boxInfo.page_title;
			};
			//获取分页总数
			mSelf.render('huodong/specialTmp.html', data);
		});
	},
	masterliner: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/masterliner'];
			data.pageTitle = '美宝莲 轻松画眼线 活动'
			mSelf.render('biz/huodong/masterliner.html', data);
		});
	},
	togobuy: function() {
		var php = {
			'poster0': '/goods/catalog_poster?donotworry=1' //无忧购
		};
		var mSelf = this;
		var nid = this.readData('nid', this.req.__get, 11);
		var page = this.readData('page', this.res.__get, 0);
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.nid = nid;
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/togobuy'];
			data.pageTitle = '无忧购商品精选 —— 美丽说'
				//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			mSelf.render('biz/huodong/togobuy.html', data);
		});
	},
	gatest1: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//true 宽屏
			data.fluid = true;
			data._CSSLinks = ['huodong/masterliner'];
			data.pageTitle = 'gatest1'
			mSelf.render('biz/huodong/gatest1.html', data);
		});
	},
	gatest: function(p) {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.fluid = true;
			data.pageTitle = 'GA监测测试';
			data._CSSLinks = ['demo/video', 'demo/ga'];
			data.pageName = p;
			if (p == 'frame') {
				return mSelf.render('demo/gaFrame.html', data);
			} else if (p == '43363129') {
				data.isIframe = false;
			} else if (p == '43355446') {
				data.isIframe = false;
				data.isTrackImg = false;
			} else if (p == '43360340') {
				data.isTrackImg = false;
			} else if (p == '43355858') {

			} else {
				return mSelf.errorPage();;
			}
			mSelf.render('demo/ga.html', data);
		});
	},
	dot99: function(p) {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			var _t = parseInt((new Date(2013, 08, 05, 20, 00, 00) - new Date()) / 1000),
				_d = parseInt(_t / (3600 * 24)),
				_h = parseInt((_t % (3600 * 24)) / 3600),
				_m = parseInt((_t % (3600)) / 60),
				_s = parseInt(_t % (60)),
				_type = mSelf.readData('type', mSelf.res.__get, 0),
				erweima = {
					'qzad': 'http://img.meilishuo.net/css/images/huodong/dot99/qzad1.jpg',
					'qqad': 'http://img.meilishuo.net/css/images/huodong/dot99/qqad1.jpg',
					'wellunbo': 'http://img.meilishuo.net/css/images/huodong/dot99/wellunbo1.jpg',
					'dingtong': 'http://img.meilishuo.net/css/images/huodong/dot99/dingtong1.jpg',
					'sjbb': 'http://img.meilishuo.net/css/images/huodong/dot99/sjbb1.jpg'
				}[_type] || 'http://img.meilishuo.net/css/images/huodong/dot99/pc2.jpg';
			_s = _s > 10 ? _s : '0' + _s;
			data._CSSLinks = ['huodong/dot99'];
			data._time = {};
			data._time._data = 0;
			data._time._t = new Date(2013, 08, 05, 20, 00, 00).getTime() / 1000;
			if ((new Date(2013, 08, 05, 20, 00, 00) - new Date()) > 0) {
				data._time._data = 1;
				erweima = {
					'qzad': 'http://img.meilishuo.net/css/images/huodong/dot99/qzad.jpg',
					'qqad': 'http://img.meilishuo.net/css/images/huodong/dot99/qqad.jpg',
					'wellunbo': 'http://img.meilishuo.net/css/images/huodong/dot99/wellunbo.jpg',
					'dingtong': 'http://img.meilishuo.net/css/images/huodong/dot99/dingtong.jpg',
					'sjbb': 'http://img.meilishuo.net/css/images/huodong/dot99/sjbb.jpg'
				}[_type] || 'http://img.meilishuo.net/css/images/huodong/dot99/pc1.jpg';
			};
			data._time._d = _d;
			data._time._h = _h;
			data._time._m = _m;
			data._time._s = _s;
			data.erweima = erweima;
			data.pageTitle = '0.99元抢购韩国有机水果润肤霜';
			mSelf.render('biz/huodong/dot99.html', data);
		});
	},
	meili1010: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			var _type = mSelf.readData('type', mSelf.res.__get, 0) || 'default';
			today = mSelf.readData('date', mSelf.res.__get, 0) || '0930';
			var baseUrl = 'images/activity/meili1010/';
			data.erweima = baseUrl + today + '/ewm/' + _type + '.jpg';
			data.rightAdUrl = baseUrl + today + '/right.png';
			data.bigUrl = baseUrl + today + '/big.png';
			data.dealUrl = [
				baseUrl + today + '/1.png',
				baseUrl + today + '/2.png',
				baseUrl + today + '/3.png',
				baseUrl + today + '/4.png'
			];
			data._CSSLinks = ['huodong/meili1010'];
			data.pageTitle = '双十最强促活动';
			mSelf.render('biz/huodong/meili1010.html', data);
		});
	},
	meili99: function(p) {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			var _type = mSelf.readData('type', mSelf.res.__get, 0);
			var today = mSelf.readData('date', mSelf.res.__get, 0);
			if (today) {
				if (_type)
					data.erweima = 'images/activity/wyk/dot99/pic/' + today + '/ewm/' + _type + '.jpg';
				else
					data.erweima = 'images/activity/wyk/dot99/pic/' + today + '/ewm/default.jpg';
				data.dealUrl = [
					'images/activity/wyk/dot99/pic/' + today + '/1.png',
					'images/activity/wyk/dot99/pic/' + today + '/2.png',
					'images/activity/wyk/dot99/pic/' + today + '/3.png',
					'images/activity/wyk/dot99/pic/' + today + '/4.png'
				];
				data.rightAdUrl = 'images/activity/wyk/dot99/pic/' + today + '/right.png';
				data.bigUrl = 'images/activity/wyk/dot99/pic/' + today + '/big.png';
			} else {
				data.erweima = {
					EDM: 'images/activity/wyk/dot99/erweima/EDM.jpg',
					KAIPING: 'images/activity/wyk/dot99/erweima/KAIPING.jpg',
					PCZIYOU: 'images/activity/wyk/dot99/erweima/PCZIYOU.jpg',
					XITONGXIAOXI: 'images/activity/wyk/dot99/erweima/XITONGXIAOXI.jpg'
				}[_type] || 'images/activity/wyk/dot99/erweima/PCZIYOU.jpg';
				data.dealUrl = [
					'images/activity/wyk/dot99/pic/1.png',
					'images/activity/wyk/dot99/pic/2.png',
					'images/activity/wyk/dot99/pic/3.png',
					'images/activity/wyk/dot99/pic/4.png'
				];
				data.rightAdUrl = 'images/activity/wyk/dot99/pic/right.png';
				data.bigUrl = 'images/activity/wyk/dot99/pic/big.png';
			}
			data._CSSLinks = ['huodong/meili99'];
			data.pageTitle = '美丽99特卖活动';
			mSelf.render('biz/huodong/meili99.html', data);
		});
	},
	meili99sed: function(act_id) {
		var banner_id = this.readData('banner_id', this.res.__get, 0);
		var type = this.readData('type', this.res.__get, 0);
		var php = {
			'apply': '/customactivity/CustomActivity_beauty_99_act_user?banner_id=' + banner_id,
			'msg': '/customactivity/CustomActivity_beauty_99?banner_id=' + banner_id
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!(data.msg && data.apply)) {
				return mSelf.errorPage();
			}
			data.pic = '';
			for (var i in data.msg.img_info) {
				data.pic = data.pic || (data.msg.img_info[i][type] && data.msg.img_info[i][type].weblink);
			}
			if (!data.pic) {
				for (var i in data.msg.img_info[0]) {
					data.pic = data.msg.img_info[0][i].weblink;
				};
			}
			if ('9f19376bc178e42d333b30cea1015dca' == banner_id) data.msg.hideQR = true
			data._CSSLinks = ['huodong/meili99sed'];
			data.pageTitle = (data.msg && data.msg.page_title) || '美丽99特卖活动';
			mSelf.render('biz/huodong/meili99sed.html', data);
		});
	},
	bbrestaging0: function() {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/meibaolian'];
			data.pageTitle = '寻找最适合我的专属BB';
			mSelf.render('biz/huodong/meibaolian.html', data);
		});
	},
	bbrestaging: function(p) {
		var php = {};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/meibaolian1'];
			data.pageTitle = '寻找最适合我的专属BB';
			mSelf.render('biz/huodong/meibaolian1.html', data);
		});
	},
	xiaogou: function() {
		var aId = 309;
		var php = {
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aId,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aId,
			'wf_girl': '/person/user_info?user_id=34143831'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host; //sina share
			data._CSSLinks = ['huodong/xiaogou', 'welfare'];
			data.pageTitle = '让家更舒适，小狗与你的清洁约定';
			mSelf.render('biz/huodong/xiaogou.html', data);
		});
	},
	yuxi: function() {
		var aId = 311;
		var php = {
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aId,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aId,
			'wf_girl': '/person/user_info?user_id=34143831',
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host; //sina share
			data._CSSLinks = ['huodong/yuxi', 'welfare'];
			data.pageTitle = '羽西虫草焕颜新肌精华液';
			mSelf.render('biz/huodong/yuxi.html', data);
		});
	},
	wlha: function() {
		var aId = 361;
		var php = {
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aId,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aId,
			'wf_girl': '/person/user_info?user_id=34143831',
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			data.topbanner = false
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host; //sina share
			data._CSSLinks = ['huodong/weilan', 'welfare'];
			data.pageTitle = '蔚蓝海岸 冬季保湿，此处“无水”胜“有水”';
			mSelf.render('biz/huodong/weilan.html', data);
		});
	},
	lenovo2: function() {
		var aId = 321;
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'len_group': '/customactivity/CustomActivity_group_infos?group_ids=68755109,39668919,29337661',
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aId,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aId,
			'wf_girl': '/person/user_info?user_id=34143831',
			'photos': '/customactivity/CustomActivity_common_tool_multi?id=lenovo2'
		};
		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var hbtype = this.readData('type', this.req.__get, 0) | 0;
		var actName = this.readData('actName', this.req.__get, 'lenovo2');
		this.req.__get.actName = actName;

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			//海报
			data.haibaoBox = 'hb-table';
			data.poster0 = data.poster0.data || '';
			data.type = hbtype;
			//海报窄屏
			data.notFluidPoster = 1;
			data.fluid = true;

			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			//福利社
			data.wl_header = data.wl_info.info;
			data.user_list = data.wl_info.userInfo;
			data.wl_header.host = mSelf.req.headers.host; //sina share

			data._CSSLinks = ['huodong/lenovo2', 'welfare', 'page_guang'];
			data.pageTitle = '联想 寻找吸力姐，打造万有引力无极限';
			mSelf.render('biz/huodong/lenovo2.html', data);
		});
	},

	lenovo3: function() {
		var aId = 321;
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'my_poster': '/customactivity/CustomActivity_lenovos850_photo_user_info',
			'rank': '/customactivity/CustomActivity_lenovos850_photo_rank',
			'len_group': '/customactivity/CustomActivity_group_infos?group_ids=117374902,19680362 ',
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aId,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aId,
			'photos': '/customactivity/CustomActivity_common_tool_single?id=lenovo3&cid=1513',
			'photo': '/customactivity/CustomActivity_common_tool_single?id=lenovo3&cid=1515'

		};
		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var hbtype = this.readData('type', this.req.__get, 0) | 0;
		var actName = this.readData('actName', this.req.__get, 'lenovos850');
		this.req.__get.actName = actName;

		this.setDefaultData(php);
		// this.debugSnake({target:'devlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			//海报
			data.poster0 = data.poster0.data || '';
			data.type = hbtype;
			data.apparel_alert = false;
			//海报窄屏
			data.notFluidPoster = 1;
			data.fluid = true;
			//是否登录
			var isLogin = 0;
			data.userInfo.user_id == 0 ? isLogin = 0 : isLogin = 1;
			data.isLogin = isLogin;

			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.rank.data.totalNum;
			data.groupPg.current_page = page;
			//福利社
			data.wl_header = data.wl_info.info;
			data.user_list = data.wl_info.userInfo;
			data.wl_header.host = mSelf.req.headers.host; //sina share

			data._CSSLinks = ['huodong/lenovo3', 'welfare', 'page_guang'];
			data.pageTitle = '寻找联想S850天使爱美丽';
			mSelf.render('biz/huodong/lenovo3.html', data);
		});
	},

	pf79: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'my_poster': '/customactivity/CustomActivity_pf79_photo_user_info',
			'rank': '/customactivity/CustomActivity_pf79_photo_rank',
			'len_group': '/customactivity/CustomActivity_group_infos?group_ids=117374902,19680362 ',

		};
		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var hbtype = this.readData('type', this.req.__get, 0) | 0;
		var sort = this.readData('sort', this.req.__get, 'rank');
		var actName = this.readData('actName', this.req.__get, 'pf79');
		this.req.__get.actName = actName;
		this.setDefaultData(php);

		// this.debugSnake({target:'devlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//海报
			data.poster0 = data.poster0.data || '';
			data.type = hbtype;
			data.sort = sort;
			data.apparel_alert = false;
			//海报窄屏
			data.notFluidPoster = 1;
			data.fluid = true;
			//是否登录
			var isLogin = 0;
			data.userInfo.user_id == 0 ? isLogin = 0 : isLogin = 1;
			data.isLogin = isLogin;

			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.rank.data.totalNum;
			data.groupPg.current_page = page;

			data._CSSLinks = ['huodong/pf79', 'page_guang'];
			data.pageTitle = 'pf79魔法BB一秒大变身';
			mSelf.render('biz/huodong/pf79.html', data);
		});
	},


	nissan: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'my_poster': '/customactivity/CustomActivity_nissan_photo_user_info',
			'rank': '/customactivity/CustomActivity_nissan_photo_rank?action=status&page_size=8',
			'nissan_lottery': '/customactivity/CustomActivity_nissan_coupon_lottery'

		};
		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var hbtype = this.readData('type', this.req.__get, 0) | 0;
		this.setDefaultData(php);
		//this.debugSnake({target:'devlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//海报
			data.poster0 = data.poster0.data || '';
			data.type = hbtype;
			data.apparel_alert = false;
			//海报窄屏
			data.notFluidPoster = 1;
			data.fluid = true;
			//是否登录
			var isLogin = 0;
			data.userInfo.user_id == 0 ? isLogin = 0 : isLogin = 1;
			data.isLogin = isLogin;
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.rank.data.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 8;
			data._CSSLinks = ['huodong/nissan', 'page_guang'];
			data.pageTitle = '玛驰四轮包包 秀出你刚刚好的美';
			mSelf.render('biz/huodong/nissan.html', data);
		});
	},

	nissan_share: function() {
		var php = {
			'my_poster': '/customactivity/CustomActivity_nissan_photo_user_info'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		//this.debugSnake({target:'devlab1'});
		this.listenOver(function(data) {
			data.my_poster = data.my_poster.data;
			data.apparel_alert = false;
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '玛驰四轮包包 秀出你刚刚好的美';
			data._CSSLinks = ['huodong/nissan'];
			this.render('biz/huodong/nissan_share.html', data);
		});
	},


	CandyCrush: function() {
		var php = {
			'poster0': '/customactivity/CustomActivity_haibao_wall',
			'now_people': '/customactivity/CustomActivity_candycrush_nums'
		};
		var page = this.readData('page', this.req.__get, 0) | 0;
		var type = this.readData('type', this.req.__get, 'userfirst');
		var actName = this.readData('actName', this.req.__get, 'candycrush');
		this.req.__get.actName = actName;
		this.req.__get.type = type;
		this.setDefaultData(php);
		// this.debugSnake({target:'devlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//海报
			data.poster0 = data.poster0.data || '';
			data.apparel_alert = false;
			//海报窄屏
			data.notFluidPoster = 1;
			data.fluid = true;
			data.haibaoBox = 'hb_box';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;

			data._CSSLinks = ['huodong/CandyCrush', 'page_guang'];
			data.pageTitle = '糖果当道，你的“蜜”度有多高？';
			this.render('biz/huodong/CandyCrush.html', data);
		});
	},

	lenovo_share: function() {
		var php = {
			'my_poster': '/customactivity/CustomActivity_lenovos850_photo_user_info'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		// this.debugSnake({target:'devlab1'});
		this.listenOver(function(data) {
			data.my_poster = data.my_poster.data;
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '寻找联想S850天使爱美丽';
			data._CSSLinks = ['huodong/lenovo3'];
			mSelf.render('biz/huodong/lenovo_share.html', data);
		});
	},

	olay: function() {
		var php = {
			'my_poster': '/customactivity/CustomActivity_lenovos850_photo_user_info'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.apparel_alert = false;
			data.pageTitle = 'OLAY 长效水润之旅，0元出发';
			data._CSSLinks = ['huodong/olay'];
			mSelf.render('biz/huodong/olay.html', data);
		});
	},

	xiaogou2: function() {
		var aId = 325;
		var php = {
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aId,
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aId,
			'wf_girl': '/person/user_info?user_id=34143831'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = mSelf.req.headers.host; //sina share
			data._CSSLinks = ['huodong/xiaogou2', 'welfare', 'demo/video'];
			data.pageTitle = '小狗V-M600，为爱而生活动';
			mSelf.render('biz/huodong/xiaogou2.html', data);
		});
	},
	zirantang: function() {
		var php = {},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = '自然堂-凝润晶透 天宠冰肌';
			mSelf.render('biz/huodong/zirantang.html', data);
		});
	},
	fancl: function() {
		var php = {
				'users_apply': '/welfare/welfare_activity_avatar?activity_id=343',
				'wl_info': '/welfare/welfare_activity_head?activity_id=343',
				'wf_girl': '/person/user_info?user_id=34143831',
				'len_group': '/customactivity/CustomActivity_group_infos?group_ids=70247463',
				'len_group1': '/customactivity/CustomActivity_group_infos?group_ids=13464129'
			},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.wl_info) return mSelf.errorPage();
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data._CSSLinks = ['welfare', 'huodong/fancl', 'page_guang'];
			data.pageTitle = 'FANCL-以小见大 新鲜有道';
			mSelf.render('biz/huodong/fancl.html', data);
		});
	},
	kc_act: function() {
		var php = {
				'kc': '/customactivity/CustomActivity_kc_twitter_infos?twitter_ids=2164002125,2164005151,2164006645,2164009391,2164011651,2164013365,2164018461,2164022571,2164024281,2164027121,2164030117,2164031635,2164033075,2164034683,2164117943,2164132189,2164134061,2164135249,2164139139,2164140611,2164142657,2164154149,2164155141,2164156027,2164167939,2164169013,2164170287,2164162805,2164166037,2164161285'
			},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/kc_act'];
			data.pageTitle = 'kc';
			mSelf.render('biz/huodong/kc_act.html', data);
		});
	},
	aupres: function() {
		var php = {
				'twitter': '/customactivity/CustomActivity_twitter_infos?twitter_ids=2166559767'
			},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/aupres'];
			data.pageTitle = '欧珀莱，当珠宝爱上唇膏';
			mSelf.render('biz/huodong/aupres.html', data);
		});
	},
	aupres2: function() {
		var php = {},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/aupres2'];
			data.pageTitle = '欧珀莱，当珠宝爱上唇膏';
			mSelf.render('biz/huodong/aupres2.html', data);
		});
	},
	gz_test: function() {
		var php = {},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = '权龙你自己看着搞吧';
			mSelf.render('biz/huodong/gz_test.html', data);
		});
	},
	myShop: function() {
		var php = {
				'my_shop': '/customactivity/CustomActivity_common_tool_single?id=myShop'
			},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.my_shop) this.errorPage();
			data._CSSLinks = ['huodong/myShop'];
			data.pageTitle = '约惠新年 超值购-美丽说';
			mSelf.render('biz/huodong/myShop.html', data);
		});
	},
	superBuyers: function() {
		var php = {
				'super_buyers': '/customactivity/CustomActivity_common_tool_single?id=superBuyer'
			},
			mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.super_buyers) this.errorPage();
			data._CSSLinks = ['huodong/superBuyers'];
			data.pageTitle = '双十二美丽买手团帮你挑衣服';
			mSelf.render('biz/huodong/superBuyers.html', data);
		});
	},
	nike1: function(params) {
		delete this.req.__get.cid
		var page = this.readData('page', this.req.__get, 0) | 0;
		var topic_id = 23;
		var php = {
			'topic_list': '/wapbiz/magicbox_topiclist?id=' + topic_id,
			"nike": "/customactivity/CustomActivity_common_tool_single?id=nike"
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.nike) return mSelf.errorPage();
			//true 宽屏
			data.fluid = true;
			data.topbanner = false;
			data.beauty_id = topic_id;
			data.beautyTag = 'beautybox';
			//分页
			data.groupPg = {};
			data.groupPg.total_num = data.topic_list.totalnum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			data.pageTitle = '轻松搞定！活力缤纷Summerlook';
			data._CSSLinks = ['huodong/nike'];
			if (params == 'sport') {
				return mSelf.render('biz/huodong/nike/sport.html', data);
			} else if (params == 'welfare') {
				return mSelf.render('biz/huodong/nike/nikeWelfare.html', data);
			} else {
				return mSelf.render('biz/huodong/nike/tshow.html', data);
			}
		});
	},
	loreal: function() {
		var mSelf = this;
		var php = {
			'loreal': '/customactivity/CustomActivity_oulaiya_beautybox'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);

		this.listenOver(function(data) {
			if (!data.loreal) return mSelf.errorPage();
			if (!data.loreal.data[0].is_start) {
				data.loreal.data[0].end_time = data.loreal.data[0].start_time;
			}
			data.pageTitle = "520美丽说&欧莱雅集团联手打造 顶级奢宠美盒";
			data.is_ended = data.loreal.data[0].end_time < new Date().getTime() / 1000;
			data._CSSLinks = ['huodong/loreal'];
			if (data.loreal.data[0].is_start) {
				return mSelf.render('biz/huodong/loreal/started.html', data);
			} else {
				return mSelf.render('biz/huodong/loreal/pre.html', data);
			}
		});
	},
	biduke: function() {
		var mSelf = this;
		var php = {
			'biduke': '/customactivity/CustomActivity_biduke'
		};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data.cur_time = new Date().getTime() / 1000;
			data.start_time = 1398096000;
			data.end_time = 1398441600;
			if (data.cur_time < data.start_time) {
				data.status = 'nostart';
			} else if (data.cur_time >= data.start_time && data.cur_time <= data.end_time) {
				data.status = 'saling';
			} else {
				data.status = 'end';
			}
			data._CSSLinks = ['huodong/biduke'];
			data.pageTitle = '比度克 战痘礼盒抢购季';
			mSelf.render('biz/huodong/biduke.html', data);
		});
	},
	niuniu: function() {
		var php = {
			// 'pr_banner': '/customactivity/CustomActivity_common_tool_single?id=14_520_tequan_banner'
		};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/niuniu'];
			data.pageTitle = '美丽说客户端-EXO-M粉丝见面会门票抽奖';
			this.render('biz/huodong/niuniu.html', data);
		});
	},
	phonepriv: function() {
		var php = {
			'pr_banner': '/customactivity/CustomActivity_common_tool_single?id=14_520_tequan_banner'
		};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/phonepriv'];
			// data.pageTitle = '手机特权';
			this.render('biz/huodong/phonepriv.html', data);
		});
	},
	youdian: function() {
		var php = {
			'good_shop': '/customactivity/CustomActivity_shop_info?id=14_520_youdian&cid=1001',
			'fashion_shop': '/customactivity/CustomActivity_shop_info?id=14_520_youdian&cid=1105'
				//'pr_banner': '/customactivity/CustomActivity_common_tool_single?id=14_520_tequan_banner'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			console.log(data.good_shop);
			data._CSSLinks = ['huodong/youdian'];
			data.pageTitle = '520-名店专场';
			this.render('biz/huodong/youdian.html', data);
		});
	},
	substore: function(name, isBrand) {
		var word = this.readData('word', this.req.__get, 0);
		var page = this.readData('page', this.req.__get, 0) | 0;
		if (!word && !name) return this.errorPage();
		this.req.__get.frame = 0;

		if (name)
			this.req.__get[isBrand ? 'word_name' : 'word'] = name;
		var mSelf = this;
		var php = {
			'attr_match': '/goods/attribute_match',
			'attr_keywords': '/goods/attribute_keywords_recommend',
			//'attr_shop' : '/goods/attribute_shop',
			'attr_baike': '/goods/attribute_baike',
			'attr_title_keywords': '/goods/attribute_title',
			//	'totalNum' : '/goods/attribute_totalnum',
			'attr_brand': '/goods/attribute_brand',
			'attr_top': '/goods/Attribute_top_ten',
			'attr_words': '/welcome/attr_words',
			'season': '/customactivity/CustomActivity_seasonal_special_banner',
			'catalog': '/note/attr_navigation_words?attr_id=' + name,
			'goods': '/activity/attr_recommend_goods?attrid=' + name,
			'banner': '/customactivity/CustomActivity_common_tool_single?id=14_520_sub_store'
		};
		php.poster0 = '/goods/attribute_poster'

		if (name) {
			php['p4p'] = '/pfp/pfp_hot?key_id=' + name + '&tp=3'
		}
		if (!isBrand) {
			php['attr_style'] = '/goods/attribute_best_style'
			php['attr_description'] = '/goods/attribute_description'
		}
		if (name && !isBrand && !isNaN(name)) {
			php['adm1'] = '/adm/ad_Show?slot_id=1&attr_id=' + name
			php['adm3'] = '/adm/ad_Show?slot_id=3&attr_id=' + name
		}

		var magFavor = false; //#2836
		if (isMagFavor(mSelf)) {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.isMagFavor = magFavor;
			delete mSelf.req.__get['word_name'];
			var word_name = data.attr_title_keywords.word_name;
			if (!word_name) return mSelf.errorPage();

			var attr_matchs = JSON.parse(JSON.stringify(data.attr_match));
			var k = attr_matchs.length - 1 > 1 ? 2 : attr_matchs.length - 1;
			var dcb = '';
			var i = 0;
			for (; i < k; i++) {
				dcb += attr_matchs[i].word_name + '，';
			}
			dcb = dcb.slice(0, -1);
			var meta_description = '';
			if (data.attr_description) {
				meta_description += data.attr_description.title + ': ' + data.attr_description.prefix + '，' + data.attr_description.content;
				meta_description += ' 另提供' + word_name + '的推荐搭配如' + dcb + '.';
			} else {
				meta_description += word_name + '推荐搭配如' + dcb + ';喜欢' + word_name + '的还喜欢:';
				var attr_keywords = JSON.parse(JSON.stringify(data.attr_keywords));
				k = attr_keywords.length - 1 > 1 ? 2 : attr_keywords.length - 1;
				dcb = '';
				i = 0;
				for (; i < k; i++) {
					dcb += attr_keywords[i].word_name + '，';
				}
				dcb = dcb.slice(0, -1);
				meta_description += dcb + '等多种' + word_name + '信息';
			}
			data.meta_description = meta_description;
			data.pageTitle = word_name + '【多图】' + word_name + '搭配及购买 - 美丽说';
			data.keywords = word_name;
			if (isBrand) {
				data['_canonical'] = '/guang/attr/' + data.attr_title_keywords.word_id;
			} else {
				data['_mobileAgent'] = '/guang/attr/?attr_id=' + data.attr_title_keywords.word_id;
			}

			//data.headTag = 'guang';
			// true 宽屏 
			data.fluid = false;

			// 获取分页总数
			data.groupPg = {};
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.word_name = name;
			data.tplName = 'attr';
			data.frm = '?frm=attr_regroup';
			data.isShow = true;
			delete mSelf.req.__get.frame
			data._CSSLinks = ['huodong/tshirt'];
			// data.pageTitle = 'T恤分会场';
			this.render('biz/huodong/tshirt.html', data);
		});
	},
	phoneCoupon: function() {
		var php = {
			//'pr_banner': '/customactivity/CustomActivity_common_tool_single?id=14_520_tequan_banner'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/phoneCoupon'];
			data.pageTitle = '520手机领卷';
			this.render('biz/huodong/phoneCoupon.html', data);
		});
	},
	mainpro: function() {
		var php = {
			'banner': '/customactivity/CustomActivity_common_tool_single?id=14_520_main_store_banner',
			'list': '/customactivity/CustomActivity_common_tool_single?id=14_520_main_store',
			'coupons': '/customactivity/CustomActivity_spring_carnival_coupon'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			return this.errorPage();
			data._CSSLinks = ['huodong/mainpro'];
			data.pageTitle = '主会场-520大促';
			this.render('biz/huodong/mainpro.html', data);
		});
	},
	priv618: function() {
		var php = {
			'priv_cfg': '/customactivity/CustomActivity_common_tool_single?id=pc_intro_down618'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/priv618'];
			data.pageTitle = data.priv_cfg.pageControl.title;
			this.render('biz/huodong/priv618.html', data);
		});
	},
	pay618: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/pay618'];
			data.pageTitle = '618女神购物节 微信支付专享3重好礼';
			this.render('biz/huodong/pay618.html', data);
		});
	},
	act618: function(name, isBrand) {
		if (!name || !Number(name)) {
			name = 40327;
		}
		var word = this.readData('word', this.req.__get, 0);
		var page = this.readData('page', this.req.__get, 0) | 0;
		// if(!word && !name) return this.errorPage(); 
		this.req.__get.frame = 0;

		if (name)
			this.req.__get[isBrand ? 'word_name' : 'word'] = name;
		var mSelf = this;
		var php = {
			'attr_match': '/goods/attribute_match',
			'attr_keywords': '/goods/attribute_keywords_recommend',
			'attr_baike': '/goods/attribute_baike',
			'attr_title_keywords': '/goods/attribute_title',
			'attr_brand': '/goods/attribute_brand',
			'attr_top': '/goods/Attribute_top_ten',
			'attr_words': '/welcome/attr_words',
			'season': '/customactivity/CustomActivity_seasonal_special_banner',
			'catalog': '/note/attr_navigation_words?attr_id=' + name,
			'goods': '/activity/attr_recommend_goods?attrid=' + name,
			'coupons': '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=pc',
			'bg_img': '/customactivity/CustomActivity_common_tool_single?id=main618'
		};

		php.poster0 = '/goods/attribute_poster'

		if (name) {
			php['p4p'] = '/pfp/pfp_hot?key_id=' + name + '&tp=3'
		}
		if (!isBrand) {
			php['attr_style'] = '/goods/attribute_best_style'
			php['attr_description'] = '/goods/attribute_description'
		}
		if (name && !isBrand && !isNaN(name)) {
			php['adm1'] = '/adm/ad_Show?slot_id=1&attr_id=' + name
			php['adm3'] = '/adm/ad_Show?slot_id=3&attr_id=' + name
		}

		var magFavor = false; //#2836
		if (isMagFavor(mSelf)) {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.isMagFavor = magFavor;
			delete mSelf.req.__get['word_name'];
			var word_name = data.attr_title_keywords.word_name;
			if (!word_name) return mSelf.errorPage();

			var attr_matchs = JSON.parse(JSON.stringify(data.attr_match));
			var k = attr_matchs.length - 1 > 1 ? 2 : attr_matchs.length - 1;
			var dcb = '';
			var i = 0;
			for (; i < k; i++) {
				dcb += attr_matchs[i].word_name + '，';
			}
			dcb = dcb.slice(0, -1);
			var meta_description = '';
			if (data.attr_description) {
				meta_description += data.attr_description.title + ': ' + data.attr_description.prefix + '，' + data.attr_description.content;
				meta_description += ' 另提供' + word_name + '的推荐搭配如' + dcb + '.';
			} else {
				meta_description += word_name + '推荐搭配如' + dcb + ';喜欢' + word_name + '的还喜欢:';
				var attr_keywords = JSON.parse(JSON.stringify(data.attr_keywords));
				k = attr_keywords.length - 1 > 1 ? 2 : attr_keywords.length - 1;
				dcb = '';
				i = 0;
				for (; i < k; i++) {
					dcb += attr_keywords[i].word_name + '，';
				}
				dcb = dcb.slice(0, -1);
				meta_description += dcb + '等多种' + word_name + '信息';
			}
			data.meta_description = meta_description;
			data.pageTitle = word_name + '【多图】' + word_name + '搭配及购买 - 美丽说';
			data.keywords = word_name;
			if (isBrand) {
				data['_canonical'] = '/guang/attr/' + data.attr_title_keywords.word_id;
			} else {
				data['_mobileAgent'] = '/guang/attr/?attr_id=' + data.attr_title_keywords.word_id;
			}

			//data.headTag = 'guang';
			// true 宽屏 
			data.fluid = false;

			// 获取分页总数
			data.groupPg = {};
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.word_name = name;
			data.cate_list = [{
				'c_id': 40327,
				'name': '全部'
			}, {
				'c_id': 40319,
				'name': '衣服'
			}, {
				'c_id': 40321,
				'name': '鞋子'
			}, {
				'c_id': 40325,
				'name': '包包'
			}, {
				'c_id': 40323,
				'name': '配饰'
			}];
			data.is_start = (new Date().getTime() >= new Date('2014/6/18 00:00:00').getTime());
			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act618'];
			data.pageTitle = '618 女神购物节';

			this.render('biz/huodong/act618.html', data);
		});
	},
	act_common: function(name, isBrand) {
		if (!name || !Number(name)) {
			name = 40407;
		}
		var cid = this.readData('cid', this.req.__get, 0) | 0;
		var word = this.readData('word', this.req.__get, 0);
		var page = this.readData('page', this.req.__get, 0) | 0;
		// if(!word && !name) return this.errorPage(); 
		this.req.__get.frame = 0;

		this.req.__get[isBrand ? 'word_name' : 'word'] = name;
		var mSelf = this;
		var php = {
			'attr_title_keywords': '/goods/attribute_title',
			'attr_top': '/goods/Attribute_top_ten',
			'attr_words': '/welcome/attr_words',
			'catalog': '/note/attr_navigation_words?attr_id=' + name,
			'goods': '/activity/attr_recommend_goods?attrid=' + name,
			'act_config': '/customactivity/CustomActivity_common_tool_single?id=act_common'
		};

		php.poster0 = '/goods/attribute_poster'
		var magFavor = false; //#2836
		if (isMagFavor(mSelf)) {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.isMagFavor = magFavor;
			// true 宽屏 
			data.fluid = false;
			data.cid = cid;
			data.apparel_alert = false
				// 获取分页总数
			data.groupPg = {};
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.word_name = name;
			data.cate_list = data.act_config.cate_list;

			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/act618'];
			data.pageTitle = data.act_config.title || '美丽说-活动专场';

			this.render('biz/huodong/act_common.html', data);
		});
	},
	common_new: function(name, isBrand) {
		// this.debugSnake({target : 'devlab1'});
		var cid = this.readData('cid', this.req.__get, 0) | 0;
		var pid = this.readData('pid', this.req.__get, 0);
		var page = this.readData('page', this.req.__get, 0) | 0;
		var custom = this.readData('custom', this.req.__get, 0) | 0;
		var hdtrc = this.readData('hdtrc', this.req.__get, 0) | 0;
		var mSelf = this;
		var php = {
			// 'userInfo' : '/user/headinfo'
			'act_config': '/customactivity/CustomActivity_common_tool_singleNew?id=act_common',
			'pageData': '/activity/activity_fuide?id=' + custom
		};
		var magFavor = false; //#2836
		if (isMagFavor(mSelf)) {
			magFavor = true;
			this.req.__get.magfavor = 't';
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.poster0) {
				data.poster0 = {}
			}
			if (!data.act_config) {
				data.act_config = {}
			}
			// data.word_id
			data.isMagFavor = magFavor;
			// true 宽屏 
			data.fluid = false;
			// data.cid=cid;
			data.apparel_alert = false
				// 获取分页总数
			data.groupPg = {};
			// data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.word_name = name;
			data.cate_list = data.act_config.cate_list
			data.reg_feedback = false;
			data.tplName = 'attr';
			// data.frm = '?frm=attr_regroup';
			data.isShow = true;
			data.shop_stock = false; //控制库存图标不显示
			data.pid = pid;
			data.cid = cid;
			data.custom = custom;
			data.hdtrc = mSelf.req.__get.hdtrc;
			if (data.hdtrc != undefined && data.hdtrc != '') {
				if (data.hdtrc.indexOf("_") > 0) {
					data.nHdtrc = data.hdtrc.split('_');
					data.reg = /\d+/;
					data.newHdtrc = data.nHdtrc[1].replace(data.reg, '');
					data.newHdtrcT = data.nHdtrc[0] + "_" + data.newHdtrc;
				} else {
					var len = data.pid.split('').length;
					var trc = data.hdtrc.split('');
					if (trc.length > len) {
						trc.reverse().splice(0, len).reverse();
					}
					data.newHdtrcT = trc;
				}
			} else {
				return mSelf.redirectTo('/welcome');
			}
			data.pageNum = page;
			data.headTag = cid;
			delete mSelf.req.__get.frame;
			data._CSSLinks = ['huodong/common_new'];
			data.pageTitle = data.act_config.title || '美丽说-活动专场';
			this.render('biz/huodong/common_new.html', data);
		});
	},
	greenleaf: function() {
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data._CSSLinks = ['huodong/greenleaf'];
			data.pageTitle = '绿叶I Love油 我是大美人推荐品牌';
			mSelf.render('biz/huodong/greenleaf.html', data);
		});
	},
	centluxury: function() {
		var mSelf = this;
		var php = {};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data._CSSLinks = ['huodong/centluxury'];
			data.pageTitle = '1分钱带你买遍全球大牌奢侈品';
			mSelf.render('biz/huodong/centluxury.html', data);
		});
	},

	redpacket: function() {
		var mSelf = this;
		var php = {};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			//data._CSSLinks = ['huodong/redpacket'];
			data.pageTitle = '端午福利  首次微信支付赢红包大奖';
			mSelf.render('biz/huodong/redpacket.html', data);
		});
	},
	one_cent: function() {
		var mSelf = this;
		var php = {};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {

			data._CSSLinks = ['huodong/one_cent'];
			data.pageTitle = '1分钱萌物';
			mSelf.render('biz/huodong/one_cent.html', data);
		});
	},
	welexo: function() {
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = '美丽说独家视频：不可不知的EXO-M的小秘密';
			mSelf.render('biz/huodong/welexo.html', data);
		});
	},
	teabeauty: function() {
		var mSelf = this;
		var php = {};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.apparel_alert = false;
			data._CSSLinks = ['huodong/teabeauty'];
			data.pageTitle = 'Teabeauty茶颜 不瘦不美不夏天 还我漂漂茶';
			mSelf.render('biz/huodong/teabeauty.html', data);
		});
	},
	veet: function() {
		var aid = 419
		var php = {
			'wl_info': '/welfare/welfare_activity_head?activity_id=' + aid,
			'users_apply': '/welfare/welfare_activity_avatar?activity_id=' + aid,
			'wf_girl': '/person/user_info?user_id=34143831'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.topbanner = false;
			data.user_list = data.wl_info.userInfo;
			data.wl_header = data.wl_info.info;
			data.wl_header.host = this.req.headers.host; //sina share
			data._CSSLinks = ['huodong/veet', 'welfare'];
			data.pageTitle = '薇婷 滑丽女神养成记';
			this.render('biz/huodong/veet.html', data);
		});
	},
	veet2: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/veet2'];
			data.pageTitle = '薇婷 量身丝滑蜕变术';
			this.render('biz/huodong/veet2.html', data);
		});
	},

	faceshop: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/faceshop'];
			data.pageTitle = '"+"水"一"油  奇异子面霜完美水公式';
			this.render('biz/huodong/faceshop.html', data);
		});
	},

	ferrmina: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/ferrmina'];
			data.pageTitle = '费欧蜜娜 爆款逆天2.8折起';
			this.render('biz/huodong/ferrmina.html', data);
		});
	},

	kisscat: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/kisscat2'];
			data.pageTitle = 'Kisscat&Kisskitty 就要你美';
			data.meta_description = '谁展示了令你最动心的表白方式？谁是炫舞梦工厂的人气王？谁能得到炫舞梦工厂的推荐门票？谁帮你赢得了美图 秀秀手机？当萌妹子和小鲜肉不同角度为爱支招，爱美丽们快来投票吧！为你心中的人气王点赞拉票吹小号！';
			this.render('biz/huodong/kisscat.html', data);
		});
	},

	kisscat_act: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		console.log(this.req);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/kisscat_act'];
			data.pageTitle = 'Kisscat&Kisskitty 美鞋控 狂欢趴';
			this.render('biz/huodong/kisscat_act.html', data);
		});
	},
	wenbiquan: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/wenbiquan'];
			data.pageTitle = '温碧泉保湿新品巨惠专题';
			this.render('biz/huodong/wenbiquan.html', data);
		});
	},
	hanhoo: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/hanhoo'];
			data.pageTitle = '韩后 搞好自己，就要美美哒';
			this.render('biz/huodong/hanhoo.html', data);
		});
	},
	levi: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.apparel_alert = false;
			data._CSSLinks = ['huodong/levi'];
			data.pageTitle = 'LEVI‘S REVEL女款系列抢先购';
			this.render('biz/huodong/levi.html', data);
		});
	},
	veet3: function() {
		var php = {
			'photos': '/customactivity/CustomActivity_common_tool_single?id=lenovo3&cid=7649'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.apparel_alert = false;
			data._CSSLinks = ['huodong/veet3'];
			data.pageTitle = '丝滑美肌  目光驻足 ';
			this.render('biz/huodong/veet3.html', data);
		});
	},

	pg: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.apparel_alert = false; //控制全站大弹窗在本次活动页面不显示
			data.ad_leftPic = false; //控制左下角广告位在本地活动页面不显示
			data._CSSLinks = ['huodong/nike'];
			data.pageTitle = '壁咚or公主抱 对自己好，才有男人缘';
			this.render('biz/huodong/nike/pg.html', data);
		});
	},
	crest: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/crest'];
			data.pageTitle = '唇红齿白诱吻术';
			this.render('biz/huodong/crest.html', data);
		});
	},

	loreal1: function() {
		this.debugSnake({
			target: 'devlab1'
		});
		var php = {
			'loreal1': '/customactivity/CustomActivity_oulaiya_whitening',
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/loreal1'];
			data.pageTitle = '巴黎欧莱雅心水大集赞 限时超值购';
			this.render('huodong/loreal1.html', data);
		});
	},
	shareOrderIntro: function(aid) { //2046413
		this.req.__get.aid = aid;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var php = {
			'board_info': '/club/board_info',
			'newTopics': '/club/article_new',
			'reply_list': '/club/article_reply_list',
			'hot_recommend': '/club/article_hot_recommend',
			'detail': '/club/article_detail'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.detail) {
				return mSelf.errorPage();
			}
			data.apparel_alert = false;
			data._CSSLinks = ['huodong/shareOrderIntro'];
			data.pageTitle = '晒单活动说明';
			data.page = page;
			data.board_id = data.detail.board_id;
			data.groupPg = {};
			data.groupPg.total_num = (data.reply_list.pages && data.reply_list.pages.totalNum) || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			if (this.req.__get.fromBiz) {
				data.notShowNav = true
				data.notShowCrumb = true
			};

			mSelf.render('biz/huodong/shareOrderIntro.html', data);
		});
	},
	vote_god: function(aid) { //2313447
		this.req.__get.aid = aid || 2313447;
		var page = this.readData('page', this.req.__get, 0) | 0;
		var php = {
			'board_info': '/club/board_info',
			'newTopics': '/club/article_new',
			'reply_list': '/club/article_reply_list?num=9',
			'hot_recommend': '/club/article_hot_recommend',
			'detail': '/club/article_detail',
			'god': '/customactivity/CustomActivity_World_Cup_Man'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			/*           if (!data.detail){
			 return mSelf.errorPage();
			 }*/
			data.apparel_alert = false;
			data._CSSLinks = ['huodong/vote_god'];
			data.pageTitle = '为男神投票，赢好礼!';
			data.page = page;
			data.board_id = data.detail.board_id;
			data.groupPg = {};
			data.groupPg.total_num = (data.reply_list.pages && data.reply_list.pages.totalNum) || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 9;
			if (this.req.__get.fromBiz) {
				data.notShowNav = true
				data.notShowCrumb = true
			};

			mSelf.render('biz/huodong/vote/vote_god.html', data);
		});
	},
	shopJoin: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/shopJoin'];
			data.pageTitle = '潮流好店招商';
			this.render('biz/huodong/shopJoin.html', data);
		});
	},
	desireJoin: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/desireJoin_c'];
			data.pageTitle = '美丽制造全国招商';
			this.render('biz/huodong/desireJoin_c.html', data);
		});
	},
	desireJoin2: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/desireJoin4'];
			data.pageTitle = '美丽制造全国招商';
			this.render('biz/huodong/desireJoin4.html', data);
		});
	},
	mlzz: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/desireJoin5', 'huodong/jquery.fullPage'];
			data.pageTitle = '美丽制造全国招商';
			this.render('biz/huodong/desireJoin5.html', data);
		});
	},
	dealer: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/dealer'];
			data.pageTitle = '全国商家见面会-美丽说';
			this.render('huodong/dealer.html', data);
		});
	},
	yunifang: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/yunifang'];
			data.pageTitle = '带上面膜看世界';
			this.render('huodong/yunifang.html', data);
		});
	},
	yunifang2: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/yunifang2'];
			data.pageTitle = '我的御用面膜  御泥坊 ';
			this.render('huodong/yunifang2.html', data);
		});
	},
	xuanwuqiji: function() {
		var mSelf = this;
		var page = this.readData('page', this.req.__get, 0) || 0;
		var sence_type = this.readData('type', this.req.__get, 0) || 'time';
		var sence_style = this.readData('style', this.req.__get, 0) || 'all';
		var php = {
			'poster': '/customactivity/CustomActivity_xuanwu_photo_rank'
		};
		this.setDefaultData(php);
		//this.debugSnake({target:'devlab1'});
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//data.query=query;
			//是否登录
			//			var isLogin = 0;
			//			data.userInfo.user_id == 0 ? isLogin = 0 : isLogin = 1;
			//			data.isLogin = isLogin;
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.poster.data.totalNum || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 6;

			data._CSSLinks = ['huodong/xuanwuqiji', 'page_guang'];
			data.pageTitle = '炫舞奇迹';
			mSelf.render('biz/huodong/xuanwuqiji.html', data);
		});
	},
	nuan: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/nuan_pc'];
			data.pageTitle = '潮搭学院 奇迹暖暖';
			this.render('huodong/nuan_pc.html', data);
		});
	},
	QQxuanwu: function() {
		var page = this.readData('page', this.req.__get, 0) || 0;
		var php = {
			'poster': '/huodong/QQXuanwu_topiclist?id=1',
			'voteList': '/huodong/QQXuanwu_Ballot?act=getVote'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.groupPg = {};
			data.groupPg.total_num = data.poster.totalNum || 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			data._CSSLinks = ['huodong/QQxuanwu_pc', 'page_guang'];
			data.pageTitle = '表白季 萌妹子和小鲜肉为爱支招';
			this.render('biz/huodong/QQxuanwu_pc.html', data);
		});
	},

	nuan2: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/nuan_pc2'];
			data.pageTitle = '潮搭学院 奇迹暖暖';
			this.render('huodong/nuan_pc2.html', data);
		});
	},
	nuan3: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/nuan_pc3'];
			data.pageTitle = '潮搭学院 奇迹暖暖';
			this.render('huodong/nuan_pc3.html', data);
		});
	},
	free_pc: function() {
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['huodong/free_pc'];
			data.pageTitle = 'Q萌泰迪 飞你莫属';
			this.render('huodong/free_pc.html', data);
		});
	},
	oppo_pc:function(){
		var php={};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks=['huodong/oppo_pc'];
			data.pageTitle="oppo自拍杆 美时美刻";
			this.render("huodong/oppo_pc.html",data);
		});
	},
	lmzy_pc:function(){
		var php={};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks=['huodong/lmzy_pc'];
			data.pageTitle="炫彩四季 浪漫庄园";
			this.render("huodong/lmzy_pc.html",data);
		});
	}

}
exports.__create = controller.__create(huodong, controlFns);