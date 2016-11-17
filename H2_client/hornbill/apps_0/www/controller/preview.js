function preview(){
	return this;
}
var controlFns = {
	topbanner : function(){
		var php = {};
		var mSelf = this;
		this.setDefaultData(php)
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.topbanner = mSelf.req.__post;
			mSelf.render('preview/topbanner.html' ,data);
			});
	},
	manage : function(){
		var pid = this.readData('pid',this.req.__get, 0)|0;
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'poster0' : '/goods/preview_poster'
		};
		var mSelf = this;
		this.setDefaultData(php)
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['page_guang'];
			// true 宽屏 
			data.fluid = true;
			// 获取分页总数
			data.groupPg = {}; 
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 
			mSelf.render('preview/manage.html' ,data);
		});
	},
	welcome : function(){
		 var php = {
			/*		
            'headSec' : '/commerce/Ads_banner/welcome/topcentral',
            //'headSec' : '/welcome/head_section',
            'section' : '/welcome/attr_section',
            'brand' : '/welcome/recommend_brand',
            'attr_words' : '/welcome/attr_words',
            'friendlink' : '/friendlink/bottom',
            'recommend_list' : '/welcome/recommend_list',
            'wlc_topbanner' : '/commerce/Ads_banner/welcome/top',
            'wlc_centralbanner' : '/commerce/Ads_banner/welcome/central',
            'comm_recommend' : '/welcome/cms/comm_recommend',
            'editor_choice' : '/welcome/cms/editor_choice',
            'essential' : '/welcome/cms/essential'
			*/
        };
        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			for (var k in mSelf.req.__post){
				data[k] = JSON.parse(mSelf.req.__post[k])
				}
            data._CSSLinks = ['welcome'];
            data.headTag = 'welcome';
            mSelf.render('welcome/welcome.html' , data);
        });
		
	
		}
	}	

exports.__create = controller.__create(preview , controlFns);
