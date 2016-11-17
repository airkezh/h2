fml.define('app/followMagazine' , ['jquery' , 'app/groupApi', 'ui/alert' , 'ui/confirm' , 'app/checkLogin' , 'component/checkedAll' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var checkedAll = require('component/checkedAll');
	var confirmDialog = require('ui/confirm');
	var alertDialog = require('ui/alert');
	var groupApi = require('app/groupApi').groupApi;
	var isLoad = true;
	return function(){
	$(".infoBox").on('click' , '.pink_follow' , function(){
		if(!check()) return false;
		if($(this).hasClass('removeGroupFollow')) return; //hack for conflict to app/follow.js
		if(fml.vars.isShowConfirm){
			var showConfirm = new confirmDialog({
				content : '你确定要退出该杂志吗?',
				width : 370,
				isOverflow : true
			});
			showConfirm.onSure($.proxy(function(){
				ajaxPinkFollow.call(this);
				fml.vars.isShowConfirm = false;
			} , this));
		}else{
			ajaxPinkFollow.call(this);
		}
	});
	function ajaxPinkFollow(){
		var gid = $(this).attr('groupid')
		var data = {'group_id' : gid};
		var _this = $(this);
		var callback = function(response){
			if(!response) return;
			if(response.status == false){
				new alertDialog({
					content : response.error,
					width : 370,
					isOverflow : true
				});
				isLoad = true;
				return false;
			}	
			_this.parent().html('<span class="groupFollow small_btn" groupid="'+ gid +'"><em class="small_btnr"></em>'+ response.type_now +'</span>');
			isLoad = true;
		}
		if(isLoad){
			groupApi('quit' , data , callback);
			isLoad = false;
		}
	
	}
	$(".infoBox").on('click' , '.groupFollow' , function(){
		if(!check()) return false;
		var gid = $(this).attr('groupid')
		var data = {'group_id' : gid}; 
		var _this = $(this);
		var callback = function(response){
			if(!response) return;
			if(response.status == false){
				new alertDialog({
					content : response.error,
					width : 370,
					isOverflow : true
				}); 
				isLoad = true;
				return false;
			} 		
			_this.parent().html('<span class="pink_follow" type_now="' + response.type_now +'" type_hover="'+ response.type_hover +'" groupid="'+ gid +'">'+ response.type_now +'</span>');
			isLoad = true;
			function recGroup() {
				var url = '/aj/recommend/group_recommend';
				var data = {group_id : gid};
				var callback = function(response){
					if (response == 'false' || response.length == 0) return false;
					$('.rec_layout').remove();
					var data = {
						'ginfo' : response	
					}
					var group_rec = $(shareTmp('group_rec' , data));
					$('body').append(group_rec);	
					group_rec.css({
						left : $('.infoBox').offset().left - (group_rec.width() / 2) + 60,
						top : $('.infoBox').offset().top + $('.infoBox').height() + 20
					});
				}
				$.get(url , data , callback , 'json')
			}
			require('app/folSyncWb')(gid, 'group', recGroup);
		}   
		if(isLoad){
			groupApi('follow', data, callback);
			isLoad = false;
		}
	}); 
	$(".infoBox").on('mouseover' , '.pink_follow' , function(){
		$(this).html($(this).attr("type_hover"));
	}).on('mouseout' , '.pink_follow' , function(){
		$(this).html($(this).attr("type_now"));
	});
	$(document).on('click' , '.close_group' , function(){
		$('.rec_layout').remove();
	});
	// 绑定推荐杂志全选
	checkedAll('.checkedBtn' , '.checkedList');
	//批量关注
	$('.followAll').live('click' , function(){
		var groupIds = [];	
		$.each($(".checkedList") , function(k , v){
			if($(v).attr("checked")){
				groupIds.push($(v).attr("gid"));
			}
		})
		var url = '/aw/group/follow_groups';
		var data = {
			group_ids : groupIds.join(",")	
		}
		var callback = function(){
			location.href = '/?frm=group_rec&num='+ groupIds.length;	
		}
		$.post(url , data , callback);
	});
}
});
