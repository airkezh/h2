function good_time(){
    return this;
}

var controlFns = {
    'index' : function(args){ //?cid=1705
        //var code = this.req.__get.code || 'fuider_wap_special'; //fuider_wap_special;
        //this.debugSnake({target : 'devlab1'});
        var php = {
            'data' : '/customactivity/CustomActivity_common_tool_single?id=fuider_wap_special&cid=2853&preview=1'
        }

        delete this.req.__get.header
        var mSelf = this;

        mSelf.setMDefault(php);
        mSelf.bridgeMuch(php);
        var wapMod = base.loadModel('wap/tools.js');
        mSelf.listenOver(function(data){
            data.pageTitle = '最美时光馆 - 美丽说';

            data._CSSLinks = ['activity/good_time', ];

            mSelf.render('activity/good_time.html' , data);

        });
    }

};
exports.__create = controller.__create(good_time , controlFns);

