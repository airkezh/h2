fml.define('wap/page/activity/turntable' , ['wap/ui/alert', 'wap/zepto', 'wap/zepto/touch','wap/component/shareTmp'] , function(require, exports){
    var a = require("wap/ui/alert");
    var shareTmp = require('wap/component/shareTmp');

    window.guoss = "18:01";
    /*登陆成功后的回掉函数*/
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    if (fml.vars.firstWinner && fml.vars.firstWinner > 0) {

        $.post("/aw/sale/getUserInfoById", {"user_id" : fml.vars.firstWinner}, function(data) {
            //alert(JSON.stringify(data));
            $(".firstHeadPic").css({"background" : "url('"+ data.avatar_c+"') no-repeat top center", "background-size" : "100%" ,"display" : "block"}); //background: url('') no-repeat top center; background-size: 100%
            $(".noFirstTip").addClass("firstTip").html("<span style='color:#ffec50'>" + data.nickname.replace(/./g,function(w,i,p){if(i!=0 && i!= (p.length - 1)){return "*"} else {return w}}) + "</span>" + fml.vars.firstWinnerTip);
        }, "json");
    }



    //格式化后台传来的数据 奖品信息
    var awards = {};
    !function(){
        var tmpAwards = fml.vars.awards;
        if (tmpAwards) {
            for (var i in tmpAwards) {
                var tmpA = tmpAwards[i];
                var pl = tmpA["prize_level"];
                var winPic = tmpA["win_pic"];
                var shareSmallPic = tmpA["share_small_pic"];
                var shareTip = tmpA["share_tip"];
                var shareBigPic = tmpA["share_big_pic"];
                awards[pl] = {};
                awards[pl].bgPic = winPic;
                awards[pl].sharePic = shareSmallPic;
                awards[pl].shareContent = shareTip;
                awards[pl].shareTitle = fml.vars.share_win_title;
                awards[pl].shareBigPic = shareBigPic;
            }
        }
    }();

    //alert(JSON.stringify(awards));
    var $turntable = $(".turntable").eq(0);
    var $pointer = $(".pointer").eq(0);

    //不抽奖，直接分享
    $(".btn_show_one_share").on("tap", function() {
        if(fml.vars.isLogin == 0){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        shareTo(fml.vars.noPirzeSharePic, fml.vars.noPirzeShareContent ,fml.vars.share_nowin_title, fml.vars.noPrizeShareBigPic);

    });

    //生成分享的内容（标题、图片，文字、短链接）
    function shareTo(p, c, t, bigPic) {
        $.ajax({
            url: "/aw/sale/turntable",
            data: {
                'act': "share"
            },
            type: "post",
            dataType: "json",
            async : false,
            success : function(data) {
                if (data.data && data.data.leftTimes > 0) {
                    fml.vars.leftTimes = data.data.leftTimes;
                    $("#leftTimes").html(data.data.leftTimes);
                }
                share();
            }
        },"json");
        function share() {
            p = p || "http://i.meilishuo.net/css/images/wap/activity/may_sale/share.png";
            c = c || "快来参加周末转盘赢大奖！";
            t = t ||'周末转盘活动';

            var shareUrl = "http://mapp.meilishuo.com/activity/sale/turntableShare/?headPic=" + fml.vars.headPic + "&prizePic=" + bigPic + "&mes=" + c ; //头像 奖品图片 消息
            var params = {
                'title' : {
                    'default' : t
                },
                'text' : {
                    'default' : c
                },
                'pic' : {
                    'default' : p
                },
                'url' : shareUrl
            };

            var r = buildShareData(params);

            var reqUrl = "/goto/count/?p=" + encodeURIComponent(r[0].share_url) + "&frm=share&type=" +r[0].type + "&shareid=";
            window.location.href = reqUrl;
        }
    }

    function buildShareData(param) {
        var isPad = Meilishuo.config.os.ipad, isIPhone = Meilishuo.config.os.iphone || Meilishuo.config.os.ipad;
        var channels = ['weixin_timeline'];
        var ret = [];
        var host = 'm.meilishuo.com';
        if (param.url && -1 == param.url.indexOf('//')) param.url = 'http://'+ host + (param.url[0] == '/' ?'':'/') + param.url
        var pars = [ 'title' ,'text'];
        channels.forEach(function(chan){
            var unit_param = {
                "type" : chan ,
                "r" : param.r || '',
                "url" : param.url || ''
            }
            for (var i= pars.length-1;i>=0;i--){ //拼装title text
                var parv = param[pars[i]]
                if (parv)
                    unit_param[pars[i]] = parv[chan] || parv.default || parv || '';
            }
            if (param.pic) //拼装图片
            {
                var pic = param.pic[chan] || param.pic.default || param.pic;
                unit_param['thumb_url'] = pic;
                if (isIPhone) unit_param.message_type = 'webpage'
                //unit_param['pic_url'] = pic 这个地方坑死
            }
            ret.push({"type": chan
                , "share_url" : "meilishuo"+(isPad?"hd":"")+"://share.meilishuo/?json_params="+ encodeURIComponent(JSON.stringify(unit_param))} )
        })
        return ret
    }

    var isWin, award;
    var isRotate = false;
    $pointer.on("click", function() {
        isWin = false;
        if(fml.vars.isLogin == 0){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        if (!isRotate) {
            isRotate = true;
            /*ajax请求，判断是否获奖、填充图片地址*/
            $.post("/aw/sale/turntable", {"act" : "set"}, function(data) {
                if (data.error_code == -10) {
                    var alt = new a({
                        content : "用户账号异常，请稍后再试！",
                        onSure : function () {
                            isRotate = false;
                            return;
                        }
                    });
                    return;
                }
                var result;
                fml.vars.leftTimes = data.data.leftTimes;
                $("#leftTimes").html(data.data.leftTimes);
                if (data.error_code == -1) {
                    var alt = new a({
                        content : "今天没有抽奖机会了！",
                        onSure : function () {
                            isRotate = false;
                            return;
                        }
                    });
                    return;
                }
                //alert(JSON.stringify(data.data));
                if (!data.data.award) { //没中奖
                    /*判断haveShare leftTimes 构建 award*/

                    result = 0;
                    showNoPrizePage();

                } else {
                    isWin = true;
                    result = data.data.award.prize_level;
                    award = awards[result];
                }

                /*var alt = new a({
                    content : result,
                    onSure : function () {
                        return;
                    }
                });*/
                /*var r = Math.random();
                r= r.toFixed(3);
                if (r < 0.5) {
                    //r = r - 0.2 //防止转盘背景图初始状态不正
                    result = result + (+r);
                } else {
                    //r = r + 0.2
                    result = result - 1 + (+r);
                }*/

                rotate(result, resultCallBack);
            },"json")

        }

    });

    //转盘停止后的回掉函数
    function resultCallBack() {
        var tpl;
        //alert(JSON.stringify(award));
        if (!isWin) { //显示未中奖浮层
            tpl = shareTmp('noPrizeDialog', {"bgPic" : award.bgPic});
        } else { //显示中奖浮层
            tpl = shareTmp('prizeDialog', {"bgPic" : award.bgPic});
        }

        $("body").append(tpl);

    }



    //抽奖后，点击弹出层的分享按钮
    $("body").on("tap", ".dialogShare", function() {
        if (fml.vars.leftTimes >= 1 && !isWin) { //此时浮层只有一个按钮，显示的是继续努力
         $(".shade").remove();
         $(".dialogBox").remove();
         return;
        }
        if (award) {
            //发送ajax请求
            $.ajax({
                url: "/aw/sale/turntable",
                data: {
                    'act': "share"
                },
                type: "post",
                dataType: "json",
                async : false,
                success : function(data) {
                    $(".shade").remove();
                    $(".dialogBox").remove();

                    shareTo(award.sharePic, award.shareTitle, award.shareContent, award.shareBigPic);
                }
            });
        } else {
            alert("未获取到中奖信息：126");
        }
    });

    $("body").on("tap", ".dialogClose", function() {
        $(".shade").remove();
        $(".dialogBox").remove();
    });

    function rotate(result, callback) {
        isRotate = true;
        var runTime = 200;
        var stepDegree = 18 - 0.225*result; // 45/200=0.225
        var totalDegree = 0;
        var ratio = [];
        ratio[1] = [0.8, 0.8, 0.9, 0.9, 1, 1, 1.2, 1.4, 1.6, 1.8];
        ratio[2] = [1.8, 1.6, 1.4, 1.2, 1, 0.8, 0.5, 0.2, 0.1, 0];
        var ratioIndex = 100;
        for (var i = 0; i < runTime; i++) {
            window.setTimeout(function() {
                var newDegree = stepDegree*( ratio[ String(ratioIndex).substr(0,1) ][ String(ratioIndex).substr(1,1) ] );
                totalDegree += newDegree;
                setPointerDeg($turntable, totalDegree);
                ratioIndex++;
            }, i * 15);
        }

        window.setTimeout(function() {
            isRotate = false;
            callback();
        }, 200 * 15 + 500)
    }
    function setPointerDeg($obj, deg) {
        $obj.css({
            'transform': 'rotate('+deg+'deg)',
            '-moz-transform':'rotate('+deg+'deg)',
            '-o-transform':'rotate('+deg+'deg)',
            '-webkit-transform': 'rotate('+deg+'deg)'
        });
    }

    function showNoPrizePage() {
        award = {};
        award.shareTitle = fml.vars.share_nowin_title;
        award.sharePic = fml.vars.noPirzeSharePic;
        award.shareContent = fml.vars.noPirzeShareContent;
        award.shareBigPic = fml.vars.noPrizeShareBigPic;


        switch (fml.vars.leftTimes) {
            case 2 :
                award.bgPic = fml.vars.noAwards[2];
                break;
            case 1 :
                award.bgPic = fml.vars.noAwards[1];
                break;
            case 0 :
                if (fml.vars.haveShared) {
                    award.bgPic = fml.vars.noAwards["remainOne"];;
                } else {
                    award.bgPic = fml.vars.noAwards[0];
                }
                break;
            default : //测试用，多张券的时候
                award.bgPic = fml.vars.noAwards[0];

        }
    }

    setInterval(AutoScroll, 2000);
    function AutoScroll() {
        $(".winners_info").animate({
            top: "-100%"
        }, 500, function () {
            $(this).css({ top: "0%"});
            pObj = $(this).find("p")[0];
            $(this).append(pObj);
        });
    }


});