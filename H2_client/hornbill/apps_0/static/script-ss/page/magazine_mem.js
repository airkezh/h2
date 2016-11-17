fml.define('page/magazine_mem', ['jquery', 'ui/confirm'], function(require, exports){
	var $ = require('jquery');
	var confirmDia = require('ui/confirm');

	var confirmFun = function(text, cbk, uid, role) {
		new confirmDia({
			content : text,
			width : 370,
			isOverflow : true
		}).onSure(function(){cbk(uid, role)});
	}

	var cbk = function(uid, role) {
		var data = {
			'group_id' : Meilishuo.config.mag_id,
			'user_id' : uid,
			'role' : role,
			'where' : Meilishuo.config.m_type
		}
		$.get('/aj/magazine/change_role', data, function(){ location.href = location.href; });
	}

	$('.m_ico').on('click', function(){
		var uid = $(this).parent('li').attr('uid');
		var confirms = {
			'agree' : ['通过该用户的申请？', 0],
			'unblock' : ['将该用户从黑名单中解封？', 5],
			'delete' : ['将该用户从杂志中移出？', 88],
			'refuse' : ['拒绝该用户的申请？', 5],
			'block' : ['将该用户加入黑名单？', 8],
			'down' : ['将该用户降为粉丝？', 5],
			'down_editor' : ['将该用户降为编辑？', 0]
		};
		for (var i in confirms) {
			if($(this).hasClass(i)) {
				confirmFun(confirms[i][0], cbk, uid, confirms[i][1]);
				break;
			}
		}
	});	
});
