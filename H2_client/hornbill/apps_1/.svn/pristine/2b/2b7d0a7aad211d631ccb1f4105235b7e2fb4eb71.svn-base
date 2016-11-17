function helpcenter() {
   return this;
}
var controlFns = {
   'index': function () {
      var mSelf = this;
      var php = {
         'shopping' : '/robot/knowledge_search?cate_id=217&sub_cate_id=221'
         , 'express' : '/robot/knowledge_search?cate_id=217&sub_cate_id=225'
         , 'order' : '/robot/knowledge_search?cate_id=217&sub_cate_id=227'
         , 'service' : '/robot/knowledge_search?cate_id=217&sub_cate_id=229'
         , 'aftersale' : '/robot/knowledge_search?cate_id=217&sub_cate_id=231'
         , 'notice' : '/robot/knowledge_search?cate_id=233'
      };
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data) {
         data._CSSLinks = ['help/main'];
         data.pageTitle = '帮助中心 - 美丽说';
         data.help = true;
         mSelf.render('help/index.html', data);
      });
   },
   'search': function(){
      var title = this.readData('title',this.req.__get, '订单').trim()
         , page = this.readData('page',this.req.__get, 0);

      var mSelf = this;
      var php = {
         'searchQa' : '/robot/knowledge_search'
      };
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){
         data.title = title;
         data.groupPg = {}; 
         data.groupPg.page_size = data.searchQa.pageSize;
         data.groupPg.total_num = data.searchQa.total_size; 
         data.groupPg.current_page = page; 
         data.total_size = data.searchQa.total_size;
         data._CSSLinks = ['help/search-qa'];
         data.pageTitle = '搜索问题列表 - 美丽说';
         mSelf.render('help/search-qa.html', data);
      });

   },
   'detail': function (param){
      this.req.__get.know_id = param;
      var searchParam = this.req.__get.search || 0;
      var typeParam = this.req.__get.notice || 0;
      var activityParam = this.req.__get.activity || 0;

      var mSelf = this;
      var php = {
         'detailQa' : '/robot/knowledge_search'
      };
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){
         data.searchParam = searchParam;
         data.typeParam = typeParam;
         //console.log(JSON.stringify(data.searchParam + 'aaaa'));
         data._CSSLinks = ['help/search-qa'];
         data.pageTitle = '问题详情页 - 美丽说';
         mSelf.render('help/detail.html', data);
      })
   },
   'issue': function(){
      var mSelf = this;
      var page = this.readData('page',this.req.__get, 0);
      var php = {
         'shopping' : '/robot/knowledge_search?cate_id=217&sub_cate_id=221'
         , 'express' : '/robot/knowledge_search?cate_id=217&sub_cate_id=225'
         , 'order' : '/robot/knowledge_search?cate_id=217&sub_cate_id=227'
         , 'service' : '/robot/knowledge_search?cate_id=217&sub_cate_id=229'
         , 'aftersale' : '/robot/knowledge_search?cate_id=217&sub_cate_id=231'
         , 'moreQa' : '/robot/knowledge_search?cate_id=219'
      };
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){

         data.groupPg = {}; 
         data.groupPg.page_size = data.moreQa.pageSize;
         data.groupPg.total_num = data.moreQa.total_size; 
         data.groupPg.current_page = page;

         data._CSSLinks = ['help/common-problem'];
         data.pageTitle = '常见问题 - 美丽说';
         mSelf.render('help/common-problem.html', data);
      })
   },
   'custom-service': function(){
      var mSelf = this;
      var php = {};
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){
         data._CSSLinks = ['help/custom-service'];
         data.pageTitle = '联系客服 - 美丽说';
         mSelf.render('help/custom-service.html', data);
      })
   },
   'notice': function(){
      var mSelf = this;
      var page = this.readData('page',this.req.__get, 0);
      var php = {
         'notice' : '/robot/knowledge_search?cate_id=223'
      };
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){

         data.groupPg = {}; 
         data.groupPg.page_size = data.notice.pageSize;
         data.groupPg.total_num = data.notice.total_size; 
         data.groupPg.current_page = page;

         data._CSSLinks = ['help/search-qa'];
         data.pageTitle = '公告列表页 - 美丽说';
         mSelf.render('help/notice.html', data);
      })
   },
   'shopping': function(){
      var mSelf = this;
      var php = {};
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){
         data._CSSLinks = ['help/common-problem'];
         data.pageTitle = '购物指南 - 美丽说';
         mSelf.render('help/shopping.html', data)
      })
   },
   'survey': function(){
      var mSelf = this;
      var php = {
         'svrveyGet':'/robot/survey_get'
      };
      this.setDefaultData(php);
      this.bridgeMuch(php);
      this.listenOver(function (data){
         data._CSSLinks = ['help/survey'];
         data.pageTitle = '问卷调查 - 美丽说';
         mSelf.render('help/survey.html', data)
      })
   }
}
exports.__create = controller.__create(helpcenter, controlFns);
