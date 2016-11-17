function nightPrice(){
    return this;
}
var randomSales = null;
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}
var controlFns = {
    'index' : function(args){ //?cid=1705
        var code = this.req.__get.code || 'fuider_wap_special'; //fuider_wap_special;
        var php = {
            'all' : '/customactivity/CustomActivity_common_tool_single?id='+code
        }

        delete this.req.__get.header
        var mSelf = this;

        mSelf.setMDefault(php);
        mSelf.bridgeMuch(php);
        var wapMod = base.loadModel('wap/tools.js')
        var endDate = new Date();

        if (endDate.getHours() == 0) {
            randomSales = null;
        }

        if (endDate.getHours() == 23) {
            endDate.setDate(endDate.getDate() + 1);
        }

        endDate.setHours(18,0,0);
        endDate = parseInt(endDate.getTime() / 1000);
        var nowDate = new Date();
        nowDate = parseInt(nowDate.getTime() / 1000);
        mSelf.listenOver(function(data){
            if (!data.all) return this.errorPage();

            if(!randomSales) {
                randomSales = [];
                var totalPosterNum = 0;
                var c = data.all.content;
                for (var i in c) {
                    totalPosterNum += +c[i].postNum;
                }
                for (var m = 0; m < totalPosterNum; m++) {
                    randomSales.push(random(100, 500));
                }

            }
            data.sales = randomSales;

            data.pageTitle = '精彩专题 - 美丽说';
            data.meta_description = data.all.share.text;

            data.nowDate = nowDate;
            data.endDate = endDate;
            if (endDate <= nowDate) {
                data.actStart = true;
                endDate = new Date();
                endDate.setHours(23,0,0);
                data.endDate = parseInt(endDate.getTime() / 1000);
            } else {
                data.actStart = false;
            }
            //base.var_dump(data.all, false, 8);
            data._CSSLinks = ['activity/nightPrice'];
            if (this.req.__get.m == 1) {
                mSelf.render('gyTest.html' , data);
            } else {
                mSelf.render('activity/project/nightPrice.html' , data);

            }
        });
    }

};
exports.__create = controller.__create(nightPrice , controlFns);

