fml.define('app/forward' , ['jquery' , 'app/twitterApi', 'component/storage' , 'ui/alert', 'app/dialogSuccess' ,'app/magazine' , 'app/checkLogin' , 'component/regString' , 'app/checkStatusCode' , 'ui/dialog'] , function(require , exports){
	var $ = require('jquery');
	var magazine = require('app/magazine');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var regString = require('component/regString');
	var success = require('app/dialogSuccess'); 
	var isAjaxLoad = true;  
	var checkStatus = require('app/checkStatusCode');
	var storage = require('component/storage');
	var twitterApi = require('app/twitterApi').twitterApi;
	var alert = require('ui/alert');
	exports.posterForward = function(target , obj){
		$(target).on('click' , obj , function(){
			if(!check()) return false;
			var poster = $(this).closest('.poster_grid');
			if(poster.attr('twitter_show_type') == 9){
				var tid = poster.attr('twitter_source_tid')
			}else{
				var tid = poster.attr('twitter_id');
			}
			var pic_url = poster.find('.goods_pic').attr('src'); 
			var posterContent = poster.find('.posterContent').text();
			var relatedPoster = $('[twitter_id="'+poster.attr('twitter_id')+'"]')
			forwardDialog.call(this , tid , pic_url , posterContent , poster, relatedPoster);
		});	
	}
	exports.twitterForward = function(target , obj){
		$(target).on('click' , obj , function(){
			if(!check()) return false;
			var poster = $(this).closest('.twitter');
			var tid = poster.attr('twitter_id');
			var pic_url = poster.find('.twitter_pic').attr('src'); 
			var posterContent = poster.find('.twitter_context').text();
			forwardDialog.call(this , tid , pic_url , posterContent , poster);
		});	
	}
	var forwardDialog = function(tid , pic_url, posterContent , poster, relatedPoster){
		var html = '<div class="add_share_goods"></div>'
		new dialogUI({title : "收进杂志" , content : html , onStart : function(){
			$(".smileysbox").hide()
		} , onClose : function(){
			$(".smileysbox").hide();
		}});
		magazine();	
		$(".magaImgage").attr("src",pic_url);
		if(posterContent){
			$('#forwardContent').val(posterContent);	
		}
		forwardMagazine(tid , poster, relatedPoster);
	}
	exports.forwardDialog = forwardDialog;

	var forwardMagazine = function(tid , poster, relatedPoster){
		$("#forwardMaga").unbind("click").bind("click" , function(){
			if(!regString.WidthCheck($("#forwardContent").val() , 140)){
				$(".show_message_tips").html("您输入的字数超过140字").show();
				return false;
			}else{
				$(".show_message_tips").html("正在提交...").show();
			}
			var magaName = $(".selectList").attr('val') || $(".selectList").val();
			var magaId =  $(".selectText").attr("val");
			if (magaId == 'undefined' && !magaName) {
				$(".show_message_tips").html("杂志不能为空哦~请先创建杂志").show();
				return false;
			}
			var content = '';
			if($("#forwardContent").val() != "写点什么,评论一下"){
				content = $("#forwardContent").val();
			}
			var data = {
				'type' : 8,
				'stid' : tid,
				'tContent' : content,
				'name' : magaName,
				'group_id' : magaId,
				'syncToQzone' : $(this).parents('.maga_zf').find('[s_name=qzone]').attr('s_type') == 1 ? 'true' : 'false',
				'syncToWeibo' : $(this).parents('.maga_zf').find('[s_name=weibo]').attr('s_type') == 1 ? 'true' : 'false'
			};
			var callback = function(response){
				isAjaxLoad = true;
				$(".show_message_tips").hide();
				if (response.code) {
					if (response.msg) new alert({content:response.msg, width:370});
					return false;
				}
				if(magaId == 0){
					var successMagaId = response.data.group_id;
					$(".selectText").attr("val" , response.data.group_id);
					storage.set('magazineId' , response.data.group_id);
					//清除杂志社列表cache
					fml.vars.newMagazineList = "";
				}else{
					var successMagaId = magaId;
				}
				magaName = regString.escapeString(magaName);
				success.shareSuccess(magaName , successMagaId , "收进杂志");
				var num = poster.find('.poster_forward_num').text();
				relatedPoster = relatedPoster || poster;
				relatedPoster.find('.poster_forward_num').html(+num + 1);
			}
			if(isAjaxLoad){
				isAjaxLoad = false;	
				twitterApi('create', data, callback);
			}
		});	
	}
});
