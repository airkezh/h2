/*common*/	
/*
	存储格式 userlist : "username|password,username2|password2"
*/
require('jquery')
var shareTmp = require('component/shareTmp')

var userlist = ''
	, arr = []
	, hasStorage = haveStorage()
function haveStorage(){
	if(window.localStorage) return 1
	if(window.external && window.external.getUserList){
		return 2
	}
	return 0
}
function getUserlist(){
	var i
	if(hasStorage===1)
		userlist = localStorage.getItem('userlist') || ''
	else if(hasStorage===2)
		userlist = window.external.getUserList() || ''

	if(!userlist) return ''

	arr = userlist.split(',')
	for (i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split('|')
	}
}
function setUserlist(arr,username){
	try{
		var newArr = []
		if(username && arr.length>1){
			var firstIndex = findArrIndexByName(username)
			var temp = arr.splice(firstIndex, 1)[0]
			arr.splice(0,0,temp)
		}
		for (var i = 0; i < arr.length; i++) {
			newArr.push(arr[i].join('|'))
		}
		userlist = newArr.join(',')
		if(hasStorage==1)
			localStorage.setItem('userlist',userlist)
		else if(hasStorage==2)
			window.external.setUserList(userlist)
	}catch(e){
		if(hasStorage==1)
			localStorage.setItem('userlist','')
		else if(hasStorage==2)
			window.external.setUserList('')
	}
}

if(hasStorage){
	getUserlist()
	// console.log(userlist,arr)
}

var init = function(user,pass){
	if(!hasStorage) return;

	var $userlist = $('.userlist')
		, $usermore = $('.user_more')
		, $user = $(user)
		, $pass = $(pass)

	var updateForm = function(lastUserName,lastUserPass){
		$user.val(lastUserName)
		$pass.val(lastUserPass)
	}

	var hideUsermore = function(s){
		var speed = s || 400
		$userlist.slideUp(speed)
		$userlist.children().stop().fadeOut(speed, function(){
			$(this).show()	
			$usermore.removeClass('open')
		})
	}
	var showUsermore = function(s){
		var speed = s || 200
		$userlist.slideDown(speed, function(){
			$usermore.addClass('open')
		})		
	}

	$userlist.on('click', 'li', function(){
		updateForm($(this).attr('login_name'),$(this).attr('password'))
		hideUsermore(100)
	})
	$usermore.on('click', function(){
		if($usermore.is('.open'))
			hideUsermore()
		else
			showUsermore()
	})

	if(!arr.length) return;
	var lastUserName = arr[0][0]
		,lastUserPass = arr[0][1] || ''
	updateForm(lastUserName,lastUserPass)

	$usermore.show()
	$.each(arr, function(k, v){
		$userlist.append(shareTmp('userlist_item', {
			login_name : v[0]
			, password : v[1] || ''
			, avatar : v[2] || ''
		}))
	})
}

function findArrIndexByName(username){
	for (var i = 0; i < arr.length; i++) {
		if(arr[i][0]==username) return i
	}
	return -1
}

var password = function(data){
	if(!hasStorage) return;
	var username = data.login_name
		,password = data.password
		,arrIndex = findArrIndexByName(username)
	if(arrIndex==-1){
		arr.splice(0,0,[username])
		arrIndex = 0
	}
	arr[arrIndex][1] = password

	setUserlist(arr,username)

//	JSON.stringify(data)
//	$.parseJSON()
}
var avatar = function(data){
	if(!hasStorage) return;

	arr[0][2] = data.avatar

	setUserlist(arr)

}
var remove = function(data){
	if(!hasStorage) return;

	var username = data.login_name
		,arrIndex = findArrIndexByName(username)

	arr.splice(arrIndex, 1)

	setUserlist(arr)
}

var clean = function(){
	if(!hasStorage) return;

	if(!arr.length) return;

	arr = []

	setUserlist(arr)
}

exports.init = init
exports.password = password
exports.avatar = avatar
exports.remove = remove
exports.clean = clean
