/*common*/
var $ = require('jquery')
	,shareTmp = require('component/shareTmp')

/*$('body').on('mousewheel', function(event) {
	var oEvent = event.originalEvent
		,wheelDelta = oEvent.wheelDelta
	var $wrapper = $('.main_wrapper>div:visible')
	var s = $wrapper.scrollTop()
	if(wheelDelta<0){
		s+=20
	} else {
		s-=20
	}
	$wrapper.scrollTop(s)
})*/

function addSecondAct($this){
	$this.parents('ul').find('.act').removeClass('act')
	$this.addClass('act')
}

var settingMainTop = $('.setting_main').offset().top
function saveLastTop(obj){
	obj.data('lastTop',obj.scrollTop())
}
$('.main_wrapper').children().each(function(index, el) {
	saveLastTop($(el))
	$(el).data('lastTop',$(el).scrollTop())
	//mb补全最后一项
	var mainHeight = $(el).height()
		,lastHeight = $(el).children(':last').outerHeight(true)
	if(lastHeight<mainHeight){
		$(el).children(':last').css('margin-bottom',mainHeight-lastHeight +'px')
	}
})

$('.main_wrapper>div').on('scroll', function(event) {
	var $self = $(this)
	if($self.data('aid'))
		clearTimeout($self.data('aid'))
	var aid = setTimeout(function(){
		$self.data('aid',0)
		var $main = $self
			,index = $main.index()
			,$secondNav = $('.second_nav_wrapper').children(':eq('+index+')')
			,forward = $main.data('lastTop')>$main.scrollTop()?'up':'down'
		saveLastTop($main)
		var $itemList = $main.children()
			,scrollHeight = 0

		for (var i = 0; i < $itemList.length ; i++) {
			var item = $itemList.eq(i)
			// console.log(item[0],item.offset().top+item.outerHeight(true),settingMainTop,item.offset().top+item.outerHeight(true)>=settingMainTop)
			if(item.offset().top+item.outerHeight(true)-10>=settingMainTop){
				addSecondAct($secondNav.find('[href=#'+item.attr('id')+']'))
				// if(forward=='down') $main.scrollTop(scrollHeight)
				break
			} else {
				scrollHeight += item.outerHeight(true)
			}
		}
	},300)
	$self.data('aid',aid)
})

$('.second_nav_wrapper').on('click', 'a', function(event) {
	event.preventDefault();
	var href = $(this).attr('href')
	if(/^#.+/.test(href)){
		addSecondAct($(this))
	}
	var $wrapper = $(href).parent()
	$wrapper.animate({'scrollTop':$wrapper.scrollTop()+$(href).offset().top-settingMainTop})
})
$('.first_nav').on('click', 'li', function(event) {
	if($(this).hasClass('act')) return
	$(this).parents('ul').find('.act').removeClass('act')
	$(this).addClass('act')
	var index = $(this).index()
	var $secondNav = $('.second_nav_wrapper').animate({'margin-left':-index*100+'%'}).find('ul:eq('+index+')')
	$('.main_wrapper>div').fadeOut(100).eq(index).fadeIn(200)
	if(!$secondNav.find('.act').length){
		 $secondNav.find('a:first').addClass('act')
	}
})

function callClient(r){
	console.log(r)
	try{
		window.c_setting_set(JSON.stringify(r))
	}catch(e){
		console.log('has no method window.c_setting_set')
	}
}
$('.basic_setting_main').on('change', ':checkbox', function(event) {
	var result = {}
	if(!$(this).val()) return
	result[$(this).val()] = $(this).is(':checked')|0
	callClient(result)

}).on('change', ':radio', function(event) {
	var result = {}
		,name = $(this).attr('name')
	if($('[name='+name+'_open]').is(':checked')){
		result[name] = $(this).val()*1
	} else {
		return
		// result[name] = 0
	}
	callClient(result)
}).on('change', '[name=user_audio_open],[name=public_audio_open]', function(event) {
	var name = $(this).attr('name').slice(0,-5)
	var r = {}
	if($(this).is(':checked')){
		r[name] = $('.basic_setting_main').find('[name='+name+']:checked').val()*1
	} else {
		r[name] = 0
	}
	callClient(r)
})

//初始化快速回复列表
function initBasic(){
/*	var param = {
	    open_with_boot : 1 //开机自动启动1 不启动0
	    ,auto_login : 0 //自动登录1 否0
	    ,keep_top : 1 //置顶1 否0
	    ,block_pop : 0 //禁止自动弹窗1 不禁止0
	    ,user_audio : 1 //普通用户消息提示音 参数为索引
	    ,public_audio : 2 //公众账号消息提示音 参数为索引
	    ,user_audio_list : [{
	        id:1
	        ,name:'叮叮'
	    }]
	    ,public_audio_list : [{
	        id:1
	        ,name:'叮叮'
	    }]
	    ,shortcut_key : {} //快捷键相关，暂时可能没有
	}*/
	try{
		// var param = '{"open_with_boot":0,"auto_login":0,"keep_top":0,"block_pop":1,"user_audio":15,"public_audio":1,"public_audio_list":[{"id":1,"name":"叮叮"},{"id":2,"name":"咚咚"},{"id":3,"name":"滴滴"},{"id":4,"name":"啦啦"},{"id":5,"name":"啊哈"},{"id":6,"name":"滴滴"},{"id":7,"name":"啊哈"},{"id":8,"name":"啦啦"}],"user_audio_list":[{"id":9,"name":"叮叮"},{"id":10,"name":"咚咚"},{"id":11,"name":"滴滴"},{"id":12,"name":"啦啦"},{"id":13,"name":"啊哈"},{"id":14,"name":"滴滴"},{"id":15,"name":"啊哈"},{"id":16,"name":"啦啦"}]}'
		var param = window.c_setting_get();
		param = (new Function('return '+param))()
	}catch(e){
		// $('body').html('初始化失败')
		return
	}
	loadData(param);
}
window.setting_get = function (param){
	loadData(param);
}
function loadData(param){
	if(!param)return;
	['open_with_boot','auto_login','keep_top','block_pop'].forEach(function(item){
		if(param[item]==1) $('[value='+item+']').attr('checked','checked')
	})
	var userAudioStr = '',publicAudioStr = ''
	param.user_audio_list && param.user_audio_list.forEach(function(item,index){
		userAudioStr += '<label><input type="radio" name="user_audio" value="'+item.id+'" '+(item.id==param.user_audio||index==0?'checked':'')+'>'+item.name+'</label>'
	})
	param.public_audio_list && param.public_audio_list.forEach(function(item,index){
		publicAudioStr += '<label><input type="radio" name="public_audio" value="'+item.id+'" '+(item.id==param.public_audio||index==0?'checked':'')+'>'+item.name+'</label>'
	})
	if(param.user_audio==0){
		$('[name=user_audio_open]').removeAttr('checked')
	}
	if(param.public_audio==0){
		$('[name=public_audio_open]').removeAttr('checked')
	}
	$('.radio_wrapper.user').prepend(userAudioStr).show()
	$('.radio_wrapper.public').prepend(publicAudioStr).show()
}
$('#audio_setting').on('click', '.listen', function(event) {
	var checkedObj = $(this).parent().find(':checked')
	if(checkedObj.length){
		var val = checkedObj.val()|0
		// console.log(val)
		window.c_audio(val)
	}
})

//快捷回复相关功能
function callClientFreshReply(){
	try{
		window.c_changeFastReply()
	} catch(e){
		console.log('has no method c_changeFastReply')
	}
}
$('#quickreply_setting').on('click','.ok', function(event) {
	var self = $(this)
		,div = self.parents('tr').find('td:first div')
		,val = $.trim(div.text())
		,reply_id = self.parents('tr').attr('data-id')

	if(val=='') return
	$.post('/windows/aj/udr_update',{
		content : val
		,reply_id : reply_id
	}, function(res, textStatus, xhr) {
		self.hide().siblings('.edit').show()
		div.removeAttr('contenteditable')
		callClientFreshReply()
	},'json')
}).on('click','.edit', function(event) {
	$(this).hide().siblings('.ok').show()
	$(this).parents('tr').find('td:first div').attr('contenteditable','true').focus()
}).on('click','.del', function(event) {
	var reply_id = $(this).parents('tr').attr('data-id')
	$(this).parents('tr').fadeOut(300)
	$.post('/windows/aj/udr_del',{reply_id:reply_id}, function(res, textStatus, xhr) {
		callClientFreshReply()
	},'json')
}).on('click', '.save_add', function(event) {
	var val = $('#quickreply_setting .add_input').val()
	val = $.trim(val.replace(/\n/g,' '))
	$('#quickreply_setting .add_input').val('')
	if(val=='') return console.log('str empty')
	$.post('/windows/aj/udr_add',{content:val}, function(data, textStatus, xhr) {
		if(data.successful==1){
			var p = {data:{
				content:val
				,reply_id:data.reply_id
			}}
			var html = shareTmp('tmp_fastreply_item',p)
			console.log(html)
			$('#quickreply_setting table').append(html)
			callClientFreshReply()
		}
	},'json')
})

//欢迎语设置
$('.save_welcome').on('click', function(event) {
	var val = $.trim($('.welcome_input').val())
	var $button = $(this)
	$.post('/windows/aj/update_autoreply',{
		action : 'setting'
		,type : 0
		,content : val
	}, function(data, textStatus, xhr) {
		var txt = data.code==0?'保存成功':'保存失败'
		$button.next('.red_f').html(txt).show().fadeOut(3000,function(){
			$(this).html('')
		})
	},'json')
})
$('.save_autoreply').on('click', function(event) {
	var val = $.trim($('.autoreply_input').val())
		,is_open = $('[name=is_open_autoreply]:checked').length
	var $button = $(this)
	$.post('/windows/aj/update_autoreply',{
		action : 'setting'
		,type : 1
		,content : val
		,active : is_open
	}, function(data, textStatus, xhr) {
		var txt = data.code==0?'保存成功':'保存失败'
		$button.next('.red_f').html(txt).show().fadeOut(3000,function(){
			$(this).html('')
		})
	},'json')
})

//init
;(function(){
	$('body').scrollTop(0)
	$('.basic_setting_nav a:first,.message_setting_nav a:first').addClass('act')
	var topath = location.pathname.split('___')[1] || ''

	if(topath){
		var $sbtn = $('.second_nav_wrapper').find('[href=#'+topath+']')
		if($sbtn.length){
			var index =$sbtn.parents('ul').index()
			$('.first_nav li:eq('+index+')').trigger('click')
			$sbtn.trigger('click')
		}
	}

	initBasic()
})()
