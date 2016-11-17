/*common*/
var userList = require('app/im/userList')
	, $userSearchResult
	, searchUserTimmer

var init = function($userSearch){
	$userSearch
		.on('submit', 'form', search)

	$userSearchResult = $userSearch.children('.search_result')
}
var search = function(){
	var $input = $(this).find('.search_input')
		, userName = $.trim($input.val())

	$input.val('')

	if(userName){
		$.get('/www/aj/searchUser', {
			nickname : userName

		}, function(res){
			if(res.successful == 1){
				userList.addDialog(res.data)

			}else{
				fail()
			}
		}, 'json')
		.fail(fail)
	}
}
var fail = function(){
	$userSearchResult.find('.ser_rlt').html('无搜索结果...')
	$userSearchResult.fadeIn(100)

	clearTimeout(searchUserTimmer)
	searchUserTimmer = setTimeout(function(){
		$userSearchResult
			.fadeOut(10)
	}, 3000)	
}

exports.init = init
