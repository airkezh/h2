fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
    var shareTmp = this.shareTmp
    var query = this.urlHandle.getParams(window.location.href.toString());
    var urlData = { 
        'frame' : query.frame || 0,
        'page' : query.page || 0,
        'view' : '1',
        'wm_id' : fml.vars.wm_id || 0
    };
    var opts = this.jquery.extend({}, urlData, query);
    this.posterWalls(opts , '/aj/lmCatalog/hot');
});

fml.define('page/lmCatalog' , [] , function(){});