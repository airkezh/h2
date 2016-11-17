fml.define('app/magazine' , ['jquery', 'app/groupApi', 'app/smile', 'app/checkStatusCode' , 'component/iStorage','app/insertAtCaret','component/shareTmp','component/select','component/focus' , 'component/cursorPostion' , 'component/regString' , 'app/setSync'] , function(require , exports){
    var $ = require('jquery');    
    var shareTmp = require('component/shareTmp');
    var input = require('component/focus');
    var select = require('component/select');
    var smile = require('app/smile');
	var insertAtCaret = require('app/insertAtCaret');
	var isCreateAjax = true;
	var storage = require('component/iStorage');
	var cursor = require('component/cursorPostion'); 
    fml.vars.newMagazineList = "";
	var checkStatus = require('app/checkStatusCode');
	var regString = require('component/regString');
	var groupApi = require('app/groupApi').groupApi;
	var setSync = require('app/setSync');

	return function(){
		storage.get(Meilishuo.config.user_id , function(res){
		res = $.parseJSON(res) || {};
		// fml.vars传入默认杂志优先默认杂志
		var magaNameStorage = fml.vars.groupName || regString.escapeString(res['magazineName']);
		var magaIdStorage = fml.vars.groupId || res['magazineId'];

        if($(".forwardMagazin").size() == 0){
            var tpl = shareTmp('shareGoodsUploadPanelTpl');
            $(".add_share_goods").append(tpl);
			setSync.setShareTips();
			var createPanelClone = $("#createPanel").show();
            $(".selectList").html(fml.vars.newMagazineList);
            select.createSelect('.selectList',function(thisObj){
                thisObj.find('.options ul').after(createPanelClone);
                thisObj.find('.options ul').children("[role=1]:last").addClass("border_bc");
                input.inputFocus('#createMagaValue');
				if(magaNameStorage){
					$(".selectText").html(magaNameStorage);
					$(".selectText").attr("val" , magaIdStorage);
					$(".selectList").attr("val" , magaNameStorage);
					$(".selectList").attr("id" , magaIdStorage);

				}
            });
        }
        if(fml.vars.newMagazineList == ""){
			$(".selectText").text('读取数据中...');
            groupApi('user_groups' , {} , function(data){
                for(var i=0,len=data.length; i<len; i++){
                    var datas = data[i];
                    fml.vars.newMagazineList += 
                    '<option role="'+ datas.role +'" id="'+ datas.group_id +'" value="'+ regString.escapeString(datas.name) +'" >'+ regString.escapeString(datas.name) +'</option>';
					if(magaNameStorage && regString.escapeString(magaNameStorage) == datas.name) var isMagaName = true;
                }
                $(".selectList").html(fml.vars.newMagazineList);
                select.createSelect('.selectList',function(thisObj){
                    thisObj.find('.options ul').after(createPanelClone); 
                    thisObj.find('.options ul').children("[role=1]:last").addClass("border_bc");
                    input.inputFocus('#createMagaValue');
			//		storage.set('magazineName' , $(".selectText").text());	
			//		storage.set('magazineId' , $(".selectText").attr("val"));
					if(magaNameStorage && isMagaName){
						$(".selectText").html(magaNameStorage);
						$(".selectText").attr("val" , magaIdStorage);
						$(".selectList").attr('val' , magaNameStorage);
						$(".selectList").attr("id" , magaIdStorage);
					}
                });
            });
        }
        input.inputFocus("#forwardContent");
		$(".forwardMagazin").on("click" , ".options ul li" , function(){
			storage.set(Meilishuo.config.user_id , '{"magazineName" : ' + '"' + regString.escapeString($(this).text()) + '"' +' , "magazineId" : '+ '"' + $(this).attr("id") + '"' +'}');
		//	storage.set('magazineName' , $(this).text());	
		//	storage.set('magazineId' , $(this).attr("id"));	
		});
        $('.createMaga').live("click" , function(){
            var forward = $(this).parent().find("#ForwardMsg");
            var magaVal = $(this).parent().find("#createMagaValue").val();
            forward.hide();
            if(magaVal == "" || magaVal == "创建一个杂志"){
                forward.show().html("杂志名称不能为空哦!");
                return false;
            }
            var check_name_flag = /[\$|&|#|\|"| |]/.test(magaVal);
            if(check_name_flag){
                forward.show().html("杂志名称含有非法字符!");
                return false;
            }
			forward.show().html("正在创建...");
            var obj = $(this);  
			var data = {"name":magaVal};
			var callback = function(res){
                if(res.code){
                    forward.html(res.msg).show();    
				}else{
                    var newLi = $('<li class="l22 f14n p5" role="1" value="'+ regString.escapeString(magaVal) +'" id="'+ res.data +'">'+ regString.escapeString(magaVal) +'</li>');
					var magaChild = obj.parent().prev().children(":first");
					if(magaChild.length > 0){
						magaChild.before(newLi);
					}else{
						obj.parent().prev().append(newLi); 
					}	
                    var option = obj.parent().parent().parent().next();
                    var newOption = '<option value="'+ regString.escapeString(magaVal) +'" id="'+ res.data +'" >'+ regString.escapeString(magaVal) +'</option>';
                    option.prepend(newOption);
                    $("#createMagaValue").val("创建一个杂志");
                    newLi.trigger("click");
                    fml.vars.newMagazineList = "";
					forward.hide();
                }
				isCreateAjax = true;
            };
			if(isCreateAjax){
				groupApi('create', data, callback);
				isCreateAjax = false;
			}
        }); 
		smile.showSmile('.forwardMagazin' , '.share_smileys' , 'share');
		});
    }
});
