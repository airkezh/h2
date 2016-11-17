/*common*/
require('wap/zepto/fastclick')
var Tracking = require( 'wap/app/tracking' )
    ,ShareTo = require( 'wap/app/shareTo' )
    ,shareTmp = require('wap/component/shareTmp')
    ,isWeixinBrowser = navigator.userAgent.indexOf( 'MicroMessenger' ) != -1
    ,isMeilishuoApp = Meilishuo.config.os.mlsApp
    ,$wxTips = $('#wx-tips')
    ,picUrl = 'http://i.meilishuo.net/css/images/lark/textgame/'//分享图片路径的前缀
    ,$content = $(".content")
    ,$end = $('.end')
    ,$text = $(".text")
    ,used = []//存储图片的序列数组置空
    ,sensitiveWords=1//判断敏感词汇
    ,$loading = $(".loading")
    ,$sensitiveWords=$(".sensitiveWords");
$(".text").on('input',function(e){
    var textContent = $text.val()
        ,content = textContent.split('')
        ,textLen= textContent.length
        ,tag = textLen<=21?textLen:21;
    sensitiveWords=1;
    used.length=0;
    $(".mouse").remove();
    for(var i=0;i<tag;i++){
        var picS = Math.ceil(Math.random()*(pic.length-1));
        used.push(picS+1);
        $content.append(
            "<div class='mouse'>"
            +"<img src='"+
              pic[picS].src
            +"'/>"
            +"<span class='charset'>"
            +content[i]
            +"</span>"
            +"</div>"
        );
    }
})

$end.on("click", function(e) {
    var content = $text.val();
    var userInput = content.split('');
    if(content !=''){
        $.ajax({
            url:"/aw/textgame/Graph_alloy"
            ,data :{
                "content": userInput.toString()
                ,"picSequence" : used.toString()
            }
            ,beforeSend:loading()
            ,type: 'POST'
            ,dataType:'json'
            ,success: complete
        }); 
    }else{
        alert("请输入内容");
    }
       
});

function complete(res,textStatus){
    $loading.hide();
    if(res.data){
        $url4 ='http://d06.res.meilishuo.net/'+res.data.n_pic_file;
        if(sensitiveWords!=0){
            if (isMeilishuoApp){
                if(isLogin == 0){
                    alert(0)
                    window.location.href = 'meilishuo://open.meilishuo';
                    return;
                }else{
                    var tpl = shareTmp('shareDialog',{});
                    $("body").append(tpl);}
            }else{
                alert("请使用美丽说客户端登陆，进行分享!");
            }    
        }
    }else if(res.error_code){
        sensitiveWords=0;
        $sensitiveWords.show();
    }
} 

function loading(){
    $loading.show()
}  

$(".sensitiveWords").on("click",function(){
    $sensitiveWords.hide();
});

$("body").on("click", ".toFriend",function() {
    coupon(1);
});

$("body").on("click", ".toGroup", function() {
    coupon(2);
});

$("body").on("click", ".close", function() {
    $(".shareD").remove();
    $(".shade").remove();
});

function coupon(p) {
    var params = {
        'pic' : {
            'default' : $url4
        },
        'image': 1
    };
    if (p == 1) {
        ShareTo.shareToPengYou(params);
    } else if( p==2 ) {
        ShareTo.shareToPengYouQuan(params);
    }else{
        var tpl = shareTmp('share_md');
        $('#dialogLayer').css('top',$(window).scrollTop())
        $('#dialogLayer').css('height','240px')
        $('#dialogLayer .dialogTitle .close').text('');
    }
}

$('#wx-tips').on('click',function(){
    $('#wx-tips').hide()
})
