fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});


fml.use(['app/checkLogin'] , function(){
	var check = this.checkLogin;
	$('.mayasharebtn').bind('click', function(){
		if(!check()) return false;
		var txt = $(this).parents('.maya_cr').find('.maya_area'),
			tab = $(this).attr('tab');
		var data = { content : txt.val(), tab : tab };
		var isspam =  /\<script/i;
		if(!(data.content)){
			alert('请输入内容');
			return false;
		}
		if(isspam.test(data.content)){
			alert('输入不合法');
			return false;
		}
		var tpl = tab == 0 ? '<div>' + data.content + '</div>' : '<div><span>' + Meilishuo.config.nickname + '</span><p>' + data.content + '</p></div>'
		var url = '/huodong/mayainsert/';  
		$.post(url , data , function(res){
			alert('发布成功');
			txt.val('');
			$('.twitterarea').find('[tab=' + data.tab + ']').prepend(tpl).find('div').eq(-1).remove();
		}); 
	});
});
fml.define('page/huodong/maya' , ['component/dialog', 'component/shareTmp', 'app/setSync', 'app/checkLogin'] , function(require, exports){
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var dialog = require('component/dialog');
	var setSync = require('app/setSync');
	setSync.setShareTips();
	var addGroup = function(){
		var thisObj = '#mayaShareGroupLink';
		$(thisObj).find(".select").hover(function(){
			$(this).addClass("selectbg");
		},function(){
			$(this).removeClass("selectbg");
		}).bind("click",function(e){
			if($(this).attr("isSelect") != "true"){
				$(this).css({"visibility":"hidden"});
				$(thisObj).find(".options").show();
				$(this).attr("isSelect","true");
			}else{
				$(this).css({"visibility":"visible"});
				$(thisObj).find(".options").hide();
				$(this).removeAttr("isSelect");
			}
		});
		$(thisObj).find(".options ul li").hover(function(){
			$(this).css({"background":"#ffeef4"});
		},function(){
			$(this).css({"background":"#fff"});
		}).bind("click",function(){
			$(thisObj).find(".selectText").text($(this).text());
			$(thisObj).find(".selectText").attr("val" , $(this).attr("id"));
//			obj.attr("val",$(this).text())
			$(thisObj).find(".options").hide();
			$(thisObj).find(".select").css("visibility","visible").removeAttr("isSelect");
		});
		$('#mayaAddGroupSubmit').bind('click', function(){
			var gid = $(thisObj).find('.selectText').attr('val');
			var url = '/huodong/mayasharegroup/',
				data = { 'group_id' : gid },
				callback = function(res){
					if(res[0]){
						alert('提交成功');
						$('.close_z').click();
						$('.maya_maga').prepend(shareTmp('sayaShowGroupTpl' , {v : res[0]}));
						$('.maya_maga').find('.groupBox').eq(-1).remove();
					}
				};
			$.post(url , data , callback ,'json');
		});	
	};
	$('.maya_share').bind('click', function(){
		if(!check()) return false;
		var status = $(this).attr('s_type'),
			gtype = $(this).attr('gtype'),
			glen = $(this).attr('glen');
		if(status == 0){
			window.open('/settings/bind/qzone', 'mb',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(screen.width-620)/2,',top=',(screen.height-450)/2].join(''));
			$(this).attr('s_type',1);
		}else{
			if(glen == 1 && gtype == '0'){
				alert('你还没有创建自己的杂志哦');	
			}else{
				var html = shareTmp('sayaShareGroupLinkTpl');
				dialog.meiliDialog({
					dialogTitle : "分享我的末日愿望" , 
					dialogContent : html , 
					onStart : addGroup,
					onClose : function(){}
				});
			}
		}
	});
});

