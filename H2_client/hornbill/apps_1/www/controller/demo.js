/**
 * New node file
 */
function demo() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		var php = {
			'test' : 'doota::/zhouyinglin/addresstest'
		};
		
		this.listenOver(function(data){
			data.pageTitle = '关于我们 - 美丽说';
			mSelf.render('demo/zhouyinglin.html', data);	
		});
	},
	'aboutus' : function(param) {
		var select = this.readData('sl', this.req.__get, 'li');
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'jobs' : '/hiring/JoinUsJobList'
		};
		var mSelf = this;
		//this.debugSnake({'target':'devlab1'});
		if ('media' == param) php.media = '/media/media_list';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.param = param;
			data.select = select;
			data._CSSLinks = ['aboutus'];
			data.pageTitle = '关于我们 - 美丽说';
			//获取分页总数
			if ('media' == param) {
				data.groupPg = {}; 
				data.groupPg.total_num = data.media.totalNum;
				data.groupPg.current_page = page; 
				data.groupPg.page_size = 30;
			}
			mSelf.render('footer/aboutus.html' , data);	
		});
	}
} 
exports.__create = controller.__create(demo, controlFns);