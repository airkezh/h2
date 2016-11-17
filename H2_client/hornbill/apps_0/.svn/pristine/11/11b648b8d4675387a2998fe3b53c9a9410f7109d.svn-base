fml.use(['jquery' , 'component/waterfall' ,'app/posterWalls' ,'component/shareTmp' , 'component/urlHandle'] , function(){
    var shareTmp = this.shareTmp;
    var pin = this.waterfall;
    var query = this.urlHandle.getParams(window.location.href.toString());
    //var vid = parseInt(window.location.pathname.split('/')[2],10)
    var urlData = {
        //'vid' : vid || query.vid,
        'frame' : query.frame || 0,
        'page' : query.page || 0
    };
    var opts = this.jquery.extend({}, urlData, query);
    this.posterWalls(opts , '/aj/huodong/May_sale_love_wall');
});
fml.define('page/huodong/loveAlarm',['jquery','app/shareTo','ui/alert','app/dialogSuccess','app/twitterApi','component/regString','app/magazine','ui/dialog','component/shareTmp','app/checkLogin'],function(require){
    var share = require('app/shareTo');
    var success = require('app/dialogSuccess');
    var twitterApi = require('app/twitterApi').twitterApi;
    var regString = require('component/regString');
    var magazine = require('app/magazine');
    var dialogUI = require('ui/dialog');
    var shareTmp = require('component/shareTmp');
    var $ = require('jquery');
    var check = require('app/checkLogin');
    var Alert = require('ui/alert');
    var alert = function(msg){
        return new Alert({
            width:380,
            content:msg
        });
    }
    $('.container').delegate('.heart','click',function(){
        if(!check()) return false;
        // 检查登录
        var self = $(this);
        // 如果已经赞过了直接飘过
        if(self.hasClass('liked')) return;
        $.ajax({
            url:'/aw/twitter/like',
            type:'post',
            dataType:'json',
            data:{
                stid:self.attr('data-sid')
            },
            success: function(data){
                if(data.code == 0){
                    self.addClass('liked');
                    self.text(Number(self.text())+1);
                }else{
                    alert(data.msg);
                }
            },
            error: function(){
                alert('系统繁忙，请稍后再试');
            }
        });
    });
    // 分享领券按钮
    $('#share').click(function(){
        if(!check())return false;
        var tpl = shareTmp('shareGoodsUploadTpl');
        var html = $(tpl).show();
        new dialogUI({title : "上传照片" , content : html ,  onStart : function(){$(".smileysbox").hide()} , onClose : function(){$(".smileysbox").hide();}});
        $("#uploadFileSubmit")
            .css({"opacity":"0","position":"absolute","left":"-18px","height":"40px","-moz-transform":"scale(2)","top":"60px"});
        //提交上传图片
        $("#uploadFileSubmit").bind("change",function(){
            var filename = $("#uploadFileSubmit").val();
            if (!/\.(gif|jpg|png|jpeg|bmp)$/i.test(filename)) {
                new Alert({
                    width:370,
                    content:'请上传标准图片文件,我们支持gif,jpg,png和jpeg.'
                })
                return false;
            }else{
                $(".up_photos").hide();
                $(".up_photosing").show();
                this.form.submit();
            }
        });
        //上传图片成功回调函数
        var up_iframe = document.getElementById('getUploadFile');
        var upload_cbk = function(){
            if (this.readyState && this.readyState != 'complete') return;
            $(".up_photos").show();
            $(".up_photosing").hide();
            var iframe = up_iframe.contentDocument || up_iframe.contentWindow.document;
            var res = iframe.body.innerHTML.replace(/<.*?>/g,'').replace('&amp;', '&');
            if(!res) return;
            res = $.parseJSON(res);
            if(res.code){
                new Alert({
                    width:370,
                    content:res.msg
                })
                $("#uploadFileSubmit").val('');
                $("#submitPicture")[0].reset();
                return false;
            }
            magazine();
            $(".magaImgage").attr("src",res.pic_url);
            $(".magaImgage").attr("id",res.pic_id);
            //发布新推
            picForUpload({'data':res});
        }
        up_iframe.attachEvent ? up_iframe.attachEvent('onload', upload_cbk) : up_iframe.onload = upload_cbk;
    });

    function picForUpload(response){
        var source = response.source;
        var isLoadNewTwitter = true;
        $('#forwardContent').focus(function(){
            $('.show_message_tips').hide();
        })
        $("#forwardMaga").unbind("click").bind("click" , function(){
            if(!regString.WidthCheck($("#forwardContent").val() , 130)){
                $(".show_message_tips").html("您输入的字数超过130字").show();
                return false;
            }else{
                $(".show_message_tips").html("正在提交...").show();
            }
            var content = '';
            if($("#forwardContent").val() != "写点什么,评论一下"){
                content = '#EXO-M 男神闹钟# '+$("#forwardContent").val();
            }
            var magaId = $(".selectText").attr("val");
            var magaName = $(".selectList").attr("val") || $(".selectList").val();
            if (magaId == 'undefined' && !magaName) {
                $(".show_message_tips").html("杂志不能为空哦~请先创建杂志").show();
                return false;
            }
            var data = {
                group_id : magaId,
                tContent: content,
                type: 5,
                source : response.source,
                name : magaName,
                syncToQzone: $(this).parents('.maga_zf').find('[s_name=qzone]').attr('s_type') == 1 ? 'true' : 'false',
                syncToWeibo: $(this).parents('.maga_zf').find('[s_name=weibo]').attr('s_type') == 1 ? 'true' : 'false'
            };
            if (response.data.pic_id) {
                data['type'] = 2;
                data['pid'] = response.data.pic_id;
            }
            var callback = function(response){
                isLoadNewTwitter = true;
                $(".up_photos").show();
                $(".up_photosing").hide()
                if (!response) {
                    $(".show_message_tips").html('系统暂时无法响应，请稍后再试').show();
                    return false;
                } else if (response.code && response.msg) {
                    new Alert({
                        width:370,
                        content:response.msg
                    })
                    $(".show_message_tips").hide();
                    return false;
                }
                //success.shareSuccess($(".selectText").text(),magaId,"上传成功" , source);
                $(".show_message_tips").hide();
                $.ajax({
                    url:'/aj/huodong/love_wall_twit',
                    type:'post',
                    dataType:'json',
                    success:function(data){
                        if(data.code){
                            alert(data.msg);
                        }else{
                            $('#closeDialog').trigger('click');
                            var a ;
                            switch(data.success){
                                case 0:
                                    a = alert("上传失败");
                                    break;
                                case 1:
                                    a = alert('分享成功');
                                    break;
                                case 2 :
                                    a = alert('每位爱美丽最多上传6张男神的520萌照哦。');
                            }
                            a.onSure(function(){
                                location.href = location.href;
                            })
                        }
                    }
                });
            }
            $(".up_photos").hide();
            $(".up_photosing").show()
            if(isLoadNewTwitter){
                twitterApi('create', data, callback);
                isLoadNewTwitter = false;
            }
        });
    };
    /*share sina qzone qq*/
    var url = location.href;
    var desc = "本姑娘更新了美丽说4.4新版本，通过#EXO-M男神闹铃#功能参加了#男神叫你起床活动#！小伙伴们别惊呆了，快来帮我点赞召唤男神！";
    var title = "";
    var pic = share_info.data.pic_url_max;
    $('.i_qzone').on('click',function(){
        if(!check()) return false;
        share.shareToQzone(url , desc, '', title , pic);
    });
    $('.i_sina').on('click',function(){
        if(!check()) return false;
        share.shareToWeibo(url , desc , pic);
    });
    $('.i_tx').on('click',function(){
        if(!check()) return false;
        share.shareToQQ(url , desc , pic);
    });
});
