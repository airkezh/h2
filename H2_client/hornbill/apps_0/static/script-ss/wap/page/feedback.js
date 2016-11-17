fml.define('wap/page/feedback' ,['jquery','component/ajax'], function(require ,exports){
	var $ = require('jquery')
		,ajax = require('component/ajax')

	$('#form').submit(function(){
		var data = {}
		data.text = $('#fb_content').val()
		data.contact = $('#telqq').val()
		data['access_token'] = fml.vars.accessToken
		if (!data.text.length){
			alert('内容不能为空')
			return
			}
		//console.log(data)
		ajax.aw('/aw/feedback/' ,data ,function(res){
			if (res && res.message)
				alert(res.message)	
			else
				alert('提交失败')
			})	
		return false
		})
		
	
	})
