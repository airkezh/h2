fml.define('app/followSome' , ['jquery' , 'component/urlHandle'] , function(require , exports){
	var $ = require('jquery');
	var urlHandle = require('component/urlHandle');
	return function(opts){
		var group_ids = '', group_names = '';
		if(!opts.followStyle) opts.followStyle = '';
		if(!opts.unfollowStyle) opts.unfollowStyle = '';
		$.each($('.groupBox'),function(i){
			group_ids += $(this).find(opts.removeBtn).attr('groupid') + ',';
			group_names += $(this).find('.gc_title h4').text() + ',';
		});
		$(opts.addBtn).live('click' , function(){
			var idInfo = $(this).attr('groupid'),
				nameInfo =	$(this).parents('.groupBox').find('.gc_title h4').text();
			group_ids += idInfo + ',';
			group_names += nameInfo + ',';
			this.className = opts.removeBtn.replace('.' , '') + ' ' + opts.unfollowStyle;
			$(this).html('已关注');
		}); 
		$(opts.removeBtn).live('click' , function(){
			var idInfo = $(this).attr('groupid'),
				nameInfo =	$(this).parents('.groupBox').find('.gc_title h4').text();
			group_ids = group_ids.replace(idInfo + ',' , '');
			group_names = group_names.replace(nameInfo + ',' , '');
			this.className = opts.addBtn.replace('.' , '') + ' ' + opts.followStyle;
			$(this).html('+ 加关注');
		});
		$(opts.hoverBtn).live({
			'mouseenter' : function(){
				$(this).html('取消关注');
			},
			'mouseleave' : function(){
				$(this).html('已关注');
			}
		});
		$(opts.submitBtn).click(function(){
			var group_id = group_ids.substring(0, group_ids.length - 1),
				group_name = group_names.substring(0, group_names.length - 1);
			var data = {group_ids : group_id, group_name : group_name};
			var callback = function(res) {
				var url = Meilishuo.config.server_url + res.url + '?init&frm=regStep4';
				urlHandle.redirect(url);
			};
			$.get(opts.url, data, callback, 'json');
		});
	}
});
