function mlslm(){
    return this;    
}
var controlFns = {
    'index' : function(){
        return this.catalog();
    },
    'catalog' : function(wmId) {
        var page = this.readData('page',this.req.__get, 0)|0;
        var bar_id = this.readData('bar_id',this.req__get,0)|0;
        var index_id = this.readData('index_id',this.req__get,0)|0;

        this.req.__get.frame = 0;
        this.req.__get.wm_id = wmId;
        var php = {
            'catalog' : '/alliance/navigate_words?bar_id=' + bar_id,
            'alliance_poster': '/alliance/alliance_poster',
            'navigate_top':'/alliance/navigate_top?index_id='+ index_id,
            'navigate_banner':'/alliance/navigate_banner?wm_id=' + wmId
        };
        // console.log(JSON.stringify(this.req.__get)+'22222222222');
        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            // true 宽屏 
            //console.log(JSON.stringify(data.catalog)+'111111111111')
            data.fluid = true;
            data.wm_id = wmId;
            data.groupPg = {}; 
            data.groupPg.total_num = data.alliance_poster.totalNum ;
            data.groupPg.current_page = page;
            data._CSSLinks = ['mlslm/catalog'];
            data.pageTitle = '美丽说购流行';
            mSelf.render('mlslm/catalog.html' , data);
        });
    },
    'item' : function(tid){
        this.req.__get.twitter_id = tid;
        this.req.__get.tid = tid;
        var php = {
                'goods_info' : '/share/share_main'
                ,'shop_in' : '/share/shop_intro'
                ,'service' : '/share/service_guarantee?src=share'
                ,'navigate_top':'/alliance/navigate_top'
            };
        console.log(this.req.__get);
        var mSelf = this;
        //this.debugSnake({target:'devlab4'});
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.tid = tid;
            data.fluid = true;
            data.winTitle = data.goods_info.goods_title;
            data.pageTitle = data.winTitle +' - 美丽说联盟';
            data._CSSLinks = ['mlslm/item'];
            mSelf.render('mlslm/item.html',data);
        });
    },
    'activity' : function (){
        var device = base.loadModel('wap/tools.js').uaos(this.req);
        if (device.phone){
            return this.redirectTo('http://m.meilishuo.com/biz/mlslm/activity/',true)
        }
        var php = {
            'navigate_top':'/alliance/navigate_top',
            'poster0' : '/commerce/ka_poster'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data){
            if(!data.poster0) return this.errorPage();
            data.onlyShowGoTop = true;
            data.pageTitle = '美丽说热卖';
            data._CSSLinks = ['mlslm/activity'];
            this.render('mlslm/activity.html',data);
        });
    },
    'list' : function (){
        var device = base.loadModel('wap/tools.js').uaos(this.req);
        var cid = this.req.__get.cid
        if (device.phone){
            return this.redirectTo('http://m.meilishuo.com/biz/mlslm/list/',true)
        }
        var php = {
            'navigate_top':'/alliance/navigate_top',
            'webCps':'/customactivity/customActivity_common_tool_singleNew?id=web_union_cps&cid=' + cid
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data){
            // if(!data.poster0) return this.errorPage();
            data.onlyShowGoTop = true;
            data.pageTitle = '美丽说热卖';
            data._CSSLinks = ['mlslm/list'];
            this.render('mlslm/list.html',data);
        });
    }
}
exports.__create = controller.__create(mlslm , controlFns);
