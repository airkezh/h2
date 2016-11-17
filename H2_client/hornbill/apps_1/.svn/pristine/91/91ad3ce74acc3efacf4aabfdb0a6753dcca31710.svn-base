function danmu (){
    return this;
}

var controlFns = {
    'aquarius': function() {
        'use strict'

        var php = {
            'danmu': '/customactivity/CustomActivity_barrage_drifting_sep'
        };

        this.setDefaultData(php);
        this.bridgeMuch(php);

        this.listenOver(function(data) {
            var danmu = data.danmu;

            if (!danmu || (danmu.error_code !== 0)) {
                this.errorPage();
            }

            data.pageTitle = '瓶男瓶女来灌水';
            data._CSSLinks = ['activity/aquarius'];
            this.render('activity/aquarius.html', data);
        });
    },

    'interior': function() {
        //this.debugSnake({target: 'devlab1'})
        var php = {
            'danmu': '/customactivity/CustomActivity_barrage_drifting_otc?actid=123'
        };

        this.setDefaultData(php);
        this.bridgeMuch(php);

        this.listenOver(function(data) {
            var danmu = data.danmu;

            if (!danmu || (danmu.error_code !== 0)) {
                this.errorPage();
            }

            data.pageTitle = '遇见90后，你怕了么';
            data._CSSLinks = ['activity/interior_danmu'];
            this.render('activity/interior_danmu.html', data);
        });
    },

    'newcomer': function() {
        var php = {
            'danmu': '/customactivity/CustomActivity_barrage_drifting',
            'mobUserInfo': '/customactivity/CustomActivity_wap_user_info'   // 获取wap用户信息 接口
        };

        this.setDefaultData(php);
        this.bridgeMuch(php);

        this.listenOver(function(data) {
            var danmu = data.danmu;

            if (!danmu || (danmu.error_code !== 0)) {
                this.errorPage();
            }

            data.serverDate = new Date();
            data.curUserRegTime = Date.parse(data.mobUserInfo.data.ctime) || data.serverDate.getTime();
            data.pageTitle = '欢迎新同学~~~';
            data._CSSLinks = ['activity/newcomer_danmu'];
            this.render('activity/newcomer_danmu.html', data);
        });
    }
};

exports.__create = controller.__create(danmu, controlFns);
