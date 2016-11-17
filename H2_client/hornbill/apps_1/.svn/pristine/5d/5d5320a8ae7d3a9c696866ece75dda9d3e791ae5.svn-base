fml.use(['jquery' , 'ui/confirm'] , function(){
	var $ = this.jquery;	
	var confirm = this.confirm;
	$('.delete').bind('click' , function(){
		var html = '<p class="f16_f">真的要删除这个杂志吗？</p><p>删除后，你在杂志里分享的宝贝仍然保留在你的个人页</p>';
		var confirmDialog = new confirm({
			width : 370,
			transparent : true,
			content : html,
			isOverflow : true
		}); 
		confirmDialog.onSure($.proxy(function(){
			location.href = '/magazine/deleteMagazine/' + $(this).attr('group_id');	
		} , this));
	});
});
fml.use('jquery' , function(){
	var $ = this;	
	$('#editSubmit').bind('click' , function(){
		var val = $('#group_name').val().replace(/ /g , '');
		if(val == ''){
			$('.errorMes').html('杂志名称不能为空!');	
			return false;
		}	
	});
});
fml.define('page/edit' , [] , function(){});
