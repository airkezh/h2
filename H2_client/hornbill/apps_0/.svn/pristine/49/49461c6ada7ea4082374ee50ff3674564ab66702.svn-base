function mlslm(){
    return this;    
}
var controlFns = {
    'index' : function(){
        return this.list();
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
