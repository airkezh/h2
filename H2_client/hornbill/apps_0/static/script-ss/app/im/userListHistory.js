/*common*/
var $ = require('jquery')
	,shareTmp = require('component/shareTmp')
	, scroll = require('component/windowScroll')
	, userList = require('app/im/userList')

/*--init userListHistory to json object--*/
// setUserListHistory(fml.vars.im.historyUserList)
setUserListHistory(fml.vars.im.publicUserList)
function setUserListHistory(list){ 
	if(!list) return
	var result = {}
	for (var i = 0; i < list.length; i++) {
		result[list[i].uid] = list[i]
	}
	fml.vars.im.userListHistory = $.extend({},fml.vars.im.userListHistory,result)
}
/*--end init publicUserList--*/

var init = function(opts){
	var tag = opts.box
		, $box = $('#' + tag)
		, $list = $box.children('.' + tag + '_box')
		, load = 1
	$list
		.on('click', '.user_info', function(){
			var $this = $(this)
				, data
			if($this.attr('utype') ==='public'){
				data = fml.vars.im.userListHistory[$this.attr('uid')]
			} else {
				data = {
					uid : $this.attr('uid')
					, avatar_b : $this.find('.user_img img').attr('src')	
					, nickname : $this.find('.user_name').text()
					, utype : $this.attr('utype') || ''
				}
			}
			
			$this.addClass('act')

			userList.addDialog(data)
		})

	if(!opts.url) return;

	scroll.bind(function(pos , isDown){
		if(!isDown) return;

		if(load && (pos >= $list.height() - $box.height())){
			load = 0

			$.get(opts.url, opts.data, function(res){

				if(!res.data || !res.data.length) return;

				load = 1

				if(res.data.length < 20) load = 0

				var listCF = document.createDocumentFragment()

				// setUserListHistory(res.data)

				$.each(res.data, function(k, v){
					listCF.appendChild($(shareTmp('im_userlist_item', {v:v}))[0])
				})

				$list.append(listCF)

				opts.data.page++;

			}, 'json')
		}

	}, tag, $box[0])

}

exports.init = init
