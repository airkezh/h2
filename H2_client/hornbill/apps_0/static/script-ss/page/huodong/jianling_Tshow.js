fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' ,'component/urlHandle'] , function(){
    var query = this.urlHandle.getParams(window.location.href.toString());
    var urlData = { 
        'frame' : query.frame || 0,
        'page' : query.page || 0,
        'type' : query.Tshow || 'new',
        'actName' : 'jianling'
    };

    if (urlData['type']=='hot'){
        urlData['type']='heart';
    }

    var opts = this.jquery.extend({},query,urlData);
    this.posterWalls(opts , '/aj/huodong/haibao_wall', {'subScroll': '.jianling_fixheight'});
});



fml.use('app/deletePoster_guang' , function(del){
    del.deleteTrigger();
}); 

