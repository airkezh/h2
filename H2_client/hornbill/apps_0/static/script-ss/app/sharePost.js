fml.define('app/sharePost' , ['app/dialogSuccess', 'app/twitterApi', 'ui/alert', 'component/regString', 'app/newMagazine', 'app/magazine','component/shareTmp','jquery','app/smile' , 'app/checkLogin' , 'app/checkStatusCode' , 'ui/dialog'] , function (require , exports){
    var $ = require('jquery');
	var dialogUI = require('ui/dialog');
    var shareTmp = require('component/shareTmp');
    var magazine = require('app/magazine');
    var regString = require('component/regString');
	var check = require('app/checkLogin');
    var success = require('app/dialogSuccess');
    var smile = require('app/smile');
	var checkStatus = require('app/checkStatusCode');
	var newMag = require('app/newMagazine');
	var twitterApi = require('app/twitterApi').twitterApi;
	var alert = require('ui/alert');
	var dialogShow = function(id){
        $("#shareMeiliDialog , #reportShowShare").bind("click",function(){
			//校验用户身份
			if(!check()) return;
             //弹出发表框
            sharePost();
            //弹出分享链接
            shareMeiliGoods();
            //弹出分享宝贝
            sharMeiliPic();
            //弹出创建杂志
            newMag.newMeiliMagazine('.new_magazine');
        });
        var sharePost = function(){
            var tpl = shareTmp('addShareTpl');
            var html = $(tpl).show();
            new dialogUI({title : "分享" , content : html});
        }
        var shareMeiliGoods = function(){
            $(".share_goods").bind("click",function(){
                var tpl = shareTmp('shareGoodsLinkTpl');
                var html = tpl;
                new dialogUI({title : "分享宝贝" , content : html , isOverflow: false, onStart : function(){$(".smileysbox").hide()} , onClose : function(){$(".smileysbox").hide();}});
                //分享宝贝
                $("#addGoodsSubmit").bind("click",function(){
					var goods_url = $(".add_goods_url").val();
					dialogShow.goodsAjax(goods_url)
                });
			});
        };
        var alertTip = function(content, cbk) {
			cbk = cbk || function(){};
			new alert({
				content: content, 
				width: 370,
				onClose: cbk
			});		
		}
        var isAjaxLoad = true;
		dialogShow.goodsAjax = function(goods_url , res, fun){
			if (typeof res == 'function') {
				fun = res;
				res = null;
			}
			/*bug ,but snake need it to be urlencode,13-12-3*/
			var data = {
                'url': encodeURIComponent(goods_url) 
            };
			var callback = function(response){
				$("#linkMessageTips").html('');
				if (!response) {
					alertTip('服务过于繁忙，亲，请稍候重试~~');
					isAjaxLoad = true;
					return;
				}
                if(response.code) {
                	var cbk = (res && res.pickup == 3) ? fun : null;
					alertTip(response.msg, cbk);
				}else if(response.data && response.data.gInfo){
					if (!fun || (res && res.pickup == 3)) fun = goodsForUpload;	//default function...
					fun(response, goods_url, res);
				};
				isAjaxLoad = true;
			};
            if(isAjaxLoad){
                if (goods_url.substring(0, 4) != 'http') {
                    goods_url = 'http://' + goods_url;
                };
                if(regString.isUrl(goods_url)){
                    $("#linkMessageTips").html('<span class="red_f">正在获取宝贝信息</span>');
                    twitterApi('fetch', data, callback , function(status){
						isAjaxLoad = true
						alertTip('系统暂时无法响应，请稍后再试')	
						});
					isAjaxLoad = false;
                }else{
                    var msgTip = $.trim(goods_url).length === 7 ? '亲，要输入宝贝地址的哦~' : '无法获取宝贝信息，请检查链接是否正确，重新尝试。';
					$("#linkMessageTips").html('<span class="red_f">'+msgTip+'</span>');
                };
            };
		}
        var goodsForUpload = function(response , goods_url , res){
            if (!res) res = {'pickup' : 1};
			//显示分享到杂志社
            magazine();
            var image = response.data.gInfo.image;
			var goodsID = response.data.gInfo.goodsID;
			var title = response.data.gInfo.title;
			$(".shareLinks").hide();
            $(".magaImgage").attr("src" , image)
			$(".magaImgage").attr("title" , title);
			$(".goods_title").show().html(title);
            var isAjaxLoad = true;
            $('#forwardContent').focus(function(){
				$('.show_message_tips').hide();
			})
			$("#forwardMaga").unbind("click").bind("click" , function(){
                if(!regString.WidthCheck($("#forwardContent").val() , 140)){
				    $(".show_message_tips").html("您输入的字数超过140字").show();
				    return false;
			    }else{
				    $(".show_message_tips").html("正在提交...").show();
			    }
				var magaId = $(".selectText").attr("val");
				var magaName = $(".selectList").attr('val') || $(".selectList").val();
				if (magaId == 'undefined' && !magaName) {
				    $(".show_message_tips").html("杂志不能为空哦~请先创建杂志").show();
				    return false;
				}
                var content = '';
				if($("#forwardContent").val() != "写点什么,评论一下"){
					 content = $("#forwardContent").val();
				}
				var data = {
					type : 7,
					goodsID : goodsID,
					group_id : magaId,
					name : magaName,
					tContent : content,
					goods_pic_url : image,
					goods_title : title, 
					syncToQzone: $(this).parents('.maga_zf').find('[s_name=qzone]').attr('s_type') == 1 ? 'true' : 'false',
					syncToWeibo: $(this).parents('.maga_zf').find('[s_name=weibo]').attr('s_type') == 1 ? 'true' : 'false'
				}
				if (res && res.pickup == 3) {
					data['source'] = 'pickup';		//@todo:暂时hack，需统一处理
				}
				var callback = function(response){
					isAjaxLoad = true;
					if (!response) {
						$(".show_message_tips").html('系统暂时无法响应，请稍后再试').show();
						return false;
					} else if (response.code && response.msg) {
						alertTip(response.msg);
						return false;
					}
					success.shareSuccess($(".selectText").text(),magaId,"分享成功" , res.pickup);
				}
                if(isAjaxLoad){
					twitterApi('create', data, callback);
					isAjaxLoad = false;
                }
            });
        };
        var sharMeiliPic = dialogShow.sharMeiliPic = function(){
            $(".share_pic").unbind("click").bind("click",function(){
                var tpl = shareTmp('shareGoodsUploadTpl');
                var html = $(tpl).show();
                new dialogUI({title : "上传照片" , content : html ,  onStart : function(){$(".smileysbox").hide()} , onClose : function(){$(".smileysbox").hide();}});
                $("#uploadFileSubmit")
                .css({"opacity":"0","position":"absolute","left":"-18px","height":"40px","-moz-transform":"scale(2)","top":"60px"});
                //提交上传图片
                $("#uploadFileSubmit").bind("change",function(){
                    var filename = $("#uploadFileSubmit").val();
                    if (!/\.(gif|jpg|png|jpeg|bmp)$/i.test(filename)) {
                        alertTip('请上传标准图片文件, 我们支持gif,jpg,png和jpeg.');
                        return false;
                    }else{
                        $(".up_photos").hide();
                        $(".up_photosing").show()
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
                        alertTip(res.msg);
                        $("#uploadFileSubmit").val('');
                        $("#submitPicture")[0].reset();
                        return false;
                    }
                    magazine();
                    $(".magaImgage").attr("src",res.pic_url);
                    $(".magaImgage").attr("id",res.pic_id);
                    //发布新推
                    dialogShow.picForUpload({'data':res});
                }
				up_iframe.attachEvent ? up_iframe.attachEvent('onload', upload_cbk) : up_iframe.onload = upload_cbk;
            });
        };

        dialogShow.picForUpload = function(response){
			var source = response.source;
			var isLoadNewTwitter = true;
            $('#forwardContent').focus(function(){
				$('.show_message_tips').hide();
			})
			$("#forwardMaga").unbind("click").bind("click" , function(){
                if(!regString.WidthCheck($("#forwardContent").val() , 140)){
				    $(".show_message_tips").html("您输入的字数超过140字").show();
				    return false;
			    }else{
				    $(".show_message_tips").html("正在提交...").show();
			    }
                var content = '';
				if($("#forwardContent").val() != "写点什么,评论一下"){
					 content = $("#forwardContent").val();
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
						alertTip(response.msg);
						$(".show_message_tips").hide();
						return false;
					}
                    success.shareSuccess($(".selectText").text(),magaId,"上传成功" , source);
                    $(".show_message_tips").hide();
                }
                $(".up_photos").hide();
                $(".up_photosing").show()
                if(isLoadNewTwitter){
					twitterApi('create', data, callback);
                    isLoadNewTwitter = false;
                }
            });
        };

    };
    exports.dialogShow = dialogShow;
});
