function promotion(){
    return this;
}

var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/test_game/test4/";
var questionPageDatas = [
    {"pic1" : "t_01_01.png", "pic2" : "t_01_02.png", "nextPageIndex" : 1},
    {"pic1" : "t_02_01.png", "pic2" : "t_02_02.png", "nextPageIndex" : 2},
    {"pic1" : "t_03_01.png", "pic2" : "t_03_02.png", "nextPageIndex" : 3},
    {"pic1" : "t_04_01.png", "pic2" : "t_04_02.jpg", "nextPageIndex" : 4},
    {"pic1" : "t_05_01.png", "pic2" : "t_05_02.png", "nextPageIndex" : 5}
];

var endPageDatas = [
    {"pic" : "r_w_01.png",  "appPic" : "r_01_01.png", "appPic2" : "r_01_02.png"},
    {"pic" : "r_w_02.png",  "appPic" : "r_02_01.png", "appPic2" : "r_02_02.png"},
    {"pic" : "r_w_03.png",  "appPic" : "r_03_01.png", "appPic2" : "r_03_02.png"},
    {"pic" : "r_w_04.png",  "appPic" : "r_04_01.png", "appPic2" : "r_04_02.png"}
];

var shareTitle = "败家指数测试";
var shareLink = "http://mapp.meilishuo.com/activity/promotion/game/?frm=tests_share";
var sharePic = rootUrl + "share.jpg";
var shareInfos = [
    {"title" : shareTitle,  "desc" : "经测试，我的节操掉了一地，快来测你的节操还剩多少", "pic" : sharePic, "shareLink" : shareLink},
    {"title" : shareTitle,  "desc" : "经测试，我的节操只剩下操了，快来测你的节操还剩多少", "pic" : sharePic, "shareLink" : shareLink},
    {"title" : shareTitle,  "desc" : "经测试，我的节操都喂狗了，快来测你的节操还剩多少", "pic" : sharePic, "shareLink" : shareLink},
    {"title" : shareTitle,  "desc" : "经测试，我竟然很有节操，快来测你的节操还剩多少", "pic" : sharePic, "shareLink" : shareLink},
    {"title" : shareTitle,  "desc" : "【约吗】喂，快来测一测你的节操还有多少？", "pic" : sharePic, "shareLink" : shareLink}
];

var controlFns = {
    game : function(args) {
       //this.debugSnake({target : 'devlab1'});
        //判断是否是app

        var nextPageIndex = this.readData('nextPageIndex',this.req.__get, '');
        var sNum = this.readData('sNum',this.req.__get, '');

        var php = {
            gameData : "/customactivity/CustomActivity_testgame_get_answer?game_id=4",
            redPacket : "/redpackage/Apply_red_package?game_id=5&val"
        };

        this.setMDefault(php);
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');

        this.bridgeMuch(php);
        var _this = this;
        this.listenOver(function(data){
            if (data.redPacket.code == 0) {
                data.canSendRed = true;
            }
            data.shareInfo = args != 'end' ? shareInfos[4] : shareInfos[sNum];
            data.rootUrl = rootUrl;
            var isMlsApp = data.os.mlsApp;
            //isMlsApp = false;
            if (isMlsApp) {
                if (data.gameData.islogin != 1 && args != 'red') {
                    args = '';
                } else if (data.gameData.status == 1 && args != "red") {
                    args = 'end';
                    sNum = data.gameData.answer
                }
            }
            if (args == 'red') {
                data._CSSLinks = ['activity/promotion/test_game'];
                mSelf.render('activity/promotion/test_game/redpack.html' , data);
            } else if (args == 'question') {

                data.pageData = questionPageDatas[nextPageIndex];
                data._CSSLinks = ['activity/promotion/test_game'];
                mSelf.render('activity/promotion/test_game/question.html' , data);
            } else if (args == 'end') {
                data.shareInfo = shareInfos[sNum];
                data.isEndPage = true;
                if (isMlsApp) {
                    _this.bridgeMuch({"set" : "/customactivity/CustomActivity_testgame_save_answer?game_id=4&answer=" + sNum});
                    _this.listenOver(function(dd){

                        data.pageData = endPageDatas[sNum];
                        data._CSSLinks = ['activity/promotion/test_game'];
                        mSelf.render('activity/promotion/test_game/end.html' , data);
                        return;
                    });
                } else {
                    data.pageData = endPageDatas[sNum];
                    data._CSSLinks = ['activity/promotion/test_game'];
                    mSelf.render('activity/promotion/test_game/end.html' , data);
                }

            } else {

                data._CSSLinks = ['activity/promotion/test_game'];
                mSelf.render('activity/promotion/test_game/start.html' , data);

            }


        })
    }
}
exports.__create = controller.__create(promotion , controlFns);
