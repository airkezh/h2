fml.define('app/log' , [] , function(require , exports){
    /*
    seqid=id
    b_w=宽度
    b_h=高度
    b_st=垂直滚动
    b_sl=水平滚动
    site_userid=id
    site_tid=id1+id2+id3

    */
    var siteInfo = null;
    var logOption = {timer :0 ,times : 3,backend : '?'};
    var pMaxLen = 1000;
    function doLog(){
        if (logOption.times--  <=0 ){return;}

        logOption.timer && window.setTimeout(doLog , logOption.timer*1000 );

        var logImg;
        var logData = {};
        var seqid = (new Date).getTime() + '';
        var doc = document.documentElement || document.body;
        var param = {};

        var paramCount = 4;
        param.b_w = doc.clientWidth;
        param.b_h = doc.clientHeight;
        param.b_st = doc.scrollTop;
        param.b_sl = doc.scrollLeft;

        if (siteInfo) {
               var v;
               for (var k in siteInfo){
                    v = siteInfo[k];
                   if ('function' == typeof v) { v = v();} 
                   if (!v) {continue;}
                   if ('object' == typeof v &&  v.length) { v = v.join('+');}
                     param['site_' + k]  =  v;
                     paramCount++;
                } 
            }

        
        var pLeftLen ;
        var postUrl; 

        while (paramCount>0){

            postUrl = 'seqid=' + seqid;
            for (var k in param) {
                var postv = param[k];
                pLeftLen = pMaxLen - postUrl.length; 
                if (pLeftLen<=0) {break;}
                if (k.length + postv.length > pLeftLen){
               
                    param[k] = postv.substr(pLeftLen);
                    postv = postv.substr(0 ,pLeftLen);
                } else {
                     delete param[k]; 
                    paramCount--;
                  }
                postUrl += '&' + k + '=' + postv;
                }
			//console.log(postUrl);
            logImg = new Image;
            logImg.src = logOption.backend + postUrl;
             }
            
     } 


    return {
        setOption : function(option) {
            if (option) {
              if (option.site ) {  siteInfo = option.site;}
            }
            return this;
            },
        make : function(option){
            logOption.timer = option.timer || logOption.timer;
            logOption.times = option.times || logOption.times;
            logOption.backend = option.backend || logOption.backend;
            doLog();
            }
    }
    
});

//mLog.setOption({site:{'userid':123 , 'tid': function(){var r=[];$('.hp_top').each(function(){r.push(this.id.replace(/\D/g,''))}); return r;}} }).make({timer:5} );
