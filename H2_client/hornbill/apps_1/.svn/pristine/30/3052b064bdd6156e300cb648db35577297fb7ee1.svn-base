fml.define("wap/page/activity/exo_ticket", ["wap/zepto/touch"], function (require, exports) {
    var touch = require('wap/zepto/touch');

    //如果从分享页面打开的本页面，如果没有安装客户端（自动执行）自动跳转到下载客户端页面
    if (window.location.search.indexOf("fromShare") >= 0) {
        var href = '/activity/exo/ticket/';
        window.location.href = '/goto/open/?appUrl='+encodeURIComponent(href);
    }

    //登陆成功后的回掉函数
    window.MLS = {
         didLogin : function() {
         // 成功登录，跳转到下一步
            window.location.reload();
         }
     };

     //根据网址判断是否是从瀑布流跳转到本页面
    var urlParam = window.location.search;
    if (window.location.hash !="#old" && urlParam.indexOf("pid") >= 0 && urlParam.indexOf("timestamp") >= 0 && urlParam.indexOf("mac") >= 0 ) {
        $.ajax({
            'url' : '/aw/twitter/exo_poster_pubble' + urlParam,
            'type' : 'get',
            'success' : function(data){
                data = JSON.parse(data);
                var posterUrl;
                for (var i in data.current) {
                    posterUrl = data.current[i];
                    $("#" + i).css({"background":"url(" + posterUrl + ")", "background-repeat" : "no-repeat", "background-size" : "100%"});
                }
                switch(data.success) {
                    case 1 :
                        $("body").append($("#good").html());
                        $(".g_info").text(data.msg);
                        /*$(".findPoster").css("display", "none");
                        $(".findPoster_b").css("display", "none");*/
                        break;
                    case -1 :
                        $("body").append($("#repeat").html());
                        $(".repeat img").attr("src", posterUrl);
                        break;
                    case 2 :
                        $("body").append($("#new").html());
                        $(".new img").attr("src", posterUrl);
                        break;
                    case -2 :
                        $("body").append($("#nullity").html());
                        $(".nu_info").text(data.msg);
                        break;
                    case 0 :
                        alert(JSON.stringify(data));
                }
                window.location.hash = "old";
            },
            'error' : function(){
                alert('系统错误');
            }
        });
    }

    //填充已找到的海报
    if (posters) {
        var i = 0;
        for (var n in posters) {
            $("#" + n).css({"background":"url(" + posters[n] + ")", "background-repeat" : "no-repeat", "background-size" : "100%"});
            i++;
        }
        /*if (i == 6) {
            $(".findPoster").css("display", "none");
            $(".findPoster_b").css("display", "none");
        }*/

    }

    //剩余的票数
    if (leftAmount) {
        $(".leftAccount").text(leftAmount);
    }
    if (leftAmount == 0) {
        $(".t1").text("今天的门票已经抢光了");
        $(".t2").text("");
    }



    $(".showIntro").on("tap", function() {
        if(fml.vars.isLogin == 0){
                   window.location.href = "meilishuo://login.meilishuo/";
                   return;
        }
        $("body").append($("#guide").html());
        $(".guide").css("top", 0);
    });


    var urls = [
        "meilishuo://twitter_list.meilishuo?json_params=%7B%22title%22%3A%22%5Cu4eba%5Cu6c14%5Cu5355%5Cu54c1%22%2C%22method%22%3A%22twitter%5C%2Fpopular%22%2C%22params%22%3A%22%22%7D",
        "meilishuo://twitter_list.meilishuo?json_params=%7B%22title%22%3A%22%5Cu590f%5Cu5b63%5Cu65b0%5Cu6b3e%22%2C%22method%22%3A%22twitter%5C%2Fattr%22%2C%22params%22%3A%7B%22attr_id%22%3A%2239783%22%2C%22type%22%3A%227d%22%7D%7D",
        "meilishuo://twitter_list.meilishuo?json_params=%7B%22title%22%3A%22%5Cu8d85%5Cu4eba%5Cu6c14%5Cu5957%5Cu88c5%22%2C%22method%22%3A%22twitter%5C%2Fattr%22%2C%22params%22%3A%7B%22attr_id%22%3A%2238023%22%2C%22type%22%3A%227d%22%7D%7D",
        "meilishuo://twitter_list.meilishuo?json_params=%7B%22title%22%3A%22%5Cu6e05%5Cu723d%5Cu51c9%5Cu978b%22%2C%22method%22%3A%22twitter%5C%2Fattr%22%2C%22params%22%3A%7B%22attr_id%22%3A%2234476%22%2C%22type%22%3A%227d%22%7D%7D",
        "meilishuo://twitter_list.meilishuo?json_params=%7B%22title%22%3A%22%5Cu97e9%5Cu7cfbStyle%22%2C%22method%22%3A%22twitter%5C%2Fattr%22%2C%22params%22%3A%7B%22attr_id%22%3A%2233885%22%2C%22type%22%3A%227d%22%7D%7D"
    ];

    $("body").on("tap", ".guideBtn", function() {
        $.post('/aw/twitter/exoTicket', null, function(data){
            data = JSON.parse(data);
            if (data.success == 1) {
                var url = urls[Math.floor(Math.random()*4)];
                window.location.href = url;
            } else {
                alert(data.code);
            }

        });

    })

    $("body").on("tap", ".r_btn", function() {
        $(".repeat").remove();
        $(".shade").remove();
    })

    $("body").on("tap", ".n_btn", function() {
        $(".shade").remove();
        $(".new").remove();
    })

    $("body").on("tap", ".g_btn", function() {
        $(".shade").remove();
        $(".good").remove();
    })

    $("body").on("tap", ".nu_btn", function() {
        $(".shade").remove();
        $(".nullity").remove();
    })

    $("body").on("tap", ".close", function() {
        $(".guide").remove();
        $(".shade").remove();
    })


});