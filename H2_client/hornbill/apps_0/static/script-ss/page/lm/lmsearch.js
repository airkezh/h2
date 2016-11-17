fml.use(['jquery' , 'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
    var shareTmp = this.shareTmp
    var query = this.urlHandle.getParams(window.location.href.toString());
    var urlData = { 
        'frame' : query.frame || 0,
        'page' : query.page || 0,
        'searchKey' : query.searchKey || ''
    };
    var opts = this.jquery.extend({}, urlData, query);
    this.posterWalls(opts , '/lm/wangmeng/search_poster');
});

fml.define('page/lm/lmsearch' , [] , function(){});
