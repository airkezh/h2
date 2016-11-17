function sale_1411(){
    return this;
}



var controlFns = {
    coupon : function(args) {
        //this.debugSnake({target : 'devlab1'});
        var comStatic = this.req.headers.staticize || this.req.__get.__staticize;
        var php = {
        };
        var mSelf = this;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data._CSSLinks = ['activity/promotion/main11'];
            mSelf.render('activity/promotion/coupon_1411.html' , data);
        });
    },
    main_venue : function(actid) {
        var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/";

        var php = {
            'tabsData' : '/customactivity/CustomActivity_common_featured_area?actid=' + (actid ? actid : 17)
        };
        var mSelf = this;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            if (data.tabsData.data) {
                var posters = data.tabsData.data;
                for (var i in posters) {

                    data.firstTabs =posters[i].falls;
                    break;
                }
            }
            data._CSSLinks = ['activity/promotion/meet11'];
            mSelf.render('activity/promotion/meet11.html' , data);
        });
    },
    sub_venue : function() {
        require("./common_meet.js").build.call(this);
    }
}
exports.__create = controller.__create(sale_1411 , controlFns);
