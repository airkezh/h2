function market(){
	return this;
}
var controlFns = {
	'children' : function(){
		var php  = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/market/children'];
			data.pageTitle = '测一测你童年完整吗';
			this.render('activity/market/market.html', data);
		});
	},
	'question' : function(){
		var php  = {
			'dataInfo' : '/customactivity/CustomActivity_common_tool_singleNew?id=children_market'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/market/question'];
			data.pageTitle = '测一测你童年完整吗';
			this.render('activity/market/question.html', data);
		});
	},
	'score' : function(){
		var wapMod = this.loadModel('tools.js');
		var score_id = this.readData('score_id');
		var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0;
		var php  = {
			'dataInfo' : '/customactivity/CustomActivity_common_tool_singleNew?id=children_market'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
		var scoreDesc = '';
		var scoreTitle = '';
			if(score_id == 0){
				scoreDesc = '得零分也蛮不容易，地球不适合我，我回火星了...',
				scoreTitle = '6.1动画片测试得0蛋，不要质疑我的智商，不信你测测！';
			}else if(score_id == 10){
				scoreDesc = '我老了- - 我要去陪外孙看动漫补童年了...';
				scoreTitle = '6.1动画片测试得10分，这题到底谁出的，一般人都不行啊！';
			}else if(score_id == 20){
				scoreDesc = '噢肉！我的童年难道只有喜羊羊了...';
				scoreTitle = '6.1动画片测试得20分， 感觉不会再爱了，你来帮我挽尊啊？';
			}else if(score_id == 30){
				scoreDesc = '唉，动画片还没看齐就已经老了....';
				scoreTitle = '6.1动画片测试得30分，我先哭会儿，目测你测也会哭！';
			}else if(score_id == 40){
				scoreDesc = '没有电视与漫画，童年专攻数理化的少年就是我…';
				scoreTitle = '6.1动画片测试得40分，题目肯定有问题，不信你试下！';
			}else if(score_id == 50){
				scoreDesc = '工作再累，也不要让童年不及格喔~';
				scoreTitle = '6.1动画片测试得50分，10分都不给我，你测也许就及格了！';
			}else if(score_id == 60){
				scoreDesc = '也许童年少看点动漫就变成学霸了呢！';
				scoreTitle = '6.1动画片测试60分飘过，感人！别看，你测也比不过我！';
			}else if(score_id == 70){
				scoreDesc = '看这么多动漫，从小就注定是宅属性啊> <';
				scoreTitle = '6.1动画片测试测得心好累，70分太不容易了！来超越我！';
			}else if(score_id == 80){
				scoreDesc = '从小就阅片无数，长大必然为国争光啊！';
				scoreTitle = '6.1动画片测试得了80分！感觉棒棒哒，不服来战！';
			}else if(score_id == 90){
				scoreDesc = '童年能看这么多动漫，我要感谢我的麻麻・ω・';
				scoreTitle = '棒！6.1动画片测试90分，获小红花一枚，你快来拿红花！';
			}else if(score_id == 100){
				scoreDesc = '机智如我~人家是有满满回忆的幸福童年！';
				scoreTitle = '尼玛，6.1动画片测试我居然100分！有本事来挑战我！';
			}else{
				scoreDesc = '美丽说特别策划，10道题鉴定你是没童年还是美童年！';
				scoreTitle = '6.1儿童节测你看过多少经典动画片~有胆来玩！';
			}
			var params = {
				'title' : scoreTitle,
				'text' : scoreDesc,
				'pic' : 'http://d01.res.meilishuo.net/pic/_o/ed/d4/eaa1c2ec43ec14714f2ff6d9fac7_100_100.cg.jpg',
				'url' : 'http://m.meilishuo.com/activity/summerFuide/children/'
			};
			data.share = wapMod.shareTo(this.req , params, ['weixin_timeline','weixin']);
			data.score_id = score_id;
			data.weixinBrowser = weixinBrowser;
			data._CSSLinks = ['activity/market/question'];
			data.pageTitle = '测一测你童年完整吗';
			this.render('activity/market/score.html', data);
		});
	}
};

exports.__create = controller.__create(market, controlFns);
