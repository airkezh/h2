//通用接口没数据或激活状态为否都返回false 404
//通用接口pageControl部分添加一次数据后，下次访问才会返回默认的数据格式，否则返回空
function build(opt) {
    if (!opt) {
        opt = {};
    }
    var wapMod = base.loadModel('wap/tools.js')
    var all_cid = this.readData('all_cid' , this.req.__get , '');
    var show_cid = this.readData('show_cid' , this.req.__get , '');
    var cid = this.readData('cid' , this.req.__get , '');
    if(cid){
        all_cid = cid;
        show_cid = cid;
    }

    delete this.req.__get.cid;
    var php = {
        'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid='+ show_cid
    };
    if (all_cid) {
        php.pageData_all = '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid='+ all_cid;
    }
    var ua = this.req.headers['user-agent'];
    var platform = false;
    if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
        platform = true;
    }
    var channel = this.readData('channel',this.req.__get, '');
    var param = channel || param
    this.req.__get.channel = param
    var ua = this.req.headers['user-agent'];
    if(/(Android)/i.test(ua)){
        php.apks = '/url/Package_get'
    }
    var mSelf = this;
    var locationUrl = "http://" + this.req.headers.host + this.req.url
    this.setMDefault(php);
    delete php.userInfo;
    delete php.log;
    this.bridgeMuch(php);
    this.listenOver(function(data){
        data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
        data.locationUrl = locationUrl
        if(!data.pageData) return mSelf.errorPage();
        //数据整合
        if (data.pageData_all) {
            if (!data.pageData.pageControl) {
                data.pageData.pageControl = {};
            }
            data.pageData.banner_word = data.pageData_all.banner_word;
            data.pageData.pageControl.pt = data.pageData_all.pageControl.pt;
            data.pageData.pageControl.start_time = data.pageData_all.pageControl.start_time;
            data.pageData.pageControl.end_time = data.pageData_all.pageControl.end_time;
            data.pageData.header = data.pageData_all.header;
            data.pageData.footer = data.pageData_all.footer;
            delete data.pageData_all;
        }

        var timeSetting = data.pageData.pageControl;
        if(timeSetting.pt && timeSetting.start_time && timeSetting.end_time){
            data.pt = timeSetting.pt;
            var startTime = new Date(timeSetting.start_time).getTime();
            var endTime  = new Date(timeSetting.end_time).getTime();
            var currDate = new Date();
            var currTime = currDate.getTime();
            data.nowTime = parseInt(currTime/1000);
            if (currTime < startTime) {
                data.bannerText = "距离活动开始 还有";
                data.endTime = parseInt(startTime/1000);
            } else if (currTime > endTime) {
                data.bannerText = "活动结束";
            } else if (currTime >= startTime) {
                data.bannerText = "距活动结束 还有";
                data.endTime = parseInt(endTime/1000);
            }
        }

        data.pageIndex = mSelf.readData('pageIndex', this.req.__get, '');;
        data.pid = mSelf.readData('pid' , this.req.__get , '');
        data.isIphone = platform;
        data._CSSLinks = [opt.cssLink || 'activity/promotion/new_promotion_poster'];
        data.pageTitle = data.pageData.pageControl.title;
        mSelf.render(opt.tplLink || 'activity/promotion/new_promotion_poster.html' , data);
    });
}

exports.build = build;