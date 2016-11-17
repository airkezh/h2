function aboutus() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		param = param || 'default';

		if(param === 'links'){
			this.friendLink();
		}else{
			this.aboutus(param);	
		}
	},
	'friendLink' : function(){
		var php = {
			'links' : '/friendlink/links'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.showSaleSideBar = true;
			data._CSSLinks = ['friendlink'];
			data.pageTitle = '友情链接 - 美丽说';
			this.render('footer/friendlink.html' , data);			
		});
	},
	'aboutus' : function(param) {
		var select = this.readData('sl', this.req.__get, 'li');
		var page = this.readData('page',this.req.__get, 0)|0;
		//var type = this.readData('type',this.req.__get, 0)|0;
		var php = {

		};
		var mSelf = this;
		//this.debugSnake({'target':'devlab1'});
		if ('media' == param) php.media = '/media/media_list';
		if ('joinus' == param) php.joinus = '/hiring/IhrsSocialJdList';
		//if ('joinus' == param) php.joinus = '/hiring/JoinUsJobList';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.param = param;
			data.select = select;
			//data.type = type;
			data._CSSLinks = ['aboutus'];
			data.pageTitle = '关于我们 - 美丽说';
			//获取分页总数
			if ('media' == param) {
				data.groupPg = {}; 
				data.groupPg.total_num = data.media.totalNum;
				data.groupPg.current_page = page; 
				data.groupPg.page_size = 30;
			}else if('joinus' == param){
				data.groupPg = {}; 
				data.groupPg.total_num = data.joinus.totalNum;
				data.groupPg.current_page = page; 
				data.groupPg.page_size = 12;
			}
			mSelf.render('footer/aboutus.html' , data);	
		});
	}
} 
exports.__create = controller.__create(aboutus, controlFns);
