/*common*/
var signWX = require('wx/sign')
var shareWX = require('wx/share')

signWX()

fml.vars.shareData = {
	desc: 'desc'
	, title:'title'
	, success:function(){
		alert('success')	
	} //已分享
	/*
	, trigger: function (res) { } //用户点击分享到朋友圈
	, cancel: function (res) { } //已取消
	, fail: function (res) { }
	*/
}

shareWX.bind(fml.vars.shareData)


