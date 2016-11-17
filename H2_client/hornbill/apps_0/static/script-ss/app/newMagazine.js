fml.define('app/newMagazine', ['jquery', 'app/groupApi', 'component/focus', 'app/checkLogin', 'app/checkStatusCode', 'component/shareTmp', 'ui/dialog'], function(require, exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
    var input = require('component/focus');
	var dialogUI = require('ui/dialog');
	var checkStatus = require('app/checkStatusCode');
	var check = require('app/checkLogin');
	var groupApi = require('app/groupApi').groupApi;
    var magazineType = "";

	function createMag() {
		var tpl = shareTmp('createMagazinePanelTpl');
		var html = $(tpl).show();
		var closeDialog = new dialogUI({title : "创建杂志" , content : html});
		input.inputFocus(".maga_title");
		if(magazineType == ""){
			groupApi('style',{},function(response){
				$.each(response,function(k,v){
					magazineType += '<li><input type="radio" value="'+ v.group_id +'" name="group_style" />'+ v.group_desc +' </li>'
				})
				$("#magaTyepList").html(magazineType);
				$(".showMagazine").hide();
				$(".add_share_goods").show();
			});
		}else{
			$("#magaTyepList").html(magazineType);
		}
	}
	function createMagClick() {
		var magaVal = $(".maga_title").val();
		if(magaVal == "" || magaVal == "20个字以内"){
			$("#createMagaMsg").show().html("杂志社名称不能为空哦!");
			return false;
		}
		var check_name_flag = /[\$|&|#|\|"| |]/.test(magaVal);
		if(check_name_flag){
			$("#createMagaMsg").show().html("杂志社名称含有非法字符!");
			return false;
		}
		if($("#magaTyepList input[type=radio]:checked").length == 0){
			$("#createMagaMsg").show().html("请选择分类");
			return false
		}
		var group_id = $("#magaTyepList input[type=radio]:checked").val();
		var group_desc = $(".maga_title").val();
		var data = {"name" : group_desc,"class" : group_id};
		var callback = function(response){
			if(response.code){
				$("#createMagaMsg").html(response.msg).show();
			}else{
				window.location.href = Meilishuo.config.server_url +"group/"+response.data;
				selectRequestData = null;
				selectRequestDataShare = null;
			}
		}
		groupApi('create', data, callback);
		$("#createMagaMsg").show().html("创建中...");
	}

	exports.newMeiliMagazine = function(obj, isCheckLog){
		$(obj).bind("click",function(){
			if(isCheckLog && !check()) return false;
			createMag();
			$("#createMagazine").click(createMagClick);
		});
	};
})
