function fouryears(){
	return this;
}

var controlFns = {
	'zero' : function(){
		var mSelf = this;
		var php = {
			'list' : '/customactivity/CustomActivity_open_change_buy_goods_list?type=pc',
			'dis' : '/club/article_doota'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/fouryears'];
			data.pageTitle = '0元购 - 美丽说';
			data.topbanner = false
			//base.var_dump(data.list, false , 5);
			mSelf.render('biz/fouryears/zero.html' , data);
		});
	},
	'ranking' : function(){
		var mSelf = this;
		var day = new Date();
		var y_date = ''+day.getFullYear() + (day.getMonth()+1);
		var d_date = day.getDate();
		y_date += d_date < 10 ? '0'+d_date : d_date ;
		var php = {
			'rank' : '/customactivity/CustomActivity_open_buy_rank?type=pc&limit=30&date='+y_date,
			'dis' : '/club/article_doota'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/fouryears'];
			data.pageTitle = '款姐排行榜 - 美丽说';
			data.isRanking = true;
			data.topbanner = false
			mSelf.render('biz/fouryears/ranking.html' , data);
		});
	},
	'history' : function(){
		var mSelf = this;
		var day = new Date();
		day.setDate(day.getDate()-1);
		var y_date = ''+day.getFullYear() + (day.getMonth()+1);
		var d_date = day.getDate();
		y_date += d_date < 10 ? '0'+d_date : d_date ;
		var php = {
			'rank' : '/customactivity/CustomActivity_open_buy_rank?type=pc&limit=30&date='+y_date
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/fouryears'];
			data.pageTitle = '款姐昨日排行榜 - 美丽说';
			data.isHistory = true;
			data.topbanner = false
			mSelf.render('biz/fouryears/history.html' , data);
		});
	}

}
 exports.__create = controller.__create(fouryears, controlFns);
