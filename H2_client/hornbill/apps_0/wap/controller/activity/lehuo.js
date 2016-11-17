function lehuo(){
	return this;	
}

var controlFns = {
	'index': function(ac_id){
		var mSelf = this,
		    ac_id = this.readData('ac_id', this.req.__get,0);
		var shareURL = 'http://www.meilishuo.com/u/EMr071';
		var php = {
			'goods' : '/promote/activity_detail?ac_id='+ac_id
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var params = {
				'title' : '这个冬天，有你才温暖！乐活良品专场/全场包邮。活动时间：2013.11.05-2013.11.10',
				'text' : '『乐活良品』专场，这个冬天，有你才温暖！11月5日-11月10日活动期间分享活动并@三位闺蜜，就有机会获得价值98元的精美礼盒一份，限量200份等你来拿！', 
				'pic' : {
					'weixin' : 'http://i.meilishuo.net/css/images/wap/activity/lehuo/share_pic.jpg',
					'weixin_timeline' : 'http://i.meilishuo.net/css/images/wap/activity/lehuo/share_pic.jpg',
					'default' : 'http://i.meilishuo.net/css/images/wap/activity/lehuo/zero2.jpg'
				},
				'url' : shareURL
			};
			data.nuanwei = data.goods.serial.nuanwei;
			data.nuanxin = data.goods.serial.nuanxin;
			data.nuanshou = data.goods.serial.nuanshou;
			data.nuanqing = data.goods.serial.nuanqing;
			data.topic_info = data.goods.topic_info;
			var isIpad = data.os.ipad;
			data.phoneType = isIpad ? 'ipad' : 'other';	
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			data._CSSLinks = ['activity/lehuo'];
			mSelf.render('activity/lehuo.html' , data);
		});
		
	}
};

exports.__create = controller.__create(lehuo , controlFns);
